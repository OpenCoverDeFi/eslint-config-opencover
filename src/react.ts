import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import { defineConfig, globalIgnores } from 'eslint/config';
import type { ESLint } from 'eslint';
import { PARSER_OPTIONS, GLOBAL_IGNORE_PATTERNS } from './constants.js';

const config = defineConfig([
    globalIgnores(GLOBAL_IGNORE_PATTERNS),
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
