import eslint from '@eslint/js';
import stylisticPlugin from '@stylistic/eslint-plugin';
import vitest from '@vitest/eslint-plugin';
import gitignore from 'eslint-config-flat-gitignore';
import { globalIgnores } from 'eslint/config';
import { flatConfigs as importPlugin } from 'eslint-plugin-import-x';
import unicornPlugin from 'eslint-plugin-unicorn';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier/flat';
import type { Linter } from 'eslint';
import { GLOB_EXCLUDE, GLOB_TEST, GLOB_TS } from './globs.js';

const GLOB_JS = ['**/*.js', '**/*.jsx', '**/*.mjs', '**/*.cjs'];

const tsRuleOverrides: Linter.RulesRecord = {};

for (const entry of tseslint.configs.strictTypeChecked) {
    if (entry.rules) {
        for (const key of Object.keys(entry.rules)) {
            if (key.startsWith('@typescript-eslint/')) {
                tsRuleOverrides[key] = 'off';
            }
        }
    }
}

const config: Linter.Config[] = [
    eslint.configs.recommended,
    stylisticPlugin.configs.recommended,
    importPlugin.recommended,
    unicornPlugin.configs.recommended,
    ...tseslint.configs.strictTypeChecked,
    {
        name: 'opencover/disable-typescript-for-js',
        files: GLOB_JS,
        rules: tsRuleOverrides,
    },
    {
        ...vitest.configs.recommended,
        files: GLOB_TEST,
    },
    {
        name: 'opencover',
        rules: {
            'capitalized-comments': [
                'warn',
                'always',
                {
                    ignoreConsecutiveComments: true,
                },
            ],
            'no-console': ['error', { allow: ['warn', 'error'] }],
            'no-restricted-syntax': [
                'error',
                {
                    selector: 'TSEnumDeclaration',
                    message: 'Enums are not allowed.',
                },
            ],
            'no-unneeded-ternary': 'error',
            'no-use-before-define': ['off'],

            '@stylistic/padding-line-between-statements': [
                'error',
                { blankLine: 'always', prev: '*', next: ['function', 'class', 'export'] },
                { blankLine: 'always', prev: ['function', 'class', 'export'], next: '*' },
                { blankLine: 'always', prev: '*', next: 'if' },
                { blankLine: 'always', prev: 'block-like', next: 'if' },
                { blankLine: 'always', prev: 'if', next: '*' },
            ],

            'import-x/order': [
                'warn',
                {
                    pathGroups: [
                        {
                            pattern: '@/**',
                            group: 'parent',
                            position: 'before',
                        },
                        {
                            pattern: '@tests/**',
                            group: 'parent',
                            position: 'before',
                        },
                        {
                            pattern: '@data/**',
                            group: 'parent',
                            position: 'before',
                        },
                    ],
                },
            ],
            'import-x/no-unresolved': 'off',

            'unicorn/prevent-abbreviations': 'off',
            'unicorn/no-array-for-each': 'off',
            'unicorn/no-array-reduce': 'off',
            'unicorn/no-null': 'off',
        },
    },
    {
        name: 'opencover/typescript',
        files: GLOB_TS,
        languageOptions: {
            parserOptions: {
                projectService: true,
            },
        },
        rules: {
            '@typescript-eslint/consistent-type-imports': [
                'error',
                { prefer: 'type-imports', disallowTypeAnnotations: false },
            ],
            '@typescript-eslint/explicit-function-return-type': 'error',
            '@typescript-eslint/explicit-member-accessibility': [
                'error',
                {
                    accessibility: 'explicit',
                    overrides: {
                        constructors: 'off',
                    },
                },
            ],
            '@typescript-eslint/explicit-module-boundary-types': 'error',
            '@typescript-eslint/member-ordering': 'error',
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    destructuredArrayIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^_',
                },
            ],
            '@typescript-eslint/prefer-nullish-coalescing': [
                'error',
                {
                    ignoreConditionalTests: true,
                    ignoreIfStatements: true,
                    ignorePrimitives: {
                        boolean: true,
                    },
                },
            ],
            '@typescript-eslint/no-restricted-types': [
                'error',
                {
                    types: {
                        Map: { message: 'Map is not allowed. Use Object instead.' },
                    },
                },
            ],
        },
    },
    {
        name: 'opencover/test',
        files: GLOB_TEST,
        rules: {
            'vitest/padding-around-before-all-blocks': 'error',
            'vitest/padding-around-describe-blocks': 'error',
            'vitest/padding-around-before-each-blocks': 'error',
            'vitest/padding-around-after-all-blocks': 'error',
            'vitest/padding-around-after-each-blocks': 'error',
            'vitest/padding-around-test-blocks': 'error',
        },
    },
    prettier,
    globalIgnores(GLOB_EXCLUDE),
    gitignore({ name: 'opencover/gitignore', strict: false }),
];

export default config;
