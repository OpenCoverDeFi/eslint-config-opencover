# eslint-config-opencover

## 3.0.3

### Patch Changes

- [#22](https://github.com/OpenCoverDeFi/eslint-config-opencover/pull/22) [`d8c27b6`](https://github.com/OpenCoverDeFi/eslint-config-opencover/commit/d8c27b6c9cc6bb202a31a8638cbe0b8ff1bc26f8) Thanks [@yuryoparin](https://github.com/yuryoparin)! - Enable verbose for npm publish

## 3.0.2

### Patch Changes

- [#20](https://github.com/OpenCoverDeFi/eslint-config-opencover/pull/20) [`e02ba94`](https://github.com/OpenCoverDeFi/eslint-config-opencover/commit/e02ba94ae185c9d69be927fff14b865fd7630650) Thanks [@yuryoparin](https://github.com/yuryoparin)! - Use npm publish over changeset publish

## 3.0.1

### Patch Changes

- [#18](https://github.com/OpenCoverDeFi/eslint-config-opencover/pull/18) [`3d2d55e`](https://github.com/OpenCoverDeFi/eslint-config-opencover/commit/3d2d55e7546e802c0b40f86f4eebddf3f64fd5ba) Thanks [@yuryoparin](https://github.com/yuryoparin)! - Update Node version to 24 in GitHub Actions to enable trusted publishing

## 3.0.0

### Major Changes

- [#6](https://github.com/OpenCoverDeFi/eslint-config-opencover/pull/6) [`c160ef8`](https://github.com/OpenCoverDeFi/eslint-config-opencover/commit/c160ef8647e17074076192755d08d9ce90a8b68e) Thanks [@eniko1556](https://github.com/eniko1556)! - Migrate from ESLint 8 legacy config to ESLint 10 flat config.

  The package has been rewritten from the ground up. It now exports plain synchronous flat config arrays compatible with ESLint's `eslint.config.mjs` format. The ESLint 8 `module.exports` / `.eslintrc` format is no longer supported.

  **Migration from v2 (ESLint 8)**

  Delete your `.eslintrc.js` (or `.eslintrc.cjs`, etc.) and create an `eslint.config.mjs` instead:

  ```javascript
  import opencover from 'eslint-config-opencover';

  export default [...opencover];
  ```

  For Next.js projects:

  ```javascript
  import opencover from 'eslint-config-opencover';
  import nextVitals from 'eslint-config-next/core-web-vitals';
  import nextTs from 'eslint-config-next/typescript';

  export default [...nextVitals, ...nextTs, ...opencover];
  ```

  **New API**

  The default export is the composed preset (ignores + opencover + opencover/typescript + opencover/test).

  Each named config (`opencover`, `opencover/typescript`, `opencover/test`) can be overridden by appending a config object with matching `files`/`ignores` patterns after spreading the preset. For example, to disable a TypeScript rule, add a config targeting the same file patterns after `...opencover`.

  **Included rule sets**
  - `eslint/recommended` — ESLint core recommended rules
  - `typescript-eslint/strict-type-checked` — strict type-aware TypeScript rules
  - `eslint-plugin-unicorn/recommended` — modern JS best practices
  - `@vitest/eslint-plugin/recommended` — Vitest test linting
  - `eslint-config-prettier` — disables rules that conflict with Prettier
  - `@stylistic/eslint-plugin/recommended` — code style rules (spacing, quotes, semicolons, etc.)
  - `eslint-plugin-import-x/recommended` — import ordering
  - `eslint-config-flat-gitignore` — auto-ignores files from `.gitignore`

  **TypeScript rules**
  - `@typescript-eslint/explicit-function-return-type` — requires return types on all functions
  - `@typescript-eslint/explicit-module-boundary-types` — requires return types on exported functions
  - `@typescript-eslint/explicit-member-accessibility` — requires access modifiers (constructors exempt)
  - `@typescript-eslint/consistent-type-imports` — enforces `import type` for type-only imports
  - `@typescript-eslint/member-ordering` — enforces member ordering in classes
  - `@typescript-eslint/no-unused-vars` — bans unused vars (underscore-prefixed exempt)
  - `@typescript-eslint/no-restricted-types` — bans `Map` (use `Object`/`Record` instead)
  - `@typescript-eslint/prefer-nullish-coalescing` — enforces `??` over `||` for nullable values (conditionals and booleans exempt)

  **General rules**
  - `no-console` — bans `console.log` (allows `console.warn` and `console.error`)
  - `no-restricted-syntax` — bans enums (use `as const` instead)
  - `no-unneeded-ternary` — bans unnecessary ternary expressions
  - `capitalized-comments` — enforces capitalized comments
  - `import-x/order` — enforces import ordering with `@/**`, `@tests/**`, and `@data/**` path groups

  **Vitest rules**
  - `vitest/recommended` rules plus padding around all test blocks (describe, it, beforeAll, beforeEach, afterAll, afterEach)

  **Other breaking changes**
  - Requires ESLint 10 and TypeScript 5. ESLint 8 is no longer supported.
  - TypeScript rules always use `projectService: true`; point ESLint at your project root instead of passing a tsconfig path.
  - Standalone React config available via `eslint-config-opencover/react`. Includes `eslint-plugin-react` and `eslint-plugin-react-hooks` as dependencies.
