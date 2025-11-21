import type { RulesConfig } from '@eslint/core';
import { typescriptRules } from './typescript.js';
import { eslintRules } from './eslint.js';
import { stylisticRules } from './stylistic.js';
import { importRules } from './import.js';
import { unicornRules } from './unicorn.js';
import { vitestRules } from './vitest.js';

export const baseRules: Partial<RulesConfig> = {
    ...typescriptRules,
    ...eslintRules,
    ...stylisticRules,
    ...importRules,
    ...unicornRules,
};

export const testRules: Partial<RulesConfig> = {
    '@typescript-eslint/no-unsafe-assignment': 'off', // We want expect.any and similar in tests
    ...vitestRules,
};
