import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';
import { GLOBAL_IGNORE_PATTERNS } from './constants.js';
import { baseConfig } from './base.js';
import { testConfig } from './test.js';

const config = defineConfig([
    globalIgnores(GLOBAL_IGNORE_PATTERNS),
    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    baseConfig,
    testConfig,
]);

export default config;
