# OpenCode Cafe 资源爬虫

用于抓取 opencode.cafe 插件市场的扩展/插件信息。

## 功能

- 自动爬取所有插件/扩展信息
- 按类型统计插件数量（MCP Servers、Slash Commands、Hooks、Themes、Plugins、Tools）
- 输出 JSON 格式结果
- 支持命令行参数

## 技术栈

- TypeScript
- Playwright（浏览器自动化）
- Bun（运行时）

## 安装

```bash
# 安装依赖
bun install

# 安装 Playwright 浏览器
bunx playwright install chromium
```

## 使用

```bash
# 查看帮助
bun run crawl --help

# 返回扩展数量（仅输出数字）
bun run crawl --count
# 或
bun run crawl -c

# 生成中文分析报告（Markdown格式）
bun run crawl --report
# 或
bun run crawl -r

# 组合使用
bun run crawl -c -r

# 默认：显示简要信息
bun run crawl
```

## 输出

### JSON 数据 (output/extensions.json)

```json
{
  "total": 55,
  "byType": {
    "MCP Servers": 10,
    "Slash Commands": 15,
    "Hooks": 5,
    "Themes": 8,
    "Plugins": 12,
    "Tools": 5
  },
  "plugins": [
    {
      "id": "xxx",
      "name": "Plugin Name",
      "description": "Plugin description",
      "type": "Plugins",
      "author": "Author Name",
      "url": "https://www.opencode.cafe/plugin/xxx",
      "githubUrl": "https://github.com/xxx",
      "lastUpdated": "2025-01-15",
      "usage": "使用方式...",
      "purpose": "用途..."
    }
  ]
}
```

### 中文报告 (output/report.md)

```markdown
# OpenCode Cafe 扩展分析报告

## 概览
- **扩展总数**: 55
- **分类数量**: 1

### 分类统计
- **Plugins**: 55

## 扩展详情

### 1. OpenSession
- **更新日期**: 2025-12-15
- **链接**: [扩展详情](https://www.opencode.cafe/plugin/opensession) | [GitHub](https://github.com/...)
- **使用方式**: ...
- **用途**: ...
```

## 项目结构

```
opencode-resource-fetcher/
├── package.json          # 依赖配置
├── tsconfig.json         # TypeScript 配置
├── src/
│   └── crawler.ts        # 爬虫主程序
├── output/
│   ├── extensions.json   # 扩展数据
│   └── report.md        # 中文报告
├── PLAN.md              # 开发计划
├── PLAN_UPGRADE.md      # 升级计划
└── README.md            # 使用说明
```
