# OpenCode Cafe 插件爬虫 - 开发计划

## 1. 技术栈

- **语言**: TypeScript
- **爬虫框架**: Playwright (支持动态页面渲染)
- **运行环境**: Node.js + Bun
- **输出格式**: JSON

## 2. 功能列表

### 2.1 核心功能
- [x] 爬取所有插件/扩展信息
- [x] 按类型分类统计插件数量
- [x] 提取每个插件的详细信息（名称、描述、类型、作者等）
- [x] 支持 JSON 格式输出

### 2.2 插件类型
- MCP Servers
- Slash Commands
- Hooks
- Themes
- Plugins
- Tools

### 2.3 输出字段
- `total`: 总插件数
- `byType`: 按类型分类的数量
- `plugins`: 插件列表，包含:
  - `id`: 插件ID
  - `name`: 插件名称
  - `description`: 插件描述
  - `type`: 插件类型
  - `author`: 作者
  - `url`: 插件详情页链接

## 3. 测试验证

### 3.1 功能测试
- [ ] 运行爬虫脚本，确认能成功获取数据
- [ ] 验证输出 JSON 格式正确
- [ ] 验证各类型插件数量统计正确

### 3.2 验证命令
```bash
cd opencode-resource-fetcher
bun run crawl
cat output/extensions.json
```

## 4. 项目结构

```
opencode-resource-fetcher/
├── package.json          # 依赖配置
├── tsconfig.json        # TypeScript 配置
├── src/
│   └── crawler.ts       # 爬虫主程序
├── output/
│   └── extensions.json  # 输出结果
└── README.md            # 使用说明
```
