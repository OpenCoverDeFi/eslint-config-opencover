---
title: no-unnecessary-optional-chain
rule_type: problem
related_rules: []
further_reading:
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
  - https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#optional-chaining
---

Disallows unnecessary optional chaining (`?.`) when the value is already non-nullable according to TypeScript's type system.

Here are some examples:

```typescript
// Bad
const user: { name: string } = { name: 'John' };
const name = user?.name; // user is never null/undefined

// Good
const user: { name: string } = { name: 'John' };
const name = user.name;
```

## Rule Details

The rule uses TypeScript's type checker to determine if a value can be `null` or `undefined`. It reports an error when:

- Optional chaining (`?.`) is used on an expression
- The expression's type does not include `null` or `undefined` (either directly or as part of a union type)

This helps identify redundant optional chaining that TypeScript's type system already guarantees is unnecessary.

## Options

This rule has no configuration options.

Examples of **incorrect** code for this rule:

:::incorrect

```typescript
/*eslint @opencover-eslint/no-unnecessary-optional-chain: "error"*/

const user: { name: string } = { name: 'John' };
const name = user?.name; // user is never null/undefined

const value: string = 'hello';
const length = value?.length; // value is never null/undefined

function getName(): string {
  return 'John';
}
const name = getName()?.toUpperCase(); // getName() always returns string
```

:::

Examples of **correct** code for this rule:

:::correct

```typescript
/*eslint @opencover-eslint/no-unnecessary-optional-chain: "error"*/

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

:::

## Known Limitations

Due to the limits of static analysis, this rule:

- Relies on TypeScript's type checker, which may not always accurately reflect runtime types
- Does not account for type narrowing that occurs after the optional chain
- May not detect cases where optional chaining is used defensively even when types suggest it's unnecessary

## When Not To Use It

You can turn this rule off if you prefer to use optional chaining defensively even when TypeScript's type system indicates it's unnecessary, or if you want to maintain consistency with code that may be used in JavaScript contexts where type information is not available.
