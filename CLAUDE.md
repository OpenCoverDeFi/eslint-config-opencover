# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an ESLint shareable config package for OpenCover's coding standards. It provides TypeScript-focused linting rules with optional React support. The package is published as `@OpenCoverDeFi/eslint` and exports two configurations:
- Default config (main export): TypeScript rules with import, stylistic, unicorn, and vitest plugins
- React config (`/react` export): Adds React and React Hooks rules

## Common Commands

### Build
```bash
yarn build
```
Compiles TypeScript to `dist/` and resolves path aliases using tsc-alias. Required before testing changes locally.

### Lint and Format
```bash
yarn lint         # Check for ESLint and Prettier issues (max 0 warnings)
yarn format       # Auto-fix ESLint and format with Prettier
```

### Testing
```bash
yarn test                # Run all tests
yarn test:coverage       # Run tests with coverage report
```

To run a single test file:
```bash
yarn vitest run tests/path/to/test.test.ts
```

### Type Checking
```bash
yarn tsc --noEmit
```

## Architecture

### Configuration Structure

The package builds ESLint flat configs from modular pieces:

**Entry points:**
- `src/index.ts` → `src/config/index.ts` - Main export combining all base configs
- `src/react.ts` → `src/config/react.ts` - React-specific export

**Config Assembly (`src/config/`):**
- `base.ts` - Applies to `**/*.ts` and `**/*.tsx` files, combines all rule modules
- `test.ts` - Special overrides for `**/*.test.ts` files (e.g., allows `unsafe-assignment` for vitest matchers)
- `react.ts` - React and React Hooks plugins with JSX support
- `constants.ts` - Shared parser options and ignore patterns

**Rule Modules (`src/rules/`):**
All rules are organized by plugin in separate files:
- `typescript.ts` - @typescript-eslint rules (extends strict + recommended type-checked)
- `eslint.ts` - Core ESLint rules (extends recommended)
- `stylistic.ts` - @stylistic/eslint-plugin rules (padding-line-between-statements)
- `import.ts` - eslint-plugin-import rules (import ordering and organization)
- `unicorn.ts` - eslint-plugin-unicorn rules
- `vitest.ts` - @vitest/eslint-plugin rules for test files
- `index.ts` - Combines all rule modules into `baseRules` and `testRules` exports

### Path Aliases

The project uses TypeScript path aliases:
- `@/*` maps to `src/*`
- `@tests/*` maps to `tests/*`

These are configured in `tsconfig.json` and resolved at build time by tsc-alias.

### Testing Architecture

Tests use Vitest with a custom testing utility layer:

**Test Utilities (`tests/test-utils.ts`):**
- `lintWithDefaultConfig(code, filePath?)` - Lint code against main config
- `lintWithReactConfig(code, filePath?)` - Lint code against React config
- `lintFilePath(config, filePath)` - Lint an actual file on disk
- `createTempFile(filename)` - Create temporary files in `.dist/` for testing

**Test Setup:**
- `tests/global-setup.ts` - Creates `.dist/` temp directory
- `tests/setup.ts` - Per-test setup/teardown
- Tests use `projectService: true` with `allowDefaultProject` to lint dynamically created files

**Test Organization:**
Tests mirror the rule structure in `tests/index/` and `tests/react/`, with one test file per rule or feature.

### Package Exports

The package uses conditional exports in `package.json`:
- `.` → `dist/index.js` (main config)
- `./react` → `dist/react.js` (React config)

Both exports include TypeScript declarations.

### Git Hooks

**Pre-commit:** Runs lint-staged for changed files only
**Pre-push:** Runs full typecheck (`tsc --noEmit`) and test suite (`yarn test`)

Both hooks clear `GITHUB_TOKEN` environment variable.

## Important Notes

- The package uses ESM (`"type": "module"`) and requires Node.js >= 22.20.0
- All source files must use `.js` extensions in imports (e.g., `from './config/index.js'`) for ESM compatibility
- Parser uses `projectService: true` (new ESLint 9 feature) for automatic TypeScript project detection
- Build output (`dist/`) is git-ignored but included in npm package via `files` field
- The `postinstall` script automatically runs `yarn build` after installation


