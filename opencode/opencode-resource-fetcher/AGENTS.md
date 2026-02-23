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
No test framework is currently set up. Tests would use Playwright (already a dependency).

## Code Style Guidelines

### Language & Runtime
- Use **TypeScript** with strict mode enabled
- Use **Bun** as the runtime (ESM modules)
- Target ESNext/ESNext modules

### TypeScript Configuration (tsconfig.json)
```json
{
  "strict": true,
  "module": "ESNext",
  "moduleResolution": "bundler",
  "verbatimModuleSyntax": true,
  "noEmit": true
}
```

### Imports
- Use ESM import syntax
- Separate built-in, external, and local imports with blank lines
- Use type imports where appropriate
```typescript
import { chromium } from 'playwright';
import type { Browser, Page } from 'playwright';
import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { $ } from 'bun';
```

### Naming Conventions
- **Interfaces**: PascalCase, prefix with meaningful name (e.g., `Extension`, `Result`, `CliArgs`)
- **Types**: PascalCase (e.g., `CliArgs`)
- **Functions**: camelCase (e.g., `parseArgs`, `cleanReadmeContent`)
- **Variables**: camelCase (e.g., `baseUrl`, `extensions`)
- **Constants**: UPPER_SNAKE_CASE or camelCase (e.g., `BASE_URL`, `OUTPUT_DIR`)

### Interfaces & Types
- Define interfaces for all data structures
- Use optional properties with `?` when needed
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
  purpose?: string;
  tags?: string[];
}
```

### Formatting
- Use 2 spaces for indentation
- Use single quotes for strings
- Add trailing commas in multiline objects/arrays
- Maximum line length: 120 characters (soft limit)
- Use blank lines to separate logical code sections

### Error Handling
- Use try/catch blocks for async operations
- Provide meaningful error messages in console.error
- Use optional chaining (`?.`) and nullish coalescing (`??`) to handle undefined values
- Return early to reduce nesting
```typescript
try {
  const response = await page.request.get(readmeUrl, { timeout: 15000 });
  if (response.ok()) {
    const rawContent = await response.text();
    result.readmeContent = cleanReadmeContent(rawContent);
    break;
  }
} catch {
  continue;
}
```

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

### String Handling
- Use template literals for string interpolation
- Use descriptive variable names
- Handle edge cases (empty strings, null, undefined)

### Output & Logging
- Use emoji prefixes for console output (🚀, 📄, ✅, ❌)
- Provide progress information for long-running operations
- Use console.log for user feedback, console.error for errors

### Browser/Playwright Best Practices
- Launch browser with `headless: true` for CI/automation
- Always close browser in finally block
- Use appropriate timeouts for page operations
- Use `waitUntil: 'networkidle'` for page navigation when needed

## Project Structure

```
opencode-resource-fetcher/
├── src/
│   └── crawler.ts          # Main crawler implementation
├── output/
│   ├── extensions.json     # Crawled extension data
│   └── report.md           # Generated analysis report
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

### Changing output format
1. Modify the `Extension` interface
2. Update relevant functions that populate the data

## Notes for AI Agents

- This project uses **Bun** exclusively - do not use npm or yarn
- The crawler uses Playwright for browser automation
- Output is written to `./output/` directory
- No tests currently exist - consider adding Playwright tests for robustness
- The codebase is relatively small (~600 lines) - full file understanding is feasible
