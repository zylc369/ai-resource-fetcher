# OpenCode Cafe 扩展分析报告

## 概览
- **扩展总数**: 55
- **分类数量**: 5

### 分类统计
| 类型 | 数量 |
|------|------|
| Tool | 7 |
| Web View | 4 |
| Plugin | 41 |
| Slash Command | 1 |
| MCP Server | 2 |

## 1. Tool (7)

### 1. OpenSession

- **更新日期**: 未知
- **链接**: [扩展详情](https://www.opencode.cafe/plugin/opensession) | [GitHub](https://github.com/R44VC0RP/opensession)
- **标签**: web, opencode, sessions
- **用途**: 

OpenSession是一个用于查看OpenCode会话的Web浏览器。用户可以通过`npx opensession`命令直接运行，或全局安装后使用`opensession`启动。启动后会在本地搭建一个Web服务器（默认端口3456），用户可以在浏览器中查看OpenCode的工作会话记录和内容。这是一个开源项目，支持开发者克隆仓库后进行本地开发或贡献代码。

---
### 2. reverse-api-engineer

- **更新日期**: 未知
- **链接**: [扩展详情](https://www.opencode.cafe/plugin/reverse-api-engineer) | [GitHub](https://github.com/kalil0321/reverse-api-engineer)
- **标签**: Tool, api, autonomous-agent, web-agent, browser-automation, traffic-analysis, api-client, reverse-proxy, mitm
- **用途**: 

这是一个CLI工具，用于捕获浏览器流量并自动生成生产级的Python API客户端。用户只需在浏览器中操作网站（如浏览页面、点击按钮），工具会自动记录所有网络请求，然后利用AI分析流量并生成可复用的API代码。它支持四种模式：手动模式（人工浏览+AI生成）、工程师模式（重新处理已有捕获）、代理模式（AI自动浏览交互）、收集器模式（AI自动收集网页数据并导出JSON/CSV）。生成的代码包含错误处理、类型提示和文档说明。此外还提供Claude Code和OpenCode插件、Chrome扩展集成，支持多种AI模型和输出语言（Python/JavaScript/TypeScript）。

---
### 3. OpenCode-Obsidian

- **更新日期**: 未知
- **链接**: [扩展详情](https://www.opencode.cafe/plugin/opencode-obsidian) | [GitHub](https://github.com/mtymek/opencode-obsidian)
- **标签**: s tab, ai, productivity, obsidian, assistant
- **用途**: 

这是一个为Obsidian笔记软件打造的OpenCode AI助手插件。它可以将OpenCode直接嵌入到Obsidian界面中，让用户在笔记应用内直接使用AI功能。主要用途包括：总结提炼长文内容、起草修改文章、查询探索个人知识库、生成大纲和结构化笔记。插件使用OpenCode的网页视图实现嵌入，无需额外开发自定义聊天UI即可使用完整功能。安装需要桌面端、OpenCode CLI和Bun运行时，可通过BRAT插件或Git克隆安装。使用时点击 ribbon 上的终端图标或按 Cmd/Ctrl+Shift+O 即可呼出面板，还支持自定义命令模式和上下文注入等进阶功能。

---
### 4. OCX

- **更新日期**: 未知
- **链接**: [扩展详情](https://www.opencode.cafe/plugin/ocx) | [GitHub](https://github.com/kdcokenny/ocx)
- **标签**: package-manager, cli, registry, extensions, ghost-mode
- **用途**: 

OCX 是一个 OpenCode 配置管理工具，支持跨仓库使用个性化配置。它提供三大核心功能：1）Profiles（配置文件）— 可在任意仓库使用自己的配置，通过 include/exclude 模式控制 OpenCode 读取范围；2）Registries（组件注册表）— 从 npm 或 curated registries 安装插件、MCP 服务器和组件；3）Components（组件）— 支持将组件添加到本地项目，自动处理依赖解析。OCX 遵循 ShadCN 模式，组件会被复制到本地 `.opencode/` 目录而非 node_modules，用户完全拥有代码。它还提供 SHA-256 验证和版本锁定确保安全性，支持通过 `ocx diff` 查看更新内容。

---
### 5. OpenCode Tokenscope

- **更新日期**: 未知
- **链接**: [扩展详情](https://www.opencode.cafe/plugin/opencode-tokenscope) | [GitHub](https://github.com/ramtinJ95/opencode-tokenscope)
- **标签**: opencode, token, analyser, plugin
- **用途**: 

TokenScope 是一个 OpenCode AI 会话的 Token 使用分析和成本追踪插件。它可以全面分析当前会话的 Token 消耗，按系统提示、用户消息、助手回复、工具输出和推理过程五个类别进行细分统计，支持 41 种以上模型（包括 Claude、GPT、DeepSeek、Llama 等）的准确定价计算。该插件还提供缓存效率指标，显示缓存命中率和成本节省金额，并能递归分析 Task 工具创建的子代理会话成本。通过 ASCII 图表直观展示各组件的 Token 占比，帮助开发者了解和优化 AI 开发工作流中的 Token 消耗。所有数据处理均在本地完成，不会上传任何数据到外部服务。

---
### 6. Open Agent

- **更新日期**: 未知
- **链接**: [扩展详情](https://www.opencode.cafe/plugin/open-agent) | [GitHub](https://github.com/Th0rgal/openagent)
- **标签**: self-hosted, control-plane, workspaces, linux, dashboard
- **用途**: 

该文件返回404错误，找不到该仓库或文件。可能该仓库已被删除、私有化或路径有误。Th0rgal 的其他公开仓库包括 sandboxed.sh（AI代理编排工具）和 open-ralph-wiggum（OpenCode循环工具），但不存在 openagent 仓库。

---
### 7. Cloudflare Skill for OpenCode

- **更新日期**: 未知
- **链接**: [扩展详情](https://www.opencode.cafe/plugin/cloudflare-skill-for-opencode) | [GitHub](https://github.com/dmmulroy/cloudflare-skill)
- **标签**: cloudflare, skills
- **用途**: 

这是一个OpenCode扩展，为AI/LLM提供Cloudflare平台的全面参考文档。它包含Workers、Pages、存储服务（KV、D1、R2）、AI服务（Workers AI、Vectorize、Agents SDK）、网络、安全及基础设施即代码等方面的指南。安装后可通过`/cloudflare`命令加载技能，获得关于如何设置D1数据库、配置Workers等任务的上下文指导。决策树帮助选择合适的产品：运行代码可选Workers/Pages/Durable Objects/Workflows/Containers，存储可选KV/D1/R2/Queues/Vectorize，AI/ML可选Workers AI/Vectorize/Agents SDK等。还覆盖Tunnel、Spectrum、WAF、DDoS防护、Turnstile、Images、Stream、Terraform、Pulumi等40多种产品。

---

## 2. Web View (4)

### 1. OpenPortal

- **更新日期**: 未知
- **链接**: [扩展详情](https://www.opencode.cafe/plugin/openportal) | [GitHub](https://github.com/hosenur/portal)
- **标签**: web, ui
- **用途**: 

这是一个名为 OpenCode Portal 的开源项目，为 OpenCode AI 编程助手提供网页版用户界面。它解决了官方 UI 移动端体验不佳的问题，让你可以通过手机或远程设备访问 OpenCode。该工具可同时启动 OpenCode 服务器和网页 UI，支持会话管理、实时对话、@提及文件、切换模型以及深色/浅色主题。典型使用场景是在 VPS 上部署，配合 Tailscale 等 VPN 实现安全的移动远程访问。

---
### 2. OpenChamber

- **更新日期**: 未知
- **链接**: [扩展详情](https://www.opencode.cafe/plugin/openchamber) | [GitHub](https://github.com/btriapitsyn/openchamber)
- **标签**: ai, github, vscode, app, web, UI, opencode web
- **用途**: 

OpenChamber是OpenCode AI编程助手的图形化界面/桌面客户端，可与OpenCode终端界面配合使用。它提供了跨设备连续性、远程访问、VS Code扩展和macOS桌面应用等多种使用方式。主要功能包括：分支式聊天时间线（支持撤销/重做）、智能工具UI（ diff视图、文件操作、权限管理）、语音模式、多代理并行运行、Git工作流集成（提交、PR创建、合并）、Plan/Build模式、集成终端、内置技能目录等。该项目完全使用OpenCode AI工具构建，是一个粉丝制作的替代方案。

---
### 3. Opencode Gateway

- **更新日期**: 未知
- **链接**: [扩展详情](https://www.opencode.cafe/plugin/opencode-gateway) | [GitHub](https://github.com/MILCGroup/opencode-gateway)
- **标签**: google, OAuth, proxy
- **用途**: 

这是一个轻量级、安全的反向代理工具，专为OpenCode设计。它通过Google OAuth 2.0认证机制保护OpenCode服务器，用户必须先完成Google账号登录才能访问服务。

主要功能包括：基于PKCE流程的安全OAuth认证、HMAC签名会话Cookie管理、反向代理转发请求、支持WebSocket和SSE实时日志流、内置健康检查端点、日志查看器和调试工具。配置简单，只需设置OAuth凭证和目标服务器地址即可使用。

---
### 4. OpenWork

- **更新日期**: 未知
- **链接**: [扩展详情](https://www.opencode.cafe/plugin/openwork) | [GitHub](https://github.com/different-ai/openwork)
- **标签**: ui, desktop, tauri, opencode, gui
- **用途**: 

OpenWork是一个基于OpenCode构建的开源桌面应用，旨在为团队提供AI编程助手的图形化界面。它是Claude Cowork的开源替代方案，采用本地优先设计，既可在本地运行也可连接远程服务器。

该应用核心功能包括：Host模式在本地运行OpenCode，Client模式连接远程服务器；支持创建和管理会话并发送提示；通过SSE实时流式传输获取更新；将待办事项渲染为可视化时间线；管理权限请求（允许一次/始终允许/拒绝）；保存和复用常用工作流模板；以及技能管理器，可从OpenPackage安装或导入本地技能文件夹。

OpenWork还提供多种接入方式：桌面应用、WhatsApp/Slack/Telegram机器人连接器（OpenCode Router）、以及CLI主机（OpenWork Orchestrator）。用户可从个人使用开始，随后通过一条命令快速分享实例供团队协作。

---

## 3. Plugin (41)

### 1. Opencode PTY

- **更新日期**: 未知
- **链接**: [扩展详情](https://www.opencode.cafe/plugin/opencode-pty) | [GitHub](https://github.com/shekohex/opencode-pty)
- **标签**: pty, background, process
- **用途**: 

这是一个OpenCode插件，提供交互式PTY（伪终端）管理功能。它让AI代理能够运行后台进程、发送交互输入并按需读取输出，解决OpenCode内置bash工具只能同步等待命令完成的问题。该插件支持：后台执行独立进程；同时管理多个终端会话；发送按键、Ctrl+C、方向键等交互输入；带分页的输出缓冲区读取；正则表达式模式过滤；进程结束通知；Web UI界面实时监控；以及基于WebSocket的实时输出流。典型用途包括运行开发服务器（npm run dev）、监视模式（npm test -- --watch）、长期运行的进程（数据库服务器、隧道）以及交互式程序（REPL）。用户可通过配置将其添加到OpenCode配置文件中使用。

---
### 2. Opencode Antigravity Auth

- **更新日期**: 未知
- **链接**: [扩展详情](https://www.opencode.cafe/plugin/opencode-antigravity-auth) | [GitHub](https://github.com/NoeFabris/opencode-antigravity-auth)
- **标签**: opencode, plugin, auth, oauth, google, antigravity, gemini, claude, opus, sonnet
- **用途**: 

这是一个OpenCode插件，通过OAuth认证让OpenCode能够访问Google的Antigravity IDE。它允许用户使用Google账号调用多种AI模型，包括Claude Opus 4.6、Claude Sonnet 4.6以及Gemini 3 Pro/Flash等。该插件支持多账户功能，可添加多个Google账号并在遇到速率限制时自动切换。它还提供双重配额系统，让用户同时访问Antigravity和Gemini CLI的API配额，并支持思维模型（Thinking Models）功能，可配置思考预算。此外，插件支持Google搜索基础功能，具备自动恢复机制，可自动处理会话错误和工具失败，并与其他OpenCode插件兼容。需要注意的是，使用此插件可能违反Google服务条款，新账号和高价订阅账号有较高被封禁风险。

---
### 3. OpenCode Helicone Session

- **更新日期**: 未知
- **链接**: [扩展详情](https://www.opencode.cafe/plugin/opencode-helicone-session) | [GitHub](https://github.com/H2Shami/opencode-helicone-session)
- **标签**: s dashboard, helicone, analytics, observability, session-tracking
- **用途**: 

这是一个OpenCode插件，用于将Helicone会话头自动注入到LLM请求中。它会在每次请求时添加两个头信息：Helicone-Session-Id（基于OpenCode会话ID生成的UUID）和Helicone-Session-Name（会话标题）。这样同一OpenCode会话的所有请求会在Helicone仪表板中自动分组显示，方便追踪和分析。该插件通过监听OpenCode会话事件并使用自定义fetch包装器来实现注入，支持用户在配置中自定义会话头名称。

---
### 4. OpenCode Skills

- **更新日期**: 未知
- **链接**: [扩展详情](https://www.opencode.cafe/plugin/opencode-skills) | [GitHub](https://github.com/malhashemi/opencode-skills)
- **标签**: skills, anthropic, agents, dynamic-tools
- **用途**: 

这是一个OpenCode插件，用于为AI编程助手添加自定义技能功能。它可以自动扫描项目目录发现技能，每个技能包含一个SKILL.md文件，定义名称、描述和使用说明。技能会被转换为工具供AI调用，如`skills_my_skill`。该插件支持嵌套技能、路径解析和权限控制，可按项目或代理级别配置技能访问权限。由于OpenCode v1.0.190已原生支持技能功能，该插件已弃用并归档。

---
### 5. OpenCode Type Inject

- **更新日期**: 未知
- **链接**: [扩展详情](https://www.opencode.cafe/plugin/opencode-type-inject) | [GitHub](https://github.com/nick-vi/opencode-type-inject)
- **标签**: Plugin, typescript, svelte, types, developer-tools
- **用途**: 

这是一个为 AI 编程助手（OpenCode、Claude Code、Cursor）设计的 TypeScript 类型上下文插件。主要功能包括：自动类型注入——当 AI 读取 TypeScript 或 Svelte 文件时，插件会自动提取函数签名、类型定义、接口、枚举、类等类型信息，并解析最多4层深的导入类型，将相关类型签名作为额外上下文注入；智能过滤——只包含代码中实际使用的类型，支持部分文件读取时仅注入该区域相关类型；类型检查——在 AI 写入文件时运行 TypeScript 类型检查并反馈错误。它还提供三个 MCP 工具：`lookup_type` 按名称查找类型定义、`list_types` 列出项目中所有类型、`type_check` 运行类型检查。类型按优先级排序，确保函数签名始终优先显示，支持 Svelte 文件，并使用 token 预算机制控制上下文大小。

---
### 6. OpenCode OpenAI Codex Auth

- **更新日期**: 未知
- **链接**: [扩展详情](https://www.opencode.cafe/plugin/opencode-openai-codex-auth) | [GitHub](https://github.com/numman-ali/opencode-openai-codex-auth)
- **标签**: s Codex backend, openai, chatgpt, oauth, authentication, codex
- **用途**: 

这是一个OpenCode插件，帮助用户通过ChatGPT Plus/Pro账号的OAuth认证方式，在OpenCode中直接使用OpenAI的GPT-5.x和Codex系列模型。

用户只需运行一行命令安装插件，然后执行`opencode auth login`完成登录，即可使用包括GPT-5.2、GPT-5.2 Codex、GPT-5.1 Codex Max等多种模型变体。该插件支持22种模型预设，涵盖不同能力级别（low/medium/high/xhigh），并支持多模态输入。

安装配置简单，一次安装即可使用所有Codex模型，适合个人开发使用。

---
### 7. OpenCode Gemini Auth

- **更新日期**: 未知
- **链接**: [扩展详情](https://www.opencode.cafe/plugin/opencode-gemini-auth) | [GitHub](https://github.com/jenslys/opencode-gemini-auth)
- **标签**: Plugin, google, gemini, oauth, authentication
- **用途**: 

这是一个OpenCode CLI的Gemini OAuth认证插件，允许用户使用自己的Google账户登录Opencode，从而直接使用Google Gemini AI模型（包括免费套餐）。插件通过OAuth流程认证，无需单独配置API密钥，还能支持配置特定的Google Cloud项目ID来使用付费配额，并可针对不同模型设置思考功能参数。

---
### 8. OpenCode Google Antigravity Auth

- **更新日期**: 未知
- **链接**: [扩展详情](https://www.opencode.cafe/plugin/opencode-google-antigravity-auth) | [GitHub](https://github.com/shekohex/opencode-google-antigravity-auth)
- **标签**: Plugin, google, antigravity, oauth, authentication, search, claude
- **用途**: 

这是一个OpenCode扩展，用于让OpenCode CLI通过Antigravity（Cloud Code）服务使用Google的Gemini模型。主要功能包括：多账户负载均衡——当遇到速率限制时自动在最多10个Google账户间轮换；端点降级——依次尝试daily、autopush、prod三个端点以提高稳定性；内置Google搜索工具，可实时获取网络信息并附带来源引用；跨模型对话——支持在Gemini和Claude之间无缝切换，并保留思考块；自动令牌刷新，无需手动干预。此外还支持Claude代理模型和交错思考功能。安装方式是在OpenCode配置中添加该插件，然后运行opencode auth login进行OAuth认证。使用时需注意Google可能会封号，且Antigravity服务条款禁止与第三方产品配合使用。

---
### 9. OpenCode Dynamic Context Pruning

- **更新日期**: 未知
- **链接**: [扩展详情](https://www.opencode.cafe/plugin/opencode-dynamic-context-pruning) | [GitHub](https://github.com/Opencode-DCP/opencode-dynamic-context-pruning)
- **标签**: Plugin, context, token-optimization, pruning, deduplication
- **用途**: 

该文件不存在，返回404错误。请检查URL是否正确，或确认该仓库/文件是否已公开。

---
### 10. OpenCode Websearch Cited

- **更新日期**: 未知
- **链接**: [扩展详情](https://www.opencode.cafe/plugin/opencode-websearch-cited) | [GitHub](https://github.com/ghoulr/opencode-websearch-cited)
- **标签**: Plugin, websearch, citations, google, openai, openrouter
- **用途**: 

这是一个OpenCode浏览器的Web搜索插件，为OpenCode AI助手提供带引用标注的网页搜索能力。当AI代理需要搜索网络时，可以调用`websearch_cited`工具执行搜索，结果会以带编号引用的形式呈现，并附带Sources来源列表，方便用户核实信息。该插件支持Google、OpenAI和OpenRouter三家提供商的网页搜索API。安装时需要在OpenCode配置文件的插件列表中最后位置添加此插件，并配置相应的模型选项。

---
### 11. OpenCode WakaTime

- **更新日期**: 未知
- **链接**: [扩展详情](https://www.opencode.cafe/plugin/opencode-wakatime) | [GitHub](https://github.com/angristan/opencode-wakatime)
- **标签**: Plugin, wakatime, analytics, time-tracking, productivity
- **用途**: 

这个插件用于将OpenCode的AI编程活动同步到WakaTime时间追踪平台。它能自动记录文件读写修改等操作，统计AI代码行数变化，并在WakaTime仪表盘展示AI编程时长和代码产出数据。安装方式是在opencode.json中添加插件配置，需要预先在WakaTime官网获取API密钥。插件会自动下载wakatime-cli工具，并对心跳请求进行速率限制以避免API滥用。

---
### 12. OpenCode Markdown Table Formatter

- **更新日期**: 未知
- **链接**: [扩展详情](https://www.opencode.cafe/plugin/opencode-md-table-formatter) | [GitHub](https://github.com/franlol/opencode-md-table-formatter)
- **标签**: Plugin, markdown, tables, formatting, llm-output
- **用途**: 

这是一个OpenCode的Markdown表格格式化插件。它能在AI生成文本后自动整理Markdown表格的列对齐，确保表格在OpenCode的隐藏模式（默认开启）下正确显示。该插件支持左、中、右三种对齐方式，采用多轮正则算法处理嵌套的粗体、斜体等Markdown语法，同时能正确保留反引号内的代码符号用于计算列宽。它还能处理emoji、unicode字符、空单元格和长内容等边界情况，运行过程中不会输出日志，表格格式错误时会自动添加注释提示。

---
### 13. Oh My OpenCode

- **更新日期**: 未知
- **链接**: [扩展详情](https://www.opencode.cafe/plugin/oh-my-opencode) | [GitHub](https://github.com/code-yeongyu/oh-my-opencode)
- **标签**: agents, lsp, ast, mcp, claude-code, orchestration
- **用途**: 

Oh My OpenCode是一个多模型Agent编排框架，用于将OpenCode变成一个协调的AI开发团队。它不依赖单一模型，而是同时调用Claude、Kimi、GPT、Gemini等多个模型，根据任务类型自动选择最合适的Agent执行。

核心功能是`ultrawork`命令——只需输入这个词，Agent会自动探索代码库、研究模式、实现功能并验证，直到任务完成。项目包含多个专业Agent：Sisyphus作为主编排器协调全局，Hephaestus负责深度自主执行，Prometheus进行战略规划。还有Librarian处理文档搜索、Oracle处理架构调试、Explore快速扫描代码。

该工具还解决了Agent编辑文件的痛点，通过Hash-Anchored Edit（哈希锚定编辑）确保每次修改的准确性，将编辑成功率从6.7%提升到68.3%。此外集成了LSP重命名、AST-Grep代码搜索、Tmux终端交互、内置MCP服务（Exa网页搜索、Context7文档查询）等功能，并与Claude Code的hooks、skills、MCP完全兼容。

---
### 14. OpenCode + LMStudio

- **更新日期**: 未知
- **链接**: [扩展详情](https://www.opencode.cafe/plugin/lmstudio) | [GitHub](https://github.com/agustif/opencode-lmstudio)
- **标签**: lmstudio, providers, ai
- **用途**: 

这是一个OpenCode插件，用于增强本地LM Studio的集成支持。它能自动检测本地运行的LM Studio（常见端口1234、8080、11434），动态发现可用的AI模型，并智能格式化模型名称以提升可读性。插件会自动创建lmstudio provider配置，将发现的模型合并到现有配置中，还提供健康检查监控和智能错误处理。在OpenCode启动时，插件通过config hook自动检测LM Studio是否运行，查询可用模型并整合到配置中，无需手动配置即可使用本地模型。

---
### 15. Opencode Cursor Agent Auth

- **更新日期**: 未知
- **链接**: [扩展详情](https://www.opencode.cafe/plugin/opencode-cursor-auth) | [GitHub](https://github.com/POSO-PocketSolutions/opencode-cursor-auth)
- **标签**: cursor, agent, oauth, authentication
- **用途**: 

这是一个OpenCode插件，用于在OpenCode命令行工具中集成Cursor的AI模型。它面向已订阅Cursor Pro的用户，让他们可以绕过Cursor桌面UI，直接通过OpenCode使用Cursor的AI能力（如GPT-5、Sonnet 4.5等模型）。

使用该插件需要先安装cursor-agent和Bun运行时，然后在OpenCode配置文件中添加插件和Provider设置。登录后，用户可以通过`opencode run`命令配合`--model cursor/模型名`的参数来调用Cursor的AI模型进行代码生成、分析等任务。

需要注意的是，工具调用功能目前仍处于实验阶段，仅支持OpenCode内置工具如读取、搜索、执行命令等，部分功能如Token使用统计和独立思考面板暂不可用。

---
### 16. Speckit Chain

- **更新日期**: 未知
- **链接**: [扩展详情](https://www.opencode.cafe/plugin/speckit-chain) | [GitHub](https://github.com/aeitroc/speckit-chain)
- **标签**: plan, speckit
- **用途**: 

这是一个OpenCode插件，用于自动化执行Speckit命令链。当用户运行/code命令时，插件会自动依次执行指定、澄清、计划、任务、执行和审查这6个步骤的命令，无需手动逐个输入。在澄清步骤中，插件还能自动识别提示中的“推荐”或“建议”回复选项并自动选择对应答案。每个会话有独立的状态管理，会话结束时自动清理。该插件通过监听命令执行事件来触发自动执行流程，适合需要完整Speckit工作流的开发者使用。安装需将插件文件放入plugin目录并在opencode.json中注册后重启即可。

---
### 17. UNMOJI

- **更新日期**: 未知
- **链接**: [扩展详情](https://www.opencode.cafe/plugin/opencode-unmoji) | 无
- **标签**: emoji, agent-output, formatting, plugin
- **用途**: 

暂无

---
### 18. System Monitor Server MCP JS edition  protocol and HTTP REST API support

- **更新日期**: 未知
- **链接**: [扩展详情](https://www.opencode.cafe/plugin/mcp-system-monitor-js) | [GitHub](https://github.com/DarkPhilosophy/mcp-system-monitor-js)
- **标签**: linux, ai, mcp, opencode, system-commands, system-metrics, agentic-ai, mcp-server
- **用途**: 

这是一个MCP（模型上下文协议）服务器，专门为AI代理提供Linux系统监控能力。它可以获取CPU、内存、磁盘、网络和进程等全面系统指标，支持通过标准Stdio或HTTP/SSE两种方式与AI助手集成。

该扩展可监控主机名、操作系统、内核版本、运行时间等基础信息；CPU使用率、频率、核心数、温度；内存和交换空间实时状态；磁盘存储使用情况及挂载点；网络接口流量和错误统计；以及活动进程列表，并支持按CPU/内存使用率排序和名称过滤。

此外还具备历史数据持久化、实时阈值告警、API密钥安全认证等功能。通过OpenCode配置后，AI可直接查询Linux系统各项健康指标。

---
### 19. Open Queue

- **更新日期**: 未知
- **链接**: [扩展详情](https://www.opencode.cafe/plugin/open-queue) | [GitHub](https://github.com/0xSero/open-queue)
- **标签**: Productivity
- **用途**: 

Open Queue 是一个 OpenCode 扩展，用于在模型思考时对消息进行排队。当用户发送消息而 OpenCode 正在运行时，如果不使用此插件，消息会打断当前运行导致上下文混乱；使用此插件后，消息会进入队列，等待模型完成当前任务后自动按顺序发送。用户可通过 `/queue hold` 开启排队模式，`/queue immediate` 恢复即时发送模式，`/queue status` 查看当前状态，也可直接告诉模型"开启消息排队"。该插件还支持通过 `OPENCODE_MESSAGE_QUEUE_MODE=hold` 环境变量启动时默认进入排队模式。

---
### 20. micode

- **更新日期**: 未知
- **链接**: [扩展详情](https://www.opencode.cafe/plugin/micode) | [GitHub](https://github.com/vtemian/micode)
- **标签**: workflow, productivity, session continuity
- **用途**: 

micode 是一个 OpenCode 插件，旨在提供结构化的开发工作流程。它将开发过程分为三个阶段：头脑风暴（Brainstorm）→ 计划（Plan）→ 实现（Implement）。在头脑风暴阶段，通过协作提问将想法细化为设计，并行启动研究子代理进行探索。在计划阶段，将设计转化为具体的实施计划，每个任务控制在2-5分钟内，包含精确的文件路径和TDD工作流程。在实现阶段，使用 git worktree 进行隔离执行，通过实现者→审查者的循环来保证代码质量。

该插件还提供会话连续性功能，通过结构化压缩维护跨会话的上下文，开发者可以使用 /ledger 命令创建或更新连续性账本，确保不会丢失之前的思考和进度。micode 内置了多种专业代理，包括指挥官、头脑风暴者、规划者、执行者、实施者、审查者等，各司其职协同工作。

主要命令包括：/init 用于初始化项目文档，/ledger 用于管理会话连续性，/search 用于搜索过去的计划和账本。该插件还提供 AST 代码搜索、文件结构提取、后台终端会话管理等工具，支持思考模式、自动压缩、上下文注入等高级功能，帮助开发者更高效地进行项目开发。

---
### 21. OpenCode Supermemory

- **更新日期**: 未知
- **链接**: [扩展详情](https://www.opencode.cafe/plugin/supermemory) | [GitHub](https://github.com/supermemoryai/opencode-supermemory)
- **标签**: memory, ai, learning
- **用途**: 

这是一个 OpenCode 插件，为 AI 助手提供持久记忆功能。它能记住用户告诉它的事情，跨越不同会话和项目。主要功能包括：上下文注入（自动向 AI 提供用户偏好和项目知识）、关键词检测（当用户说"记住"等词时自动保存记忆）、代码库索引（扫描并记住项目结构和代码规范）、提前压缩（在上下文满时自动保存会话摘要）。记忆分为用户级（跨项目共享）和项目级（仅当前项目）两种范围。配置简单，需要从 Supermemory 获取 API 密钥即可使用。

---
### 22. OpenCode Smart Voice Notify

- **更新日期**: 未知
- **链接**: [扩展详情](https://www.opencode.cafe/plugin/opencode-smart-voice-notify) | [GitHub](https://github.com/MasuRii/opencode-smart-voice-notify)
- **标签**: opencode, plugin, notification, tts, voice, alert, smart
- **用途**: 

这是一个 OpenCode 的智能语音通知插件，支持多种 TTS 语音引擎（ElevenLabs、Edge TTS、Windows SAPI、OpenAI 兼容接口等），具有智能引擎选择和回退机制。它能在代码执行过程中通过语音播报任务状态、提醒用户处理事项，并支持原生桌面通知。该插件还提供无障碍功能，适合希望在工作时有语音反馈的用户。

---
### 23. JJ OpenCode

- **更新日期**: 未知
- **链接**: [扩展详情](https://www.opencode.cafe/plugin/jj-opencode) | [GitHub](https://github.com/dpshade/jj-opencode)
- **标签**: jj, jujutsu, vcs, workflow, version-control
- **用途**: 

这是一个OpenCode插件，用于在AI编程时强制声明意图。它与Jujutsu（jj）版本控制系统配合工作：用户通过`jj describe -m "说明意图"`声明当前任务后，AI才能进行文件编辑；会话空闲时自动执行`jj new`创建新提交并锁定编辑权限，从而确保每次编辑都有清晰的意图声明和独立提交，避免不同任务混合。支持`jj undo`撤销、`jj st`查看状态、`jj log`查看历史以及`jj_push`安全推送到远程仓库。其核心价值在于保证提交历史的清晰和完整性，每次编辑都被自动保存，不会因意外而丢失工作。

---
### 24. Plannotator

- **更新日期**: 未知
- **链接**: [扩展详情](https://www.opencode.cafe/plugin/plannotator) | [GitHub](https://github.com/backnotprop/plannotator)
- **标签**: planning, plan mode
- **用途**: 

Plannotator是一个AI编程代理的交互式计划审查工具，可与OpenCode、Claude Code和Pi集成使用。它允许用户在浏览器中可视化地注释和审核AI代理生成的计划，包括删除、插入、替换和评论等操作。用户可以批准计划让代理继续实施，或请求修改将反馈发送给代理。该工具还提供计划差异对比功能，自动显示代理修改计划后的变化，以及代码审查功能（通过/plannotator-review命令进行行级注释）和文件注释功能（通过/plannotator-annotate命令注释markdown文件并发送反馈给代理），便于团队协作。

---
### 25. OpenCode Froggy

- **更新日期**: 未知
- **链接**: [扩展详情](https://www.opencode.cafe/plugin/opencode-froggy) | [GitHub](https://github.com/smartfrog/opencode-froggy)
- **标签**: hooks, code-review, code-simplification, agentic-ai, productivity, agents, claude
- **用途**: 

这是一个OpenCode插件，名为opencode-froggy，主要提供以下功能来增强AI编程助手的 capabilities：

**专业代理(Agents)**：内置6个 specialized 子代理，包括架构师(architect)提供技术架构指导、文档写手(doc-writer)生成文档、代码审查员(code-reviewer)审查代码质量、代码简化器(code-simplifier)简化代码、橡皮鸭(rubber-duck)帮助思考问题、合作伙伴(partner)提供战略建议。

**技能(Skills)**：提供按需加载的 contextual 指导，包括需求澄清技能(在需求不明确时主动提问)和TDD技能(测试驱动开发工作流)。

**工具(Tools)**：集成多个实用工具，包括gitingest(获取GitHub仓库内容用于分析)、pdf-to-markdown(将PDF转为Markdown)、区块链查询工具(查询以太坊等链上的交易、余额、代币转账)。

**钩子(Hooks)**：支持在会话事件(如文件修改、工具执行)发生时自动触发自定义动作，如运行linter、格式化代码、阻止敏感文件修改等。

**命令**：提供便捷命令如/commit-push(提交推送)、/diff-summary(查看变更)、/review-changes(审查变更)、/tests-coverage(运行测试并查看覆盖率)等。

---
### 26. OpenCode Auth Sync

- **更新日期**: 未知
- **链接**: [扩展详情](https://www.opencode.cafe/plugin/opencode-auth-sync) | [GitHub](https://github.com/activadee/opencode-auth-sync)
- **标签**: auth, github, secrets, ci-cd, oauth, credentials
- **用途**: 

这是一个OpenCode插件，用于自动将OpenCode的身份验证凭据同步到GitHub仓库作为密钥。当用户使用Claude Max、OpenAI或Google等OAuth提供商时，令牌会定期刷新，该插件会监听这些变化并将更新后的凭据自动同步到指定的GitHub仓库，保持CI/CD工作流的身份验证状态。

使用方式很简单：运行交互式设置向导，选择要同步的仓库即可。插件会监控OpenCode的auth.json文件，当文件内容发生变化时，通过SHA-256哈希检测实际变更，然后使用GitHub CLI将凭据同步到目标仓库的密钥中。用户只需在GitHub Actions工作流中读取该密钥即可实现自动身份验证。

需要安装GitHub CLI并完成认证，且对目标仓库有写入权限。

---
### 27. opencode-synced

- **更新日期**: 未知
- **链接**: [扩展详情](https://www.opencode.cafe/plugin/opencode-synced) | [GitHub](https://github.com/iHildy/opencode-synced)
- **标签**: Plugin, productivity
- **用途**: 

这是一个OpenCode配置同步插件，通过GitHub仓库在多台机器间同步OpenCode的全局配置。它可以同步配置文件、AGENTS.md自定义指令、agent/command/mode/tool等扩展目录，还能选择同步模型收藏夹。更重要的是，它支持私有仓库同步敏感信息（如API密钥）、会话历史和提示词暂存箱内容。插件提供/sync-init创建同步仓库、/sync-link连接现有仓库、/sync-pull/push拉取推送配置等命令，并支持每台机器设置本地覆盖配置，自动将MCP密钥等敏感信息移到本地环境变量中，避免提交到仓库。

---
### 28. Ralph Wiggum for OpenCode

- **更新日期**: 未知
- **链接**: [扩展详情](https://www.opencode.cafe/plugin/ralph-wiggum) | [GitHub](https://github.com/Th0rgal/opencode-ralph-wiggum)
- **标签**: ralph, loops, iteration, automation, ai
- **用途**: 

Open Ralph Wiggum 是一个自主代理循环工具，可让 AI 编码代理（Claude Code、Codex、Copilot CLI 或 OpenCode）以循环模式持续运行，直到任务完成。它基于 Ralph Wiggum 技术，核心原理是向 AI 发送相同提示词，但每次迭代 AI 都能看到之前的工作成果和代码库变化，从而实现自我修正和增量改进。用户只需设置任务提示词和最大迭代次数，工具会自动执行循环，支持任务模式、进度监控、中途注入提示等功能，适合需要自动化完成且有明确验收标准的编码任务。

---
### 29. opencode-devcontainers

- **更新日期**: 未知
- **链接**: [扩展详情](https://www.opencode.cafe/plugin/opencode-devcontainers) | [GitHub](https://github.com/athal7/opencode-devcontainers)
- **标签**: devcontainer, docker, branches, isolation, development
- **用途**: 

这是一个OpenCode插件，用于在隔离的分支工作区中进行开发。它提供两种隔离方式：Devcontainers（完整容器隔离）和Worktrees（轻量级文件系统隔离）。

Devcontainers适合需要完全隔离的环境（如不同依赖、数据库等），会自动在容器中运行命令；Worktrees适合快速分支开发，共享主机依赖，直接在文件系统中隔离代码。

该插件的主要功能包括：会话状态管理（记住当前工作区）、自动分配13000-13099范围内的端口、自动从主仓库复制gitignored的 secrets文件（如.env），以及统一的工作区管理和清理。

安装方式是在OpenCode配置文件中添加插件即可使用。常用命令包括：/devcontainer 启动或切换到指定分支的容器，/worktree 创建或切换到指定分支的工作树，/workspaces 查看所有工作区。

该插件还支持与opencode-pilot集成，可实现自动化问题处理。

---
### 30. opencode-pilot

- **更新日期**: 未知
- **链接**: [扩展详情](https://www.opencode.cafe/plugin/opencode-pilot) | [GitHub](https://github.com/athal7/opencode-pilot)
- **标签**: automation, github, linear, polling, daemon
- **用途**: 

这是一个自动化守护进程，用于增强OpenCode的自动化能力。它会持续轮询GitHub Issues、Linear工单等来源，自动评估任务的准备状态（如标签、依赖项、优先级），然后启动OpenCode会话进行处理。用户可以通过配置文件自定义轮询源、提示模板和模型选择，支持GitHub问题、PR审查请求、Linear工单等多种来源，还可利用git worktree实现隔离的会话环境。该工具适合希望自动化处理日常开发任务的开发者。

---
### 31. Open Trees

- **更新日期**: 未知
- **链接**: [扩展详情](https://www.opencode.cafe/plugin/open-trees) | [GitHub](https://github.com/0xSero/open-trees)
- **标签**: worktrees, subagents, sandboxing, parallel workers
- **用途**: 

Open Trees是一个OpenCode插件，用于快速、安全地管理git worktree。它提供四个核心工具：worktree_mode用于开启或关闭worktree模式，避免工具列表过于杂乱；worktree_overview可列出所有worktree、查看状态或显示仪表盘；worktree_make用于创建、打开、分支或批量创建（swarm模式）worktree及其对应的会话；worktree_cleanup用于安全地移除或修剪worktree。该插件默认将worktree存放在仓库的`.worktrees/<branch>`目录下，会在配置文件中记录会话映射，并提供安全保护机制，例如默认拒绝删除有未提交内容的worktree，防止误操作。

---
### 32. octto

- **更新日期**: 未知
- **链接**: [扩展详情](https://www.opencode.cafe/plugin/octto) | [GitHub](https://github.com/vtemian/octto)
- **标签**: Plugin
- **用途**: 

octto是一个OpenCode扩展，提供交互式浏览器UI来替代终端打字进行AI头脑风暴。用户描述需求后，浏览器会显示可视化选项卡片，支持14种输入类型（单选、多选、确认按钮、滑块、排序、星级评分、代码差异编辑器等）。问题实时更新，用户可任意顺序回答。请求会被分成2-4个并行分支同时探索，每个分支根据回答自动决定是否继续追问，最终以可视化方式展示完整计划供审核确认。相比在终端打字10分钟，使用octto点击操作只需2分钟即可完成需求澄清。

---
### 33. OpenCode Background Agents

- **更新日期**: 未知
- **链接**: [扩展详情](https://www.opencode.cafe/plugin/opencode-background-agents) | [GitHub](https://github.com/kdcokenny/opencode-background-agents)
- **标签**: Plugin, delegation, async, research, persistence, context
- **用途**: 

这是一个OpenCode插件，让用户在AI研究任务在后台运行时继续其他工作。当上下文窗口满了发生压缩时，之前的AI研究内容会丢失，这款插件解决了这个问题。它的工作流程是：用户发起委托任务后可以继续编码或讨论，等收到通知后再获取结果。研究结果会保存为Markdown文件到本地磁盘，即使会话结束、重启或崩溃也不会丢失。插件提供三个工具：`delegate`用于启动后台任务、`delegation_read`获取特定结果、`delegation_list`列出所有委托及其摘要。注意只有只读代理（如researcher、explorer）可以使用委托功能，可写代理（coder、scribe）需使用原生task工具。委托会在15分钟后超时。通过OCX包管理器安装。

---
### 34. OpenCode Notify

- **更新日期**: 未知
- **链接**: [扩展详情](https://www.opencode.cafe/plugin/opencode-notify) | [GitHub](https://github.com/kdcokenny/opencode-notify)
- **标签**: Plugin, notifications, macos, linux, windows, focus
- **用途**: 

opencode-notify 是一个为 OpenCode 设计的插件，当 AI 任务完成、发生错误或需要用户输入时，会发送原生桌面通知。用户委托任务后无需频繁切换窗口查看进度，插件会在必要时通过 macOS 通知中心、Windows Toast 或 Linux notify-send 发送提醒。插件采用智能过滤机制，只对主会话事件（任务完成、错误、权限请求）进行通知，避免对子任务过度打扰，并自动检测终端焦点状态，在用户正在使用终端时抑制通知。macOS 版本还支持点击通知聚焦终端功能。该插件事件驱动，对上下文无额外占用，安装后开箱即用，也可通过配置文件自定义通知开关和提示音。

---
### 35. OpenCode Workspace

- **更新日期**: 未知
- **链接**: [扩展详情](https://www.opencode.cafe/plugin/opencode-workspace) | [GitHub](https://github.com/kdcokenny/opencode-workspace)
- **标签**: Plugin, agents, orchestration, bundle, mcp, planning
- **用途**: 

这是一个为OpenCode设计的多智能体编排工具包，通过一次安装即可获得完整的AI开发工作流。该捆绑包包含16个组件：4个插件（委托、规划、通知、worktree）、2个npm插件（DCP、Markdown表格格式化）、3个MCP服务器（Context7、Exa、GitHub Grep）、4个专业agent（研究员、程序员、文档员、审阅者）、4个技能（计划协议、代码审查、代码哲学、前端哲学）和1个命令（/review）。架构上分为两个层级：编排器（plan、build）负责任务分配，专业agent负责具体执行。工具包还配置了安全边界，限制各agent的权限范围，如webfetch默认禁用、研究员仅使用MCP工具、程序员拥有完整文件访问权等。安装方式是通过ocx命令添加KDCO注册表后安装workspace捆绑包。用户可以fork该项目并自定义其中的agent和技能。

---
### 36. OpenCode Worktree

- **更新日期**: 未知
- **链接**: [扩展详情](https://www.opencode.cafe/plugin/opencode-worktree) | [GitHub](https://github.com/kdcokenny/opencode-worktree)
- **标签**: Plugin, git, worktree, terminal, isolation, tmux
- **用途**: 

这是一个OpenCode插件，用于创建隔离的Git Worktree。它能让AI开发者自动创建独立的开发分支，每个Worktree会自动打开一个新的终端并在其中运行OpenCode，无需手动配置。当调用删除命令时，所有更改会自动提交并清理Worktree。该插件支持多种终端（macOS的Ghostty/iTerm2/Kitty/Linux的各类终端/Windows Terminal等），尤其在与tmux配合使用时体验最佳。Worktree存储在`~/.local/share/opencode/worktree/`目录下，通过`.opencode/worktree.jsonc`配置文件可自定义文件同步规则和生命周期钩子（如创建后运行`pnpm install`、删除前运行`docker compose down`）。适用于AI驱动的自动化开发流程，特别适合需要频繁创建隔离环境进行实验和探索的场景。

---
### 37. OpenCode Browser

- **更新日期**: 未知
- **链接**: [扩展详情](https://www.opencode.cafe/plugin/opencode-browser) | [GitHub](https://github.com/different-ai/opencode-browser)
- **标签**: 20, browser, automation, plugin, chrome, opencode
- **用途**: 

这是一个用于 OpenCode 的浏览器自动化插件，允许用户通过 OpenCode 控制自己已有的 Chromium 浏览器（如 Chrome、Brave、Arc、Edge），直接复用浏览器的现有配置，包括登录状态、Cookie 和书签，无需使用 DevTools 协议或处理安全提示。

该插件采用本地主机进程与 Chrome 扩展之间的原生消息传递机制工作，由一个本地代理程序协调多个 OpenCode 会话，并强制实施每个标签页的所有权制度。每个会话拥有独立的标签页，标签页不会在会话之间共享，如果会话尚未拥有标签页，代理会自动创建一个后台标签页。

插件提供了丰富的浏览器操作工具，包括：获取浏览器状态、列出和管理标签页、打开关闭标签页、导航到指定 URL、查询页面元素（支持文本、值、列表、存在性等多种模式）、点击元素、输入文本、选择下拉选项、滚动页面、等待操作、下载和上传文件、截图等。此外还支持使用 CSS 选择器、ARIA 标签、占位符等多种定位方式。

该插件支持 macOS、Linux 和 Windows 系统，安装时会自动将扩展程序复制到本地目录，引导用户在浏览器中加载并固定扩展程序，同时安装原生消息主机 manifest 并更新 OpenCode 配置文件。

除了基于扩展的核心后端外，该项目还提供了一个由 Playwright 驱动的替代后端（Agent Browser 模式），以无头模式运行，适合需要完全隔离环境的场景。

---
### 38. opencode-mystatus

- **更新日期**: 未知
- **链接**: [扩展详情](https://www.opencode.cafe/plugin/opencode-mystatus) | [GitHub](https://github.com/vbgate/opencode-mystatus)
- **标签**: quota, openai, google, codex
- **用途**: 

这是一个OpenCode插件，用于一键查询多个AI平台的账户配额使用情况。支持OpenAI、Zhipu AI、Z.ai、GitHub Copilot和Google Cloud五个平台。插件会自动从OpenCode的认证文件中读取账户信息，并以可视化进度条形式展示剩余配额和重置时间。用户可通过/mystatus命令或自然语言（如“查一下我的OpenAI配额”）查询，系统会自动调用mystatus工具返回结果。该插件仅读取本地认证文件，不上传任何数据，API密钥会在输出中自动掩码保护隐私。

---
### 39. OpenCode Memory

- **更新日期**: 未知
- **链接**: [扩展详情](https://www.opencode.cafe/plugin/opencode-mem) | [GitHub](https://github.com/tickernelz/opencode-mem)
- **标签**: ai, memory, multi-provider, persistent, local
- **用途**: 

OpenCode Memory 是一个为 AI 编程代理设计的持久化记忆系统，通过本地向量数据库技术实现跨会话的长期上下文保留。该插件使用 SQLite + HNSW 构建本地向量库，支持自动学习用户画像、智能提取提示词记忆、12种以上的本地嵌入模型，并提供完整的 Web UI 界面供可视化浏览和管理记忆。用户可通过简单的 API 调用添加、搜索、查看个人资料或列出记忆内容，同时支持 OpenAI 和 Anthropic 等多种 AI 提供商。所有数据存储在本地，保护用户隐私。

---
### 40. @sveltejs/opencode

- **更新日期**: 未知
- **链接**: [扩展详情](https://www.opencode.cafe/plugin/svelte) | [GitHub](https://github.com/sveltejs/mcp)
- **标签**: ai, svelte, mcp, subagent
- **用途**: 

这是 Svelte 官方的 MCP（Model Context Protocol）服务器仓库，为 Svelte 开发提供上下文协议支持。主要功能包括：运行 MCP 检查器（访问 localhost:6274）用于测试 Streamable HTTP 传输类型，连接地址为 http://localhost:5173/mcp；支持使用 Drizzle 进行数据库管理，可通过 `pnpm run db:studio` 查看数据库。开发需使用 pnpm，安装依赖后复制环境配置文件并设置 VOYAGE_API_KEY 以启用嵌入功能。目前为了避免 Vercel 上的超时日志，会立即关闭 SSE 通道，因此无法使用 server.log 和 list-changed 通知，但支持 elicitation 和 sampling 功能。

---
### 41. opencode-caffeinate

- **更新日期**: 未知
- **链接**: [扩展详情](https://www.opencode.cafe/plugin/opencode-caffeinate) | [GitHub](https://github.com/nguyenphutrong/opencode-caffeinate)
- **标签**: 无
- **用途**: 

这是一个macOS专用的OpenCode插件，在OpenCode会话进行时自动阻止电脑进入睡眠状态。它会在会话开始时运行caffeinate命令（带-dim参数），防止显示器、空闲和磁盘休眠；当所有会话结束后自动停止caffeinate，恢复正常电源管理。该插件支持多个并行运行的OpenCode实例，通过文件追踪各会话状态，即使某个进程崩溃也能正确处理。适用于需要长时间AI编程协作的场景，确保电脑不会因无人操作而休眠。需要macOS系统、Bun运行时和OpenCode插件支持。

---

## 4. Slash Command (1)

### 1. Data Model

- **更新日期**: 未知
- **链接**: [扩展详情](https://www.opencode.cafe/plugin/data-model) | [GitHub](https://github.com/aeitroc/commands)
- **标签**: data model
- **用途**: 

这是一个为AI模型设计的命令模板库，帮助AI执行各类软件开发任务。这些命令采用结构化的工作流程，从分析到实现再到文档都有规范指引。支持的AI工具包括OpenCode、Claude Code、Codex等。

主要命令包括：数据模型生成（自动识别Prisma等数据库技术并生成完整文档）、前端优化（实现像素级完美设计）、Bug诊断修复（架构感知的诊断方法）、数据库索引分析（优化查询性能）、SEO优化以及深度分析模式。每个命令都遵循统一结构，包含目标定义、分析阶段、分步实施、文档标准和成功指标。使用时只需复制命令内容粘贴到AI提示中即可。

---

## 5. MCP Server (2)

### 1. System Monitor Server MCP protocol and HTTP REST API support

- **更新日期**: 未知
- **链接**: [扩展详情](https://www.opencode.cafe/plugin/mcp-system-monitor) | [GitHub](https://github.com/DarkPhilosophy/mcp-system-monitor)
- **标签**: linux, ai, mcp, opencode, system-commands, system-metrics, agentic-ai, mcp-server
- **用途**: 

这是一个基于Model Context Protocol（MCP）的Linux服务器监控系统，专为AI代理设计。它通过MCP协议和HTTP REST API提供全面的系统信息监控，包括CPU（使用率、频率、温度）、内存（RAM和swap）、磁盘（存储空间和文件系统）、网络接口（流量和错误统计）以及运行进程等数据。支持Ubuntu、CentOS、RedHat等主流Linux发行版，可与OpenCode等AI开发工具集成，实现远程系统监控和管理功能。

---
### 2. cog-mcp

- **更新日期**: 未知
- **链接**: [扩展详情](https://www.opencode.cafe/plugin/cog-mcp) | [GitHub](https://github.com/vitorcalvi/cog-mcp)
- **标签**: mcp, semantic-search, apple-silicon, code-intelligence
- **用途**: 

cog-mcp 是一个基于 Model Context Protocol（MCP）的语义代码搜索服务器，专为 Apple Silicon（M1/M2/M3）设备设计，利用 Metal GPU 加速实现高效的代码语义理解。

与传统的文本匹配搜索不同，cog-mcp 能理解代码的**含义**而非仅匹配关键词。例如搜索“authentication handling”时，它会返回所有与认证相关的代码（login、validate、permissions 等），而不仅仅是包含该字样的文件。

该扩展提供三个核心工具：search_memory 用于语义化搜索代码库并返回相似度分数；get_file_structure 分析代码结构提取类和函数；generate_embedding 利用本地 Metal GPU 生成 Nomic 嵌入向量。

安装需要 macOS Apple Silicon 设备、Node.js 18+ 以及 cog-core Python 后端。配置完成后可与 Claude Desktop 等 AI 助手集成，实现智能代码搜索功能。

---
