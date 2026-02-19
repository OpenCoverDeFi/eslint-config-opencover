import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';
import type { ESLint } from 'eslint';
import type { RulesConfig } from '@eslint/core';
import { GLOB_JSX, GLOB_TSX } from '../globs.js';
import type { TypedFlatConfigItem } from '../types.js';

export function reactConfig(
    options: {
        tsconfigPath?: string;
        overrides?: Partial<RulesConfig>;
    } = {}
): TypedFlatConfigItem[] {
    const { overrides = {} } = options;

    const files = [GLOB_JSX, GLOB_TSX];

    return [
        {
            name: 'opencover/react/setup',
            plugins: {
                react: react,
                'react-hooks': reactHooks as ESLint.Plugin,
            },
        },
        {
            name: 'opencover/react/rules',
            files,
            languageOptions: {
                parser: tseslint.parser,
                parserOptions: {
                    ecmaVersion: 2024,
                    sourceType: 'module',
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
            rules: {
                ...react.configs.flat.recommended.rules,
                ...reactHooks.configs.recommended.rules,

                ...overrides,
            },
        },
    ];
}
