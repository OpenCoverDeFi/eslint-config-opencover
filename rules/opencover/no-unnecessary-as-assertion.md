# no-unnecessary-as-assertion

## Description

Disallows unnecessary `as` type assertions when TypeScript already knows the expression is of that type. This rule helps prevent redundant type assertions that add no value.

## How It Works

The rule uses TypeScript's type checker to determine if a type assertion is necessary. It reports an error when:

- The expression type is already assignable to the asserted type and vice versa (exact match)
- The expression type is a union that includes the asserted type, and the assertion doesn't provide narrowing
- The type strings match exactly

The rule skips assertions when the source type is `any` or `unknown`, as these may be intentional assertions.

## Configuration

This rule has no configuration options.

```json
{
    "rules": {
        "@opencover/eslint-config-opencover/no-unnecessary-as-assertion": "error"
    }
}
```

## Examples

### ❌ Incorrect

```typescript
const value: string = 'hello';
const result = value as string;

const num: number = 42;
const numResult = num as number;

const union: string | number = 'test';
const str = union as string; // If union is already assignable to string
```

### ✅ Correct

```typescript
const value: string = 'hello';
const result = value;

const num: number = 42;
const numResult = num;

// Valid narrowing from union
const union: string | number = 'test';
if (typeof union === 'string') {
    const str = union; // Type narrowed, no assertion needed
}

// Valid when source is any/unknown
const unknownValue: unknown = getData();
const typed = unknownValue as MyType;
```
