import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import type { ESLint } from 'eslint';
import { defineConfig } from 'eslint/config';

const config = defineConfig([
    reactPlugin.configs.flat.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    prettierConfig,
    reactHooksPlugin.configs.flat.recommended,
    importPlugin.flatConfigs.recommended,
    importPlugin.flatConfigs.typescript,
    {
        plugins: {
            'react-hooks': reactHooksPlugin as ESLint.Plugin,
            prettier: prettierPlugin,
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
        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
            'capitalized-comments': [
                'warn',
                'always',
                {
                    ignoreConsecutiveComments: true,
                },
            ],
            'import/no-duplicates': 'error',
            'import/order': 'warn',
            'no-console': ['error', { allow: ['warn', 'error'] }],
            'prettier/prettier': 'error',
            'spaced-comment': [
                'error',
                'always',
                {
                    block: {
                        balanced: true,
                    },
                },
            ],
        },
    },
]);

export default config;
