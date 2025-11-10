import defaultConfig from './index.mjs';

/** @type {import('eslint').Linter.LanguageOptions} */
const defaultLanguageOptions = defaultConfig.reduce(
	/**
	 * @param {import('eslint').Linter.LanguageOptions} acc
	 * @param {import('eslint').Linter.Config} curr
	 * @returns {import('eslint').Linter.LanguageOptions}
	 */
	(acc, curr) => {
		return {
			...acc,
			...(curr.languageOptions || {}),
		};
	},
	/** @type {import('eslint').Linter.LanguageOptions} */ ({})
);

export default [
	{
		ignores: ['.temp/**/*.ts'],
	},
	...defaultConfig,
	{
		languageOptions: {
			...defaultLanguageOptions,
			parserOptions: {
				...defaultLanguageOptions.parserOptions,
				projectService: {
					allowDefaultProject: ['*.mjs', 'lib/*.mjs', 'lib/rules/*.mjs'],
				},
			},
		},
	},
];
