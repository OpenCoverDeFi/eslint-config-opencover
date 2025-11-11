# OpenCover Custom Rules

This section documents the custom ESLint rules specifically designed for OpenCover's coding standards. These rules are part of the `@opencover-eslint` plugin.

## Configuration

These rules are configured in the main ESLint configuration file. To override any of these rules in your project, add them to your `eslint.config.ts`:

```ts
import { defineConfig } from 'eslint/config';
import opencoverConfig from '@opencover/eslint-config-opencover';

export default defineConfig([
	...opencoverConfig,
	{
		rules: {
			'@opencover-eslint/complex-functions-require-return-type': [
				'error',
				{
					maxComplexity: 15, // Override default complexity threshold
				},
			],
		},
	},
]);
```
