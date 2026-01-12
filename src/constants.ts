import tseslint from 'typescript-eslint';
import type { LanguageOptions } from '@eslint/core';

export const PARSER_OPTIONS = {
    ecmaVersion: 2024,
    sourceType: 'module' as const,
    projectService: true,
    tsconfigRootDir: process.cwd(),
};

export const LANGUAGE_OPTIONS: LanguageOptions = {
    parser: tseslint.parser,
    parserOptions: PARSER_OPTIONS,
};
