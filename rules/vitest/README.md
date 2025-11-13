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

## Rule Details

All padding rules enforce that test blocks have consistent spacing around them for better readability.

### Padding Rules

These rules require empty lines before and after test-related blocks (`beforeAll`, `beforeEach`, `afterAll`, `afterEach`, `describe`, `test`, `it`).

**Example:**

```ts
// ❌ Incorrect
describe('My test suite', () => {
    beforeAll(() => {
        setup();
    });
    test('should do something', () => {
        expect(true).toBe(true);
    });
});

// ✅ Correct
describe('My test suite', () => {
    beforeAll(() => {
        setup();
    });

    test('should do something', () => {
        expect(true).toBe(true);
    });
});
```

## Configuration

The Vitest plugin is configured with type checking enabled:

```ts
settings: {
	vitest: {
		typecheck: true,
	},
}
```

This enables type-aware linting for test files.

## Globals

The configuration includes Vitest globals, so you don't need to import test functions:

```ts
languageOptions: {
	globals: {
		...vitest.environments.env.globals,
	},
}
```

This means you can use `describe`, `test`, `it`, `expect`, etc. without importing them.
