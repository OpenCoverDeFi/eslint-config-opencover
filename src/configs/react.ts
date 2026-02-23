import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';
import type { ESLint } from 'eslint';
import { GLOB_JSX, GLOB_TSX } from '../globs.js';
import type { TypedFlatConfigItem } from '../types.js';

export const reactConfig: TypedFlatConfigItem[] = [
    {
        name: 'opencover/react/rules',
        files: [GLOB_JSX, GLOB_TSX],
        plugins: {
            react: react,
            'react-hooks': reactHooks as ESLint.Plugin,
        },
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                ecmaVersion: 2024,
                sourceType: 'module',
                projectService: true,
                tsconfigRootDir: process.cwd(),
                ecmaFeatures: { jsx: true },
            },
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
        rules: {
            ...react.configs.flat.recommended.rules,
            ...reactHooks.configs.recommended.rules,

            // Not needed with the modern JSX transform (React 17+)
            'react/react-in-jsx-scope': 'off',
            'react/jsx-uses-react': 'off',
        },
    },
    {
        name: 'opencover/react/overrides',
        files: [GLOB_JSX, GLOB_TSX],
        rules: {
            // Disable type-aware rule that conflicts with React JSX in certain edge cases
            '@typescript-eslint/no-misused-promises': 'off',
        },
    },
];
