/**
 * @type {import("eslint").Linter.Config}
 */
// eslint-disable-next-line unicorn/prefer-module
module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2023,
        sourceType: 'module',
    },
    extends: ['plugin:@typescript-eslint/recommended'],
    plugins: ['import'],
    settings: {
        'import/resolver': {
            typescript: {},
        },
    },
    rules: {
        // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
        // E.g. '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        'import/prefer-default-export': 'off',
        indent: ['warn', 4, { SwitchCase: 1 }],
        '@typescript-eslint/indent': ['warn', 4],
        'no-multiple-empty-lines': ['warn', { max: 1, maxEOF: 1 }],
        semi: ['error', 'always'],
        '@typescript-eslint/semi': ['error', 'always'],
        '@typescript-eslint/quotes': [
            'error',
            'single',
            {
                avoidEscape: true,
                allowTemplateLiterals: true,
            },
        ],
        quotes: [2, 'single', { avoidEscape: true }],
        '@typescript-eslint/member-delimiter-style': [
            'error',
            {
                multiline: {
                    delimiter: 'semi',
                    requireLast: true,
                },
                singleline: {
                    delimiter: 'semi',
                    requireLast: false,
                },
            },
        ],
        'object-curly-spacing': ['warn', 'always'],
        'key-spacing': ['warn', { mode: 'strict' }],
        'space-before-blocks': ['error', 'always'],
        'block-spacing': ['error', 'always'],
        'space-infix-ops': 'error',
        'comma-spacing': ['error', { before: false, after: true }],
        '@typescript-eslint/type-annotation-spacing': ['error', { after: true }],
        'keyword-spacing': ['error', { before: true }],
        'space-in-parens': ['error', 'never'],
        'no-multi-spaces': 'error',
        'import/order': [
            'warn',
            {
                pathGroups: [
                    {
                        pattern: '@dc/**',
                        group: 'parent',
                        position: 'before',
                    },
                ],
            },
        ],
        'quote-props': [1, 'as-needed'],
        'spaced-comment': [
            'error', 'always',
            {
                block: {
                    balanced: true
                },
            }
        ],
        'capitalized-comments': [
            'warn',
            'always'
        ]
    },
};
