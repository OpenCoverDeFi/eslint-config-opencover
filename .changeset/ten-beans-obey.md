---
'eslint-config-opencover': major
---

Migrate from ESLint 8 legacy config to ESLint 9 flat config.

The package has been rewritten from the ground up. It now exports plain synchronous flat config arrays compatible with ESLint 9's `eslint.config.js` format. The ESLint 8 `module.exports` / `.eslintrc` format is no longer supported.

**Migration from v2 (ESLint 8)**

Delete your `.eslintrc.js` (or `.eslintrc.cjs`, etc.) and create an `eslint.config.mjs` instead:

```mjs
import { defineConfig } from 'eslint/config';
import opencover from 'eslint-config-opencover';

export default defineConfig([...opencover]);
```

For React projects, install `eslint-plugin-react` and `eslint-plugin-react-hooks`, then:

```mjs
import { defineConfig } from 'eslint/config';
import opencover from 'eslint-config-opencover';
import { reactConfig } from 'eslint-config-opencover/react';

const react = await reactConfig();

export default defineConfig([...opencover, ...react]);
```

**New API**

The default export is the composed preset (ignores + opencover + opencover/typescript + opencover/test).

React is a separate subpath export at `eslint-config-opencover/react`.

Each named config (`opencover`, `opencover/typescript`, `opencover/test`) can be overridden via `defineConfig` using the `name` field.

**Other breaking changes**

- Requires ESLint 10 and TypeScript 5. ESLint 8 is no longer supported.
- TypeScript rules always use `projectService: true`; point ESLint at your project root instead of passing a tsconfig path.
