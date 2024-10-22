/* eslint-disable unicorn/prefer-module, @typescript-eslint/no-var-requires */
const test = require('ava');
const { ESLint } = require('eslint');

const config = require('../index');

const isObject = (value) =>
    value && typeof value === 'object' && value.constructor === Object;

test('Basic ESLint Rules', async (t) => {
    const linter = new ESLint({ overrideConfigFile: 'index.js' });

    const code = `const notUsed = "5";
	const fn = (x) => x; //an uncapitalized comment without a space before it
	fn({a:1});
	`.replace(/\t*/g, '');

    const [{ errorCount, warningCount, messages }] = await linter.lintText(code);
    t.is(warningCount, 5);
    t.is(errorCount, 3);
    console.log(messages);
    t.is(messages[0].ruleId, '@typescript-eslint/no-unused-vars');
    t.is(messages[1].ruleId, '@typescript-eslint/quotes');
    t.is(messages[2].ruleId, 'quotes');
    t.is(messages[3].ruleId, 'spaced-comment');
    t.is(messages[4].ruleId, 'capitalized-comments');
    t.is(messages[5].ruleId, 'object-curly-spacing');
    t.is(messages[6].ruleId, 'key-spacing');
    t.is(messages[7].ruleId, 'object-curly-spacing');
});

test('Basic config structure', (t) => {
    const { plugins, rules } = config;

    t.true(Array.isArray(plugins));
    t.true(isObject(rules));
});

