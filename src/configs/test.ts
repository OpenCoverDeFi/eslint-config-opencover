import vitest from '@vitest/eslint-plugin';
import { GLOB_TESTS } from '../globs.js';
import type { TypedFlatConfigItem } from '../types.js';

export const test: TypedFlatConfigItem[] = [
    {
        name: 'opencover/test',
        files: GLOB_TESTS,
        plugins: {
            vitest,
        },
        languageOptions: {
            globals: {
                ...vitest.environments.env.globals,
            },
        },
        rules: {
            ...vitest.configs.recommended.rules,

            // Custom test rules
            '@typescript-eslint/no-unsafe-assignment': 'off',
            'vitest/padding-around-before-all-blocks': 'error',
            'vitest/padding-around-describe-blocks': 'error',
            'vitest/padding-around-before-each-blocks': 'error',
            'vitest/padding-around-after-all-blocks': 'error',
            'vitest/padding-around-after-each-blocks': 'error',
            'vitest/padding-around-test-blocks': 'error',
        },
        settings: {
            vitest: {
                typecheck: true,
            },
        },
    },
];
