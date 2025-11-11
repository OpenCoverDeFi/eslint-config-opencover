import { describe, it } from 'vitest';
import { lintText, expectRuleError } from '../setup.js';
import defaultConfig from '@/default.js';

describe('@opencover-eslint/no-unnecessary-optional-chain', () => {
	it('should throw error for ex?.value when ex is not nullable', async () => {
		const code = `type Example = { value: boolean };
	const ex: Example = { value: true };
	const result = ex?.value;
	`.replace(/\t*/g, '');

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, '@opencover-eslint/no-unnecessary-optional-chain');
	});

	it('should throw error for ex.value?.() when value is not a function', async () => {
		const code = `type Example = { value: boolean };
	const ex: Example = { value: true };
	const result = ex.value?.();
	`.replace(/\t*/g, '');

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, '@opencover-eslint/no-unnecessary-optional-chain');
	});

	it('should throw error for ex?.[0] when ex is not nullable', async () => {
		const code = `type Example = { value: boolean };
	const ex: Example = { value: true };
	const result = ex?.[0];
	`.replace(/\t*/g, '');

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, '@opencover-eslint/no-unnecessary-optional-chain');
	});
});
