# OpenCode Cafe 扩展分析报告

## 概览
- **扩展总数**: 55
- **分类数量**: 3

### 分类统计
| 类型 | 数量 |
|------|------|
| Tool | 1 |
| Web View | 1 |
| Plugin | 3 |

## 1. Tool (1)

### 1. OpenSession

- **更新日期**: 未知
- **链接**: [扩展详情](https://www.opencode.cafe/plugin/opensession) | [GitHub](https://github.com/R44VC0RP/opensession)
- **标签**: web, opencode, sessions
- **用途**: 

OpenSession 是一个用于在浏览器中查看 OpenCode 会话的 Web 工具。它可以启动一个本地 Web 服务器（默认端口 3456），让你通过浏览器实时观看 OpenCode 的操作过程。该工具使用简单，既可以直接通过 npx 运行，也可以全局安装使用。对于开发者而言，可以从 GitHub 克隆项目源码，通过 npm 安装依赖后运行开发模式。项目欢迎贡献者提交 Pull Request 来完善功能。

---

## 2. Web View (1)

### 1. OpenPortal

- **更新日期**: 未知
- **链接**: [扩展详情](https://www.opencode.cafe/plugin/openportal) | [GitHub](https://github.com/hosenur/portal)
- **标签**: web, ui
- **用途**: 

OpenCode Portal是一个基于Web的UI工具，用于远程访问OpenCode AI编程助手。它提供了浏览器界面来管理会话、实时聊天和与AI交互，支持文件提及、模型选择和主题切换。该项目旨在解决官方UI不是移动端响应的问题，让用户可以通过手机或平板远程访问OpenCode。通常需要部署在VPS上并配合Tailscale等VPN使用。

---

## 3. Plugin (3)

### 1. Opencode PTY

- **更新日期**: 未知
- **链接**: [扩展详情](https://www.opencode.cafe/plugin/opencode-pty) | [GitHub](https://github.com/shekohex/opencode-pty)
- **标签**: pty, background, process
- **用途**: 

这是一个 OpenCode 插件，提供交互式 PTY（伪终端）管理功能。它让 AI 代理能够运行后台进程、发送交互式输入、随时读取输出，解决了 OpenCode 内置 bash 工具只能同步等待命令完成的限制。该插件支持：后台执行进程、多终端会话管理、发送按键和 Ctrl+C 等交互输入、带分页的输出缓冲区、正则表达式过滤、进程退出通知、React Web UI 界面以及 WebSocket 实时流式输出。典型用途包括运行开发服务器（npm run dev）、监视模式（npm test --watch）、长时间运行的进程（数据库服务器）和交互式程序（REPL）。提供 pty_spawn、pty_write、pty_read、pty_list、pty_kill 等工具命令，支持通过 /pty-open-background-spy 斜杠命令打开 Web 监控界面。

---
### 2. Opencode Antigravity Auth

- **更新日期**: 未知
- **链接**: [扩展详情](https://www.opencode.cafe/plugin/opencode-antigravity-auth) | [GitHub](https://github.com/NoeFabris/opencode-antigravity-auth)
- **标签**: opencode, plugin, auth, oauth, google, antigravity, gemini, claude, opus, sonnet
- **用途**: 

这是一个让 OpenCode 能够通过 Google 账号 OAuth 认证来使用 Antigravity（Google IDE）的插件。用户可以使用自己的 Google 凭证访问 Claude Opus 4.6、Sonnet 4.6 以及 Gemini 3 Pro/Flash 等模型。该插件支持多 Google 账号添加和自动轮换，当某个账号达到速率限制时会切换到其他账号。它还提供双重配额系统，可同时访问 Antigravity 和 Gemini CLI 的配额。对于 Claude 和 Gemini 3，支持扩展思维功能并可配置思维预算。插件支持 Google Search 接地功能，可为 Gemini 模型启用网页搜索，并具备自动恢复机制来处理会话错误和工具失败。该插件可与其他 OpenCode 插件配合使用。需要注意的是，使用此插件可能违反 Google 服务条款，存在账号被封禁或限制的风险，尤其是新账号和高价订阅账号。

---
### 3. OpenCode Helicone Session

- **更新日期**: 未知
- **链接**: [扩展详情](https://www.opencode.cafe/plugin/opencode-helicone-session) | [GitHub](https://github.com/H2Shami/opencode-helicone-session)
- **标签**: s dashboard, helicone, analytics, observability, session-tracking
- **用途**: 

这是一个OpenCode插件，用于自动将Helicone会话头注入到LLM请求中。它会在每次LLM请求时自动添加两个Header：`Helicone-Session-Id`（基于OpenCode会话ID生成的UUID）和`Helicone-Session-Name`（会话标题）。这样，所有来自同一OpenCode会话的请求都会在Helicone仪表板中被分组显示，方便追踪和分析。该插件通过监听OpenCode的会话事件（session.created、session.updated）来实现功能，使用自定义fetch包装器注入请求头。用户只需在opencode.json配置文件中添加插件即可使用。

---
