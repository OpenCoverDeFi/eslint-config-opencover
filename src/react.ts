import { fixupPluginRules } from '@eslint/compat';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';
import { type Linter, type ESLint } from 'eslint';
import { GLOB_JSX, GLOB_TSX } from './globs.js';

const reactConfig: Linter.Config[] = [
    {
        name: 'opencover/react',
        files: [GLOB_JSX, GLOB_TSX],
        plugins: {
            react,
            'react-hooks': fixupPluginRules(reactHooks as unknown as ESLint.Plugin),
        },
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                projectService: true,
                ecmaFeatures: { jsx: true },
            },
        },
        settings: {
            react: { version: 'detect' },
        },
        rules: {
            ...react.configs.flat.recommended.rules,
            ...reactHooks.configs.flat.recommended.rules,
            '@typescript-eslint/no-misused-promises': 'off',
        },
    },
];

export default reactConfig;
