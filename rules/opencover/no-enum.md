# no-enum

## Description

Disallows the use of TypeScript enums. This rule enforces the use of union types or const objects instead of enums, which aligns with modern TypeScript best practices.

## How It Works

The rule detects any `enum` declaration in TypeScript code and reports an error. Enums are discouraged because:

- They generate additional JavaScript code
- They can cause issues with tree-shaking
- Union types provide better type safety and are more idiomatic in modern TypeScript

## Configuration

This rule has no configuration options.

```json
{
	"rules": {
		"@opencover/eslint-config-opencover/no-enum": "error"
	}
}
```

## Examples

### ❌ Incorrect

```typescript
enum Status {
	Pending = 'pending',
	Active = 'active',
	Inactive = 'inactive',
}

enum Direction {
	Up,
	Down,
	Left,
	Right,
}
```

### ✅ Correct

```typescript
type Status = 'pending' | 'active' | 'inactive';

const Status = {
	Pending: 'pending',
	Active: 'active',
	Inactive: 'inactive',
} as const;

type Direction = 'up' | 'down' | 'left' | 'right';
```
