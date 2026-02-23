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

OpenSession是一个用于查看OpenCode会话的Web查看器。用户可以通过运行`npx opensession`命令启动本地Web服务器（默认端口3456），在浏览器中查看OpenCode会话记录。该工具适合开发者查看和分析OpenCode的会话历史，支持通过npm全局安装或本地开发模式使用。

---

## Web View

### OpenPortal

- **更新日期**: 未知
- **链接**: [扩展详情](https://www.opencode.cafe/plugin/openportal) | [GitHub](https://github.com/hosenur/portal)
- **标签**: web, ui
- **用途**: 

这是一个为OpenCode（AI编程助手）打造的Web端界面工具。由于OpenCode官方UI暂不支持移动端响应式访问，作者开发了这款移动优先的Portal来满足在手机上远程使用OpenCode的需求。

该工具可启动OpenCode服务并提供网页端UI，支持会话管理、实时聊天、@提及文件、选择AI模型以及深色/浅色主题切换。典型使用场景是将Portal部署在VPS上，再通过Tailscale等VPN从手机或其他设备安全连接访问。

安装方式简单，使用`bunx openportal`即可直接运行，或全局安装后使用`openportal`命令启动。

---

## Plugin

### Opencode PTY

- **更新日期**: 未知
- **链接**: [扩展详情](https://www.opencode.cafe/plugin/opencode-pty) | [GitHub](https://github.com/shekohex/opencode-pty)
- **标签**: pty, background, process
- **用途**: 

这是一个为OpenCode AI编程助手开发的终端管理插件。它解决了OpenCode内置bash工具只能同步等待命令完成的局限，让AI agent能够运行和管理后台进程。

该插件提供以下核心功能：支持后台执行独立进程、同时管理多个终端会话、可发送交互式输入（如Ctrl+C、方向键）、带分页的输出读取、以及正则表达式过滤。其亮点包括进程退出时自动通知（无需轮询）、遵守OpenCode的权限设置、以及可选的React Web界面用于实时监控。

通过提供的工具（pty_spawn、pty_write、pty_read、pty_list、pty_kill），AI可以启动开发服务器、运行监视模式测试、操作REPL、查看日志，并控制长时间运行的进程。这使得AI能够更好地管理需要持续运行的开发环境、构建任务和测试流程。

---
