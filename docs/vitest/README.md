# Vitest Plugin Rules

This section documents the Vitest ESLint plugin rules that are enabled and configured in this ESLint config.

## Scope

These rules apply only to files matching the pattern `**/*.test.ts`.

## Enabled Rules

| Rule Name                                   | Description                                 | Severity |
| ------------------------------------------- | ------------------------------------------- | -------- |
| `@vitest/padding-around-before-all-blocks`  | Enforces padding around `beforeAll` blocks  | error    |
| `@vitest/padding-around-describe-blocks`    | Enforces padding around `describe` blocks   | error    |
| `@vitest/padding-around-before-each-blocks` | Enforces padding around `beforeEach` blocks | error    |
| `@vitest/padding-around-after-all-blocks`   | Enforces padding around `afterAll` blocks   | error    |
| `@vitest/padding-around-after-each-blocks`  | Enforces padding around `afterEach` blocks  | error    |
| `@vitest/padding-around-test-blocks`        | Enforces padding around `test` blocks       | error    |
