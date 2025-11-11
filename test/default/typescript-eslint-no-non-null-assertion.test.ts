import { describe, it } from 'vitest';
import { lintText, expectRuleError } from '../setup.js';
import defaultConfig from '@/default.js';

describe('@typescript-eslint/no-non-null-assertion', () => {
	it('should throw error for ex!.optional', async () => {
		const code = `type Example = { optional?: boolean };
	const ex: Example = {};
	const result = ex!.optional;
	`.replace(/\t*/g, '');

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, '@typescript-eslint/no-non-null-assertion');
	});

	it('should throw error for ex.optional!', async () => {
		const code = `type Example = { optional?: boolean };
	const ex: Example = {};
	const result = ex.optional!;
	`.replace(/\t*/g, '');

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, '@typescript-eslint/no-non-null-assertion');
	});

	it('should throw error for value!.toString()', async () => {
		const code = `let value: string | null = null;
	const result = value!.toString();
	`.replace(/\t*/g, '');

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, '@typescript-eslint/no-non-null-assertion');
	});
});
