import { describe, it } from 'vitest';
import { lintText, expectRuleError, expectNoRuleError } from '../setup.js';
import defaultConfig from '@/default.js';

const ruleName = '@opencover-eslint/no-enum';

describe(ruleName, () => {
	it('should throw error for numeric enum', async () => {
		const code = `enum Status {
			Active,
			Inactive,
		}
		`.replace(/\t/g, '');

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, ruleName);
	});

	it('should throw error for string enum', async () => {
		const code = `enum Color {
			Red = 'red',
			Green = 'green',
			Blue = 'blue',
		}
		`.replace(/\t/g, '');

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, ruleName);
	});

	it('should throw error for const enum', async () => {
		const code = `const enum Direction {
			Up,
			Down,
			Left,
			Right,
		}
		`.replace(/\t/g, '');

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, ruleName);
	});

	it('should throw error for enum with mixed values', async () => {
		const code = `enum Mixed {
			First = 1,
			Second = 'second',
		}
		`.replace(/\t/g, '');

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, ruleName);
	});

	it('should not throw error for union type (alternative to enum)', async () => {
		const code = `type Status = 'active' | 'inactive';
		`.replace(/\t/g, '');

		const [result] = await lintText(defaultConfig, code);

		expectNoRuleError(result, ruleName);
	});

	it('should not throw error for const object (alternative to enum)', async () => {
		const code = `const Status = {
			Active: 'active',
			Inactive: 'inactive',
		} as const;
		`.replace(/\t/g, '');

		const [result] = await lintText(defaultConfig, code);

		expectNoRuleError(result, ruleName);
	});

	it('should not throw error for regular code without enums', async () => {
		const code = `function getStatus(): string {
			return 'active';
		}
		`.replace(/\t/g, '');

		const [result] = await lintText(defaultConfig, code);

		expectNoRuleError(result, ruleName);
	});
});
