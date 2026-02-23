import { recommended } from './dist/index.js';

export default [
    ...recommended,
    {
        // Repo-specific overrides for RuleTester-based test files.
        // These rules don't apply to consumers of the package.
        files: ['tests/**'],
        rules: {
            // RuleTester.run() is its own assertion mechanism
            'vitest/expect-expect': 'off',
            // Plugin rules accessed via config.plugins['x'].rules['y'] are typed any
            '@typescript-eslint/no-unsafe-argument': 'off',
            '@typescript-eslint/no-unsafe-member-access': 'off',
            // `builtinRules` from eslint/use-at-your-own-risk is the only public
            // way to access builtin rules for RuleTester in flat config mode
            '@typescript-eslint/no-deprecated': 'off',
        },
    },
];
