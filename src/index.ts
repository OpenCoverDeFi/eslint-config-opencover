import { fixupPluginRules } from '@eslint/compat';
import eslint from '@eslint/js';
import stylisticPlugin from '@stylistic/eslint-plugin';
import vitest from '@vitest/eslint-plugin';
import gitignore from 'eslint-config-flat-gitignore';
import { globalIgnores } from 'eslint/config';
import importPlugin from 'eslint-plugin-import-x';
import unicornPlugin from 'eslint-plugin-unicorn';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier/flat';
import { type Linter, type ESLint } from 'eslint';
import { GLOB_EXCLUDE, GLOB_SRC, GLOB_TESTS, GLOB_TS, GLOB_TSX } from './globs.js';

const config: Linter.Config[] = [
    gitignore({ name: 'opencover/gitignore', strict: false }),
    globalIgnores(GLOB_EXCLUDE),
    {
        name: 'opencover',
        files: [GLOB_SRC],
        plugins: {
            stylistic: stylisticPlugin,
            'import-x': fixupPluginRules(importPlugin as unknown as ESLint.Plugin),
            unicorn: unicornPlugin,
        },
        rules: {
            ...eslint.configs.recommended.rules,

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

            'stylistic/block-spacing': ['error', 'always'],
            'stylistic/comma-spacing': ['error', { before: false, after: true }],
            'stylistic/key-spacing': ['warn', { mode: 'strict' }],
            'stylistic/keyword-spacing': ['error', { before: true }],
            'stylistic/lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
            'stylistic/no-multi-spaces': 'error',
            'stylistic/no-multiple-empty-lines': ['warn', { max: 1, maxEOF: 1 }],
            'stylistic/object-curly-spacing': ['warn', 'always'],
            'stylistic/padding-line-between-statements': [
                'error',
                { blankLine: 'always', prev: '*', next: ['function', 'class', 'export'] },
                { blankLine: 'always', prev: ['function', 'class', 'export'], next: '*' },
                { blankLine: 'always', prev: '*', next: 'if' },
                { blankLine: 'always', prev: 'block-like', next: 'if' },
                { blankLine: 'always', prev: 'if', next: '*' },
            ],
            'stylistic/quote-props': ['warn', 'as-needed'],
            'stylistic/quotes': ['error', 'single', { avoidEscape: true }],
            'stylistic/semi': ['error', 'always'],
            'stylistic/space-before-blocks': ['error', 'always'],
            'stylistic/space-in-parens': ['error', 'never'],
            'stylistic/space-infix-ops': 'error',
            'stylistic/spaced-comment': ['error', 'always', { block: { balanced: true } }],

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
                    ],
                },
            ],

            ...unicornPlugin.configs['recommended'].rules,
            'unicorn/no-array-callback-reference': 'error',
            'unicorn/filename-case': ['error', { case: 'kebabCase' }],
            'unicorn/prevent-abbreviations': 'off',
            'unicorn/no-array-for-each': 'off',
            'unicorn/no-array-reduce': 'off',
            'unicorn/no-null': 'off',
        },
    },

    {
        name: 'opencover/typescript',
        files: [GLOB_TS, GLOB_TSX],
        plugins: {
            '@typescript-eslint': tseslint.plugin,
        },
        languageOptions: {
            parser: tseslint.parser,
            sourceType: 'module',
            parserOptions: {
                projectService: true,
                tsconfigRootDir: process.cwd(),
            },
        },
        rules: {
            ...(Object.assign(
                {},
                ...tseslint.configs.strictTypeChecked.map((c) => c.rules).filter(Boolean)
            ) as Linter.RulesRecord),

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
            '@typescript-eslint/no-non-null-assertion': 'error',
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
            'require-await': 'off',
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
        files: GLOB_TESTS,
        plugins: { vitest },
        languageOptions: {
            globals: { ...vitest.environments.env.globals },
        },
        rules: {
            ...vitest.configs.recommended.rules,

            '@typescript-eslint/no-unsafe-assignment': 'off',
            'vitest/padding-around-before-all-blocks': 'error',
            'vitest/padding-around-describe-blocks': 'error',
            'vitest/padding-around-before-each-blocks': 'error',
            'vitest/padding-around-after-all-blocks': 'error',
            'vitest/padding-around-after-each-blocks': 'error',
            'vitest/padding-around-test-blocks': 'error',
        },
        settings: {
            vitest: { typecheck: true },
        },
    },
    prettier,
];

export default config;
