import importPlugin from 'eslint-plugin-import';
import unicorn from 'eslint-plugin-unicorn';
import stylistic from '@stylistic/eslint-plugin';
import { LANGUAGE_OPTIONS } from './constants.js';
import { baseRules } from '@/rules/index.js';

export const baseConfig = {
    name: 'opencover/eslint/base',
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
        import: importPlugin,
        unicorn,
        stylistic,
    },
    languageOptions: LANGUAGE_OPTIONS,
    rules: baseRules,
};
