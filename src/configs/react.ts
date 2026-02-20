import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';
import type { ESLint } from 'eslint';
import type { RulesConfig } from '@eslint/core';
import { GLOB_JSX, GLOB_TSX } from '../globs.js';
import type { TypedFlatConfigItem } from '../types.js';

export function reactConfig(
    options: {
        typescript?: boolean;
        tsconfigPath?: string;
        overrides?: Partial<RulesConfig>;
    } = {}
): TypedFlatConfigItem[] {
    const { typescript: enableTypeScript = false, tsconfigPath, overrides = {} } = options;

    const files = [GLOB_JSX, GLOB_TSX];

    const parserOptions: TypedFlatConfigItem['languageOptions'] = enableTypeScript
        ? {
              parser: tseslint.parser,
              parserOptions: {
                  ecmaVersion: 2024,
                  sourceType: 'module',
                  projectService: tsconfigPath ? { allowDefaultProject: ['*.mjs', '*.js', '*.cjs'] } : true,
                  tsconfigRootDir: process.cwd(),
                  ecmaFeatures: { jsx: true },
              },
          }
        : {
              parserOptions: {
                  ecmaVersion: 2024,
                  sourceType: 'module',
                  ecmaFeatures: { jsx: true },
              },
          };

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
            languageOptions: parserOptions,
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

                ...overrides,
            },
        },
    ];
}
