---
title: complexity-requires-return-type
rule_type: problem
related_rules: []
further_reading:
  - https://en.wikipedia.org/wiki/Cyclomatic_complexity
  - https://www.typescriptlang.org/docs/handbook/functions.html#function-types
---

Requires explicit return types for functions that exceed a certain complexity threshold. This rule helps maintain code readability by ensuring complex functions have clear type annotations.

Here are some examples:

```typescript
// Bad
function processData(data: Data[]) {
  if (data.length === 0) return [];
  return data
    .map((item) => {
      if (item.valid) {
        return transform(item);
      }
      return null;
    })
    .filter(Boolean);
}

// Good
function processData(data: Data[]): TransformedData[] {
  if (data.length === 0) return [];
  return data
    .map((item) => {
      if (item.valid) {
        return transform(item);
      }
      return null;
    })
    .filter(Boolean);
}
```

## Rule Details

This rule calculates function complexity by counting decision points in the code:

- `if` statements
- `switch` statements and cases
- Loops (`for`, `for...in`, `for...of`, `while`, `do...while`)
- Ternary operators (`? :`)
- Logical operators (`||`, `&&`)

Functions with complexity greater than the configured threshold (default: 10) must have an explicit return type annotation.

This rule applies to:

- Function declarations
- Function expressions
- Arrow function expressions

## Options

- `maxComplexity` (number, default: 10): The maximum complexity allowed before requiring an explicit return type.

### maxComplexity

Examples of **incorrect** code for the default `{ "maxComplexity": 10 }` option:

:::incorrect

```typescript
/*eslint @opencover-eslint/complexity-requires-return-type: "error"*/

function processData(data: Data[]) {
  if (data.length === 0) return [];
  return data
    .map((item) => {
      if (item.valid) {
        return transform(item);
      }
      return null;
    })
    .filter(Boolean);
}

const handler = (event: Event) => {
  if (event.type === 'click') {
    if (event.target) {
      return handleClick(event.target);
    }
  }
  return null;
};
```

:::

Examples of **correct** code for the default `{ "maxComplexity": 10 }` option:

:::correct

```typescript
/*eslint @opencover-eslint/complexity-requires-return-type: "error"*/

function processData(data: Data[]): TransformedData[] {
  if (data.length === 0) return [];
  return data
    .map((item) => {
      if (item.valid) {
        return transform(item);
      }
      return null;
    })
    .filter(Boolean);
}

const handler = (event: Event): void => {
  if (event.type === 'click') {
    if (event.target) {
      handleClick(event.target);
    }
  }
};
```

:::

Examples of **correct** code with `{ "maxComplexity": 15 }` option:

:::correct

```typescript
/*eslint @opencover-eslint/complexity-requires-return-type: ["error", { "maxComplexity": 15 }]*/

// This function has complexity 12, which is below the threshold of 15
function processData(data: Data[]) {
  if (data.length === 0) return [];
  return data
    .map((item) => {
      if (item.valid) {
        return transform(item);
      }
      return null;
    })
    .filter(Boolean);
}
```

:::

## Known Limitations

Due to the limits of static analysis, this rule:

- Does not account for function calls within the function body when calculating complexity
- May not accurately reflect runtime complexity in all cases
- Does not consider the complexity of nested functions separately

## When Not To Use It

You can turn this rule off if you are not concerned with requiring explicit return types for complex functions, or if you prefer to rely on TypeScript's type inference for all functions regardless of complexity.
