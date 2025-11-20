# eslint-config-opencover

> ESLint Typescript shareable config for OpenCover's coding style

## Install

> Make sure you have already installed `eslint` and `typescript` as they are required packages.

```console
yarn add -D eslint-config-opencover
```

Then, create an `eslint.config.mjs` file:

```mjs
export { default } from '@opencover/eslint-config-opencover';
```

### Usage for React

You can use the React config standalone:

```mjs
import { defineConfig } from 'eslint/config';
import opencoverReactConfig from '@opencover/eslint-config-opencover/react';

export default defineConfig([...openCoverReactConfig]);
```

Or combine both the default and React configs together:

```mjs
import { defineConfig } from 'eslint/config';
import opencoverConfig from '@opencover/eslint-config-opencover';
import opencoverReactConfig from '@opencover/eslint-config-opencover/react';

export default defineConfig([...opencoverConfig, ...opencoverReactConfig]);
```

## Rules

This package configures ESLint with a comprehensive set of rules for TypeScript projects. Detailed documentation for each section is available in the [`docs/`](./docs/) directory:

- **[OpenCover Custom Rules](./docs/opencover/README.md)** - Rules specific to OpenCover's coding standards
- **[TypeScript ESLint Rules](./docs/typescript-eslint/README.md)** - TypeScript-specific linting rules with all recommended and overridden settings
- **[ESLint Rules](./docs/eslint/README.md)** - Core JavaScript/TypeScript formatting and best practices
- **[Import Plugin Rules](./docs/import/README.md)** - Import/export statement linting
- **[Unicorn Plugin Rules](./docs/unicorn/README.md)** - Additional best practices
- **[Vitest Plugin Rules](./docs/vitest/README.md)** - Test file specific rules (applied to `*.test.ts` files)

### Ignore certain files

Add files to ignore in your `eslint.config.ts`:

```ts
import { defineConfig } from 'eslint/config';
import opencoverConfig from '@opencover/eslint-config-opencover';

export default defineConfig([
  {
    ignores: ['*.css', '*.svg'],
  },
  ...opencoverConfig,
]);
```

## Troubleshooting

### Error: "You have used a rule which requires type information, but don't have parserOptions set to generate type information for this file"

If you encounter this error, it typically means ESLint is trying to lint a non-TypeScript file (e.g., `.js`, `.json`, `.md`, `.css`, etc.) with TypeScript-specific rules that require type information.

**Solution:** Check your ignore patterns. The error message will show the filename that's causing the issue. Add that file or file pattern to your `ignores` array in `eslint.config.ts`.

For example, if you see this error for a `.js` file:

```ts
export default defineConfig([
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/coverage/**',
      '**/.temp/**',
      '**/.git/**',
      '**/yarn.lock',
      '*.js', // Add this if you have .js files that shouldn't be linted
    ],
  },
  ...opencoverConfig,
]);
```
