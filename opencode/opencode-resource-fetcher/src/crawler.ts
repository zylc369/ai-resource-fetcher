import { chromium, Browser, Page } from 'playwright';
import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { $ } from 'bun';

interface Extension {
  id: string;
  name: string;
  description: string;
  type: string;
  author: string;
  url: string;
  githubUrl?: string;
  lastUpdated?: string;
  usage?: string;
  purpose?: string;
  tags?: string[];
}

interface Result {
  total: number;
  byType: Record<string, number>;
  plugins: Extension[];
}

interface CliArgs {
  count: boolean;
  report: boolean;
  help: boolean;
}

const BASE_URL = 'https://www.opencode.cafe';
const SEARCH_URL = `${BASE_URL}/search`;
const OUTPUT_DIR = './output';

function parseArgs(): CliArgs {
  const args = process.argv.slice(2);
  return {
    count: args.includes('--count') || args.includes('-c'),
    report: args.includes('--report') || args.includes('-r'),
    help: args.includes('--help') || args.includes('-h'),
  };
}

function showHelp() {
  console.log(`
OpenCode Cafe 爬虫

用法: bun run crawl [选项]

选项:
  -c, --count    返回扩展数量
  -r, --report   生成中文分析报告
  -h, --help     显示帮助信息

示例:
  bun run crawl --count        # 返回扩展数量
  bun run crawl --report       # 生成中文报告
  bun run crawl -c -r         # 同时执行
  `);
}

async function getGitHubInfo(page: Page, githubUrl: string | undefined): Promise<{ lastUpdated?: string; usage?: string }> {
  const result = {
    lastUpdated: undefined as string | undefined,
    usage: undefined as string | undefined,
  };

  if (!githubUrl) return result;

  try {
    const url = githubUrl.replace('github.com', 'raw.githubusercontent.com');
    const readmeUrls = [
      `${url}/main/README.md`,
      `${url}/main/readme.md`,
      `${url}/master/README.md`,
      `${url}/master/readme.md`,
    ];

    for (const readmeUrl of readmeUrls) {
      try {
        const response = await page.request.get(readmeUrl, { timeout: 15000 });
        if (response.ok()) {
          const content = await response.text();
          result.usage = content.slice(0, 5000);
          break;
        }
      } catch {
        continue;
      }
    }

    const commitsUrl = `${githubUrl.replace('github.com', 'api.github.com/repos')}/commits?per_page=1`;
    try {
      const commitsResponse = await page.request.get(commitsUrl, {
        headers: { 'User-Agent': 'OpenCode-Crawler' },
        timeout: 10000
      });
      if (commitsResponse.ok()) {
        const commits = await commitsResponse.json();
        if (commits && commits[0] && commits[0].commit) {
          result.lastUpdated = commits[0].commit.author.date;
        }
      }
    } catch {
      // Ignore commit fetch errors
    }
  } catch (err) {
    console.error(`    ⚠️ GitHub info fetch error:`, err);
  }

  return result;
}

async function summarizeWithOpenCode(content: string, type: 'usage' | 'purpose'): Promise<string> {
  if (!content || content.length < 50) {
    return '暂无';
  }

  const prompt = type === 'usage' 
    ? `请用中文简明扼要地总结以下内容中关于如何使用这个扩展的信息（50字以内）：\n\n${content.slice(0, 3000)}`
    : `请用中文简明扼要地总结以下内容中关于这个扩展的用途和功能（50字以内）：\n\n${content.slice(0, 3000)}`;

  try {
    console.log(`      → 调用 OpenCode 生成${type === 'usage' ? '使用方式' : '用途'}...`);
    const result = await $`echo ${prompt} | opencode`.cwd('/tmp').quiet().timeout(30000).text();
    if (result && result.trim().length > 5) {
      console.log(`      ✓ OpenCode 返回成功`);
      return result.trim().slice(0, 200);
    }
  } catch (err) {
    console.log(`      ⚠️ OpenCode 调用失败或超时，使用 fallback`);
  }

  console.log(`      → 使用 fallback 方式提取...`);
  // Fallback: simple extraction and translate to Chinese
  const lines = content.split('\n').filter(l => l.trim().length > 10);
  const keywords = type === 'usage' 
    ? ['install', 'use', 'setup', 'config', 'npm', 'run', 'command', 'usage', 'how to', 'getting started']
    : ['feature', 'function', 'for', 'allows', 'provides', 'about', 'description', 'overview'];
  
  const relevantLines: string[] = [];
  for (const line of lines) {
    const lower = line.toLowerCase();
    if (keywords.some(k => lower.includes(k))) {
      relevantLines.push(line.replace(/[#*`]/g, '').trim());
    }
  }

  if (relevantLines.length > 0) {
    const extracted = relevantLines.slice(0, 2).join(' ').slice(0, 150);
    const translations: Record<string, string> = {
      'install': '安装', 'usage': '使用', 'command': '命令', 'feature': '功能',
      'allows': '允许', 'provides': '提供', 'config': '配置', 'setup': '设置',
      'npm': 'npm', 'run': '运行', 'description': '描述', 'overview': '概述'
    };
    let translated = extracted;
    for (const [en, zh] of Object.entries(translations)) {
      translated = translated.replace(new RegExp(en, 'gi'), zh);
    }
    console.log(`      ✓ Fallback 提取成功`);
    return translated;
  }

  console.log(`      ✗ 无法提取相关信息`);
  return '暂无';
}

async function crawlExtensions(showProgress = true): Promise<Result> {
  if (showProgress) console.log('🚀 Starting crawler...');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const extensions: Extension[] = [];
  const byType: Record<string, number> = {};

  try {
    if (showProgress) console.log(`📄 Navigating to ${SEARCH_URL}...`);
    await page.goto(SEARCH_URL, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(3000);

    const cards = await page.locator('[data-extension-id], a[href^="/plugin/"]').evaluateAll((elements) => {
      return elements.map((el) => el.getAttribute('href')).filter(Boolean) as string[];
    });

    const uniqueUrls = [...new Set(cards.filter((url) => url.startsWith('/plugin/')))];

    if (showProgress) console.log(`📊 Found ${uniqueUrls.length} extension links, crawling details...`);

    for (const url of uniqueUrls) {
      try {
        const fullUrl = `${BASE_URL}${url}`;
        await page.goto(fullUrl, { waitUntil: 'networkidle', timeout: 30000 });
        await page.waitForTimeout(800);

        const ext = await page.evaluate((pageUrl) => {
          const name = document.querySelector('h1')?.textContent?.trim() || 
                       document.querySelector('[class*="text-2xl"]')?.textContent?.trim() || 
                       'Unknown';
          
          const desc = document.querySelector('p[class*="text-[var"]')?.textContent?.trim() ||
                       document.querySelector('p[class*="text-sm"]')?.textContent?.trim() ||
                       '';
          
          const author = document.querySelector('[class*="text-xs"]')?.textContent?.trim() ||
                        document.querySelector('a[href^="/account"]')?.textContent?.trim() ||
                        '';

          const allLinks = Array.from(document.querySelectorAll('a'));
          const githubLink = allLinks.find(a => 
            a.textContent?.includes('View Repository') && a.href.includes('github.com')
          );
          const githubUrl = githubLink?.href;
          
          // Extract type from Details section
          const body = document.body.innerText;
          const typeMatch = body.match(/Type\s*\n\s*([A-Za-z ]+)/i);
          const type = typeMatch ? typeMatch[1].trim() : 'Plugin';
          
          // Extract tags - they appear as plain text elements after description, before "View Repository"
          const match = body.match(/([a-z0-9,\s-]+)\n\s*View Repository/i);
          let tags: string[] = [];
          if (match && match[1]) {
            tags = match[1].split('\n').map(t => t.trim()).filter(t => t && t.length < 20);
          }
          
          const urlType = pageUrl.split('/').pop() || '';
          
          return {
            name,
            description: desc,
            author,
            githubUrl,
            urlType,
            tags,
            type,
          };
        }, url);

        const extension: Extension = {
          id: url.split('/').pop() || '',
          name: ext.name,
          description: ext.description,
          type: ext.type || 'Plugin',
          author: ext.author || 'Unknown',
          url: `${BASE_URL}${url}`,
          githubUrl: ext.githubUrl,
          tags: ext.tags,
        };

        extensions.push(extension);
        byType[extension.type] = (byType[extension.type] || 0) + 1;

        if (showProgress) console.log(`  ✅ ${extension.name} (${extension.type})`);
      } catch (err) {
        if (showProgress) console.error(`  ❌ Failed to crawl ${url}:`, err);
      }
    }

  } catch (error) {
    console.error('❌ Crawler error:', error);
  } finally {
    await browser.close();
  }

  const result: Result = {
    total: extensions.length,
    byType,
    plugins: extensions,
  };

  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  const outputPath = join(OUTPUT_DIR, 'extensions.json');
  writeFileSync(outputPath, JSON.stringify(result, null, 2));
  if (showProgress) {
    console.log(`\n💾 Results saved to ${outputPath}`);
    console.log(`📈 Total: ${result.total} extensions`);
  }

  return result;
}

async function generateReport(result: Result): Promise<void> {
  console.log('\n📝 正在生成中文分析报告...');
  
  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  let browser: Browser;
  try {
    browser = await chromium.launch({ headless: true });
  } catch (e) {
    console.error('Failed to launch browser:', e);
    return;
  }

  const context = await browser.newContext();
  const page = await context.newPage();

  // Group plugins by type
  const pluginsByType: Record<string, Extension[]> = {};
  for (const plugin of result.plugins) {
    if (!pluginsByType[plugin.type]) {
      pluginsByType[plugin.type] = [];
    }
    pluginsByType[plugin.type].push(plugin);
  }

  let reportContent = `# OpenCode Cafe 扩展分析报告

## 概览
- **扩展总数**: ${result.total}
- **分类数量**: ${Object.keys(pluginsByType).length}

### 分类统计
`;

  for (const [type, plugins] of Object.entries(pluginsByType)) {
    reportContent += `- **${type}**: ${plugins.length} 个\n`;
  }

  // Generate report grouped by type
  for (const [type, plugins] of Object.entries(pluginsByType)) {
    reportContent += `\n## ${type}\n\n`;

    let processed = 0;
    
    for (const plugin of plugins) {
      processed++;
      console.log(`  📄 [${processed}/${plugins.length}] 处理: ${plugin.name}`);
      console.log(`    → 正在访问扩展详情页...`);
      
      try {
        await page.goto(plugin.url, { waitUntil: 'domcontentloaded', timeout: 10000 }).catch(() => null);
        await page.waitForTimeout(300);
        console.log(`    → 正在提取页面信息...`);

        const detail = await page.evaluate(() => {
          const body = document.body.innerText;
          const match = body.match(/([a-z0-9][a-z0-9\s-]*)\n\s*View Repository/i);
          let tags: string[] = [];
          if (match && match[1]) {
            tags = match[1].split('\n').map(t => t.trim()).filter(t => t && t.length < 25);
          }
          
          const viewRepoBtn = Array.from(document.querySelectorAll('a')).find(a => 
            a.href.includes('github.com')
          );
          const githubUrl = viewRepoBtn?.href;

          return { tags, githubUrl };
        });

        plugin.githubUrl = plugin.githubUrl || detail.githubUrl;
        plugin.tags = plugin.tags || detail.tags;
        console.log(`    → GitHub: ${plugin.githubUrl || '无'}`);

        if (plugin.githubUrl) {
          console.log(`    → 正在获取 GitHub README...`);
          try {
            const githubInfo = await getGitHubInfo(page, plugin.githubUrl);
            plugin.lastUpdated = githubInfo.lastUpdated;
            console.log(`    → README 内容长度: ${githubInfo.usage?.length || 0}`);

            if (githubInfo.usage) {
              console.log(`    → 正在使用 OpenCode 总结使用方式...`);
              plugin.usage = await summarizeWithOpenCode(githubInfo.usage, 'usage');
              console.log(`    → 正在使用 OpenCode 总结用途...`);
              plugin.purpose = await summarizeWithOpenCode(githubInfo.usage, 'purpose');
              console.log(`    → 使用方式: ${plugin.usage?.slice(0, 50)}...`);
              console.log(`    → 用途: ${plugin.purpose?.slice(0, 50)}...`);
            }
          } catch (e) {
            console.log(`    ⚠️ GitHub info error: ${e}`);
          }
        } else {
          console.log(`    → 跳过 GitHub 信息获取（无 GitHub 链接）`);
        }
      } catch (err) {
        console.error(`    ⚠️ Error processing ${plugin.name}:`, err);
      }

      console.log(`    ✓ 完成 ${plugin.name}\n`);

      const lastUpdated = plugin.lastUpdated 
        ? new Date(plugin.lastUpdated).toLocaleDateString('zh-CN')
        : '未知';

      const githubLink = plugin.githubUrl 
        ? `[GitHub](${plugin.githubUrl})` 
        : '无';

      const tagsStr = plugin.tags && plugin.tags.length > 0 
        ? plugin.tags.join(', ') 
        : '无';

      reportContent += `### ${plugin.name}

- **更新日期**: ${lastUpdated}
- **链接**: [扩展详情](${plugin.url}) | ${githubLink}
- **标签**: ${tagsStr}
- **使用方式**: ${plugin.usage || '暂无'}
- **用途**: ${plugin.purpose || '暂无'}

---
`;
    }
  }

  await browser.close();

  const reportPath = join(OUTPUT_DIR, 'report.md');
  writeFileSync(reportPath, reportContent);
  console.log(`\n💾 Report saved to ${reportPath}`);
}

async function main() {
  const args = parseArgs();

  if (args.help) {
    showHelp();
    return;
  }

  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  let existingData: Result | null = null;
  const dataPath = join(OUTPUT_DIR, 'extensions.json');
  if (existsSync(dataPath)) {
    try {
      existingData = JSON.parse(readFileSync(dataPath, 'utf-8'));
    } catch {
      // ignore
    }
  }

  if (args.count) {
    if (existingData && existingData.total > 0) {
      console.log(existingData.total);
      return;
    }
    const result = await crawlExtensions(false);
    console.log(result.total);
    return;
  }

  let result: Result;
  if (args.report && existingData && existingData.plugins.length > 0) {
    console.log('📂 使用已有的爬取数据...');
    result = existingData;
  } else {
    result = await crawlExtensions(!args.report);
  }

  if (args.report) {
    await generateReport(result);
    console.log(`\n✅ 报告已生成: ${join(OUTPUT_DIR, 'report.md')}`);
  }

  if (!args.count && !args.report) {
    console.log(`📈 Total: ${result.total} extensions`);
    console.log('📊 By type:', result.byType);
    console.log('\n使用 --help 查看更多选项');
  }
}

main().catch(console.error);
