import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
	js.configs.recommended,
	...tseslint.configs.recommendedTypeChecked,
	reactPlugin.configs.flat.recommended,
	prettierConfig,
	{
		plugins: {
			'react-hooks': reactHooksPlugin,
			prettier: prettierPlugin,
			import: importPlugin,
		},
		languageOptions: {
			parser: tseslint.parser,
			parserOptions: {
				ecmaVersion: 2021,
				sourceType: 'module',
				ecmaFeatures: {
					jsx: true,
				},
				projectService: true,
			},
		},
		settings: {
			react: {
				version: 'detect',
			},
			'import/resolver': {
				typescript: {},
			},
		},
		rules: {
			'prettier/prettier': 'error',
			'@typescript-eslint/no-explicit-any': 'off',
			'no-console': ['error', { allow: ['warn', 'error'] }],
			'import/order': 'warn',
			'import/no-duplicates': 'error',
			'spaced-comment': [
				'error',
				'always',
				{
					block: {
						balanced: true,
					},
				},
			],
			'capitalized-comments': [
				'warn',
				'always',
				{
					ignoreConsecutiveComments: true,
				},
			],
		},
	},
];
