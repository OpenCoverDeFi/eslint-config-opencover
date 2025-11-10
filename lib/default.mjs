import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';

export default [
	js.configs.recommended,
	...tseslint.configs.recommended,
	{
		plugins: {
			import: importPlugin,
		},
		languageOptions: {
			parser: tseslint.parser,
			parserOptions: {
				ecmaVersion: 2023,
				sourceType: 'module',
			},
		},
		settings: {
			'import/resolver': {
				typescript: {},
			},
		},
		rules: {
			// Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
			// E.g. '@typescript-eslint/explicit-function-return-type': 'off',
			'@typescript-eslint/no-non-null-assertion': 'off',
			'import/prefer-default-export': 'off',
			indent: ['warn', 4, { SwitchCase: 1 }],
			'no-multiple-empty-lines': ['warn', { max: 1, maxEOF: 1 }],
			semi: ['error', 'always'],
			quotes: [2, 'single', { avoidEscape: true }],
			'object-curly-spacing': ['warn', 'always'],
			'key-spacing': ['warn', { mode: 'strict' }],
			'space-before-blocks': ['error', 'always'],
			'block-spacing': ['error', 'always'],
			'space-infix-ops': 'error',
			'comma-spacing': ['error', { before: false, after: true }],
			'keyword-spacing': ['error', { before: true }],
			'space-in-parens': ['error', 'never'],
			'no-multi-spaces': 'error',
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
			'quote-props': [1, 'as-needed'],
			'spaced-comment': [
				'error', 'always',
				{
					block: {
						balanced: true
					},
				}
			],
			'capitalized-comments': [
				'warn',
				'always',
				{
					ignoreConsecutiveComments: true
				}
			]
		},
	},
];
