import { describe, it } from 'vitest';
import dedent from 'dedent';
import { lintText, expectRuleError } from '../test-utils.js';
import defaultConfig from '@/default.js';

const ruleName = '@typescript-eslint/no-non-null-assertion';

describe(ruleName, () => {
    it('should throw error for ex!.optional', async () => {
        const code = dedent`
			type Example = { optional?: boolean };
			const ex: Example = {};
			const result = ex!.optional;
		`;

        const [result] = await lintText(defaultConfig, code);

        expectRuleError(result, ruleName);
    });

    it('should throw error for ex.optional!', async () => {
        const code = dedent`
			type Example = { optional?: boolean };
			const ex: Example = {};
			const result = ex.optional!;
		`;

        const [result] = await lintText(defaultConfig, code);

        expectRuleError(result, ruleName);
    });

    it('should throw error for value!.toString()', async () => {
        const code = dedent`
			let value: string | null = null;
			const result = value!.toString();
		`;

        const [result] = await lintText(defaultConfig, code);

        expectRuleError(result, ruleName);
    });
});
