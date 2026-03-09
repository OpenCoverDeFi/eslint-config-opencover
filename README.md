# eslint-config-opencover

ESLint flat config for OpenCover's TypeScript coding style.

## Installation

```bash
pnpm add -D eslint-config-opencover eslint typescript
```

## Usage

### TypeScript project

```typescript
// eslint.config.ts
import opencover from 'eslint-config-opencover';

export default [...opencover];
```

### React project

```typescript
// eslint.config.ts
import opencover from 'eslint-config-opencover';
import react from 'eslint-config-opencover/react';

export default [...opencover, ...react];
```

### Next.js project

Install Next.js ESLint config alongside this package:

```bash
pnpm add -D eslint-config-next
```

```typescript
// eslint.config.ts
import opencover from 'eslint-config-opencover';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

export default [...nextVitals, ...nextTs, ...opencover];
```

OpenCover's config should come **last** so its rules take precedence.

## Overriding rules

Each config object in the exported array has a `name` property (e.g. `opencover`, `opencover/typescript`, `opencover/test`). ESLint's flat config merges all config objects that match a file, so you can override specific rules by adding another config object that targets the same `name`:

```typescript
// eslint.config.ts
import opencover from 'eslint-config-opencover';

export default [
  ...opencover,
  {
    name: 'opencover/typescript',
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },
];
```

ESLint merges config objects with the same `name` — later entries override earlier ones. This means your overrides are combined with the original `opencover/typescript` rules, only changing the rules you specify.

Available config names:

| Name                   | Description                          |
| ---------------------- | ------------------------------------ |
| `opencover/gitignore`  | Ignores files from `.gitignore`      |
| `opencover`            | Base rules (stylistic, imports, etc) |
| `opencover/typescript` | TypeScript-specific rules            |
| `opencover/test`       | Test file rules (vitest)             |
| `opencover/react`      | React-specific rules                 |
