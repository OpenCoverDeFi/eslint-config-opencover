/* eslint-disable unicorn/prefer-module, @typescript-eslint/no-var-requires */
const test = require('ava');
const { ESLint } = require('eslint');
const { resolve } = require('path');

const configPath = resolve(__dirname, '../index.mjs');

const isObject = (value) =>
	value && typeof value === 'object' && value.constructor === Object;

test('Basic ESLint Rules', async (t) => {
	const linter = new ESLint({
		overrideConfigFile: configPath,
	});

	const code = `const notUsed = "5";
	const fn = (x) => x; //an uncapitalized comment without a space before it
	fn({a:1});
	// This comment is valid since it has the correct capitalization.
	// this comment is ignored since it follows another comment,
	// and this one as well because it follows yet another comment.
	`.replace(/\t*/g, '');

	const [{ errorCount, warningCount, messages }] = await linter.lintText(code);
	t.is(warningCount, 4);
	t.is(errorCount, 3);
	t.is(messages[0].ruleId, '@typescript-eslint/no-unused-vars');
	t.is(messages[1].ruleId, 'quotes');
	t.is(messages[2].ruleId, 'spaced-comment');
	t.is(messages[3].ruleId, 'capitalized-comments');
	t.is(messages[4].ruleId, 'object-curly-spacing');
	t.is(messages[5].ruleId, 'key-spacing');
	t.is(messages[6].ruleId, 'object-curly-spacing');
});

test('Basic config structure', async (t) => {
	const config = await import(configPath);
	const defaultExport = config.default || config;
	t.true(Array.isArray(defaultExport));
	t.true(defaultExport.length > 0);
	const lastConfig = defaultExport[defaultExport.length - 1];
	t.true(isObject(lastConfig.rules));
});

test('no-multiple-empty-lines rule throws error', async (t) => {
	const linter = new ESLint({
		overrideConfigFile: configPath,
	});

	const code = `const x = 1;


const y = 2;
`.replace(/\t*/g, '');

	const [{ warningCount, messages }] = await linter.lintText(code);
	t.true(warningCount > 0);
	const multipleEmptyLinesWarning = messages.find(
		(msg) => msg.ruleId === 'no-multiple-empty-lines'
	);
	t.truthy(multipleEmptyLinesWarning);
	t.is(multipleEmptyLinesWarning.ruleId, 'no-multiple-empty-lines');
});
