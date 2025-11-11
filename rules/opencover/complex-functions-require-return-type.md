# complex-functions-require-return-type

## Description

Requires explicit return types for functions that exceed a certain complexity threshold. This rule helps maintain code readability by ensuring complex functions have clear type annotations.

## How It Works

The rule calculates function complexity by counting decision points in the code:

- `if` statements
- `switch` statements and cases
- Loops (`for`, `for...in`, `for...of`, `while`, `do...while`)
- Ternary operators (`? :`)
- Logical operators (`||`, `&&`)

Functions with complexity greater than the configured threshold (default: 10) must have an explicit return type annotation.

## Configuration

```json
{
	"rules": {
		"@opencover/eslint-config-opencover/complex-functions-require-return-type": [
			"error",
			{
				"maxComplexity": 10
			}
		]
	}
}
```

### Options

- `maxComplexity` (number, default: 10): The maximum complexity allowed before requiring an explicit return type.

## Examples

### ❌ Incorrect

```typescript
function processData(data: Data[]) {
	if (data.length === 0) return [];
	return data
		.map((item) => {
			if (item.valid) {
				return transform(item);
			}
			return null;
		})
		.filter(Boolean);
}
```

### ✅ Correct

```typescript
function processData(data: Data[]): TransformedData[] {
	if (data.length === 0) return [];
	return data
		.map((item) => {
			if (item.valid) {
				return transform(item);
			}
			return null;
		})
		.filter(Boolean);
}
```
