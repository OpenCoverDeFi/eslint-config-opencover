import { unlinkSync } from 'fs';
import { describe, it, beforeEach, afterEach, expect } from 'vitest';
import { ESLint } from 'eslint';
import { createTempFile, createESLintInstance } from './helpers/test-utils.js';
import withReactConfig from '@/with-react.js';

let tempFilePath: string;
let linter: ESLint;

afterEach(() => {
	if (tempFilePath) {
		unlinkSync(tempFilePath);
	}
});

beforeEach(() => {
	tempFilePath = createTempFile('', 'ts');
	linter = createESLintInstance(withReactConfig);
});

// TODO: Fix this test
describe.skip('With React ESLint Rules', () => {
	it('should enforce React ESLint rules', async () => {
		const code = `
    import ReactDOM from "react-dom";

	const element = <h1>Hello, world</h1>; //an uncapitalized comment without a space before it
	ReactDOM.render(element, document.querySelector("#root"));
	// This comment is valid since it has the correct capitalization.
	// this comment is ignored since it follows another comment,
	// and this one as well because it follows yet another comment.
	`.replace(/\t*/g, '');
		const [{ errorCount, messages, warningCount }] = await linter.lintText(code, {
			filePath: tempFilePath,
		});
		expect(errorCount).toBe(5);
		expect(warningCount).toBe(1);
		expect(messages[0]?.ruleId).toBe('prettier/prettier');
		expect(messages[1]?.ruleId).toBe('import/no-unresolved');
		expect(messages[2]?.ruleId).toBe('react/react-in-jsx-scope');
		expect(messages[3]?.ruleId).toBe('spaced-comment');
		expect(messages[4]?.ruleId).toBe('capitalized-comments');
		expect(messages[5]?.ruleId).toBe('react/no-deprecated');
	});
});
