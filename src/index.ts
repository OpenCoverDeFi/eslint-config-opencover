import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import unicorn from 'eslint-plugin-unicorn';
import vitest from '@vitest/eslint-plugin';
import stylistic from '@stylistic/eslint-plugin';
import { defineConfig, globalIgnores } from 'eslint/config';
import opencover from './opencover-eslint/config.js';
import { baseRules, testRules } from './rules/index.js';

const GLOBAL_IGNORE_PATTERNS = ['node_modules', 'dist', 'coverage', '.temp', '.git', 'yarn.lock', 'eslint.config.mjs'];

const PARSER_OPTIONS = {
    ecmaVersion: 2024,
    sourceType: 'module',
    projectService: true,
};

const LANGUAGE_OPTIONS = {
    parser: tseslint.parser,
    parserOptions: PARSER_OPTIONS,
};

const baseConfig = {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
        import: importPlugin,
        unicorn,
        '@opencover-eslint': opencover,
        '@stylistic': stylistic,
    },
    languageOptions: LANGUAGE_OPTIONS,
    rules: baseRules,
};

const testConfig = {
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
};

const config = defineConfig([
    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    globalIgnores(GLOBAL_IGNORE_PATTERNS),
    baseConfig,
    testConfig,
]);

export default config;
