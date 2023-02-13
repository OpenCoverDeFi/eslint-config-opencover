/* eslint-disable unicorn/prefer-module, @typescript-eslint/no-var-requires */
const test = require("ava");
const { ESLint } = require("eslint");

const config = require("../with-react");

const isObject = (value) =>
	value && typeof value === "object" && value.constructor === Object;

test("With React ESLint Rules", async (t) => {
	const linter = new ESLint({ overrideConfigFile: "with-react.js" });
	const code = `
    import ReactDOM from "react-dom";

	const element = <h1>Hello, world</h1>;
	ReactDOM.render(element, document.querySelector("#root"));
	`.replace(/\t*/g, "");
	const [{ errorCount, messages, warningCount }] = await linter.lintText(code);
	t.is(errorCount, 3);
	t.is(warningCount, 0);
	t.is(messages[0].ruleId, "prettier/prettier");
	t.is(messages[1].ruleId, "import/no-unresolved");
	t.is(messages[2].ruleId, "react/react-in-jsx-scope");
});

test("Basic config structure", (t) => {
	const { plugins, rules } = config;
	t.true(isObject(rules));
});
