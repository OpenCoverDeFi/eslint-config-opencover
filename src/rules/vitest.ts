import type { RulesConfig } from '@eslint/core';

export const vitestRules: Partial<RulesConfig> = {
    '@vitest/padding-around-before-all-blocks': 'error',
    '@vitest/padding-around-describe-blocks': 'error',
    '@vitest/padding-around-before-each-blocks': 'error',
    '@vitest/padding-around-after-all-blocks': 'error',
    '@vitest/padding-around-after-each-blocks': 'error',
    '@vitest/padding-around-test-blocks': 'error',
};
