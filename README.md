# eslint-config-opencover

> ESLint TypeScript shareable config for OpenCover's coding style

## Install

> Make sure you have already installed `eslint` and `typescript` as they are required packages.

```console
pnpm add -D eslint-config-opencover
```

Then, create an `eslint.config.mjs` file:

```mjs
import { defineConfig } from 'eslint/config';
import opencover from 'eslint-config-opencover';

export default defineConfig([...opencover]);
```

### React

Install the required peer dependencies:

```console
pnpm add -D eslint-plugin-react eslint-plugin-react-hooks
```

Then add the React config after the base config:

```mjs
import { defineConfig } from 'eslint/config';
import opencover from 'eslint-config-opencover';
import { reactConfig } from 'eslint-config-opencover/react';

const react = await reactConfig();

export default defineConfig([...opencover, ...react]);
```

### Overriding rules

Add a config object after the preset to override any rule:

```mjs
import { defineConfig } from 'eslint/config';
import opencover from 'eslint-config-opencover';

export default defineConfig([
  ...opencover,
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
  },
]);
```

### Overriding a named config

Each config object has a `name` field (`opencover`, `opencover/typescript`, `opencover/test`). When using `defineConfig` from `eslint/config`, you can target a named config and override any of its properties — `files`, `rules`, `settings`, etc.:

```mjs
import { defineConfig } from 'eslint/config';
import opencover from 'eslint-config-opencover';

export default defineConfig([
  ...opencover,
  {
    name: 'opencover/test',
    files: ['**/e2e/**/*.ts', '**/*.spec.ts'],
    rules: {
      'vitest/expect-expect': 'off',
    },
  },
]);
```

This targets the `opencover/test` config and overrides both its file globs and rules. The same approach works for any named config (`opencover`, `opencover/typescript`, etc.).

### Ignoring files globally

Use `globalIgnores` to exclude files from all rules:

```mjs
import { defineConfig, globalIgnores } from 'eslint/config';
import opencover from 'eslint-config-opencover';

export default defineConfig([
  globalIgnores(['**/generated/**', '*.css', '*.svg']),
  ...opencover,
]);
```

### Ignoring files per rule

Use `ignores` inside a config object to skip specific rules for certain files:

```mjs
import { defineConfig } from 'eslint/config';
import opencover from 'eslint-config-opencover';

export default defineConfig([
  ...opencover,
  {
    files: ['**/scripts/**'],
    rules: {
      'no-console': 'off',
    },
  },
]);
```

## What's included

| Config                 | Scope            | Description                                          |
| ---------------------- | ---------------- | ---------------------------------------------------- |
| `opencover`            | All source files | Core JS rules, stylistic, import-x, unicorn          |
| `opencover/typescript` | `*.ts`, `*.tsx`  | typescript-eslint strict type-checked + custom rules |
| `opencover/test`       | Test files       | Vitest recommended + padding rules                   |
| `opencover/react`      | `*.jsx`, `*.tsx` | React + React Hooks (optional)                       |

## Troubleshooting

### "You have used a rule which requires type information..."

This means ESLint is trying to lint a non-TypeScript file with type-aware rules. Check the error message for the filename and add it to your `ignores` array.
