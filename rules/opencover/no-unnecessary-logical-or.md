# no-unnecessary-logical-or

## Description

Disallows unnecessary logical OR (`||`) operators with `null` or `undefined` when the value is already non-nullable according to TypeScript's type system.

## How It Works

The rule uses TypeScript's type checker to determine if a value can be `null` or `undefined`. It reports an error when:

- A logical OR operator (`||`) is used with `null` or `undefined` on the right side
- The left side expression has a type that does not include `null` or `undefined`
- The type is not `any` or `unknown` (which are skipped)

This helps identify redundant null checks that TypeScript's type system already guarantees are unnecessary.

## Configuration

This rule has no configuration options.

```json
{
    "rules": {
        "@opencover/eslint-config-opencover/no-unnecessary-logical-or": "error"
    }
}
```

## Examples

### ❌ Incorrect

```typescript
const value: string = 'hello';
const result = value || 'default'; // value is never null/undefined

const num: number = 42;
const numResult = num || 0; // num is never null/undefined

function getName(): string {
    return 'John';
}
const name = getName() || 'Unknown'; // getName() always returns string
```

### ✅ Correct

```typescript
const value: string = 'hello';
const result = value;

const num: number = 42;
const numResult = num;

function getName(): string {
    return 'John';
}
const name = getName();

// Valid when value can be null/undefined
function getValue(): string | null {
    return Math.random() > 0.5 ? 'value' : null;
}
const result = getValue() || 'default'; // getValue() can return null
```
