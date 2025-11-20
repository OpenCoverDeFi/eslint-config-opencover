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
// Bad - function with complexity > 10 (multiple nested if statements)
function validateUser(user: unknown) {
  if (user && typeof user === 'object') {
    if ('name' in user) {
      if (typeof user.name === 'string') {
        if (user.name.length > 0) {
          if (user.name.length < 100) {
            if (!user.name.includes(' ')) {
              if (user.name.match(/^[a-zA-Z]+$/)) {
                if ('email' in user) {
                  if (typeof user.email === 'string') {
                    return true;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  return false;
}

// Good - same function with explicit return type
function validateUser(user: unknown): boolean {
  if (user && typeof user === 'object') {
    if ('name' in user) {
      if (typeof user.name === 'string') {
        if (user.name.length > 0) {
          if (user.name.length < 100) {
            if (!user.name.includes(' ')) {
              if (user.name.match(/^[a-zA-Z]+$/)) {
                if ('email' in user) {
                  if (typeof user.email === 'string') {
                    return true;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  return false;
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
/*eslint opencover/complexity-requires-return-type: "error"*/

function processData(data: unknown) {
  if (typeof data === 'string') {
    return data.toUpperCase();
  }
  if (typeof data === 'number') {
    return data.toString();
  }
  if (typeof data === 'boolean') {
    return data ? 'true' : 'false';
  }
  if (typeof data === 'object') {
    return JSON.stringify(data);
  }
  if (Array.isArray(data)) {
    return data.join(',');
  }
  if (data === null) {
    return 'null';
  }
  if (data === undefined) {
    return 'undefined';
  }
  if (typeof data === 'function') {
    return 'function';
  }
  if (typeof data === 'symbol') {
    return 'symbol';
  }
  return 'unknown';
}

const processValue = (value: unknown) => {
  if (value === null || value === undefined) {
    return 'nullish';
  }
  if (typeof value === 'string' && value.length > 0) {
    if (value.length > 10) {
      if (value.includes('@')) {
        if (value.includes('.') && value.length < 100) {
          return value.toUpperCase();
        }
      }
    }
  }
  if (typeof value === 'number') {
    if (value > 0) {
      if (value < 100) {
        if (value % 2 === 0) {
          if (value % 4 === 0) {
            return value.toString();
          }
        }
      }
    }
  }
  return String(value);
};
```

:::

Examples of **correct** code for the default `{ "maxComplexity": 10 }` option:

:::correct

```typescript
/*eslint opencover/complexity-requires-return-type: "error"*/

function processData(data: unknown): string {
  if (typeof data === 'string') {
    return data.toUpperCase();
  }
  if (typeof data === 'number') {
    return data.toString();
  }
  if (typeof data === 'boolean') {
    return data ? 'true' : 'false';
  }
  if (typeof data === 'object') {
    return JSON.stringify(data);
  }
  if (Array.isArray(data)) {
    return data.join(',');
  }
  if (data === null) {
    return 'null';
  }
  if (data === undefined) {
    return 'undefined';
  }
  if (typeof data === 'function') {
    return 'function';
  }
  if (typeof data === 'symbol') {
    return 'symbol';
  }
  return 'unknown';
}

const processValue = (value: unknown): string => {
  if (value === null || value === undefined) {
    return 'nullish';
  }
  if (typeof value === 'string' && value.length > 0) {
    if (value.length > 10) {
      if (value.includes('@')) {
        if (value.includes('.') && value.length < 100) {
          return value.toUpperCase();
        }
      }
    }
  }
  if (typeof value === 'number') {
    if (value > 0) {
      if (value < 100) {
        if (value % 2 === 0) {
          if (value % 4 === 0) {
            return value.toString();
          }
        }
      }
    }
  }
  return String(value);
};
```

:::

Examples of **correct** code with `{ "maxComplexity": 15 }` option:

:::correct

```typescript
/*eslint opencover/complexity-requires-return-type: ["error", { "maxComplexity": 15 }]*/

// This function has complexity 12, which is below the threshold of 15
function processData(data: unknown) {
  if (typeof data === 'string') {
    return data.toUpperCase();
  }
  if (typeof data === 'number') {
    return data.toString();
  }
  if (typeof data === 'boolean') {
    return data ? 'true' : 'false';
  }
  if (typeof data === 'object') {
    return JSON.stringify(data);
  }
  if (Array.isArray(data)) {
    return data.join(',');
  }
  if (data === null) {
    return 'null';
  }
  if (typeof data === 'function') {
    return 'function';
  }
  return 'unknown';
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
