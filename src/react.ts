import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import type { Linter } from 'eslint';
import { GLOB_TS } from '@/globs.js';

const reactConfig: Linter.Config[] = [
    react.configs.flat.recommended,
    reactHooks.configs.flat.recommended,
    {
        name: 'opencover/react',
        files: GLOB_TS,
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
