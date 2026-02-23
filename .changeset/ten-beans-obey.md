---
'@opencover/eslint-config': major
---

Migrate from ESLint 8 legacy config to ESLint 9 flat config.

The package has been rewritten from the ground up. It now exports plain synchronous flat config arrays compatible with ESLint 9's `eslint.config.js` format. The ESLint 8 `module.exports` / `.eslintrc` format is no longer supported.

**Migration from v2 (ESLint 8)**

Delete your `.eslintrc.js` (or `.eslintrc.cjs`, etc.) and create an `eslint.config.js` instead:

```js
// eslint.config.js
import { recommended } from '@opencover/eslint-config';

export default [
  ...recommended,
  // your overrides go here (last-wins)
];
```

For React projects, spread `reactConfig` after `recommended`:

```js
import { recommended, reactConfig } from '@opencover/eslint-config';

export default [...recommended, ...reactConfig];
```

**New API**

Everything is exported from the single entry point. Use the `recommended` preset or compose individual layers:

```js
import {
  recommended,
  reactConfig,
  ignores,
  javascript,
  typescript,
  stylistic,
  imports,
  unicorn,
  test,
} from '@opencover/eslint-config';
```

`recommended` = ignores + javascript + typescript + stylistic + imports + unicorn + test (no React).

**Other breaking changes**

- Requires ESLint 9 and TypeScript 5. ESLint 8 is no longer supported.
- TypeScript rules always use `projectService: true`; point ESLint at your project root instead of passing a tsconfig path.
