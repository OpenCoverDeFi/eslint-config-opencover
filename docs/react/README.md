# React ESLint Rules

This section documents the React and React Hooks ESLint rules configured in this ESLint config.

## React Plugin Rules

The configuration extends `reactPlugin.configs.flat.recommended`, which includes recommended rules from `eslint-plugin-react`.

### Rules Included from react.configs.flat.recommended

The following React rules are automatically enabled from `reactPlugin.configs.flat.recommended`:

| Rule Name                              | Description                                                                      | Severity |
| -------------------------------------- | -------------------------------------------------------------------------------- | -------- |
| `react/display-name`                   | Enforces that components have a display name                                     | warn     |
| `react/jsx-key`                        | Enforces that elements in arrays or iterators have a key prop                    | error    |
| `react/jsx-no-comment-textnodes`       | Prevents comments from being inserted as text nodes                              | error    |
| `react/jsx-no-duplicate-props`         | Prevents duplicate props in JSX                                                  | error    |
| `react/jsx-no-target-blank`            | Enforces that links with `target="_blank"` include `rel="noopener noreferrer"`  | error    |
| `react/jsx-no-undef`                   | Disallows undefined JSX components                                               | error    |
| `react/jsx-uses-react`                 | Marks React as used when JSX is present (not needed in React 17+)              | off      |
| `react/jsx-uses-vars`                  | Marks variables used in JSX as used                                              | off      |
| `react/no-children-prop`               | Prevents passing children as props                                               | error    |
| `react/no-danger-with-children`        | Prevents using `dangerouslySetInnerHTML` with children                           | error    |
| `react/no-deprecated`                  | Disallows deprecated React APIs                                                  | error    |
| `react/no-direct-mutation-state`      | Prevents direct mutation of `this.state`                                         | error    |
| `react/no-find-dom-node`               | Disallows `ReactDOM.findDOMNode`                                                 | error    |
| `react/no-is-mounted`                  | Disallows `isMounted()` usage                                                    | error    |
| `react/no-render-return-value`         | Disallows using the return value of `ReactDOM.render`                            | error    |
| `react/no-string-refs`                 | Disallows string refs                                                            | error    |
| `react/no-unescaped-entities`          | Disallows unescaped HTML entities in JSX                                          | warn     |
| `react/no-unknown-property`            | Disallows unknown DOM properties                                                 | error    |
| `react/prop-types`                     | Enforces propTypes validation (may be disabled for TypeScript projects)         | error    |
| `react/react-in-jsx-scope`             | Requires React to be in scope when using JSX (not needed in React 17+)          | off      |
| `react/require-render-return`          | Enforces that render methods return a value                                      | error    |

For more details on each rule, see the [eslint-plugin-react documentation](https://github.com/jsx-eslint/eslint-plugin-react).

## React Hooks Rules

The configuration extends `reactHooksPlugin.configs.flat.recommended`, which should include recommended rules from `eslint-plugin-react-hooks`.

### Known Rules

The `eslint-plugin-react-hooks` package exposes two main rules:

1. **`react-hooks/rules-of-hooks`** - Enforces the [Rules of Hooks](https://react.dev/reference/rules/rules-of-hooks)
2. **`react-hooks/exhaustive-deps`** - Enforces exhaustive dependencies in hooks like `useEffect` and `useMemo`

### Documentation and Configuration Issues

**Note**: The complete set of React Hooks rules and their configuration is unclear from both the source code and documentation at this point in time. Many React Hooks-related rules appear to be defined in the React Compiler's Babel plugin source code (see [CompilerError.ts](https://github.com/facebook/react/blob/8ac5f4eb3601f7381462f8b74ecf24d47259cc20/compiler/packages/babel-plugin-react-compiler/src/CompilerError.ts)) rather than in the ESLint plugin itself, making it difficult to determine which rules are exposed as ESLint rules and which are enabled by the `recommended` config.


### References

- [eslint-plugin-react-hooks on npm](https://www.npmjs.com/package/eslint-plugin-react-hooks)
- [React Compiler Error Categories](https://github.com/facebook/react/blob/8ac5f4eb3601f7381462f8b74ecf24d47259cc20/compiler/packages/babel-plugin-react-compiler/src/CompilerError.ts)
- [React Rules of Hooks](https://react.dev/reference/rules/rules-of-hooks)

