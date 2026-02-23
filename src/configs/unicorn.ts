import unicornPlugin from 'eslint-plugin-unicorn';
import { GLOB_SRC } from '../globs.js';
import type { TypedFlatConfigItem } from '../types.js';

export const unicorn: TypedFlatConfigItem[] = [
    {
        name: 'opencover/unicorn',
        files: [GLOB_SRC],
        plugins: {
            unicorn: unicornPlugin,
        },
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
