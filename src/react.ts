import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import { defineConfig } from 'eslint/config';
import type { ESLint } from 'eslint';
import gitignore from 'eslint-config-flat-gitignore';
import { PARSER_OPTIONS } from './constants.js';

const config = defineConfig([
    gitignore(),
    react.configs.flat.recommended,
    reactHooks.configs.flat.recommended,
    {
        name: 'opencover/eslint/react',
        files: ['**/*.jsx', '**/*.tsx'],
        plugins: {
            react: react,
            'react-hooks': reactHooks as ESLint.Plugin,
        },
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                ...PARSER_OPTIONS,
                ecmaFeatures: {
                    jsx: true,
                },
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
