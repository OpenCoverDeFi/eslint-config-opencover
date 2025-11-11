import { describe, it } from 'vitest';
import { lintText, expectRuleError, expectNoRuleError } from '../setup.js';
import defaultConfig from '@/default.js';

const ruleName = 'no-restricted-globals';

describe(`${ruleName} (Map and Set)`, () => {
	it('should throw error for new Map()', async () => {
		const code = `const map = new Map();
	`.replace(/\t*/g, '');

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, ruleName);
	});

	it('should throw error for new Map with arguments', async () => {
		const code = `const map = new Map([['key', 'value']]);
	`.replace(/\t*/g, '');

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, ruleName);
	});

	it('should throw error for new Set()', async () => {
		const code = `const set = new Set();
	`.replace(/\t*/g, '');

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, ruleName);
	});

	it('should throw error for new Set with arguments', async () => {
		const code = `const set = new Set([1, 2, 3]);
	`.replace(/\t*/g, '');

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, ruleName);
	});

	it('should throw error for Map as variable reference', async () => {
		const code = `const MapConstructor = Map;
	`.replace(/\t*/g, '');

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, ruleName);
	});

	it('should throw error for Set as variable reference', async () => {
		const code = `const SetConstructor = Set;
	`.replace(/\t*/g, '');

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, ruleName);
	});

	it('should not throw error for other globals', async () => {
		const code = `const arr = new Array();
	const obj = new Object();
	`.replace(/\t*/g, '');

		const [result] = await lintText(defaultConfig, code);

		expectNoRuleError(result, ruleName);
	});
});
