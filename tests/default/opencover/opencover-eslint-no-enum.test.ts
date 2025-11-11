import { describe, it } from 'vitest';
import dedent from 'dedent';
import { lintText, expectRuleError, expectNoRuleError } from '../../test-utils.js';
import defaultConfig from '@/default.js';

const ruleName = '@opencover-eslint/no-enum';

describe(ruleName, () => {
	it('should throw error for numeric enum', async () => {
		const code = dedent`
			enum Status {
				Active,
				Inactive,
			}
		`;

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, ruleName);
	});

	it('should throw error for string enum', async () => {
		const code = dedent`
			enum Color {
				Red = 'red',
				Green = 'green',
				Blue = 'blue',
			}
		`;

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, ruleName);
	});

	it('should throw error for const enum', async () => {
		const code = dedent`
			const enum Direction {
				Up,
				Down,
				Left,
				Right,
			}
		`;

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, ruleName);
	});

	it('should throw error for enum with mixed values', async () => {
		const code = dedent`
			enum Mixed {
				First = 1,
				Second = 'second',
			}
		`;

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, ruleName);
	});

	it('should not throw error for union type (alternative to enum)', async () => {
		const code = dedent`
			type Status = 'active' | 'inactive';
		`;

		const [result] = await lintText(defaultConfig, code);

		expectNoRuleError(result, ruleName);
	});

	it('should not throw error for const object (alternative to enum)', async () => {
		const code = dedent`
			const Status = {
				Active: 'active',
				Inactive: 'inactive',
			} as const;
		`;

		const [result] = await lintText(defaultConfig, code);

		expectNoRuleError(result, ruleName);
	});

	it('should not throw error for regular code without enums', async () => {
		const code = dedent`
			function getStatus(): string {
				return 'active';
			}
		`;

		const [result] = await lintText(defaultConfig, code);

		expectNoRuleError(result, ruleName);
	});
});
