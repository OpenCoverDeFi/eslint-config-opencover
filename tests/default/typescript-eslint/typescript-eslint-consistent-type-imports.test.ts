import { describe, it } from 'vitest';
import dedent from 'dedent';
import { lintText, expectRuleError, expectNoRuleError } from '@tests/test-utils.js';
import defaultConfig from '@eslint-config-opencover/default.js';

const ruleName = '@typescript-eslint/consistent-type-imports';

describe(ruleName, () => {
    it('should throw error for regular import of type', async () => {
        const code = dedent`
			import { Example } from './example';
			type Test = Example;
		`;

        const [result] = await lintText(defaultConfig, code);

        expectRuleError(result, ruleName);
    });

    it('should throw error for regular import of interface', async () => {
        const code = dedent`
			import { MyInterface } from './types';
			const obj: MyInterface = {};
		`;

        const [result] = await lintText(defaultConfig, code);

        expectRuleError(result, ruleName);
    });

    it('should throw error for regular import of type alias', async () => {
        const code = dedent`
			import { MyType } from './types';
			const value: MyType = 'test';
		`;

        const [result] = await lintText(defaultConfig, code);

        expectRuleError(result, ruleName);
    });

    it('should not throw error for import type', async () => {
        const code = dedent`
			import type { Example } from './example';
			type Test = Example;
		`;

        const [result] = await lintText(defaultConfig, code);

        expectNoRuleError(result, ruleName);
    });

    it('should not throw error for regular import of value', async () => {
        const code = dedent`
			import { myFunction } from './utils';
			const result = myFunction();
		`;

        const [result] = await lintText(defaultConfig, code);

        expectNoRuleError(result, ruleName);
    });

    it('should throw error for mixed import with type', async () => {
        const code = dedent`
			import { MyType, myFunction } from './module';
			const value: MyType = 'test';
			const result = myFunction();
		`;

        const [result] = await lintText(defaultConfig, code);

        expectRuleError(result, ruleName);
    });
});
