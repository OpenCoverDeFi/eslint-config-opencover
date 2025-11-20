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
// Bad - unnecessary assertion when type is already known
const value: string = 'hello';
const result = value as string;

// Good - no assertion needed
const value: string = 'hello';
const result = value;

// Bad - unnecessary assertion on union when type can be inferred
const union: string | number = 'hello';
const str = union as string;

// Good - use type narrowing instead
const union: string | number = 'hello';
if (typeof union === 'string') {
  const str = union; // Type narrowed, no assertion needed
}
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
/*eslint opencover/no-unnecessary-as-assertion: "error"*/

const value: string = 'hello';
const result = value as string;

const num: number = 42;
const numResult = num as number;

const arr: string[] = ['a', 'b'];
const result = arr as string[];

type Example = { value: boolean };
const ex: Example = { value: true };
const result = ex as Example;

function getString(): string {
  return 'hello';
}
const result = getString() as string;

const union: string | number = 'hello';
const str = union as string;

type A = { type: 'a'; value: string };
type B = { type: 'b'; value: number };
const value: A | B = { type: 'a', value: 'test' };
const result = value as A;
```

:::

Examples of **correct** code for this rule:

:::correct

```typescript
/*eslint opencover/no-unnecessary-as-assertion: "error"*/

const value: string = 'hello';
const result = value;

const num: number = 42;
const numResult = num;

const arr: string[] = ['a', 'b'];
const result = arr;

// Valid narrowing from union using type guards
const union: string | number = 'test';
if (typeof union === 'string') {
  const str = union; // Type narrowed, no assertion needed
}

// Valid when source is any/unknown - these are intentional assertions
function getValue(): unknown {
  return 'hello';
}
const typed = getValue() as string;

function getAnyValue(): any {
  return 'hello';
}
const anyTyped = getAnyValue() as string;

// Valid "as const" assertions
const tuple = ['a', 'b'] as const;
const obj = { key: 'value' } as const;
```

:::

## Known Limitations

Due to the limits of static analysis, this rule:

- May not detect all cases where type assertions are unnecessary, especially with complex generic types
- Does not account for cases where assertions are used for documentation purposes
- Relies on TypeScript's type checker, which may have limitations in certain edge cases

## When Not To Use It

You can turn this rule off if you prefer to use type assertions for documentation purposes even when they're technically unnecessary, or if you want to maintain consistency with code that may require assertions in certain contexts.
