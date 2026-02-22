# OpenCode Cafe 爬虫升级计划

## 1. 升级目标

1. **CLI 参数支持**：通过命令行参数返回扩展数量
2. **中文分析报告**：生成 Markdown 格式的中文报告

## 2. CLI 参数设计

```bash
# 返回扩展数量
bun run crawl --count
# 或
bun run crawl -c

# 生成中文分析报告
bun run crawl --report
# 或
bun run crawl -r

# 组合使用
bun run crawl -c -r
```

## 3. 新增功能

### 3.1 扩展数量统计
- 使用 minimist 或内置方式解析命令行参数
- 添加 `--count` 或 `-c` 参数
- 仅输出数字（如：`55`）

### 3.2 中文分析报告
- 添加 `--report` 或 `-r` 参数
- 输出 Markdown 格式到 `output/report.md`

### 3.3 扩展详情增强
- **更新日期**：从 GitHub 获取最新提交日期
- **GitHub 链接**：从扩展详情页提取
- **使用方式**：提取自扩展详情页和 GitHub README
- **用途**：提取自扩展详情页和 GitHub README

### 3.4 OpenCode 集成
- 使用 OpenCode API 调用（codesearch 或其他方式）来总结使用方式和用途
- 需要调用 OpenCode 进行内容总结

## 4. 数据结构扩展

```typescript
interface ExtensionDetail {
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
}
```

## 5. 实现步骤

1. [ ] 添加 CLI 参数解析模块
2. [ ] 修改主函数支持 --count 参数
3. [ ] 添加 GitHub 链接和日期获取功能
4. [ ] 添加 README 内容抓取功能
5. [ ] 添加 OpenCode 总结功能（可选/按需）
6. [ ] 生成 Markdown 报告功能
7. [ ] 测试验证

## 6. 输出格式

### 报告模板
```markdown
# OpenCode Cafe 扩展分析报告

## 概览
- 扩展总数：55
- 分类数量：1

## 扩展详情

### 1. OpenSession
- **更新日期**：2025-12-15
- **链接**：[OpenSession](https://www.opencode.cafe/plugin/opensession) | [GitHub](https://github.com/...)
- **使用方式**：...
- **用途**：...
```

## 7. 项目结构（升级后）

```
opencode-resource-fetcher/
├── package.json
├── tsconfig.json
├── src/
│   ├── crawler.ts       # 主爬虫
│   ├── cli.ts           # CLI 参数处理
│   ├── github.ts        # GitHub API
│   └── report.ts        # 报告生成
├── output/
│   ├── extensions.json # 扩展数据
│   └── report.md        # 中文报告
├── PLAN.md
└── README.md
```
