---
title: filename-no-dots
rule_type: problem
related_rules: []
further_reading:
  - https://en.wikipedia.org/wiki/Filename
---

Disallows dots in filenames, except for `.test.` in test files. This rule enforces a consistent naming convention for files in the codebase.

Here are some examples:

```js
// Bad
// File: user.profile.ts
export const userProfile = {};

// File: api.client.ts
export const apiClient = {};

// File: user.profile.test.ts
export const testUser = {};

// Good
// File: userProfile.ts
export const userProfile = {};

// File: apiClient.ts
export const apiClient = {};

// File: user.test.ts
export const testUser = {};
```

## Rule Details

This rule checks the filename and reports an error if:

- The filename contains dots in the base name (excluding the file extension)
- For test files, dots are only allowed in the `.test.` pattern (e.g., `user.test.ts` is allowed, but `user.profile.test.ts` is not)

You can configure ignore patterns to exclude certain files from this rule.

## Options

- `ignorePattern` (string[], optional): Array of regex patterns for filenames to ignore.

### ignorePattern

Examples of **incorrect** code for the default configuration:

:::incorrect

```typescript
// File: user.profile.ts
export const userProfile = {};

// File: api.client.ts
export const apiClient = {};

// File: user.profile.test.ts
export const testUser = {};
```

:::

Examples of **correct** code for the default configuration:

:::correct

```typescript
// File: userProfile.ts
export const userProfile = {};

// File: apiClient.ts
export const apiClient = {};

// File: user.test.ts
export const testUser = {};
```

:::

Examples of **correct** code with `ignorePattern` option:

:::correct

```typescript
/*eslint @opencover-eslint/filename-no-dots: ["error", { "ignorePattern": ["^legacy\\..*\\.ts$"] }]*/

// File: legacy.old.code.ts (ignored due to pattern)
export const legacyCode = {};
```

:::

## Known Limitations

Due to the limits of static analysis, this rule only checks filenames at the time of linting. It does not account for:

- Files that are renamed after linting
- Dynamic file imports that may reference files with dots
- Files that are generated or created at build time

## When Not To Use It

You can turn this rule off if you are not concerned with consistent filename conventions or if your project uses a different naming convention that includes dots in filenames.
