# ESLint Rules

This section documents the core ESLint rules that are enabled and configured in this ESLint config.

## Extended Configuration

The configuration extends `eslint.configs.recommended`, which includes all recommended rules from the core ESLint JavaScript plugin.

**Note:** When using TypeScript ESLint's `recommendedTypeChecked` config, certain base ESLint rules are automatically disabled because TypeScript's type system handles these cases better, or they are replaced by TypeScript-specific versions:

**Disabled (handled by TypeScript compiler or replaced by TypeScript-specific rules):**

- `no-class-assign`, `no-const-assign`, `no-dupe-args`, `no-dupe-class-members`, `no-dupe-keys`, `no-func-assign`, `no-import-assign`, `no-new-native-nonconstructor`, `no-obj-calls`, `no-redeclare`, `no-setter-return`, `no-this-before-super`, `no-undef`, `no-unreachable`, `no-unsafe-negation`, `no-with`, `constructor-super`, `getter-return`, `no-unused-vars` (replaced by `@typescript-eslint/no-unused-vars`), `no-nonoctal-decimal-escape`, `no-unassigned-vars` (replaced by `@typescript-eslint/no-unused-vars`), `no-useless-assignment`, `preserve-caught-error`

**Note:** The rules listed above are verified to be disabled through our test suite. Some rules from `eslint.configs.recommended` may not be actively enforced due to TypeScript's type system or configuration limitations. The working rules listed below are verified to be working through our test suite.

### Rules Included from eslint.configs.recommended

The following rules are automatically enabled from `eslint.configs.recommended` and are verified to be working:

| Rule Name                         | Description                                                                 | Severity |
| --------------------------------- | --------------------------------------------------------------------------- | -------- |
| `no-async-promise-executor`       | Disallows using an async function as a Promise executor                     | error    |
| `no-case-declarations`            | Disallows lexical declarations in case/default clauses                      | error    |
| `no-compare-neg-zero`             | Disallows comparing against `-0`                                            | error    |
| `no-cond-assign`                  | Disallows assignment operators in conditional expressions                   | error    |
| `no-constant-binary-expression`   | Disallows expressions where the operation doesn't affect the value          | error    |
| `no-constant-condition`           | Disallows constant expressions in conditions                                | error    |
| `no-control-regex`                | Disallows control characters in regular expressions                         | error    |
| `no-debugger`                     | Disallows `debugger` statements                                             | error    |
| `no-delete-var`                   | Disallows deleting variables                                                | error    |
| `no-dupe-else-if`                 | Disallows duplicate conditions in if-else-if chains                         | error    |
| `no-duplicate-case`               | Disallows duplicate case labels                                             | error    |
| `no-empty`                        | Disallows empty block statements                                            | error    |
| `no-empty-character-class`        | Disallows empty character classes in regular expressions                    | error    |
| `no-empty-pattern`                | Disallows empty destructuring patterns                                      | error    |
| `no-empty-static-block`           | Disallows empty static blocks                                               | error    |
| `no-ex-assign`                    | Disallows reassigning exceptions in `catch` clauses                         | error    |
| `no-extra-boolean-cast`           | Disallows unnecessary boolean casts                                         | error    |
| `no-fallthrough`                  | Disallows fallthrough of `case` statements                                  | error    |
| `no-global-assign`                | Disallows assignments to native objects or read-only global variables       | error    |
| `no-invalid-regexp`               | Disallows invalid regular expression strings in `RegExp` constructors       | error    |
| `no-irregular-whitespace`         | Disallows irregular whitespace                                              | error    |
| `no-loss-of-precision`            | Disallows literal numbers that lose precision                               | error    |
| `no-prototype-builtins`           | Disallows calling some `Object.prototype` methods directly on objects       | error    |
| `no-regex-spaces`                 | Disallows multiple spaces in regular expression literals                    | error    |
| `no-self-assign`                  | Disallows assignments where both sides are exactly the same                 | error    |
| `no-shadow-restricted-names`      | Disallows shadowing of restricted names                                     | error    |
| `no-sparse-arrays`                | Disallows sparse arrays                                                     | error    |
| `no-unexpected-multiline`         | Disallows confusing multiline expressions                                   | error    |
| `no-unused-labels`                | Disallows unused labels                                                     | error    |
| `no-unused-private-class-members` | Disallows unused private class members                                      | error    |
| `no-useless-backreference`        | Disallows useless backreferences in regular expressions                     | error    |
| `no-useless-catch`                | Disallows unnecessary `catch` clauses                                       | error    |
| `no-useless-escape`               | Disallows unnecessary escape characters                                     | error    |
| `require-yield`                   | Requires generator functions to contain `yield`                             | error    |
| `use-isnan`                       | Requires calls to `isNaN()` to be compared with a number                    | error    |
| `valid-typeof`                    | Enforces comparing `typeof` expressions against valid strings               | error    |
| `for-direction`                   | Enforces `for` loop update clause moving the counter in the right direction | error    |

For more details on each rule, see the [ESLint documentation](https://eslint.org/docs/latest/rules/).

## Extension Rules

The following ESLint rules are added top of the recommended ones:

| Rule Name                 | Description                                                                      | Severity | Configuration                                         |
| ------------------------- | -------------------------------------------------------------------------------- | -------- | ----------------------------------------------------- |
| `block-spacing`           | Enforces consistent spacing inside single-line blocks                            | error    | `'always'`                                            |
| `capitalized-comments`    | Enforces or disallows capitalization of the first letter of a comment            | warn     | `'always'`, `ignoreConsecutiveComments: true`         |
| `comma-spacing`           | Enforces consistent spacing before and after commas                              | error    | `{ before: false, after: true }`                      |
| `key-spacing`             | Enforces consistent spacing between keys and values in object literal properties | warn     | `{ mode: 'strict' }`                                  |
| `keyword-spacing`         | Enforces consistent spacing before and after keywords                            | error    | `{ before: true }`                                    |
| `no-multi-spaces`         | Disallows multiple spaces                                                        | error    | -                                                     |
| `no-multiple-empty-lines` | Disallows multiple empty lines                                                   | warn     | `{ max: 1, maxEOF: 1 }`                               |
| `no-unneeded-ternary`     | Disallows ternary operators when simpler alternatives exist                      | error    | -                                                     |
| `no-use-before-define`    | Disallows the use of variables before they are defined                           | error    | `{ variables: true, functions: true, classes: true }` |
| `no-restricted-globals`   | Disallows specified global variables (Map, Set)                                  | error    | `Map`, `Set` with custom messages                     |
| `object-curly-spacing`    | Enforces consistent spacing inside braces                                        | warn     | `'always'`                                            |
| `quote-props`             | Requires quotes around object literal property names when needed                 | warn     | `'as-needed'`                                         |
| `quotes`                  | Enforces the consistent use of single quotes                                     | error    | `'single'`, `{ avoidEscape: true }`                   |
| `semi`                    | Requires or disallows semicolons                                                 | error    | `'always'`                                            |
| `space-before-blocks`     | Enforces consistent spacing before blocks                                        | error    | `'always'`                                            |
| `space-in-parens`         | Enforces consistent spacing inside parentheses                                   | error    | `'never'`                                             |
| `space-infix-ops`         | Requires spacing around infix operators                                          | error    | -                                                     |
| `spaced-comment`          | Enforces consistent spacing after the `//` or `/*` in a comment                  | error    | `'always'`, `{ block: { balanced: true } }`           |

## Rule Details

### block-spacing

Enforces spacing inside single-line blocks.

**Example:**

```ts
// ❌ Incorrect
if (condition) {
	doSomething();
}

// ✅ Correct
if (condition) {
	doSomething();
}
```

### capitalized-comments

Requires the first letter of comments to be capitalized, but ignores consecutive comments.

**Example:**

```ts
// ❌ Incorrect
// this is a comment

// ✅ Correct
// This is a comment

// ✅ Also correct (consecutive comments are ignored)
// First comment
// second comment
// third comment
```

### comma-spacing

Enforces no space before commas and one space after.

**Example:**

```ts
// ❌ Incorrect
const arr = [1, 2, 3];
const obj = { a: 1, b: 2 };

// ✅ Correct
const arr = [1, 2, 3];
const obj = { a: 1, b: 2 };
```

### key-spacing

Enforces consistent spacing between keys and values in object literals with strict mode.

**Example:**

```ts
// ❌ Incorrect
const obj = {
	key: value,
	anotherKey: 'value',
};

// ✅ Correct
const obj = {
	key: value,
	anotherKey: 'value',
};
```

### keyword-spacing

Enforces spacing before keywords.

**Example:**

```ts
// ❌ Incorrect
if (condition) {
	return value;
}

// ✅ Correct
if (condition) {
	return value;
}
```

### no-multi-spaces

Disallows multiple consecutive spaces.

**Example:**

```ts
// ❌ Incorrect
const x = 5;
const y = 10;

// ✅ Correct
const x = 5;
const y = 10;
```

### no-multiple-empty-lines

Limits consecutive empty lines to a maximum of 1, including at the end of file.

**Example:**

```ts
// ❌ Incorrect
const x = 1;

const y = 2;

// ✅ Correct
const x = 1;

const y = 2;
```

### no-unneeded-ternary

Disallows ternary operators when simpler alternatives exist.

**Example:**

```ts
// ❌ Incorrect
const value = condition ? true : false;
const result = x ? x : y;

// ✅ Correct
const value = condition;
const result = x || y;
```

### no-use-before-define

Disallows using variables, functions, and classes before they are defined.

**Example:**

```ts
// ❌ Incorrect
console.log(x);
const x = 1;

// ✅ Correct
const x = 1;
console.log(x);
```

### no-restricted-globals

Disallows the use of `Map` and `Set` as global constructors.

**Configuration:**

```ts
'no-restricted-globals': [
	'error',
	{
		name: 'Map',
		message: 'Map is not allowed. Use an alternative data structure.',
	},
	{
		name: 'Set',
		message: 'Set is not allowed. Use an alternative data structure.',
	},
]
```

### object-curly-spacing

Enforces spacing inside object braces.

**Example:**

```ts
// ❌ Incorrect
const obj = { a: 1, b: 2 };

// ✅ Correct
const obj = { a: 1, b: 2 };
```

### quote-props

Requires quotes around object property names only when needed.

**Example:**

```ts
// ❌ Incorrect
const obj = {
	'valid-key': 1,
	normalKey: 2,
};

// ✅ Correct
const obj = {
	'valid-key': 1,
	normalKey: 2,
};
```

### quotes

Enforces single quotes for strings, but allows double quotes to avoid escaping.

**Example:**

```ts
// ❌ Incorrect
const str = 'Hello, world!';
const str2 = "It's a test";

// ✅ Correct
const str = 'Hello, world!';
const str2 = "It's a test"; // Double quotes allowed to avoid escaping
```

### semi

Requires semicolons at the end of statements.

**Example:**

```ts
// ❌ Incorrect
const x = 1;
const y = 2;

// ✅ Correct
const x = 1;
const y = 2;
```

### space-before-blocks

Enforces spacing before blocks.

**Example:**

```ts
// ❌ Incorrect
if (condition) {
	doSomething();
}

// ✅ Correct
if (condition) {
	doSomething();
}
```

### space-in-parens

Disallows spacing inside parentheses.

**Example:**

```ts
// ❌ Incorrect
if (condition) {
	doSomething(x, y);
}

// ✅ Correct
if (condition) {
	doSomething(x, y);
}
```

### space-infix-ops

Requires spacing around infix operators.

**Example:**

```ts
// ❌ Incorrect
const sum = x + y;
const product = x * y;

// ✅ Correct
const sum = x + y;
const product = x * y;
```

### spaced-comment

Enforces spacing after comment markers, with balanced spacing for block comments.

**Example:**

```ts
// ❌ Incorrect
//comment
/*comment*/

// ✅ Correct
// comment
/* comment */
```
