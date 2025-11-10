import test from 'ava';
import { ESLint } from 'eslint';
import { createTempFile, createESLintInstance } from './helpers/test-utils.ts';
import defaultConfig from '../lib/default.ts';
import { unlinkSync } from 'fs';

let tempFilePath: string;
let linter: ESLint;

test.afterEach(() => {
	if (tempFilePath) {
		try {
			unlinkSync(tempFilePath);
		} catch {
			// Ignore
		}
	}
});

test.beforeEach(async () => {
	tempFilePath = createTempFile('', 'ts');
	linter = await createESLintInstance(defaultConfig);
});

test('Basic ESLint Rules', async (t) => {
	const code = `const notUsed = "5";
	const fn = (x) => x; //an uncapitalized comment without a space before it
	fn({a:1});
	// This comment is valid since it has the correct capitalization.
	// this comment is ignored since it follows another comment,
	// and this one as well because it follows yet another comment.
	`.replace(/\t*/g, '');

	const [{ errorCount, warningCount, messages }] = await linter.lintText(code, {
		filePath: tempFilePath,
	});

	t.is(warningCount, 4);
	t.is(errorCount, 4);
	t.is(messages[0]?.ruleId, '@typescript-eslint/no-unused-vars');
	t.is(messages[1]?.ruleId, 'quotes');
	t.is(messages[2]?.ruleId, '@typescript-eslint/no-unsafe-return');
	t.is(messages[3]?.ruleId, 'spaced-comment');
	t.is(messages[4]?.ruleId, 'capitalized-comments');
	t.is(messages[5]?.ruleId, 'object-curly-spacing');
	t.is(messages[6]?.ruleId, 'key-spacing');
	t.is(messages[7]?.ruleId, 'object-curly-spacing');
});

test('no-multiple-empty-lines rule throws error', async (t) => {
	const code = `const x = 1;


const y = 2;
`.replace(/\t*/g, '');

	const [{ warningCount, messages }] = await linter.lintText(code, {
		filePath: tempFilePath,
	});
	t.true(warningCount > 0);
	const multipleEmptyLinesWarning = messages.find((msg) => msg.ruleId === 'no-multiple-empty-lines');
	t.truthy(multipleEmptyLinesWarning);
	t.is(multipleEmptyLinesWarning?.ruleId, 'no-multiple-empty-lines');
});

test('unicorn/no-array-callback-reference rule throws error', async (t) => {
	const code = `const callback = (element) => element * 2;
	const array = [1, 2, 3];
	const foo = array.map(callback);
	`.replace(/\t*/g, '');

	const [{ errorCount, messages }] = await linter.lintText(code, {
		filePath: tempFilePath,
	});
	t.true(errorCount > 0);
	const noArrayCallbackReferenceError = messages.find((msg) => msg.ruleId === 'unicorn/no-array-callback-reference');
	t.truthy(noArrayCallbackReferenceError);
	t.is(noArrayCallbackReferenceError?.ruleId, 'unicorn/no-array-callback-reference');
});

test('@typescript-eslint/no-non-null-assertion rule throws error for ex!.optional', async (t) => {
	const code = `type Example = { optional?: boolean };
	const ex: Example = {};
	const result = ex!.optional;
	`.replace(/\t*/g, '');

	const [{ errorCount, messages }] = await linter.lintText(code, {
		filePath: tempFilePath,
	});
	t.true(errorCount > 0);
	const nonNullAssertionError = messages.find((msg) => msg.ruleId === '@typescript-eslint/no-non-null-assertion');
	t.truthy(nonNullAssertionError);
	t.is(nonNullAssertionError?.ruleId, '@typescript-eslint/no-non-null-assertion');
});

test('@typescript-eslint/no-non-null-assertion rule throws error for ex.optional!', async (t) => {
	const code = `type Example = { optional?: boolean };
	const ex: Example = {};
	const result = ex.optional!;
	`.replace(/\t*/g, '');

	const [{ errorCount, messages }] = await linter.lintText(code, {
		filePath: tempFilePath,
	});
	t.true(errorCount > 0);
	const nonNullAssertionError = messages.find((msg) => msg.ruleId === '@typescript-eslint/no-non-null-assertion');
	t.truthy(nonNullAssertionError);
	t.is(nonNullAssertionError?.ruleId, '@typescript-eslint/no-non-null-assertion');
});

test('@typescript-eslint/no-non-null-assertion rule throws error for value!.toString()', async (t) => {
	const code = `let value: string | null = null;
	const result = value!.toString();
	`.replace(/\t*/g, '');

	const [{ errorCount, messages }] = await linter.lintText(code, {
		filePath: tempFilePath,
	});
	t.true(errorCount > 0);
	const nonNullAssertionError = messages.find((msg) => msg.ruleId === '@typescript-eslint/no-non-null-assertion');
	t.truthy(nonNullAssertionError);
	t.is(nonNullAssertionError?.ruleId, '@typescript-eslint/no-non-null-assertion');
});

test('@opencover/no-unnecessary-optional-chain rule throws error for ex?.value when ex is not nullable', async (t) => {
	const code = `type Example = { value: boolean };
	const ex: Example = { value: true };
	const result = ex?.value;
	`.replace(/\t*/g, '');

	const [{ errorCount, messages }] = await linter.lintText(code, {
		filePath: tempFilePath,
	});
	t.true(errorCount > 0);
	const unnecessaryOptionalChainError = messages.find(
		(msg) => msg.ruleId === '@opencover/no-unnecessary-optional-chain'
	);
	t.truthy(unnecessaryOptionalChainError);
	t.is(unnecessaryOptionalChainError?.ruleId, '@opencover/no-unnecessary-optional-chain');
});

test('@opencover/no-unnecessary-optional-chain rule throws error for ex.value?.() when value is not a function', async (t) => {
	const code = `type Example = { value: boolean };
	const ex: Example = { value: true };
	const result = ex.value?.();
	`.replace(/\t*/g, '');

	const [{ errorCount, messages }] = await linter.lintText(code, {
		filePath: tempFilePath,
	});
	t.true(errorCount > 0);
	const unnecessaryOptionalChainError = messages.find(
		(msg) => msg.ruleId === '@opencover/no-unnecessary-optional-chain'
	);
	t.truthy(unnecessaryOptionalChainError);
	t.is(unnecessaryOptionalChainError?.ruleId, '@opencover/no-unnecessary-optional-chain');
});

test('@opencover/no-unnecessary-optional-chain rule throws error for ex?.[0] when ex is not nullable', async (t) => {
	const code = `type Example = { value: boolean };
	const ex: Example = { value: true };
	const result = ex?.[0];
	`.replace(/\t*/g, '');

	const [{ errorCount, messages }] = await linter.lintText(code, {
		filePath: tempFilePath,
	});
	t.true(errorCount > 0);
	const unnecessaryOptionalChainError = messages.find(
		(msg) => msg.ruleId === '@opencover/no-unnecessary-optional-chain'
	);
	t.truthy(unnecessaryOptionalChainError);
	t.is(unnecessaryOptionalChainError?.ruleId, '@opencover/no-unnecessary-optional-chain');
});
