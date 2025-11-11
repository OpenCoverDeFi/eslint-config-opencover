import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import unicornPlugin from 'eslint-plugin-unicorn';
import { defineConfig } from 'eslint/config';
import customPlugin from './plugin.js';

const config = defineConfig([
	js.configs.recommended,
	...tseslint.configs.recommendedTypeChecked,
	{
		plugins: {
			import: importPlugin,
			unicorn: unicornPlugin,
			'@opencover-eslint': customPlugin,
		},
		languageOptions: {
			parser: tseslint.parser,
			parserOptions: {
				ecmaVersion: 2024,
				sourceType: 'module',
				projectService: true,
			},
		},
		settings: {
			'import/resolver': {
				typescript: {},
			},
		},
		rules: {
			'@opencover-eslint/no-unnecessary-optional-chain': 'error',
			'@typescript-eslint/no-non-null-assertion': 'error',
			'block-spacing': ['error', 'always'],
			'capitalized-comments': [
				'warn',
				'always',
				{
					ignoreConsecutiveComments: true,
				},
			],
			'comma-spacing': ['error', { before: false, after: true }],
			'import/order': [
				'warn',
				{
					pathGroups: [
						{
							pattern: '@dc/**',
							group: 'parent',
							position: 'before',
						},
					],
				},
			],
			'import/prefer-default-export': 'off',
			'key-spacing': ['warn', { mode: 'strict' }],
			'keyword-spacing': ['error', { before: true }],
			'no-multi-spaces': 'error',
			'no-multiple-empty-lines': ['warn', { max: 1, maxEOF: 1 }],
			'object-curly-spacing': ['warn', 'always'],
			'quote-props': [1, 'as-needed'],
			quotes: [2, 'single', { avoidEscape: true }],
			semi: ['error', 'always'],
			'space-before-blocks': ['error', 'always'],
			'space-in-parens': ['error', 'never'],
			'space-infix-ops': 'error',
			'spaced-comment': [
				'error',
				'always',
				{
					block: {
						balanced: true,
					},
				},
			],
			'unicorn/no-array-callback-reference': 'error',
		},
	},
]);

export default config;
