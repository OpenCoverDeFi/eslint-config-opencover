import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';
import importPlugin from 'eslint-plugin-import';
import unicorn from 'eslint-plugin-unicorn';
import stylistic from '@stylistic/eslint-plugin';
import vitest from '@vitest/eslint-plugin';
import { GLOBAL_IGNORE_PATTERNS, LANGUAGE_OPTIONS } from './constants.js';
import { baseRules, testRules } from './rules/index.js';

const config = defineConfig([
    globalIgnores(GLOBAL_IGNORE_PATTERNS),
    eslint.configs.recommended,
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.recommendedTypeChecked,
    // TODO (@eniko1556, 2025-11-21): we want to introduce  ...tseslint.configs.strictTypeChecked at some point
    {
        name: 'opencover/eslint/base',
        files: ['**/*.ts', '**/*.tsx'],
        plugins: {
            import: importPlugin,
            unicorn,
            stylistic,
        },
        languageOptions: LANGUAGE_OPTIONS,
        rules: baseRules,
    },
    {
        name: 'opencover/eslint/vitest',
        files: ['tests/**/*.ts', 'tests/**/*.tsx', '**/*.test.ts', '**/*.test.tsx'],
        plugins: {
            '@vitest': vitest,
        },
        languageOptions: {
            ...LANGUAGE_OPTIONS,
            globals: {
                ...vitest.environments.env.globals,
            },
        },
        rules: testRules,
        settings: {
            vitest: {
                typecheck: true,
            },
        },
    },
]);

export default config;
