## 1. ESLint – Core Recommended Rules

These are the standard **ESLint recommended rules**.
They focus on catching common JavaScript mistakes such as:

- Invalid or unsafe syntax
- Logic errors
- Unreachable or unused code
- Accidental globals or reassignment
- Broken control flow

These rules apply to **all JavaScript files** unless explicitly disabled later.

```json
{
  "constructor-super": "error",
  "for-direction": "error",
  "getter-return": "error",
  "no-async-promise-executor": "error",
  "no-case-declarations": "error",
  "no-class-assign": "error",
  "no-compare-neg-zero": "error",
  "no-cond-assign": "error",
  "no-const-assign": "error",
  "no-constant-binary-expression": "error",
  "no-constant-condition": "error",
  "no-control-regex": "error",
  "no-debugger": "error",
  "no-delete-var": "error",
  "no-dupe-args": "error",
  "no-dupe-class-members": "error",
  "no-dupe-else-if": "error",
  "no-dupe-keys": "error",
  "no-duplicate-case": "error",
  "no-empty": "error",
  "no-empty-character-class": "error",
  "no-empty-pattern": "error",
  "no-empty-static-block": "error",
  "no-ex-assign": "error",
  "no-extra-boolean-cast": "error",
  "no-fallthrough": "error",
  "no-func-assign": "error",
  "no-global-assign": "error",
  "no-import-assign": "error",
  "no-invalid-regexp": "error",
  "no-irregular-whitespace": "error",
  "no-loss-of-precision": "error",
  "no-misleading-character-class": "error",
  "no-new-native-nonconstructor": "error",
  "no-nonoctal-decimal-escape": "error",
  "no-obj-calls": "error",
  "no-octal": "error",
  "no-prototype-builtins": "error",
  "no-redeclare": "error",
  "no-regex-spaces": "error",
  "no-self-assign": "error",
  "no-setter-return": "error",
  "no-shadow-restricted-names": "error",
  "no-sparse-arrays": "error",
  "no-this-before-super": "error",
  "no-undef": "error",
  "no-unexpected-multiline": "error",
  "no-unreachable": "error",
  "no-unsafe-finally": "error",
  "no-unsafe-negation": "error",
  "no-unsafe-optional-chaining": "error",
  "no-unused-labels": "error",
  "no-unused-private-class-members": "error",
  "no-unused-vars": "error",
  "no-useless-backreference": "error",
  "no-useless-catch": "error",
  "no-useless-escape": "error",
  "no-with": "error",
  "require-yield": "error",
  "use-isnan": "error",
  "valid-typeof": "error"
}
```

---

## 2. TypeScript Files – Disable Conflicting ESLint Rules

When working with TypeScript, some core ESLint rules overlap with or conflict with TypeScript-aware rules.

It also enforces a few modern JavaScript best practices.

```json
{
  "constructor-super": "off",
  "getter-return": "off",
  "no-class-assign": "off",
  "no-const-assign": "off",
  "no-dupe-args": "off",
  "no-dupe-class-members": "off",
  "no-dupe-keys": "off",
  "no-func-assign": "off",
  "no-import-assign": "off",
  "no-new-native-nonconstructor": "off",
  "no-new-symbol": "off",
  "no-obj-calls": "off",
  "no-redeclare": "off",
  "no-setter-return": "off",
  "no-this-before-super": "off",
  "no-undef": "off",
  "no-unreachable": "off",
  "no-unsafe-negation": "off",
  "no-var": "error",
  "no-with": "off",
  "prefer-const": "error",
  "prefer-rest-params": "error",
  "prefer-spread": "error"
}
```

---

## 3. TypeScript ESLint – Recommended Rules

These rules are **TypeScript-specific** and focus on:

- Preventing unsafe or confusing types
- Avoiding `any`
- Catching unused variables and expressions
- Enforcing clearer type usage

They replace several core ESLint rules with TypeScript-aware versions.

```json
{
  "@typescript-eslint/ban-ts-comment": "error",
  "no-array-constructor": "off",
  "@typescript-eslint/no-array-constructor": "error",
  "@typescript-eslint/no-duplicate-enum-values": "error",
  "@typescript-eslint/no-empty-object-type": "error",
  "@typescript-eslint/no-explicit-any": "error",
  "@typescript-eslint/no-extra-non-null-assertion": "error",
  "@typescript-eslint/no-misused-new": "error",
  "@typescript-eslint/no-namespace": "error",
  "@typescript-eslint/no-non-null-asserted-optional-chain": "error",
  "@typescript-eslint/no-require-imports": "error",
  "@typescript-eslint/no-this-alias": "error",
  "@typescript-eslint/no-unnecessary-type-constraint": "error",
  "@typescript-eslint/no-unsafe-declaration-merging": "error",
  "@typescript-eslint/no-unsafe-function-type": "error",
  "no-unused-expressions": "off",
  "@typescript-eslint/no-unused-expressions": "error",
  "no-unused-vars": "off",
  "@typescript-eslint/no-unused-vars": "error",
  "@typescript-eslint/no-wrapper-object-types": "error",
  "@typescript-eslint/prefer-as-const": "error",
  "@typescript-eslint/prefer-namespace-keyword": "error",
  "@typescript-eslint/triple-slash-reference": "error"
}
```

---

## 4. Type-Checked Rules (Recommended)

These rules **require TypeScript type checking** to work.
They catch issues that only appear when full type information is available, such as:

- Unsafe promise usage
- Incorrect type assertions
- Dangerous implicit conversions
- Misused async code

```json
{
  "@typescript-eslint/await-thenable": "error",
  "@typescript-eslint/no-array-delete": "error",
  "@typescript-eslint/no-base-to-string": "error",
  "@typescript-eslint/no-duplicate-type-constituents": "error",
  "@typescript-eslint/no-floating-promises": "error",
  "@typescript-eslint/no-for-in-array": "error",
  "no-implied-eval": "off",
  "@typescript-eslint/no-implied-eval": "error",
  "@typescript-eslint/no-misused-promises": "error",
  "@typescript-eslint/no-redundant-type-constituents": "error",
  "@typescript-eslint/no-unnecessary-type-assertion": "error",
  "@typescript-eslint/no-unsafe-argument": "error",
  "@typescript-eslint/no-unsafe-assignment": "error",
  "@typescript-eslint/no-unsafe-call": "error",
  "@typescript-eslint/no-unsafe-enum-comparison": "error",
  "@typescript-eslint/no-unsafe-member-access": "error",
  "@typescript-eslint/no-unsafe-return": "error",
  "@typescript-eslint/no-unsafe-unary-minus": "error",
  "no-throw-literal": "off",
  "@typescript-eslint/only-throw-error": "error",
  "prefer-promise-reject-errors": "off",
  "@typescript-eslint/prefer-promise-reject-errors": "error",
  "require-await": "off",
  "@typescript-eslint/require-await": "error",
  "@typescript-eslint/restrict-plus-operands": "error",
  "@typescript-eslint/restrict-template-expressions": "error",
  "@typescript-eslint/unbound-method": "error"
}
```

---

## 5. Strict Type-Checked Rules

This is the **strictest configuration**.
It builds on the previous section and adds deeper correctness and consistency checks, including:

- Detecting unnecessary conditions and conversions
- Preventing misleading async patterns
- Enforcing safer error handling
- Improving type precision and intent

This level is best suited for mature codebases with full type coverage.

```json
{
  "name": "typescript-eslint/strict-type-checked-only",
  "rules": {
    "@typescript-eslint/await-thenable": "error",
    "@typescript-eslint/no-array-delete": "error",
    "@typescript-eslint/no-base-to-string": "error",
    "@typescript-eslint/no-confusing-void-expression": "error",
    "@typescript-eslint/no-deprecated": "error",
    "@typescript-eslint/no-duplicate-type-constituents": "error",
    "@typescript-eslint/no-floating-promises": "error",
    "@typescript-eslint/no-for-in-array": "error",
    "no-implied-eval": "off",
    "@typescript-eslint/no-implied-eval": "error",
    "@typescript-eslint/no-meaningless-void-operator": "error",
    "@typescript-eslint/no-misused-promises": "error",
    "@typescript-eslint/no-misused-spread": "error",
    "@typescript-eslint/no-mixed-enums": "error",
    "@typescript-eslint/no-redundant-type-constituents": "error",
    "@typescript-eslint/no-unnecessary-boolean-literal-compare": "error",
    "@typescript-eslint/no-unnecessary-condition": "error",
    "@typescript-eslint/no-unnecessary-template-expression": "error",
    "@typescript-eslint/no-unnecessary-type-arguments": "error",
    "@typescript-eslint/no-unnecessary-type-assertion": "error",
    "@typescript-eslint/no-unnecessary-type-conversion": "error",
    "@typescript-eslint/no-unnecessary-type-parameters": "error",
    "@typescript-eslint/no-unsafe-argument": "error",
    "@typescript-eslint/no-unsafe-assignment": "error",
    "@typescript-eslint/no-unsafe-call": "error",
    "@typescript-eslint/no-unsafe-enum-comparison": "error",
    "@typescript-eslint/no-unsafe-member-access": "error",
    "@typescript-eslint/no-unsafe-return": "error",
    "@typescript-eslint/no-unsafe-unary-minus": "error",
    "@typescript-eslint/no-useless-default-assignment": "error",
    "no-throw-literal": "off",
    "@typescript-eslint/only-throw-error": "error",
    "prefer-promise-reject-errors": "off",
    "@typescript-eslint/prefer-promise-reject-errors": "error",
    "@typescript-eslint/prefer-reduce-type-parameter": "error",
    "@typescript-eslint/prefer-return-this-type": "error",
    "@typescript-eslint/related-getter-setter-pairs": "error",
    "require-await": "off",
    "@typescript-eslint/require-await": "error",
    "@typescript-eslint/return-await": ["error", "error-handling-correctness-only"],
    "@typescript-eslint/unbound-method": "error",
    "@typescript-eslint/use-unknown-in-catch-callback-variable": "error"
  }
}
```

## 6. OpenCover specific

These are the **OpenCover-specific rules** that extend the base configurations above.
They enforce OpenCover's coding standards and conventions.

### 6.1 TypeScript Rules

```json
{
  "@typescript-eslint/consistent-type-imports": [
    "error",
    {
      "prefer": "type-imports",
      "disallowTypeAnnotations": false
    }
  ],
  "@typescript-eslint/explicit-member-accessibility": "error",
  "@typescript-eslint/member-ordering": "error",
  "@typescript-eslint/no-non-null-assertion": "error",
  "@typescript-eslint/no-unused-vars": [
    "error",
    {
      "argsIgnorePattern": "^_",
      "varsIgnorePattern": "^_",
      "destructuredArrayIgnorePattern": "^_",
      "caughtErrorsIgnorePattern": "^_"
    }
  ],
  "@typescript-eslint/no-restricted-types": [
    "error",
    {
      "types": {
        "Map": {
          "message": "Map is not allowed. Use Object instead."
        }
      }
    }
  ]
}
```

### 6.2 ESLint Rules

```json
{
  "block-spacing": ["error", "always"],
  "capitalized-comments": [
    "warn",
    "always",
    {
      "ignoreConsecutiveComments": true
    }
  ],
  "comma-spacing": ["error", { "before": false, "after": true }],
  "key-spacing": ["warn", { "mode": "strict" }],
  "keyword-spacing": ["error", { "before": true }],
  "no-console": ["error", { "allow": ["warn", "error"] }],
  "no-multi-spaces": "error",
  "no-multiple-empty-lines": ["warn", { "max": 1, "maxEOF": 1 }],
  "no-restricted-syntax": [
    "error",
    {
      "selector": "TSEnumDeclaration",
      "message": "Enums are not allowed."
    }
  ],
  "no-unneeded-ternary": "error",
  "no-use-before-define": ["off"],
  "object-curly-spacing": ["warn", "always"],
  "quote-props": ["warn", "as-needed"],
  "quotes": ["error", "single", { "avoidEscape": true }],
  "semi": ["error", "always"],
  "space-before-blocks": ["error", "always"],
  "space-in-parens": ["error", "never"],
  "space-infix-ops": "error",
  "spaced-comment": [
    "error",
    "always",
    {
      "block": {
        "balanced": true
      }
    }
  ],
  "lines-between-class-members": [
    "error",
    "always",
    {
      "exceptAfterSingleLine": true
    }
  ]
}
```

### 6.3 Stylistic Rules

```json
{
  "stylistic/padding-line-between-statements": [
    "error",
    {
      "blankLine": "always",
      "prev": "*",
      "next": ["function", "class", "export"]
    },
    {
      "blankLine": "always",
      "prev": ["function", "class", "export"],
      "next": "*"
    },
    {
      "blankLine": "always",
      "prev": "*",
      "next": "if"
    },
    {
      "blankLine": "always",
      "prev": "block-like",
      "next": "if"
    },
    {
      "blankLine": "always",
      "prev": "if",
      "next": "*"
    }
  ]
}
```

### 6.4 Import Rules

```json
{
  "import/order": [
    "warn",
    {
      "pathGroups": [
        {
          "pattern": "@dc/**",
          "group": "parent",
          "position": "before"
        }
      ]
    }
  ],
  "import/prefer-default-export": "off"
}
```

### 6.5 Unicorn Rules

```json
{
  "unicorn/no-array-callback-reference": "error",
  "unicorn/filename-case": [
    "error",
    {
      "case": "kebabCase"
    }
  ]
}
```

### 6.6 Test Rules

These rules apply specifically to test files (`tests/**/*.ts`, `tests/**/*.tsx`, `**/*.test.ts`, `**/*.test.tsx`):

#### 6.6.1 Vitest Recommended Rules

These are the standard **Vitest recommended rules** that catch common testing mistakes:

```json
{
  "vitest/expect-expect": "error",
  "vitest/no-conditional-expect": "error",
  "vitest/no-disabled-tests": "warn",
  "vitest/no-focused-tests": "error",
  "vitest/no-commented-out-tests": "error",
  "vitest/no-identical-title": "error",
  "vitest/no-import-node-test": "error",
  "vitest/no-interpolation-in-snapshots": "error",
  "vitest/no-mocks-import": "error",
  "vitest/no-standalone-expect": "error",
  "vitest/no-unneeded-async-expect-function": "error",
  "vitest/prefer-called-exactly-once-with": "error",
  "vitest/require-local-test-context-for-concurrent-snapshots": "error",
  "vitest/valid-describe-callback": "error",
  "vitest/valid-expect": "error",
  "vitest/valid-expect-in-promise": "error",
  "vitest/valid-title": "error"
}
```

#### 6.6.2 OpenCover Test-Specific Rules

These are additional rules specific to OpenCover's testing standards:

```json
{
  "@typescript-eslint/no-unsafe-assignment": "off",
  "vitest/padding-around-before-all-blocks": "error",
  "vitest/padding-around-describe-blocks": "error",
  "vitest/padding-around-before-each-blocks": "error",
  "vitest/padding-around-after-all-blocks": "error",
  "vitest/padding-around-after-each-blocks": "error",
  "vitest/padding-around-test-blocks": "error"
}
```
