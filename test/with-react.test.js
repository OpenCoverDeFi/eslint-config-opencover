/* eslint-disable unicorn/prefer-module, @typescript-eslint/no-var-requires */
const test = require('ava');
const { ESLint } = require('eslint');

const config = require('../with-react');

const isObject = (value) =>
    value && typeof value === 'object' && value.constructor === Object;

test('With React ESLint Rules', async (t) => {
    const linter = new ESLint({ overrideConfigFile: 'with-react.js' });
    const code = `
    import ReactDOM from "react-dom";

	const element = <h1>Hello, world</h1>; //an uncapitalized comment without a space before it
	ReactDOM.render(element, document.querySelector("#root"));
	`.replace(/\t*/g, '');
    const [{ errorCount, messages, warningCount }] = await linter.lintText(code);
    t.is(errorCount, 4);
    t.is(warningCount, 1);
    t.is(messages[0].ruleId, 'prettier/prettier');
    t.is(messages[1].ruleId, 'import/no-unresolved');
    t.is(messages[2].ruleId, 'react/react-in-jsx-scope');
    t.is(messages[3].ruleId, 'spaced-comment');
    t.is(messages[4].ruleId, 'capitalized-comments');
});

test('Basic config structure', (t) => {
    const { plugins, rules } = config;
    t.true(isObject(rules));
});
