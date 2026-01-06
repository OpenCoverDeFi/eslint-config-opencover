import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';
import { GLOBAL_IGNORE_PATTERNS } from './constants.js';
import { baseConfig } from './base.js';
import { testConfig } from './test.js';
import opencover from '@/plugin/index.js';

const config = defineConfig([
    globalIgnores(GLOBAL_IGNORE_PATTERNS),
    eslint.configs.recommended,
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.recommendedTypeChecked,
    // TODO (@eniko1556, 2025-11-21): we want to introduce  ...tseslint.configs.strictTypeChecked at some point
    ...opencover.configs.recommended,
    baseConfig,
    testConfig,
]);

export default config;
