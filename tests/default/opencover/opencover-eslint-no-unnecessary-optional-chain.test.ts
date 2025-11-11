import { describe, it } from 'vitest';
import dedent from 'dedent';
import { lintText, expectRuleError } from '../../test-utils.js';
import defaultConfig from '@/default.js';

const ruleName = '@opencover-eslint/no-unnecessary-optional-chain';

describe(ruleName, () => {
	it('should throw error for ex?.value when ex is not nullable', async () => {
		const code = dedent`
			type Example = { value: boolean };
			const ex: Example = { value: true };
			const result = ex?.value;
		`;

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, ruleName);
	});

	it('should throw error for ex.value?.() when value is not a function', async () => {
		const code = dedent`
			type Example = { value: boolean };
			const ex: Example = { value: true };
			const result = ex.value?.();
		`;

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, ruleName);
	});

	it('should throw error for ex?.[0] when ex is not nullable', async () => {
		const code = dedent`
			type Example = { value: boolean };
			const ex: Example = { value: true };
			const result = ex?.[0];
		`;

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, ruleName);
	});
});
