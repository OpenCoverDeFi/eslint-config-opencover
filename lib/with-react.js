/**
 * @type {import("eslint").Linter.Config}
 */
// eslint-disable-next-line unicorn/prefer-module
module.exports = {
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: 2021,
		sourceType: "module",
	},
	extends: [
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:prettier/recommended",
		"plugin:react-hooks/recommended",
		"plugin:import/recommended",
		"plugin:import/typescript",
	],
	rules: {
		"@typescript-eslint/no-explicit-any": "off",
		"no-console": ["error", { allow: ["warn", "error"] }],
		"import/order": "warn",
		"import/no-duplicates": "error",
	},
	settings: {
		react: {
			version: "detect",
		},
	},
};
