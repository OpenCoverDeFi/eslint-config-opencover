import { describe, it } from 'vitest';
import { lintText, expectRuleError, expectNoRuleError } from '../setup.js';
import defaultConfig from '@/default.js';

const ruleName = '@typescript-eslint/no-unnecessary-type-assertion';

describe(ruleName, () => {
	it('should throw error for unnecessary type assertion on string', async () => {
		const code = `const value: string = 'hello';
	const result = value as string;
	`.replace(/\t*/g, '');

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, ruleName);
	});

	it('should throw error for unnecessary type assertion on object', async () => {
		const code = `type Example = { value: boolean };
	const ex: Example = { value: true };
	const result = ex as Example;
	`.replace(/\t*/g, '');

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, ruleName);
	});

	it('should throw error for unnecessary type assertion on union when type can be inferred', async () => {
		const code = `const value: string | number = 'hello';
	const result = value as string;
	`.replace(/\t*/g, '');

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, ruleName);
	});

	it('should throw error for unnecessary type assertion on discriminated union', async () => {
		const code = `type A = { type: 'a'; value: string };
	type B = { type: 'b'; value: number };
	const value: A | B = { type: 'a', value: 'test' };
	const result = value as A;
	`.replace(/\t*/g, '');

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, ruleName);
	});

	it('should not throw error when assertion is actually needed', async () => {
		const code = `function getValue(): unknown {
	return 'hello';
}
	const result = getValue() as string;
	`.replace(/\t*/g, '');

		const [result] = await lintText(defaultConfig, code);

		expectNoRuleError(result, ruleName);
	});
});
