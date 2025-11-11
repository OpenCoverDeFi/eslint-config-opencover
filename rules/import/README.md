# Import Plugin Rules

This section documents the ESLint Import plugin rules that are enabled and configured in this ESLint config.

## Enabled Rules

| Rule Name                      | Description                                             | Severity | Configuration                   |
| ------------------------------ | ------------------------------------------------------- | -------- | ------------------------------- |
| `import/order`                 | Enforces a convention in the order of import statements | warn     | Custom path groups for `@dc/**` |
| `import/prefer-default-export` | Prefer default export over named export (disabled)      | off      | -                               |

## Rule Details

### import/order

Enforces a specific order for import statements. The configuration includes custom path groups to handle `@dc/**` imports.

**Configuration:**

```ts
'import/order': [
	'warn',
	{
		pathGroups: [
			{
				pattern: '@dc/**',
				group: 'parent',
				position: 'before',
			},
		],
	},
]
```

**Import Order:**

1. External dependencies (node_modules)
2. `@dc/**` imports (custom path group)
3. Internal imports (relative paths)

**Example:**

```ts
// ✅ Correct import order
import { useState } from 'react';
import { Button } from '@dc/components';
import { helper } from './utils';
import type { User } from './types';
```

### import/prefer-default-export

This rule is disabled (`off`), allowing both default and named exports without warnings.

## Settings

The configuration includes TypeScript resolver settings:

```ts
settings: {
	'import/resolver': {
		typescript: {},
	},
}
```

This enables the import plugin to resolve TypeScript module paths correctly.
