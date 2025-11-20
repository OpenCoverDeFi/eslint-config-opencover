import vitest from '@vitest/eslint-plugin';
import { testRules } from '../rules/index.js';
import { LANGUAGE_OPTIONS } from './constants.js';

export const testConfig = {
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
