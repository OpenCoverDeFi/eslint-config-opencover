import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';
import importPlugin from 'eslint-plugin-import';
import unicorn from 'eslint-plugin-unicorn';
import stylistic from '@stylistic/eslint-plugin';
import vitest from '@vitest/eslint-plugin';
import gitignore from 'eslint-config-flat-gitignore';
import { LANGUAGE_OPTIONS } from './constants.js';
import { openCoverTypescriptRules, openCoverTestRules } from './rules.js';

const config = defineConfig([
    gitignore(),
    tseslint.configs.base, // Define base rules, so plugin is imported correctly
    {
        name: 'opencover/eslint/base',
        files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
        plugins: {
            import: importPlugin,
            unicorn,
            stylistic,
        },
        languageOptions: LANGUAGE_OPTIONS,
        rules: openCoverTypescriptRules,
    },
    {
        name: 'opencover/eslint/test',
        files: ['tests/**/*.ts', 'tests/**/*.tsx', '**/*.test.ts', '**/*.test.tsx'],
        plugins: {
            vitest,
        },
        languageOptions: {
            ...LANGUAGE_OPTIONS,
            globals: {
                ...vitest.environments.env.globals,
            },
        },
        rules: openCoverTestRules,
        settings: {
            vitest: {
                typecheck: true,
            },
        },
    },
]);

export default config;
