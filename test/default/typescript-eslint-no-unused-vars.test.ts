import { describe, it } from 'vitest';
import { lintText, expectRuleError, expectNoRuleError } from '../setup.js';
import defaultConfig from '@/default.js';

const ruleName = '@typescript-eslint/no-unused-vars';

describe(ruleName, () => {
	it('should throw error for unused variable', async () => {
		const code = `const unusedVar = 42;
	const usedVar = 10;
	console.log(usedVar);
	`.replace(/\t*/g, '');

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, ruleName);
	});

	it('should throw error for unused function parameter', async () => {
		const code = `function example(unusedParam: string, usedParam: number) {
	console.log(usedParam);
}
	`.replace(/\t*/g, '');

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, ruleName);
	});

	it('should throw error for unused import', async () => {
		const code = `import { used, unused } from 'some-module';
	console.log(used);
	`.replace(/\t*/g, '');

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, ruleName);
	});

	it('should not throw error when variable is used', async () => {
		const code = `const usedVar = 42;
	console.log(usedVar);
	`.replace(/\t*/g, '');

		const [result] = await lintText(defaultConfig, code);

		expectNoRuleError(result, ruleName);
	});

	it('should throw error for unused type parameter', async () => {
		const code = `function example<T, U>(value: T): T {
	return value;
}
	`.replace(/\t*/g, '');

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, ruleName);
	});
});
