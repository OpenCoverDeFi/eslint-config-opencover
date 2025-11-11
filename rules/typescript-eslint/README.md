# TypeScript ESLint Rules

This section documents the TypeScript ESLint rules that are enabled and configured in this ESLint config.

## Extended Configuration

The configuration extends `typescript-eslint.configs.recommendedTypeChecked`, which includes all recommended type-checked rules from the TypeScript ESLint plugin. This provides comprehensive TypeScript-specific linting with type-aware rules.

### Rules Included from recommendedTypeChecked

The following rules are automatically enabled from `typescript-eslint.configs.recommendedTypeChecked` and are verified to be working:

| Rule Name                                                | Description                                                                                | Severity |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------ | -------- |
| `@typescript-eslint/await-thenable`                      | Disallows awaiting a value that is not a Thenable                                          | error    |
| `@typescript-eslint/ban-ts-comment`                      | Disallows `@ts-<directive>` comments or requires descriptions after directive              | error    |
| `@typescript-eslint/no-array-constructor`                | Disallows `Array` constructors (replaces `no-array-constructor`)                           | error    |
| `@typescript-eslint/no-array-delete`                     | Disallows deleting array elements                                                          | error    |
| `@typescript-eslint/no-base-to-string`                   | Disallows calling `.toString()` on non-string types                                        | error    |
| `@typescript-eslint/no-duplicate-enum-values`            | Disallows duplicate enum member values                                                     | error    |
| `@typescript-eslint/no-duplicate-type-constituents`      | Disallows duplicate constituents of union or intersection types                            | error    |
| `@typescript-eslint/no-empty-object-type`                | Disallows empty object types (`{}`)                                                        | error    |
| `@typescript-eslint/no-explicit-any`                     | Disallows the `any` type                                                                   | error    |
| `@typescript-eslint/no-extra-non-null-assertion`         | Disallows extra non-null assertions                                                        | error    |
| `@typescript-eslint/no-floating-promises`                | Disallows floating promises                                                                | error    |
| `@typescript-eslint/no-for-in-array`                     | Disallows iterating over an array with a for-in loop                                       | error    |
| `@typescript-eslint/no-implied-eval`                     | Disallows the use of `eval()`-like methods                                                 | error    |
| `@typescript-eslint/no-misused-new`                      | Disallows using `new` on interfaces or type literals                                       | error    |
| `@typescript-eslint/no-misused-promises`                 | Disallows Promises in places not designed to handle them                                   | error    |
| `@typescript-eslint/no-namespace`                        | Disallows TypeScript namespaces                                                            | error    |
| `@typescript-eslint/no-non-null-asserted-optional-chain` | Disallows non-null assertions after optional chain expressions                             | error    |
| `@typescript-eslint/no-redundant-type-constituents`      | Disallows members of unions and intersections that do nothing or override type information | error    |
| `@typescript-eslint/no-require-imports`                  | Disallows `require()` statements                                                           | error    |
| `@typescript-eslint/no-this-alias`                       | Disallows aliasing `this`                                                                  | error    |
| `@typescript-eslint/no-unnecessary-type-assertion`       | Disallows type assertions that do not change the type of an expression                     | error    |
| `@typescript-eslint/no-unnecessary-type-constraint`      | Disallows unnecessary constraints on generic types                                         | error    |
| `@typescript-eslint/no-unsafe-argument`                  | Disallows calling a function with an `any` type value                                      | error    |
| `@typescript-eslint/no-unsafe-assignment`                | Disallows assigning an `any` type value                                                    | error    |
| `@typescript-eslint/no-unsafe-call`                      | Disallows calling a value with type `any`                                                  | error    |
| `@typescript-eslint/no-unsafe-declaration-merging`       | Disallows unsafe declaration merging                                                       | error    |
| `@typescript-eslint/no-unsafe-enum-comparison`           | Disallows comparing enums with non-enum values                                             | error    |
| `@typescript-eslint/no-unsafe-function-type`             | Disallows the `Function` type                                                              | error    |
| `@typescript-eslint/no-unsafe-member-access`             | Disallows member access on any typed variables                                             | error    |
| `@typescript-eslint/no-unsafe-return`                    | Disallows returning an `any` typed value                                                   | error    |
| `@typescript-eslint/no-unsafe-unary-minus`               | Disallows unary minus operator on non-number types                                         | error    |
| `@typescript-eslint/no-unused-expressions`               | Disallows unused expressions                                                               | error    |
| `@typescript-eslint/no-unused-vars`                      | Disallows unused variables (replaces `no-unused-vars`)                                     | error    |
| `@typescript-eslint/no-wrapper-object-types`             | Disallows wrapper object types (String, Number, Boolean)                                   | error    |
| `@typescript-eslint/only-throw-error`                    | Enforces throwing only `Error` objects                                                     | error    |
| `@typescript-eslint/prefer-as-const`                     | Enforces using `as const` instead of type assertions for literal types                     | error    |
| `@typescript-eslint/prefer-namespace-keyword`            | Enforces using `namespace` keyword instead of `module` keyword                             | error    |
| `@typescript-eslint/prefer-promise-reject-errors`        | Enforces throwing errors in promises                                                       | error    |
| `@typescript-eslint/require-await`                       | Disallows async functions which have no `await` expression                                 | error    |
| `@typescript-eslint/restrict-plus-operands`              | When adding two variables, operands must both be of type number or of type string          | error    |
| `@typescript-eslint/restrict-template-expressions`       | Enforces template literal expressions to be of string type                                 | error    |
| `@typescript-eslint/triple-slash-reference`              | Disallows `/// <reference path="" />` comments                                             | error    |
| `@typescript-eslint/unbound-method`                      | Enforces unbound methods are called with their expected scope                              | error    |

For more details on each rule, see the [typescript-eslint documentation](https://typescript-eslint.io/rules/).

## Overridden Rules

The following TypeScript ESLint rules are explicitly configured or overridden in this config:

| Rule Name                                          | Description                                                                | Severity | Configuration                                            |
| -------------------------------------------------- | -------------------------------------------------------------------------- | -------- | -------------------------------------------------------- |
| `@typescript-eslint/consistent-type-imports`       | Enforces consistent use of type imports                                    | error    | `prefer: 'type-imports', disallowTypeAnnotations: false` |
| `@typescript-eslint/explicit-member-accessibility` | Requires explicit accessibility modifiers on class members                 | error    | -                                                        |
| `@typescript-eslint/member-ordering`               | Enforces consistent member ordering in classes                             | error    | -                                                        |
| `@typescript-eslint/no-non-null-assertion`         | Disallows non-null assertions using the `!` postfix operator               | error    | -                                                        |
| `@typescript-eslint/no-unnecessary-condition`      | Disallows conditionals where the type assertion always (or never) succeeds | error    | -                                                        |
| `@typescript-eslint/no-restricted-types`           | Disallows specific types (Map, Set)                                        | error    | `types: { Map: {...}, Set: {...} }`                      |

## Rule Details

### @typescript-eslint/consistent-type-imports

Enforces that type imports use the `type` keyword for better clarity and tree-shaking.

**Configuration:**

```ts
'@typescript-eslint/consistent-type-imports': [
	'error',
	{
		prefer: 'type-imports',
		disallowTypeAnnotations: false,
	},
]
```

**Example:**

```ts
// ❌ Incorrect
import { User, type UserRole } from './types';

// ✅ Correct
import type { User, UserRole } from './types';
```

### @typescript-eslint/explicit-member-accessibility

Requires explicit accessibility modifiers (`public`, `private`, `protected`) on all class members.

**Example:**

```ts
// ❌ Incorrect
class MyClass {
	name: string;

	constructor(name: string) {
		this.name = name;
	}
}

// ✅ Correct
class MyClass {
	public name: string;

	public constructor(name: string) {
		this.name = name;
	}
}
```

### @typescript-eslint/member-ordering

Enforces consistent ordering of class members. The conventional order is:

1. Static variables (constants first, then other statics)
2. Instance variables (private first, then protected, then public)
3. Constructors
4. Static methods
5. Instance methods (public first, then protected, then private)

### @typescript-eslint/no-non-null-assertion

Disallows the use of the non-null assertion operator (`!`), which can be dangerous and indicates potential type safety issues.

**Example:**

```ts
// ❌ Incorrect
const value = someValue!.property;

// ✅ Correct
if (someValue) {
	const value = someValue.property;
}
```

### @typescript-eslint/no-unnecessary-condition

Catches conditionals that are always true or always false based on TypeScript's type analysis.

### @typescript-eslint/no-restricted-types

Disallows the use of `Map` and `Set` types, requiring alternative data structures.

**Configuration:**

```ts
'@typescript-eslint/no-restricted-types': [
	'error',
	{
		types: {
			Map: {
				message: 'Map is not allowed. Use an alternative data structure.',
			},
			Set: {
				message: 'Set is not allowed. Use an alternative data structure.',
			},
		},
	},
]
```
