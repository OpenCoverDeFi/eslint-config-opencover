import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import type { Linter } from 'eslint';
import { GLOB_JSX, GLOB_TSX } from './globs.js';

const reactConfig: Linter.Config[] = [
    {
        files: [GLOB_JSX, GLOB_TSX],
        settings: {
            react: {
                version: 'detect',
            },
        },
    },
    react.configs.flat.recommended,
    react.configs.flat['jsx-runtime'],
    reactHooks.configs.flat.recommended,
    {
        name: 'opencover/react',
        files: GLOB_TSX,
        languageOptions: {
            parserOptions: {
                projectService: true,
            },
        },
        rules: {
            '@typescript-eslint/no-misused-promises': [
                'error',
                {
                    checksVoidReturn: {
                        attributes: false,
                    },
                },
            ],
        },
    },
];

export default reactConfig;
