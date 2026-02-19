import vitest from '@vitest/eslint-plugin';
import type { RulesConfig } from '@eslint/core';
import { GLOB_TESTS } from '../globs.js';
import type { TypedFlatConfigItem } from '../types.js';

export function test(overrides: Partial<RulesConfig> = {}): TypedFlatConfigItem[] {
    return [
        {
            name: 'opencover/test/setup',
            plugins: {
                vitest,
            },
        },
        {
            name: 'opencover/test/rules',
            files: GLOB_TESTS,
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

                ...overrides,
            },
            settings: {
                vitest: {
                    typecheck: true,
                },
            },
        },
    ];
}
