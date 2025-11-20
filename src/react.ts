import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import { defineConfig } from 'eslint/config';
import type { ESLint } from 'eslint';

const config = defineConfig([
    react.configs.flat.recommended,
    reactHooks.configs.flat.recommended,
    {
        files: ['**/*.jsx', '**/*.tsx'],
        plugins: {
            react: react as ESLint.Plugin,
            'react-hooks': reactHooks as ESLint.Plugin,
        },
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                ecmaVersion: 2024,
                sourceType: 'module',
                ecmaFeatures: {
                    jsx: true,
                },
                projectService: true,
            },
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
    },
]);

export default config;
