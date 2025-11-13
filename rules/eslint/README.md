# ESLint Rules

This section documents the core ESLint rules that are enabled and configured in this ESLint config.

## Extended Configuration

The configuration extends `eslint.configs.recommended`, which includes all recommended rules from the core ESLint JavaScript plugin.

See the [eslint-recommended configuration](https://github.com/eslint/eslint/blob/main/packages/js/src/configs/eslint-recommended.js) for more details.

### Rules Included from eslint.configs.recommended

The following rules are automatically enabled from `eslint.configs.recommended`:

| Rule Name                         | Severity                                                          |
| --------------------------------- | ----------------------------------------------------------------- |
| `constructor-super`               | error (disabled by typescript-eslint)                             |
| `for-direction`                   | error                                                             |
| `getter-return`                   | error (disabled by typescript-eslint)                             |
| `no-async-promise-executor`       | error                                                             |
| `no-case-declarations`            | error                                                             |
| `no-class-assign`                 | error (disabled by typescript-eslint)                             |
| `no-compare-neg-zero`             | error                                                             |
| `no-cond-assign`                  | error                                                             |
| `no-const-assign`                 | error (disabled by typescript-eslint)                             |
| `no-constant-binary-expression`   | error                                                             |
| `no-constant-condition`           | error                                                             |
| `no-control-regex`                | error                                                             |
| `no-debugger`                     | error                                                             |
| `no-delete-var`                   | error                                                             |
| `no-dupe-args`                    | error (disabled by typescript-eslint)                             |
| `no-dupe-class-members`           | error (disabled by typescript-eslint)                             |
| `no-dupe-else-if`                 | error                                                             |
| `no-dupe-keys`                    | error (disabled by typescript-eslint)                             |
| `no-duplicate-case`               | error                                                             |
| `no-empty`                        | error                                                             |
| `no-empty-character-class`        | error                                                             |
| `no-empty-pattern`                | error                                                             |
| `no-empty-static-block`           | error                                                             |
| `no-ex-assign`                    | error                                                             |
| `no-extra-boolean-cast`           | error                                                             |
| `no-fallthrough`                  | error                                                             |
| `no-func-assign`                  | error (disabled by typescript-eslint)                             |
| `no-global-assign`                | error                                                             |
| `no-import-assign`                | error (disabled by typescript-eslint)                             |
| `no-invalid-regexp`               | error                                                             |
| `no-irregular-whitespace`         | error                                                             |
| `no-loss-of-precision`            | error                                                             |
| `no-misleading-character-class`   | error                                                             |
| `no-new-native-nonconstructor`    | error (disabled by typescript-eslint, re-enabled after ESLint v8) |
| `no-nonoctal-decimal-escape`      | error                                                             |
| `no-obj-calls`                    | error (disabled by typescript-eslint, re-enabled after ESLint v8) |
| `no-octal`                        | error                                                             |
| `no-prototype-builtins`           | error                                                             |
| `no-redeclare`                    | error (disabled by typescript-eslint, re-enabled after ESLint v8) |
| `no-regex-spaces`                 | error                                                             |
| `no-self-assign`                  | error                                                             |
| `no-setter-return`                | error (disabled by typescript-eslint, re-enabled after ESLint v8) |
| `no-shadow-restricted-names`      | error                                                             |
| `no-sparse-arrays`                | error                                                             |
| `no-this-before-super`            | error (disabled by typescript-eslint, re-enabled after ESLint v8) |
| `no-undef`                        | error (disabled by typescript-eslint, re-enabled after ESLint v8) |
| `no-unexpected-multiline`         | error                                                             |
| `no-unreachable`                  | error (disabled by typescript-eslint, re-enabled after ESLint v8) |
| `no-unsafe-finally`               | error                                                             |
| `no-unsafe-negation`              | error (disabled by typescript-eslint, re-enabled after ESLint v8) |
| `no-unsafe-optional-chaining`     | error                                                             |
| `no-unused-labels`                | error                                                             |
| `no-unused-private-class-members` | error                                                             |
| `no-unused-vars`                  | error (replaced by @typescript-eslint/no-unused-vars)             |
| `no-useless-backreference`        | error                                                             |
| `no-useless-catch`                | error                                                             |
| `no-useless-escape`               | error                                                             |
| `no-with`                         | error (disabled by typescript-eslint, re-enabled after ESLint v8) |
| `require-yield`                   | error                                                             |
| `use-isnan`                       | error                                                             |
| `valid-typeof`                    | error                                                             |

For more details on each rule, see the [ESLint documentation](https://eslint.org/docs/latest/rules/).

### Notes on Disabled Rules

Some rules from `eslint.configs.recommended` are disabled by `typescript-eslint` because:

1. **Handled by TypeScript**: These rules check for issues that TypeScript's compiler already catches at compile time:
    - `constructor-super`, `getter-return`, `no-class-assign`, `no-const-assign`, `no-dupe-args`, `no-dupe-class-members`, `no-dupe-keys`, `no-func-assign`, `no-import-assign`

2. **Temporarily disabled for ESLint v8 compatibility**: These rules are currently disabled for compatibility with ESLint v8 and will be re-enabled once typescript-eslint drops ESLint v8 support:
    - `no-new-native-nonconstructor`, `no-obj-calls`, `no-redeclare`, `no-setter-return`, `no-this-before-super`, `no-undef`, `no-unreachable`, `no-unsafe-negation`, `no-with`

3. **Replaced by TypeScript ESLint equivalents**: These rules are disabled because TypeScript ESLint provides better type-aware alternatives:
    - `no-unused-vars` → `@typescript-eslint/no-unused-vars`
    - `no-array-constructor` → `@typescript-eslint/no-array-constructor`
    - `no-implied-eval` → `@typescript-eslint/no-implied-eval`
    - `no-unused-expressions` → `@typescript-eslint/no-unused-expressions`
    - `no-throw-literal` → `@typescript-eslint/only-throw-error`
    - `prefer-promise-reject-errors` → `@typescript-eslint/prefer-promise-reject-errors`
    - `require-await` → `@typescript-eslint/require-await`

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
