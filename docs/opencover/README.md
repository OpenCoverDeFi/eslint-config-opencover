# OpenCover Custom Rules

This section documents the custom ESLint rules specifically designed for OpenCover's coding standards. These rules are part of the `@opencover-eslint` plugin.

## Available Rules

- [`complexity-requires-return-type`](./complexity-requires-return-type.md) - Requires explicit return types for complex functions
- [`filename-no-dots`](./filename-no-dots.md) - Disallows dots in filenames (except .test. in test files)
- [`no-unnecessary-as-assertion`](./no-unnecessary-as-assertion.md) - Disallows unnecessary `as` type assertions
- [`no-unnecessary-logical-or`](./no-unnecessary-logical-or.md) - Disallows unnecessary logical OR operators with null/undefined
- [`no-unnecessary-optional-chain`](./no-unnecessary-optional-chain.md) - Disallows unnecessary optional chaining
- [`no-unnecessary-typeof`](./no-unnecessary-typeof.md) - Disallows unnecessary `typeof` checks

## Configuration

These rules are configured in the main ESLint configuration file. To override any of these rules in your project, add them to your `eslint.config.ts`:

```ts
import { defineConfig } from 'eslint/config';
import opencoverConfig from '@opencover/eslint-config-opencover';

export default defineConfig([
  ...opencoverConfig,
  {
    rules: {
      '@opencover-eslint/complexity-requires-return-type': [
        'error',
        {
          maxComplexity: 15, // Override default complexity threshold
        },
      ],
    },
  },
]);
```
