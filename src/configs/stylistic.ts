import stylisticPlugin from '@stylistic/eslint-plugin';
import { GLOB_SRC } from '../globs.js';
import type { TypedFlatConfigItem } from '../types.js';

export const stylistic: TypedFlatConfigItem[] = [
    {
        name: 'opencover/stylistic/setup',
        plugins: {
            stylistic: stylisticPlugin,
        },
    },
    {
        name: 'opencover/stylistic/rules',
        files: [GLOB_SRC],
        rules: {
            'stylistic/padding-line-between-statements': [
                'error',
                {
                    blankLine: 'always',
                    prev: '*',
                    next: ['function', 'class', 'export'],
                },
                {
                    blankLine: 'always',
                    prev: ['function', 'class', 'export'],
                    next: '*',
                },
                {
                    blankLine: 'always',
                    prev: '*',
                    next: 'if',
                },
                {
                    blankLine: 'always',
                    prev: 'block-like',
                    next: 'if',
                },
                {
                    blankLine: 'always',
                    prev: 'if',
                    next: '*',
                },
            ],
        },
    },
];
