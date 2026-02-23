import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';
import { GLOB_JSX, GLOB_TSX } from '../globs.js';
import type { TypedFlatConfigItem } from '../types.js';

export const reactConfig: TypedFlatConfigItem[] = [
    // Upstream flat configs bring their own plugins + rules.
    react.configs.flat.recommended,
    reactHooks.configs.flat.recommended,

    // OpenCover react overrides.
    {
        name: 'opencover/react',
        files: [GLOB_JSX, GLOB_TSX],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                projectService: true,
                tsconfigRootDir: process.cwd(),
                ecmaFeatures: { jsx: true },
            },
        },
        settings: {
            react: { version: 'detect' },
        },
        rules: {
            // Not needed with the modern JSX transform (React 17+)
            'react/react-in-jsx-scope': 'off',
            'react/jsx-uses-react': 'off',

            // Disable type-aware rule that conflicts with React JSX event handlers
            '@typescript-eslint/no-misused-promises': 'off',
        },
    },
];
