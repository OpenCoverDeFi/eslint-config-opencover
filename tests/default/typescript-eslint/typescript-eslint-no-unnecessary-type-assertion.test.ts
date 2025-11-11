import { describe, it } from 'vitest';
import dedent from 'dedent';
import { lintText, expectRuleError, expectNoRuleError } from '@tests/test-utils.js';
import defaultConfig from '@eslint-config-opencover/default.js';

const ruleName = '@typescript-eslint/no-unnecessary-type-assertion';

describe(ruleName, () => {
	it('should throw error for unnecessary type assertion on string', async () => {
		const code = dedent`
			const value: string = 'hello';
			const result = value as string;
		`;

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, ruleName);
	});

	it('should throw error for unnecessary type assertion on object', async () => {
		const code = dedent`
			type Example = { value: boolean };
			const ex: Example = { value: true };
			const result = ex as Example;
		`;

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, ruleName);
	});

	it('should throw error for unnecessary type assertion on union when type can be inferred', async () => {
		const code = dedent`
			const value: string | number = 'hello';
			const result = value as string;
		`;

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, ruleName);
	});

	it('should throw error for unnecessary type assertion on discriminated union', async () => {
		const code = dedent`
			type A = { type: 'a'; value: string };
			type B = { type: 'b'; value: number };
			const value: A | B = { type: 'a', value: 'test' };
			const result = value as A;
		`;

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, ruleName);
	});

	it('should not throw error when assertion is actually needed', async () => {
		const code = dedent`
			function getValue(): unknown {
				return 'hello';
			}
			const result = getValue() as string;
		`;

		const [result] = await lintText(defaultConfig, code);

		expectNoRuleError(result, ruleName);
	});
});
