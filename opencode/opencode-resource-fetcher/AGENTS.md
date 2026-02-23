# AGENTS.md - OpenCode Resource Fetcher

## Project Overview

This is a crawler tool for OpenCode Cafe plugin marketplace (opencode.cafe). It scrapes extension information from the website, including names, descriptions, types, authors, GitHub URLs, tags, and purposes.

## Build/Lint/Test Commands

### Install Dependencies
```bash
bun install
bun run install  # Also installs Playwright chromium browser
```

### Run Crawler
```bash
bun run crawl              # Run crawler with progress output
bun run crawl --count      # Return only the extension count
bun run crawl --report     # Generate Chinese analysis report
bun run crawl -c -r        # Both count and report
bun run crawl --help       # Show help
```

### Type Checking
```bash
bunx tsc --noEmit         # Run TypeScript compiler check
```

### Linting
No lint configuration currently exists. Consider adding ESLint or Biome if needed.

### Testing
```bash
bun add -D @playwright/test    # Install test framework
bunx playwright install chromium # Ensure browser installed
bun test                       # Run all tests
bun test tests/                # Run tests in directory
bun test tests/crawler.spec.ts # Run single test file
bun test --ui                  # Run with interactive UI
```

### Debugging
If the crawler hangs, use `--limit` for quick testing:
```bash
bun run crawl --limit=3        # Process only 3 extensions
bun run crawl --report --limit=5  # Generate report with 5 items
```

## Code Style Guidelines

### Language & Runtime
- Use **TypeScript** with strict mode, ESM modules, **Bun** runtime

### Imports
- ESM syntax, separate groups with blank lines, use type imports:
```typescript
import { chromium } from 'playwright';
import type { Browser, Page } from 'playwright';
import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
```

### Naming
- Interfaces/Types: PascalCase (e.g., `Extension`, `CliArgs`)
- Functions/Variables: camelCase (e.g., `parseArgs`, `baseUrl`)
- Constants: UPPER_SNAKE_CASE or camelCase (e.g., `BASE_URL`)

### Interfaces
- Define interfaces for all data structures, use `?` for optional:
```typescript
interface Extension {
  id: string;
  name: string;
  type: string;
  author: string;
  url: string;
  githubUrl?: string;
  tags?: string[];
}
```

### Formatting
- 2 spaces indent, single quotes, trailing commas, max 120 chars

### Error Handling
- Try/catch for async, meaningful errors, optional chaining (`?.`), return early

### Async/Await
- Always use async/await for asynchronous operations
- Do not use .then() chains for readability
- Handle promises with proper try/catch
- Add appropriate timeouts for network requests

### File Organization
- Keep related functions together
- Main entry point at the bottom of the file
- Helper functions above main logic
- Group related interfaces/types at the top

### Output & Logging
- Use emoji prefixes for console output (🚀, 📄, ✅, ❌)
- Provide progress information for long-running operations
- Use console.log for user feedback, console.error for errors

### Browser/Playwright Best Practices
- Launch browser with `headless: true` for CI/automation
- Always close browser in finally block
- Use appropriate timeouts for page operations
- Use `waitUntil: 'load'` instead of 'networkidle' (more reliable)

## Project Structure

```
opencode-resource-fetcher/
├── src/crawler.ts          # Main crawler implementation
├── output/                 # Crawled data and reports
├── package.json
├── tsconfig.json
└── bun.lock
```

## Output Format
The crawler generates `output/extensions.json` with the following structure:
```json
{
  "total": 100,
  "byType": { "Plugin": 50, "MCP Server": 30 },
  "plugins": [
    {
      "id": "extension-id",
      "name": "Extension Name",
      "description": "Description",
      "type": "Plugin",
      "author": "Author Name",
      "url": "https://opencode.cafe/plugin/...",
      "githubUrl": "https://github.com/...",
      "lastUpdated": "2024-01-01",
      "purpose": "Plugin purpose in Chinese",
      "tags": ["tag1", "tag2"]
    }
  ]
}
```

## Common Tasks

### Adding a new CLI option
1. Add to `CliArgs` interface
2. Add parsing logic in `parseArgs()` function
3. Handle in `main()` function

### Modifying extension data collection
1. Find the `page.evaluate()` call in `crawlExtensions()`
2. Update the selector logic for the required fields

## Notes for AI Agents

- This project uses **Bun** exclusively - do not use npm or yarn
- The crawler uses Playwright for browser automation
- Output is written to `./output/` directory
- Add progress logs when debugging crawler issues
- Use `--limit=N` flag to test with fewer extensions
