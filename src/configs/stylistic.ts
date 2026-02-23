import stylisticPlugin from '@stylistic/eslint-plugin';
import { GLOB_SRC } from '../globs.js';
import type { TypedFlatConfigItem } from '../types.js';

export const stylistic: TypedFlatConfigItem[] = [
    {
        name: 'opencover/stylistic',
        files: [GLOB_SRC],
        plugins: {
            stylistic: stylisticPlugin,
        },
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
