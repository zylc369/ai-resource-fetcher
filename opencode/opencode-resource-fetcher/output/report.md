# OpenCode Cafe 扩展分析报告

## 概览
- **扩展总数**: 55
- **分类数量**: 3

### 分类统计
- **Tool**: 1 个
- **Web View**: 1 个
- **Plugin**: 1 个

## Tool

### OpenSession

- **更新日期**: 2025/12/16
- **链接**: [扩展详情](https://www.opencode.cafe/plugin/opensession) | [GitHub](https://github.com/R44VC0RP/opensession)
- **标签**: web, opencode, sessions
- **用途**: 

OpenSession是一个Web查看器，专门用于查看OpenCode的会话记录。用户可以通过`npx opensession`命令直接运行，或全局安装后使用，它会在本地启动一个Web服务（默认端口3456），通过浏览器查看OpenCode的工作会话内容。该项目支持本地开发，开发者可以fork仓库后进行功能改进并提交Pull Request。

---

## Web View

### OpenPortal

- **更新日期**: 2026/2/2
- **链接**: [扩展详情](https://www.opencode.cafe/plugin/openportal) | [GitHub](https://github.com/hosenur/portal)
- **标签**: web, ui
- **用途**: 

这是一个为 OpenCode（AI 编程助手）打造的网页版图形界面。它让用户可以通过浏览器与 OpenCode 进行交互，支持会话管理、实时聊天、@文件引用、模型切换以及明暗主题切换。该项目的诞生是因为 OpenCode 官方 Web UI 尚在开发中，且移动端体验不佳。作者希望提供响应式的移动优先界面，方便在没有电脑时通过手机远程访问。使用时需要先安装 OpenCode，然后通过 `bunx openportal` 启动，Portal 会同时运行 OpenCode 服务器（默认端口 4000）和网页端（默认端口 3000），也可部署到 VPS 上配合 Tailscale 实现安全的外网访问。技术栈采用 React Router、IntentUI、Tailwind CSS 和 Nitro。

---

## Plugin

### Opencode PTY

- **更新日期**: 2026/2/17
- **链接**: [扩展详情](https://www.opencode.cafe/plugin/opencode-pty) | [GitHub](https://github.com/shekohex/opencode-pty)
- **标签**: pty, background, process
- **用途**: 

这是一个OpenCode的插件，提供交互式PTY（伪终端）管理功能。它让AI代理能够运行后台进程、发送交互式输入并随时读取输出，解决了OpenCode内置bash工具只能同步等待命令完成的限制。

该插件主要用于：运行开发服务器（npm run dev、cargo watch）、监听模式（npm test -- --watch）、长时运行进程（数据库服务器、隧道）以及交互式程序（REPL、提示符）等场景。

核心功能包括：后台执行、多会话管理、交互式输入（支持Ctrl+C、方向键等）、输出缓冲区分页读取、正则表达式过滤、退出通知、Web UI界面以及基于WebSocket的实时流式输出。

插件提供5个工具：pty_spawn创建会话、pty_write发送输入、pty_read读取输出、pty_list列出会话、pty_kill终止会话。用户可通过配置文件添加插件，或使用本地路径加载开发版本。

---
