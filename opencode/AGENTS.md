# AGENTS.md - OpenCode Resource Fetcher

This document provides guidelines for AI coding agents working in this repository.

## Project Overview

OpenCode Resource Fetcher is a TypeScript crawler that scrapes extension/plugin information from opencode.cafe marketplace. It uses Playwright for browser automation and Bun as the runtime.

## Build/Lint/Test Commands

### Installation
```bash
cd opencode-resource-fetcher
bun install
bunx playwright install chromium
```

### Running the Crawler
```bash
bun run crawl              # Default: crawl and show summary
bun run crawl --count      # Output extension count only
bun run crawl --report     # Generate Chinese markdown report
bun run crawl -c -r        # Combined: count + report
bun run crawl --help       # Show help
```

### Linting and Type Checking
No lint or typecheck commands are configured. To manually check types:
```bash
cd opencode-resource-fetcher
bunx tsc --noEmit
```

### Testing
No tests exist yet. When adding tests, place them alongside source files with `.test.ts` or `.spec.ts` extension.

## Code Style Guidelines

### Language and Comments
- **NO COMMENTS** in code unless explicitly requested by user
- All user-facing output must be in **Chinese** (中文)
- Variable names, function names, and code in English

### TypeScript Configuration
- Target: ESNext
- Module: ESNext with ESM (`"type": "module"`)
- Strict mode enabled
- `verbatimModuleSyntax`: true - use explicit type imports

### Import Style
```typescript
// Correct: explicit type imports with verbatimModuleSyntax
import { chromium, Browser, Page } from 'playwright';
import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { $ } from 'bun';
```

### Type Definitions
- Define interfaces at the top of the file before functions
- Use PascalCase for interface names
- Mark optional properties with `?`

```typescript
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
```

### Error Handling
- Use try-catch blocks for async operations
- Log errors with Chinese messages when user-facing
- Use silent catches for non-critical operations
- Prefer returning default values over throwing

```typescript
try {
  const response = await page.request.get(url, { timeout: 15000 });
  if (response.ok()) {
    return await response.text();
  }
} catch {
  return undefined;
}
```

### Async/Await Patterns
- Always use async/await, never raw Promises
- Use `Promise.all()` for parallel operations
- Add timeouts to network requests

### Naming Conventions
- **Variables**: camelCase (`extensions`, `byType`, `pluginsByType`)
- **Functions**: camelCase (`parseArgs`, `crawlExtensions`, `generateReport`)
- **Interfaces**: PascalCase (`Extension`, `Result`, `CliArgs`)
- **Constants**: UPPER_SNAKE_CASE (`BASE_URL`, `SEARCH_URL`, `OUTPUT_DIR`)

### File Organization
```
opencode-resource-fetcher/
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript config
├── src/
│   └── crawler.ts        # Main crawler implementation
├── output/
│   ├── extensions.json   # JSON output
│   └── report.md         # Markdown report
├── PLAN.md               # Development plan
└── README.md             # Usage documentation
```

### Playwright Best Practices
- Use `headless: true` for production
- Set appropriate timeouts (`waitUntil: 'networkidle'`)
- Use `waitForTimeout()` for dynamic content
- Close browser in `finally` block

```typescript
const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
} finally {
  await browser.close();
}
```

### Output Format
- JSON: Pretty-printed with 2-space indent
- Markdown: Chinese headers and labels
- Console: Emoji prefixes for status (🚀, ✅, ❌, 📄, 💾)

### CLI Argument Parsing
Parse arguments from `process.argv.slice(2)`:
```typescript
function parseArgs(): CliArgs {
  const args = process.argv.slice(2);
  return {
    count: args.includes('--count') || args.includes('-c'),
    report: args.includes('--report') || args.includes('-r'),
  };
}
```

## Known Issues and Considerations

### Report Generation Issues
The report generation has been improved to handle:
1. README content is cleaned to remove badge images, markdown links, and HTML tags
2. OpenCode responses are validated to ensure they contain Chinese characters
3. Fallback extraction when OpenCode fails or returns invalid content

### Content Cleaning Functions
```typescript
function cleanReadmeContent(content: string): string {
  // Removes: badge images, markdown links, HTML tags, code blocks
  // Filters: lines with shields.io, base64 images, excessive URLs
}

function containsInvalidContent(text: string): boolean {
  // Checks for: badge URLs, base64 data, insufficient Chinese chars
}
```

### Translation Functions
```typescript
async function translateToChinese(text: string): Promise<string> {
  // Uses a comprehensive dictionary to translate English to Chinese
  // Falls back to original text if translation fails
}

function isChineseText(text: string): boolean {
  // Checks if text contains > 10% Chinese characters
}
```

### OpenCode CLI Integration
The crawler uses OpenCode CLI to summarize content:
```typescript
const result = await $`echo ${prompt} | opencode`.cwd('/tmp').quiet().text();
```

### Fallback Behavior
When OpenCode CLI fails, use keyword-based extraction with translation:
- Keywords for usage: `install`, `use`, `setup`, `config`, `npm`, `run`, `command`, `bun`, `npx`
- Keywords for purpose: `feature`, `function`, `for`, `allows`, `provides`, `description`

```typescript
async function extractFromContent(content: string, type: 'usage' | 'purpose'): Promise<string> {
  // Extracts relevant lines based on keywords
  // Translates to Chinese using dictionary
}
```

### GitHub API Rate Limits
The crawler fetches last updated dates from GitHub API. If rate limited:
- Dates may show as "未知" (unknown)
- Consider using GitHub token for higher rate limits

## Dependencies

- **playwright**: ^1.42.0 - Browser automation
- **bun**: Runtime (built-in `$` shell, fs, path)

## Environment Requirements

- Bun runtime
- Chromium browser (installed via Playwright)
- Internet access for crawling
- OpenCode CLI (optional, for better translation)
