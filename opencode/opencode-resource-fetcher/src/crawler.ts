import { chromium } from 'playwright';
import type { Browser, Page } from 'playwright';
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

function cleanReadmeContent(content: string): string {
  let cleaned = content;
  
  cleaned = cleaned.replace(/!\[([^\]]*)\]\([^)]+\)/gi, '');
  cleaned = cleaned.replace(/\[\]\([^)]+\)/gi, '');
  cleaned = cleaned.replace(/\[([^\]]+)\]\([^)]+\)/gi, '$1');
  cleaned = cleaned.replace(/<img[^>]*>/gi, '');
  cleaned = cleaned.replace(/<[^>]+>/g, '');
  cleaned = cleaned.replace(/&[a-z]+;/gi, '');
  cleaned = cleaned.replace(/^\s*[-*_]{3,}\s*$/gm, '');
  cleaned = cleaned.replace(/^[-*_]{2,}$/gm, '');
  cleaned = cleaned.replace(/```[\s\S]*?```/g, '');
  cleaned = cleaned.replace(/`([^`]+)`/g, '$1');
  cleaned = cleaned.replace(/^#+\s*/gm, '');
  cleaned = cleaned.replace(/\*\*([^*]+)\*\*/g, '$1');
  cleaned = cleaned.replace(/\*([^*]+)\*/g, '$1');
  cleaned = cleaned.replace(/^\s*[-+*]\s+/gm, '');
  cleaned = cleaned.replace(/^\s*\d+\.\s+/gm, '');
  cleaned = cleaned.replace(/\[([^\]]*)\]\[[^\]]*\]/g, '$1');
  cleaned = cleaned.replace(/\[[^\]]*\]:\s*https?:\/\/[^\n]+/g, '');
  cleaned = cleaned.replace(/^\s*>\s*/gm, '');
  cleaned = cleaned.replace(/\|.*\|/g, '');
  cleaned = cleaned.replace(/\s{2,}/g, ' ');
  
  const lines = cleaned.split('\n');
  const filteredLines = lines.filter(line => {
    const trimmed = line.trim();
    if (trimmed.length === 0) return true;
    if (trimmed.startsWith('[![') || trimmed.startsWith('![Badge]') || trimmed.startsWith('![GitHub')) return false;
    if (trimmed.startsWith('[](')) return false;
    if (trimmed.startsWith('|')) return false;
    if (trimmed.startsWith('>')) return false;
    if (/^https?:\/\//.test(trimmed)) return false;
    if (trimmed.includes('shields.io') || trimmed.includes('badge')) return false;
    if (trimmed.includes('✨') || trimmed.includes('🌟') || trimmed.includes('🚀')) return false;
    if (/^[-*_]+$/.test(trimmed)) return false;
    return true;
  });
  
  cleaned = filteredLines.join('\n');
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n');
  
  return cleaned.trim();
}

function containsInvalidContent(text: string): boolean {
  if (!text) return true;
  if (text.includes('![![') || text.includes('shields.io')) return true;
  if (text.includes('data:image') || text.includes('base64')) return true;
  if (/^\s*\[\]\(/.test(text)) return true;
  const urlCount = (text.match(/https?:\/\//g) || []).length;
  if (urlCount > 2) return true;
  return false;
}

async function getGitHubInfo(page: Page, githubUrl: string | undefined): Promise<{ lastUpdated?: string; readmeContent?: string }> {
  const result = {
    lastUpdated: undefined as string | undefined,
    readmeContent: undefined as string | undefined,
  };

  if (!githubUrl) return result;

  try {
    const match = githubUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
    if (!match) return result;
    
    const [, owner, repo] = match;
    
    const rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}`;
    const readmeUrls = [
      `${rawUrl}/main/README.md`,
      `${rawUrl}/main/readme.md`,
      `${rawUrl}/master/README.md`,
      `${rawUrl}/master/readme.md`,
    ];

    for (const readmeUrl of readmeUrls) {
      try {
        const response = await page.request.get(readmeUrl, { timeout: 15000 });
        if (response.ok()) {
          const rawContent = await response.text();
          result.readmeContent = cleanReadmeContent(rawContent);
          break;
        }
      } catch {
        continue;
      }
    }

    try {
      const apiUrls = [
        `https://api.github.com/repos/${owner}/${repo}/commits?per_page=1`,
        `https://api.github.com/repos/${owner}/${repo}`,
      ];
      
      for (const apiUrl of apiUrls) {
        try {
          const response = await page.request.get(apiUrl, {
            headers: { 
              'User-Agent': 'Mozilla/5.0',
              'Accept': 'application/vnd.github.v3+json'
            },
            timeout: 10000
          });
          
          if (response.ok()) {
            const data = await response.json();
            if (Array.isArray(data) && data[0]?.commit?.author?.date) {
              result.lastUpdated = data[0].commit.author.date.split('T')[0];
              break;
            } else if (data?.pushed_at) {
              result.lastUpdated = data.pushed_at.split('T')[0];
              break;
            } else if (data?.updated_at) {
              result.lastUpdated = data.updated_at.split('T')[0];
              break;
            }
          }
        } catch {
          continue;
        }
      }
    } catch {
    }
  } catch {
  }

  return result;
}

function isChineseText(text: string): boolean {
  if (!text) return false;
  const chineseChars = (text.match(/[\u4e00-\u9fa5]/g) || []).length;
  return chineseChars > text.length * 0.3;
}

function isValidPurpose(text: string): boolean {
  if (!text || text.length < 10) return false;
  if (text.includes('|') || text.includes('> |')) return false;
  if (text.includes('shields.io') || text.includes('badge')) return false;
  if (/^[\s|>-]+$/.test(text)) return false;
  const urlCount = (text.match(/https?:\/\//g) || []).length;
  if (urlCount > 1) return false;
  return true;
}

function extractPurposeFromReadme(content: string, extName: string): string {
  const lines = content.split('\n').filter(l => {
    const trimmed = l.trim();
    const lower = trimmed.toLowerCase();
    return trimmed.length > 30 && 
           !lower.includes('shields.io') && 
           !lower.includes('badge') &&
           !lower.includes('license') &&
           !lower.includes('install') &&
           !lower.includes('npm install') &&
           !lower.includes('yarn add') &&
           !lower.includes('bun add') &&
           !trimmed.startsWith('|') &&
           !trimmed.startsWith('>') &&
           !trimmed.startsWith('![') &&
           !trimmed.startsWith('[![') &&
           !/^https?:\/\//.test(trimmed) &&
           !trimmed.includes('```');
  });
  
  for (const line of lines.slice(0, 3)) {
    let cleaned = line
      .replace(/[#*`|]/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/\s+/g, ' ')
      .trim();
    
    if (cleaned.length > 30 && isValidPurpose(cleaned)) {
      const lower = cleaned.toLowerCase();
      if (lower.includes(extName.toLowerCase()) || 
          lower.includes('plugin') ||
          lower.includes('tool') ||
          lower.includes('extension') ||
          lower.includes('opencode') ||
          lower.includes('mcp') ||
          lower.includes('server')) {
        return cleaned.slice(0, 100);
      }
    }
  }
  
  for (const line of lines.slice(0, 5)) {
    let cleaned = line
      .replace(/[#*`|]/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/\s+/g, ' ')
      .trim();
    
    if (cleaned.length > 30 && isValidPurpose(cleaned)) {
      return cleaned.slice(0, 100);
    }
  }
  
  return '暂无';
}

async function summarizePurpose(content: string, extName: string): Promise<string> {
  if (!content || content.length < 20) {
    return '暂无';
  }
  
  return summarizeWithAI(content, extName);
}

async function summarizeWithAI(content: string, extName: string): Promise<string> {
  try {
    const prompt = `用简洁的中文（30-50字）总结这个 OpenCode 扩展的用途，直接返回总结，不需要任何格式或前缀。`;
    
    const result = await $`echo "${content.slice(0, 2000)}" | opencode run "${prompt}" -m opencode/big-pickle`.text();
    
    const cleaned = result
      .replace(/^> build · big-pickle.*$/gm, '')
      .replace(/^% WebFetch.*$/gm, '')
      .replace(/^✱.*$/gm, '')
      .replace(/^→.*$/gm, '')
      .replace(/^需要先.*$/gm, '')
      .replace(/^提供.*/gm, (match) => match)
      .replace(/^\d+:/gm, '')
      .replace(/^itschel.*$/gm, '')
      .replace(/^\[.*m$/gm, '')
      .replace(/\x1b\[[0-9;]*m/g, '')
      .replace(/\n{2,}/g, '\n')
      .trim();
    
    const lines = cleaned.split('\n').filter(l => l.trim().length > 0);
    const summary = lines[lines.length - 1] || lines[0] || '';
    
    if (summary.length > 5) {
      return summary.slice(0, 100);
    }
    
    return extractPurposeFromReadme(content, extName);
  } catch (error) {
    console.error(`  ⚠️ AI summarization error: ${error}`);
    return extractPurposeFromReadme(content, extName);
  }
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
            console.log(`    → README 内容长度: ${githubInfo.readmeContent?.length || 0}`);

            if (githubInfo.readmeContent) {
              console.log(`    → 正在总结用途...`);
              plugin.purpose = await summarizePurpose(githubInfo.readmeContent, plugin.name);
              console.log(`    → 用途: ${plugin.purpose?.slice(0, 50)}...`);
            } else {
              console.log(`    ⚠️ 无法获取 README 内容`);
              plugin.purpose = '暂无';
            }
          } catch (e) {
            console.log(`    ⚠️ GitHub info error: ${e}`);
            plugin.purpose = '暂无';
          }
        } else {
          console.log(`    → 跳过 GitHub 信息获取（无 GitHub 链接）`);
          plugin.purpose = '暂无';
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
