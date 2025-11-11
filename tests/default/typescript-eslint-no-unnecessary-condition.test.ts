import { describe, it } from 'vitest';
import dedent from 'dedent';
import { lintText, expectRuleError, expectNoRuleError } from '../test-utils.js';
import defaultConfig from '@/default.js';

const ruleName = '@typescript-eslint/no-unnecessary-condition';

describe(ruleName, () => {
    it('should throw error for checking non-nullable value against null', async () => {
        const code = dedent`
			const value: string = 'hello';
			if (value === null) {
				console.log('null');
			}
		`;

        const [result] = await lintText(defaultConfig, code);

        expectRuleError(result, ruleName);
    });

    it('should throw error for checking non-nullable value against undefined', async () => {
        const code = dedent`
			const value: number = 42;
			if (value === undefined) {
				console.log('undefined');
			}
		`;

        const [result] = await lintText(defaultConfig, code);

        expectRuleError(result, ruleName);
    });

    it('should throw error for checking always truthy value', async () => {
        const code = dedent`
			const value: true = true;
			if (value) {
				console.log('true');
			}
		`;

        const [result] = await lintText(defaultConfig, code);

        expectRuleError(result, ruleName);
    });

    it('should throw error for checking always falsy value', async () => {
        const code = dedent`
			const value: false = false;
			if (value) {
				console.log('false');
			}
		`;

        const [result] = await lintText(defaultConfig, code);

        expectRuleError(result, ruleName);
    });

    it('should throw error for checking non-nullable array length', async () => {
        const code = dedent`
			const arr: string[] = ['a', 'b'];
			if (arr.length === null) {
				console.log('null length');
			}
		`;

        const [result] = await lintText(defaultConfig, code);

        expectRuleError(result, ruleName);
    });

    it('should not throw error when checking nullable value from function', async () => {
        const code = dedent`
			function getValue(): string | null {
				return Math.random() > 0.5 ? 'hello' : null;
			}
			const value = getValue();
			if (value === null) {
				console.log('null');
			}
		`;

        const [result] = await lintText(defaultConfig, code);

        expectNoRuleError(result, ruleName);
    });

    it('should not throw error when checking optional value from function', async () => {
        const code = dedent`
			function getValue(): string | undefined {
				return Math.random() > 0.5 ? 'hello' : undefined;
			}
			const value = getValue();
			if (value === undefined) {
				console.log('undefined');
			}
		`;

        const [result] = await lintText(defaultConfig, code);

        expectNoRuleError(result, ruleName);
    });

    it('should not throw error when checking union type', async () => {
        const code = dedent`
			function getValue(): string | number {
				return Math.random() > 0.5 ? 'hello' : 42;
			}
			const value = getValue();
			if (typeof value === 'string') {
				console.log(value);
			}
		`;

        const [result] = await lintText(defaultConfig, code);

        expectNoRuleError(result, ruleName);
    });

    it('should not throw error when checking boolean from function', async () => {
        const code = dedent`
			function getValue(): boolean {
				return Math.random() > 0.5;
			}
			const value = getValue();
			if (value) {
				console.log('true');
			}
		`;

        const [result] = await lintText(defaultConfig, code);

        expectNoRuleError(result, ruleName);
    });
});
