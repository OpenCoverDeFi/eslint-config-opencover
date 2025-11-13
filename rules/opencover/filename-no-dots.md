# filename-no-dots

## Description

Disallows dots in filenames, except for `.test.` in test files. This rule enforces a consistent naming convention for files in the codebase.

## How It Works

The rule checks the filename and reports an error if:

- The filename contains dots in the base name (excluding the file extension)
- For test files, dots are only allowed in the `.test.` pattern (e.g., `user.test.ts` is allowed, but `user.profile.test.ts` is not)

You can configure ignore patterns to exclude certain files from this rule.

## Configuration

```json
{
    "rules": {
        "@opencover/eslint-config-opencover/filename-no-dots": [
            "error",
            {
                "ignorePattern": ["^legacy\\..*\\.ts$"]
            }
        ]
    }
}
```

### Options

- `ignorePattern` (string[], optional): Array of regex patterns for filenames to ignore.

## Examples

### ❌ Incorrect

```typescript
// File: user.profile.ts
export const userProfile = {};

// File: api.client.ts
export const apiClient = {};

// File: user.profile.test.ts
export const testUser = {};
```

### ✅ Correct

```typescript
// File: userProfile.ts
export const userProfile = {};

// File: apiClient.ts
export const apiClient = {};

// File: user.test.ts
export const testUser = {};
```
