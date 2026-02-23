import unicornPlugin from 'eslint-plugin-unicorn';
import { GLOB_SRC } from '../globs.js';
import type { TypedFlatConfigItem } from '../types.js';

export const unicorn: TypedFlatConfigItem[] = [
    {
        name: 'opencover/unicorn/setup',
        plugins: {
            unicorn: unicornPlugin,
        },
    },
    {
        name: 'opencover/unicorn/rules',
        files: [GLOB_SRC],
        rules: {
            'unicorn/no-array-callback-reference': 'error',
            'unicorn/filename-case': [
                'error',
                {
                    case: 'kebabCase',
                },
            ],
        },
    },
];
