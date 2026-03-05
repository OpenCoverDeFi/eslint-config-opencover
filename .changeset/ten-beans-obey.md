---
'eslint-config-opencover': major
---

Migrate from ESLint 8 legacy config to ESLint 10 flat config.

The package has been rewritten from the ground up. It now exports plain synchronous flat config arrays compatible with ESLint's `eslint.config.ts` format. The ESLint 8 `module.exports` / `.eslintrc` format is no longer supported.

**Migration from v2 (ESLint 8)**

Delete your `.eslintrc.js` (or `.eslintrc.cjs`, etc.) and create an `eslint.config.ts` instead:

```typescript
import opencover from 'eslint-config-opencover';

export default [...opencover];
```

For Next.js projects:

```typescript
import opencover from 'eslint-config-opencover';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

export default [...nextVitals, ...nextTs, ...opencover];
```

**New API**

The default export is the composed preset (ignores + opencover + opencover/typescript + opencover/test).

Each named config (`opencover`, `opencover/typescript`, `opencover/test`) can be overridden via `defineConfig` using the `name` field.

**Included rule sets**

- `eslint.configs.recommended` — ESLint core recommended rules
- `typescript-eslint/strict-type-checked` — strict type-aware TypeScript rules
- `eslint-plugin-unicorn/recommended` — modern JS best practices
- `@vitest/eslint-plugin/recommended` — Vitest test linting
- `eslint-config-prettier` — disables rules that conflict with Prettier
- `@stylistic/eslint-plugin` — code style rules (spacing, quotes, semicolons, etc.)
- `eslint-plugin-import-x` — import ordering
- `eslint-config-flat-gitignore` — auto-ignores files from `.gitignore`

**TypeScript rules**

- `@typescript-eslint/explicit-function-return-type` — requires return types on all functions
- `@typescript-eslint/explicit-module-boundary-types` — requires return types on exported functions
- `@typescript-eslint/explicit-member-accessibility` — requires access modifiers (constructors exempt)
- `@typescript-eslint/consistent-type-imports` — enforces `import type` for type-only imports
- `@typescript-eslint/member-ordering` — enforces member ordering in classes
- `@typescript-eslint/no-non-null-assertion` — bans `!` non-null assertions
- `@typescript-eslint/no-unused-vars` — bans unused vars (underscore-prefixed exempt)
- `@typescript-eslint/no-restricted-types` — bans `Map` (use `Object`/`Record` instead)
- `@typescript-eslint/prefer-nullish-coalescing` — enforces `??` over `||` for nullable values (conditionals and booleans exempt)
- `require-await` disabled in favor of `@typescript-eslint/require-await`

**General rules**

- `no-console` — bans `console.log` (allows `console.warn` and `console.error`)
- `no-restricted-syntax` — bans enums (use `as const` instead)
- `no-unneeded-ternary` — bans unnecessary ternary expressions
- `unicorn/no-array-callback-reference` — bans passing function references to array methods
- `unicorn/filename-case` — enforces kebab-case filenames
- `import-x/order` — enforces import ordering with `@/**` and `@tests/**` path groups

**Vitest rules**

- `vitest/recommended` rules plus padding around all test blocks (describe, it, beforeAll, beforeEach, afterAll, afterEach)

**Other breaking changes**

- Requires ESLint 10 and TypeScript 5. ESLint 8 is no longer supported.
- TypeScript rules always use `projectService: true`; point ESLint at your project root instead of passing a tsconfig path.
- Removed standalone React config (`eslint-config-opencover/react`). Use Next.js ESLint configs directly for React projects.
