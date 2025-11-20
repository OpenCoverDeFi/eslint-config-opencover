---
title: todo-note-comment-style
rule_type: suggestion
related_rules: []
further_reading:
  - https://github.com/topics/todo-comments
---

Enforces a consistent format for TODO and NOTE comments to improve code maintainability and traceability.

## Rule Details

This rule requires that all TODO and NOTE comments follow a specific format that includes:

- The comment type (TODO or NOTE)
- The author's username (with or without @)
- The date in YYYY-MM-DD format
- A colon after the date

The format is: `// TODO (@username, YYYY-MM-DD):` or `// NOTE (@username, YYYY-MM-DD):`

**TODO** and **NOTE** must be in capital case. Lowercase variants like `todo` or `note` are not accepted.

## Options

This rule has no configuration options.

Examples of **incorrect** code for this rule:

:::incorrect

```typescript
/*eslint opencover/todo-note-comment-style: "error"*/

// TODO fix this
const x = 1;

// NOTE important information
const y = 2;

// TODO (@user)
const z = 3;

// TODO (@user, 2024-01-01)
const w = 4;

// TODO (@user, 2024-1-1):
const v = 5;

// TODO (@user, 2024-01-01)
const u = 6;

// todo (@user, 2024-01-01): lowercase is not allowed
const t = 7;

// note (@user, 2024-01-01): lowercase is not allowed
const s = 8;
```

:::

Examples of **correct** code for this rule:

:::correct

```typescript
/*eslint opencover/todo-note-comment-style: "error"*/

// TODO (@user, 2024-01-01): fix this
const x = 1;

// NOTE (@user, 2024-01-01): important information
const y = 2;

// NOTE (user, 2024-01-01): @ is optional
const z = 3;

// TODO (@john.doe, 2024-01-01): usernames can have dots
const w = 4;

// Regular comments are not affected
const v = 5;
```

:::

## Format Requirements

The required format is:

```
// [TODO|NOTE] ([username], YYYY-MM-DD):
```

Where:

- `TODO` or `NOTE` must be in capital case (TODO or NOTE only)
- `username` can include letters, numbers, dots, and underscores (with or without @ prefix)
- Date must be in `YYYY-MM-DD` format (e.g., `2024-01-01`)
- A colon (`:`) must follow the closing parenthesis
- Optional description can follow the colon

## Benefits

- **Traceability**: Know who created the TODO/NOTE and when
- **Accountability**: Makes it easier to follow up with the original author
- **Consistency**: Ensures all TODO/NOTE comments follow the same format
- **Maintenance**: Helps identify stale comments that may need review

## When Not To Use It

You can turn this rule off if you prefer a different format for TODO and NOTE comments, or if you want to allow informal TODO/NOTE comments without the structured format.
