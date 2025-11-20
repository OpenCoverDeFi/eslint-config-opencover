import importPlugin from 'eslint-plugin-import';
import unicorn from 'eslint-plugin-unicorn';
import stylistic from '@stylistic/eslint-plugin';
import opencover from '../plugin/index.js';
import { baseRules } from '../rules/index.js';
import { LANGUAGE_OPTIONS } from './constants.js';

export const baseConfig = {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
        import: importPlugin,
        unicorn,
        opencover,
        stylistic,
    },
    languageOptions: LANGUAGE_OPTIONS,
    rules: baseRules,
};
