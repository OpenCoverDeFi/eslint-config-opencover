# Unicorn Plugin Rules

This section documents the ESLint Unicorn plugin rules that are enabled and configured in this ESLint config.

## Enabled Rules

| Rule Name                             | Description                                     | Severity | Configuration       |
| ------------------------------------- | ----------------------------------------------- | -------- | ------------------- |
| `unicorn/no-array-callback-reference` | Prevents passing a reference to an array method | error    | -                   |
| `unicorn/filename-case`               | Enforces kebab-case filenames                   | error    | `case: 'kebabCase'` |

## Rule Details

### unicorn/no-array-callback-reference

Prevents passing a reference to an array method directly, which can lead to bugs when the method is called with unexpected arguments.

**Example:**

```ts
// ❌ Incorrect
const numbers = [1, 2, 3];
const doubled = numbers.map(Number.parseInt); // Wrong! parseInt expects (string, radix)

// ✅ Correct
const numbers = [1, 2, 3];
const doubled = numbers.map((n) => Number.parseInt(n, 10));
// Or even better:
const doubled = numbers.map((n) => n * 2);
```

**Why this matters:**
When you pass a function reference like `Number.parseInt` to `map`, it gets called with three arguments: `(value, index, array)`. But `parseInt` expects `(string, radix)`, so `index` becomes the radix, leading to unexpected behavior.

### unicorn/filename-case

Enforces that all filenames use kebab-case (lowercase with hyphens).

**Configuration:**

```ts
'unicorn/filename-case': [
	'error',
	{
		case: 'kebabCase',
	},
]
```

**Example:**

```bash
// ❌ Incorrect filenames
MyComponent.ts;
my_component.ts;
myComponent.ts;

// ✅ Correct filename
my-component.ts;
```

**Exceptions:**

- Test files with `.test.` in the name are handled by the `@opencover-eslint/filename-no-dots` rule
- Config files with `.config.` in the name are allowed by the `filename-no-dots` rule's ignore pattern
