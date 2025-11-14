# eslint-config-opencover

> ESLint Typescript shareable config for OpenCover's coding style

## Install

> Make sure you have already installed `eslint` and `typescript` as they are required packages.

```console
yarn add -D eslint-config-opencover
```

Then, create an `eslint.config.ts` file:

```ts
import { defineConfig } from 'eslint/config';
import opencoverConfig from '@opencover/eslint-config-opencover';

export default defineConfig([
    {
        // Add your ignores pattern
        ignores: ['**/node_modules/**', '**/dist/**', '**/coverage/**', '**/.temp/**', '**/.git/**', '**/yarn.lock'],
    },
    ...opencoverConfig,
    {
        rules: {
            // your overrides
        },
    },
]);
```

### Usage for React

You can use the React config standalone:

```ts
import { defineConfig } from 'eslint/config';
import opencoverReactConfig from '@opencover/eslint-config-opencover/react';

export default defineConfig([
    {
        ignores: ['**/node_modules/**', '**/dist/**', '**/coverage/**', '**/.temp/**', '**/.git/**', '**/yarn.lock'],
    },
    ...opencoverReactConfig,
    {
        rules: {
            // your overrides
        },
    },
]);
```

Or combine both the default and React configs together:

```ts
import { defineConfig } from 'eslint/config';
import opencoverConfig from '@opencover/eslint-config-opencover';
import opencoverReactConfig from '@opencover/eslint-config-opencover/react';

export default defineConfig([
    {
        ignores: ['**/node_modules/**', '**/dist/**', '**/coverage/**', '**/.temp/**', '**/.git/**', '**/yarn.lock'],
    },
    ...opencoverConfig,
    ...opencoverReactConfig,
    {
        rules: {
            // your overrides (React config rules will override default config rules if there are conflicts)
        },
    },
]);
```

## Rules

This package configures ESLint with a comprehensive set of rules for TypeScript projects. Detailed documentation for each section is available in the [`rules/`](./rules/) directory:

- **[OpenCover Custom Rules](./rules/opencover/README.md)** - Rules specific to OpenCover's coding standards
- **[TypeScript ESLint Rules](./rules/typescript-eslint/README.md)** - TypeScript-specific linting rules with all recommended and overridden settings
- **[ESLint Rules](./rules/eslint/README.md)** - Core JavaScript/TypeScript formatting and best practices
- **[Import Plugin Rules](./rules/import/README.md)** - Import/export statement linting
- **[Unicorn Plugin Rules](./rules/unicorn/README.md)** - Additional best practices
- **[Vitest Plugin Rules](./rules/vitest/README.md)** - Test file specific rules (applied to `*.test.ts` files)

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

### (Optional) Add .prettierc.json with this preferred configuration

```
{
    "printWidth": 100,
    "trailingComma": "es5",
    "tabWidth": 4,
    "semi": true,
    "singleQuote": true
}
```

### (Optional) Linting with vscode

If you are using vscode this `.vscode/settings.json` file may come in handy:

```
{
    "editor.defaultFormatter": "dbaeumer.vscode-eslint",
    "editor.formatOnSave": true,
    "eslint.alwaysShowStatus": true,
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    },
    "editor.rulers": [100]
}
```
