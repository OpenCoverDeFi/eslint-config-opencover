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
	...opencoverConfig,
	{
		rules: {
			// your overrides
		},
	},
]);
```

### Usage for React

Adjust your `eslint.config.ts` like this:

```ts
import { defineConfig } from 'eslint/config';
import opencoverReactConfig from '@opencover/eslint-config-opencover/with-react';

export default defineConfig([
	...opencoverReactConfig,
	{
		rules: {
			// your overrides
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
