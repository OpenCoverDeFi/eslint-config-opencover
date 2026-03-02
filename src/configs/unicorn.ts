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
            ...unicornPlugin.configs['recommended'].rules,

            // Keep our existing overrides
            'unicorn/no-array-callback-reference': 'error',
            'unicorn/filename-case': [
                'error',
                {
                    case: 'kebabCase',
                },
            ],

            // Disable rules that are too noisy or conflict with team style
            'unicorn/prevent-abbreviations': 'off',
            'unicorn/no-array-for-each': 'off',
            'unicorn/no-array-reduce': 'off',
            'unicorn/no-null': 'off',
        },
    },
];
