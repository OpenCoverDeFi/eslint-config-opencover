import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import unicornPlugin from 'eslint-plugin-unicorn';
import { defineConfig } from 'eslint/config';
import vitest from '@vitest/eslint-plugin';
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
			'@opencover-eslint/filename-no-dots': [
				'error',
				{
					ignorePattern: ['^.+\\.config\\.[^.]+$'],
				},
			],
			'@opencover-eslint/no-enum': 'error',
			'@typescript-eslint/consistent-type-imports': [
				'error',
				{
					prefer: 'type-imports',
					disallowTypeAnnotations: false,
				},
			],
			'@typescript-eslint/member-ordering': 'error',
			'@typescript-eslint/no-non-null-assertion': 'error',
			'@typescript-eslint/no-unnecessary-condition': 'error',
			'@typescript-eslint/no-restricted-types': [
				'error',
				{
					types: {
						Map: {
							message: 'Map is not allowed. Use an alternative data structure.',
						},
						Set: {
							message: 'Set is not allowed. Use an alternative data structure.',
						},
					},
				},
			],
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
			'no-unneeded-ternary': 'error',
			'no-use-before-define': ['error', { variables: true, functions: true, classes: true }],
			'no-restricted-globals': [
				'error',
				{
					name: 'Map',
					message: 'Map is not allowed. Use an alternative data structure.',
				},
				{
					name: 'Set',
					message: 'Set is not allowed. Use an alternative data structure.',
				},
			],
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
			'unicorn/filename-case': [
				'error',
				{
					case: 'kebabCase',
				},
			],
		},
	},
	{
		files: ['**/*.test.ts'],
		plugins: {
			'@vitest': vitest,
		},
		rules: {
			'@vitest/padding-around-before-all-blocks': 'error',
			'@vitest/padding-around-describe-blocks': 'error',
			'@vitest/padding-around-before-each-blocks': 'error',
			'@vitest/padding-around-after-all-blocks': 'error',
			'@vitest/padding-around-after-each-blocks': 'error',
			'@vitest/padding-around-test-blocks': 'error',
		},
		settings: {
			vitest: {
				typecheck: true,
			},
		},
		languageOptions: {
			globals: {
				...vitest.environments.env.globals,
			},
		},
	},
]);

export default config;
