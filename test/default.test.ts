import { unlinkSync } from 'fs';
import { describe, it, beforeEach, afterEach, expect } from 'vitest';
import { ESLint } from 'eslint';
import { createTempFile, createESLintInstance } from './helpers/test-utils.js';
import defaultConfig from '@/default.js';

let tempFilePath: string;
let linter: ESLint;

afterEach(() => {
	if (tempFilePath) {
		try {
			unlinkSync(tempFilePath);
		} catch {
			// Ignore
		}
	}
});

beforeEach(() => {
	tempFilePath = createTempFile('', 'ts');
	linter = createESLintInstance(defaultConfig);
});

describe('Basic ESLint Rules', () => {
	it('should enforce basic ESLint rules', async () => {
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

		expect(warningCount).toBe(4);
		expect(errorCount).toBe(4);
		expect(messages[0]?.ruleId).toBe('@typescript-eslint/no-unused-vars');
		expect(messages[1]?.ruleId).toBe('quotes');
		expect(messages[2]?.ruleId).toBe('@typescript-eslint/no-unsafe-return');
		expect(messages[3]?.ruleId).toBe('spaced-comment');
		expect(messages[4]?.ruleId).toBe('capitalized-comments');
		expect(messages[5]?.ruleId).toBe('object-curly-spacing');
		expect(messages[6]?.ruleId).toBe('key-spacing');
		expect(messages[7]?.ruleId).toBe('object-curly-spacing');
	});
});

it('no-multiple-empty-lines rule throws error', async () => {
	const code = `const x = 1;


const y = 2;
`.replace(/\t*/g, '');

	const [{ warningCount, messages }] = await linter.lintText(code, {
		filePath: tempFilePath,
	});
	expect(warningCount).toBeGreaterThan(0);
	const multipleEmptyLinesWarning = messages.find((msg) => msg.ruleId === 'no-multiple-empty-lines');
	expect(multipleEmptyLinesWarning).toBeTruthy();
	expect(multipleEmptyLinesWarning?.ruleId).toBe('no-multiple-empty-lines');
});

it('unicorn/no-array-callback-reference rule throws error', async () => {
	const code = `const callback = (element) => element * 2;
	const array = [1, 2, 3];
	const foo = array.map(callback);
	`.replace(/\t*/g, '');

	const [{ errorCount, messages }] = await linter.lintText(code, {
		filePath: tempFilePath,
	});
	expect(errorCount).toBeGreaterThan(0);
	const noArrayCallbackReferenceError = messages.find((msg) => msg.ruleId === 'unicorn/no-array-callback-reference');
	expect(noArrayCallbackReferenceError).toBeTruthy();
	expect(noArrayCallbackReferenceError?.ruleId).toBe('unicorn/no-array-callback-reference');
});

it('@typescript-eslint/no-non-null-assertion rule throws error for ex!.optional', async () => {
	const code = `type Example = { optional?: boolean };
	const ex: Example = {};
	const result = ex!.optional;
	`.replace(/\t*/g, '');

	const [{ errorCount, messages }] = await linter.lintText(code, {
		filePath: tempFilePath,
	});
	expect(errorCount).toBeGreaterThan(0);
	const nonNullAssertionError = messages.find((msg) => msg.ruleId === '@typescript-eslint/no-non-null-assertion');
	expect(nonNullAssertionError).toBeTruthy();
	expect(nonNullAssertionError?.ruleId).toBe('@typescript-eslint/no-non-null-assertion');
});

it('@typescript-eslint/no-non-null-assertion rule throws error for ex.optional!', async () => {
	const code = `type Example = { optional?: boolean };
	const ex: Example = {};
	const result = ex.optional!;
	`.replace(/\t*/g, '');

	const [{ errorCount, messages }] = await linter.lintText(code, {
		filePath: tempFilePath,
	});
	expect(errorCount).toBeGreaterThan(0);
	const nonNullAssertionError = messages.find((msg) => msg.ruleId === '@typescript-eslint/no-non-null-assertion');
	expect(nonNullAssertionError).toBeTruthy();
	expect(nonNullAssertionError?.ruleId).toBe('@typescript-eslint/no-non-null-assertion');
});

it('@typescript-eslint/no-non-null-assertion rule throws error for value!.toString()', async () => {
	const code = `let value: string | null = null;
	const result = value!.toString();
	`.replace(/\t*/g, '');

	const [{ errorCount, messages }] = await linter.lintText(code, {
		filePath: tempFilePath,
	});
	expect(errorCount).toBeGreaterThan(0);
	const nonNullAssertionError = messages.find((msg) => msg.ruleId === '@typescript-eslint/no-non-null-assertion');
	expect(nonNullAssertionError).toBeTruthy();
	expect(nonNullAssertionError?.ruleId).toBe('@typescript-eslint/no-non-null-assertion');
});

it('@opencover-eslint/no-unnecessary-optional-chain rule throws error for ex?.value when ex is not nullable', async () => {
	const code = `type Example = { value: boolean };
	const ex: Example = { value: true };
	const result = ex?.value;
	`.replace(/\t*/g, '');

	const [{ errorCount, messages }] = await linter.lintText(code, {
		filePath: tempFilePath,
	});
	expect(errorCount).toBeGreaterThan(0);
	const unnecessaryOptionalChainError = messages.find(
		(msg) => msg.ruleId === '@opencover-eslint/no-unnecessary-optional-chain'
	);
	expect(unnecessaryOptionalChainError).toBeTruthy();
	expect(unnecessaryOptionalChainError?.ruleId).toBe('@opencover-eslint/no-unnecessary-optional-chain');
});

it('@opencover-eslint/no-unnecessary-optional-chain rule throws error for ex.value?.() when value is not a function', async () => {
	const code = `type Example = { value: boolean };
	const ex: Example = { value: true };
	const result = ex.value?.();
	`.replace(/\t*/g, '');

	const [{ errorCount, messages }] = await linter.lintText(code, {
		filePath: tempFilePath,
	});
	expect(errorCount).toBeGreaterThan(0);
	const unnecessaryOptionalChainError = messages.find(
		(msg) => msg.ruleId === '@opencover-eslint/no-unnecessary-optional-chain'
	);
	expect(unnecessaryOptionalChainError).toBeTruthy();
	expect(unnecessaryOptionalChainError?.ruleId).toBe('@opencover-eslint/no-unnecessary-optional-chain');
});

it('@opencover-eslint/no-unnecessary-optional-chain rule throws error for ex?.[0] when ex is not nullable', async () => {
	const code = `type Example = { value: boolean };
	const ex: Example = { value: true };
	const result = ex?.[0];
	`.replace(/\t*/g, '');

	const [{ errorCount, messages }] = await linter.lintText(code, {
		filePath: tempFilePath,
	});
	expect(errorCount).toBeGreaterThan(0);
	const unnecessaryOptionalChainError = messages.find(
		(msg) => msg.ruleId === '@opencover-eslint/no-unnecessary-optional-chain'
	);
	expect(unnecessaryOptionalChainError).toBeTruthy();
	expect(unnecessaryOptionalChainError?.ruleId).toBe('@opencover-eslint/no-unnecessary-optional-chain');
});
