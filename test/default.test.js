/* eslint-disable unicorn/prefer-module, @typescript-eslint/no-var-requires */
const test = require("ava");
const { ESLint } = require("eslint");

const config = require("../index");

const isObject = (value) =>
	value && typeof value === "object" && value.constructor === Object;

test("Basic ESLint Rules", async (t) => {
	const linter = new ESLint({ overrideConfigFile: "index.js" });

	const code = `const notUsed = "5";
	const fn = (x) => x;
	fn({a:1});
	`.replace(/\t*/g, "");

	const [{ errorCount, warningCount, messages }] = await linter.lintText(code);
	t.is(warningCount, 4);
	t.is(errorCount, 2);
	t.is(messages[0].ruleId, "@typescript-eslint/no-unused-vars");
	t.is(messages[1].ruleId, "@typescript-eslint/quotes");
	t.is(messages[2].ruleId, "quotes");
	t.is(messages[3].ruleId, "object-curly-spacing");
	t.is(messages[4].ruleId, "key-spacing");
	t.is(messages[5].ruleId, "object-curly-spacing");
});

test("Basic config structure", (t) => {
	const { plugins, rules } = config;

	t.true(Array.isArray(plugins));
	t.true(isObject(rules));
});
