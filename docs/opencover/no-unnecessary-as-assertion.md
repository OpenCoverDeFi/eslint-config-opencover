---
title: no-unnecessary-as-assertion
rule_type: problem
related_rules: []
further_reading:
  - https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions
  - https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#assertion-functions
---

Disallows unnecessary `as` type assertions when TypeScript already knows the expression is of that type. This rule helps prevent redundant type assertions that add no value.

Here are some examples:

```typescript
// Bad
const value: string = 'hello';
const result = value as string;

// Good
const value: string = 'hello';
const result = value;
```

## Rule Details

The rule uses TypeScript's type checker to determine if a type assertion is necessary. It reports an error when:

- The expression type is already assignable to the asserted type and vice versa (exact match)
- The expression type is a union that includes the asserted type, and the assertion doesn't provide narrowing
- The type strings match exactly

The rule skips assertions when the source type is `any` or `unknown`, as these may be intentional assertions.

## Options

This rule has no configuration options.

Examples of **incorrect** code for this rule:

:::incorrect

```typescript
/*eslint @opencover-eslint/no-unnecessary-as-assertion: "error"*/

const value: string = 'hello';
const result = value as string;

const num: number = 42;
const numResult = num as number;

const union: string | number = 'test';
const str = union as string; // If union is already assignable to string
```

:::

Examples of **correct** code for this rule:

:::correct

```typescript
/*eslint @opencover-eslint/no-unnecessary-as-assertion: "error"*/

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

:::

## Known Limitations

Due to the limits of static analysis, this rule:

- May not detect all cases where type assertions are unnecessary, especially with complex generic types
- Does not account for cases where assertions are used for documentation purposes
- Relies on TypeScript's type checker, which may have limitations in certain edge cases

## When Not To Use It

You can turn this rule off if you prefer to use type assertions for documentation purposes even when they're technically unnecessary, or if you want to maintain consistency with code that may require assertions in certain contexts.
