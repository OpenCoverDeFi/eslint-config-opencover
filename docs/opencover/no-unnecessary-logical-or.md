---
title: no-unnecessary-logical-or
rule_type: problem
related_rules: []
further_reading:
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_OR
  - https://www.typescriptlang.org/docs/handbook/2/narrowing.html
---

Disallows unnecessary logical OR (`||`) operators with `null` or `undefined` when the value is already non-nullable according to TypeScript's type system.

Here are some examples:

```typescript
// Bad
const value: string = 'hello';
const result = value || 'default'; // value is never null/undefined

// Good
const value: string = 'hello';
const result = value;
```

## Rule Details

The rule uses TypeScript's type checker to determine if a value can be `null` or `undefined`. It reports an error when:

- A logical OR operator (`||`) is used with `null` or `undefined` on the right side
- The left side expression has a type that does not include `null` or `undefined`
- The type is not `any` or `unknown` (which are skipped)

This helps identify redundant null checks that TypeScript's type system already guarantees are unnecessary.

## Options

This rule has no configuration options.

Examples of **incorrect** code for this rule:

:::incorrect

```typescript
/*eslint @opencover-eslint/no-unnecessary-logical-or: "error"*/

const value: string = 'hello';
const result = value || 'default'; // value is never null/undefined

const num: number = 42;
const numResult = num || 0; // num is never null/undefined

function getName(): string {
    return 'John';
}
const name = getName() || 'Unknown'; // getName() always returns string
```

:::

Examples of **correct** code for this rule:

:::correct

```typescript
/*eslint @opencover-eslint/no-unnecessary-logical-or: "error"*/

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

:::

## Known Limitations

Due to the limits of static analysis, this rule:

- Only checks for `null` or `undefined` on the right side of the `||` operator
- Does not account for cases where the logical OR is used for other purposes (e.g., providing default values for empty strings or zero)
- Relies on TypeScript's type checker, which may not always accurately reflect runtime types

## When Not To Use It

You can turn this rule off if you prefer to use logical OR operators defensively even when TypeScript's type system indicates it's unnecessary, or if you want to maintain consistency with code that may be used in JavaScript contexts where type information is not available.
