---
title: no-unnecessary-typeof
rule_type: problem
related_rules: []
further_reading:
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof
  - https://www.typescriptlang.org/docs/handbook/2/narrowing.html#typeof-type-guards
---

Disallows unnecessary `typeof` checks when TypeScript already knows the exact type of the variable. This rule helps eliminate redundant runtime type checks that are unnecessary due to TypeScript's compile-time type system.

Here are some examples:

```typescript
// Bad
const value: string = 'hello';
if (typeof value === 'string') {
    // TypeScript already knows value is string
}

// Good
const value: string = 'hello';
// No typeof check needed, use value directly
```

## Rule Details

The rule detects `typeof` comparisons (e.g., `typeof x === 'string'`) and uses TypeScript's type checker to determine if the check is necessary. It reports an error when:

- The variable's type is already exactly the type being checked (not a union)
- The type check is redundant because TypeScript guarantees the type at compile time

The rule handles special cases:

- Boolean types (which TypeScript represents as `true | false` union internally)
- Union types (where `typeof` checks are necessary for narrowing)
- Primitive types (`string`, `number`, `bigint`, `symbol`, `undefined`)
- Object and function types

## Options

This rule has no configuration options.

Examples of **incorrect** code for this rule:

:::incorrect

```typescript
/*eslint @opencover-eslint/no-unnecessary-typeof: "error"*/

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

:::

Examples of **correct** code for this rule:

:::correct

```typescript
/*eslint @opencover-eslint/no-unnecessary-typeof: "error"*/

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

:::

## Known Limitations

Due to the limits of static analysis, this rule:

- May not detect all cases where `typeof` checks are unnecessary, especially with complex generic types
- Does not account for cases where `typeof` checks are used for runtime validation or documentation purposes
- Relies on TypeScript's type checker, which may have limitations in certain edge cases
- Does not consider cases where `typeof` is used for other purposes (e.g., checking for `undefined` in optional properties)

## When Not To Use It

You can turn this rule off if you prefer to use `typeof` checks for runtime validation or documentation purposes even when they're technically unnecessary, or if you want to maintain consistency with code that may be used in JavaScript contexts where type information is not available.
