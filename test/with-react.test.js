/* eslint-disable unicorn/prefer-module, @typescript-eslint/no-var-requires */
const test = require('ava');
const { ESLint } = require('eslint');
const { resolve } = require('path');

const configPath = resolve(__dirname, '../with-react.mjs');

const isObject = (value) =>
	value && typeof value === 'object' && value.constructor === Object;

test('With React ESLint Rules', async (t) => {
	const linter = new ESLint({
		overrideConfigFile: configPath,
	});
	const code = `
    import ReactDOM from "react-dom";

	const element = <h1>Hello, world</h1>; //an uncapitalized comment without a space before it
	ReactDOM.render(element, document.querySelector("#root"));
	// This comment is valid since it has the correct capitalization.
	// this comment is ignored since it follows another comment,
	// and this one as well because it follows yet another comment.
	`.replace(/\t*/g, '');
	const [{ errorCount, messages, warningCount }] = await linter.lintText(code);
	t.is(errorCount, 6);
	t.is(warningCount, 1);
	t.is(messages[0].ruleId, 'prettier/prettier');
	t.is(messages[1].ruleId, 'import/no-unresolved');
	t.is(messages[2].ruleId, 'react/react-in-jsx-scope');
	t.is(messages[3].ruleId, 'spaced-comment');
	t.is(messages[4].ruleId, 'capitalized-comments');
	t.is(messages[5].ruleId, 'react/no-deprecated');
	t.is(messages[6].ruleId, 'no-undef');
});

test('Basic config structure', async (t) => {
	const config = await import(configPath);
	const defaultExport = config.default || config;
	t.true(Array.isArray(defaultExport));
	t.true(defaultExport.length > 0);
	const lastConfig = defaultExport[defaultExport.length - 1];
	t.true(isObject(lastConfig.rules));
});
