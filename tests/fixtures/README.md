# Fixture-based Testing

This directory contains fixture-based tests for the ESLint config, inspired by [@antfu/eslint-config](https://github.com/antfu/eslint-config).

## Structure

```
fixtures/
├── input/          # Input files with intentional issues
├── output/         # Expected output after ESLint --fix (snapshots)
└── README.md       # This file
```

## How it works

1. **Input files** (`input/`) contain code with intentional formatting and linting issues
2. Tests copy these files to a temp directory `_fixtures/`
3. ESLint runs with `--fix` on the copied files
4. The fixed output is compared against snapshots in `output/`
5. If the output matches the input (no changes), no snapshot is stored

## Adding new tests

1. Add a new file to `input/` with intentional violations
2. Run `pnpm test tests/fixtures.test.ts -- -u` to generate snapshots
3. Review the generated snapshots in `output/`
4. Commit both the input file and generated snapshots

## Benefits over rule-by-rule testing

- **Faster**: One test run per config variant instead of hundreds of individual tests
- **More realistic**: Tests actual files, not isolated code snippets
- **Tests rule interactions**: Catches conflicts between rules
- **Easier to maintain**: Just add files instead of writing test cases
- **Snapshot-based**: Easy to review changes visually

## Test configs

- `default`: Tests the default config (TypeScript, JavaScript)
- `react`: Tests the React config (includes React/JSX rules)
