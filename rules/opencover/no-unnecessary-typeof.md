# no-unnecessary-typeof

## Description

Disallows unnecessary `typeof` checks when TypeScript already knows the exact type of the variable. This rule helps eliminate redundant runtime type checks that are unnecessary due to TypeScript's compile-time type system.

## How It Works

The rule detects `typeof` comparisons (e.g., `typeof x === 'string'`) and uses TypeScript's type checker to determine if the check is necessary. It reports an error when:

- The variable's type is already exactly the type being checked (not a union)
- The type check is redundant because TypeScript guarantees the type at compile time

The rule handles special cases:

- Boolean types (which TypeScript represents as `true | false` union internally)
- Union types (where `typeof` checks are necessary for narrowing)
- Primitive types (`string`, `number`, `bigint`, `symbol`, `undefined`)
- Object and function types

## Configuration

This rule has no configuration options.

```json
{
	"rules": {
		"@opencover/eslint-config-opencover/no-unnecessary-typeof": "error"
	}
}
```

## Examples

### ❌ Incorrect

```typescript
const value: string = 'hello';
if (typeof value === 'string') {
	// TypeScript already knows value is string
}

const num: number = 42;
if (typeof num === 'number') {
	// TypeScript already knows num is number
}

function getName(): string {
	return 'John';
}
const name = getName();
if (typeof name === 'string') {
	// getName() always returns string
}
```

### ✅ Correct

```typescript
const value: string = 'hello';
// No typeof check needed, use value directly

const num: number = 42;
// No typeof check needed, use num directly

function getName(): string {
	return 'John';
}
const name = getName();
// No typeof check needed

// Valid when type is a union (typeof is necessary for narrowing)
function getValue(): string | number {
	return Math.random() > 0.5 ? 'hello' : 42;
}
const value = getValue();
if (typeof value === 'string') {
	// typeof check is necessary to narrow the union type
	console.log(value.toUpperCase());
}
```
