import vitest from '@vitest/eslint-plugin';
import { LANGUAGE_OPTIONS } from './constants.js';
import { testRules } from '@/rules/index.js';

export const testConfig = {
    name: 'opencover/eslint/vitest',
    files: ['tests/**/*.ts', 'tests/**/*.tsx', '**/*.test.ts', '**/*.test.tsx'],
    plugins: {
        '@vitest': vitest,
    },
    languageOptions: {
        ...LANGUAGE_OPTIONS,
        globals: {
            ...vitest.environments.env.globals,
        },
    },
    rules: testRules,
    settings: {
        vitest: {
            typecheck: true,
        },
    },
};
