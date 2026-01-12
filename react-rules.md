## React ESLint Rules

This document describes the React-specific ESLint rules configured in `@opencover/eslint-config-opencover/react`.

These rules apply specifically to React files (`**/*.jsx`, `**/*.tsx`).

---

## 1. React Recommended Rules

These are the standard **React recommended rules** from `eslint-plugin-react`.
They focus on catching common React mistakes such as:

- Missing or invalid JSX keys
- Deprecated React APIs
- Unsafe React patterns
- Common JSX errors

```json
{
  "react/display-name": "error",
  "react/jsx-key": "error",
  "react/jsx-no-comment-textnodes": "error",
  "react/jsx-no-duplicate-props": "error",
  "react/jsx-no-target-blank": "error",
  "react/jsx-no-undef": "error",
  "react/jsx-uses-react": "error",
  "react/jsx-uses-vars": "error",
  "react/no-children-prop": "error",
  "react/no-danger-with-children": "error",
  "react/no-deprecated": "error",
  "react/no-direct-mutation-state": "error",
  "react/no-find-dom-node": "error",
  "react/no-is-mounted": "error",
  "react/no-render-return-value": "error",
  "react/no-string-refs": "error",
  "react/no-unescaped-entities": "error",
  "react/no-unknown-property": "error",
  "react/no-unsafe": "off",
  "react/prop-types": "error",
  "react/react-in-jsx-scope": "error",
  "react/require-render-return": "error"
}
```

---

## 2. React Hooks Recommended Rules

These are the standard **React Hooks recommended rules** from `eslint-plugin-react-hooks`.
They focus on enforcing the Rules of Hooks and catching common hooks mistakes such as:

- Violations of the Rules of Hooks
- Missing dependencies in effect hooks
- Incorrect hook usage patterns
- Unsafe hook patterns

```json
{
  "react-hooks/rules-of-hooks": "error",
  "react-hooks/exhaustive-deps": "warn",
  "react-hooks/static-components": "error",
  "react-hooks/use-memo": "error",
  "react-hooks/component-hook-factories": "error",
  "react-hooks/preserve-manual-memoization": "error",
  "react-hooks/incompatible-library": "warn",
  "react-hooks/immutability": "error",
  "react-hooks/globals": "error",
  "react-hooks/refs": "error",
  "react-hooks/set-state-in-effect": "error",
  "react-hooks/error-boundaries": "error",
  "react-hooks/purity": "error",
  "react-hooks/set-state-in-render": "error",
  "react-hooks/unsupported-syntax": "warn",
  "react-hooks/config": "error",
  "react-hooks/gating": "error"
}
```
