import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import { defineConfig } from 'eslint/config';
import type { ESLint } from 'eslint';

const config = defineConfig([
    reactPlugin.configs.flat.recommended,
    reactHooksPlugin.configs.flat.recommended,
    {
        files: ['**/*.jsx', '**/*.tsx'],
        plugins: {
            'react-hooks': reactHooksPlugin as ESLint.Plugin,
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
