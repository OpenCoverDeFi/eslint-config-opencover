# eslint-config-opencover

ESLint flat config for OpenCover's TypeScript coding style.

## Installation

```bash
pnpm add -D eslint-config-opencover eslint typescript
```

## Usage

### TypeScript project

```javascript
// eslint.config.mjs
import opencover from 'eslint-config-opencover';

export default [...opencover];
```

### React project

```javascript
// eslint.config.mjs
import opencover from 'eslint-config-opencover';
import react from 'eslint-config-opencover/react';

export default [...opencover, ...react];
```

### Next.js project

Install Next.js ESLint config alongside this package:

```bash
pnpm add -D eslint-config-next
```

```javascript
// eslint.config.mjs
import opencover from 'eslint-config-opencover';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

export default [...nextVitals, ...nextTs, ...opencover];
```

OpenCover's config should come **last** so its rules take precedence.

## Overriding rules

Each config object in the exported array has a `name` property for debugging (for example in ESLint's config inspector), but flat config overrides are matched by `files`/`ignores`, not by `name`. To override TypeScript-specific rules, add a later config object that matches the same files:

```javascript
// eslint.config.mjs
import opencover from 'eslint-config-opencover';

export default [
  ...opencover,
  {
    files: ['**/*.{ts,tsx,mts,cts}'],
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },
];
```

Later matching config objects override earlier ones for those files.

Available config names:

| Name                   | Description                          |
| ---------------------- | ------------------------------------ |
| `opencover`            | Base rules (stylistic, imports, etc) |
| `opencover/gitignore`  | Ignores files from `.gitignore`      |
| `opencover/typescript` | TypeScript-specific rules            |
| `opencover/test`       | Test file rules (vitest)             |
