# no-unnecessary-optional-chain

## Description

Disallows unnecessary optional chaining (`?.`) when the value is already non-nullable according to TypeScript's type system.

## How It Works

The rule uses TypeScript's type checker to determine if a value can be `null` or `undefined`. It reports an error when:

- Optional chaining (`?.`) is used on an expression
- The expression's type does not include `null` or `undefined` (either directly or as part of a union type)

This helps identify redundant optional chaining that TypeScript's type system already guarantees is unnecessary.

## Configuration

This rule has no configuration options.

```json
{
	"rules": {
		"@opencover/eslint-config-opencover/no-unnecessary-optional-chain": "error"
	}
}
```

## Examples

### ❌ Incorrect

```typescript
const user: { name: string } = { name: 'John' };
const name = user?.name; // user is never null/undefined

const value: string = 'hello';
const length = value?.length; // value is never null/undefined

function getName(): string {
	return 'John';
}
const name = getName()?.toUpperCase(); // getName() always returns string
```

### ✅ Correct

```typescript
const user: { name: string } = { name: 'John' };
const name = user.name;

const value: string = 'hello';
const length = value.length;

function getName(): string {
	return 'John';
}
const name = getName().toUpperCase();

// Valid when value can be null/undefined
function getUser(): { name: string } | null {
	return Math.random() > 0.5 ? { name: 'John' } : null;
}
const name = getUser()?.name; // getUser() can return null
```
