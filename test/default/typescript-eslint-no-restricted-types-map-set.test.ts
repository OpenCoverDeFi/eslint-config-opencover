import { describe, it } from 'vitest';
import { lintText, expectRuleError, expectNoRuleError } from '../setup.js';
import defaultConfig from '@/default.js';

const ruleName = '@typescript-eslint/no-restricted-types';

describe(`${ruleName} (Map and Set)`, () => {
	it('should throw error for Map type annotation', async () => {
		const code = `const map: Map<string, number> = new Map();
	`.replace(/\t*/g, '');

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, ruleName);
	});

	it('should throw error for Set type annotation', async () => {
		const code = `const set: Set<string> = new Set();
	`.replace(/\t*/g, '');

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, ruleName);
	});

	it('should throw error for Map in function parameter', async () => {
		const code = `function processMap(map: Map<string, boolean>): void {
	}
	`.replace(/\t*/g, '');

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, ruleName);
	});

	it('should throw error for Set in function parameter', async () => {
		const code = `function processSet(set: Set<number>): void {
	}
	`.replace(/\t*/g, '');

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, ruleName);
	});

	it('should throw error for Map in return type', async () => {
		const code = `function getMap(): Map<string, string> {
		return new Map();
	}
	`.replace(/\t*/g, '');

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, ruleName);
	});

	it('should throw error for Set in return type', async () => {
		const code = `function getSet(): Set<number> {
		return new Set();
	}
	`.replace(/\t*/g, '');

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, ruleName);
	});

	it('should throw error for Map in type alias', async () => {
		const code = `type MyMap = Map<string, number>;
	`.replace(/\t*/g, '');

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, ruleName);
	});

	it('should throw error for Set in type alias', async () => {
		const code = `type MySet = Set<string>;
	`.replace(/\t*/g, '');

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, ruleName);
	});

	it('should throw error for Map in interface property', async () => {
		const code = `interface Config {
		data: Map<string, unknown>;
	}
	`.replace(/\t*/g, '');

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, ruleName);
	});

	it('should throw error for Set in interface property', async () => {
		const code = `interface Config {
		items: Set<string>;
	}
	`.replace(/\t*/g, '');

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, ruleName);
	});

	it('should not throw error for other types', async () => {
		const code = `const arr: Array<string> = [];
	const obj: Record<string, number> = {};
	`.replace(/\t*/g, '');

		const [result] = await lintText(defaultConfig, code);

		expectNoRuleError(result, ruleName);
	});
});
