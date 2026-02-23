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

- **更新日期**: 未知
- **链接**: [扩展详情](https://www.opencode.cafe/plugin/opensession) | [GitHub](https://github.com/R44VC0RP/opensession)
- **标签**: web, opencode, sessions
- **用途**: 

OpenSession 是一个用于查看 OpenCode 会话的 Web 浏览器工具。安装后会在本地启动一个 Web 服务器（默认 http://localhost:3456），用户可以通过浏览器实时查看 OpenCode 的会话记录。该工具支持直接使用 npx 运行或全局安装使用，适合开发者在本地查看和调试 OpenCode 会话数据。

---

## Web View

### OpenPortal

- **更新日期**: 未知
- **链接**: [扩展详情](https://www.opencode.cafe/plugin/openportal) | [GitHub](https://github.com/hosenur/portal)
- **标签**: web, ui
- **用途**: 

OpenCode Portal 是一个为 OpenCode（AI 编程助手）打造的网页版用户界面。它可以连接本地运行的 OpenCode 服务器，提供会话管理、实时聊天、文件引用、模型选择和深色/浅色主题切换等功能。由于 OpenCode 官方 Web UI 目前仍在开发中，且不支持移动端访问，该项目应运而生，专注于移动端优先的响应式设计。用户可以将 Portal 部署在 VPS 上，配合 Tailscale 等 VPN 从手机或远程设备安全访问 OpenCode 实例。技术栈包括 React Router、IntentUI、Tailwind CSS、Nitro 服务器和 OpenCode SDK。

---

## Plugin

### Opencode PTY

- **更新日期**: 未知
- **链接**: [扩展详情](https://www.opencode.cafe/plugin/opencode-pty) | [GitHub](https://github.com/shekohex/opencode-pty)
- **标签**: pty, background, process
- **用途**: 

这是一个OpenCode的扩展插件，提供交互式伪终端（PTY）管理功能。OpenCode内置的bash工具只能同步运行命令，等待命令完成后才能继续，这个插件解决了无法运行后台进程的痛点。

该插件支持：后台执行长期运行的任务（如开发服务器npm run dev、数据库服务）、多终端会话管理、实时交互输入（可发送Ctrl+C、方向键等）、输出缓冲与分页读取、支持正则表达式过滤日志、进程退出时自动通知、AI代理可随时读取和写入终端内容。此外还提供Web界面，通过slash命令可打开浏览器查看所有终端会话的实时输出，支持WebSocket流式更新。

主要工具包括：pty_spawn（创建终端会话）、pty_write（发送输入）、pty_read（读取输出）、pty_list（列出所有会话）、pty_kill（终止会话）。适用于需要长时间运行的服务、监视模式、交互式REPL等场景，让AI代理能更灵活地管理开发环境。

---
