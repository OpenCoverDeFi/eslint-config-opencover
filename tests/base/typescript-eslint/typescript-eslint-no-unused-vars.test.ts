import { describe, it } from 'vitest';
import dedent from 'dedent';
import { lintText, expectRuleError, expectNoRuleError } from '@tests/test-utils.js';
import defaultConfig from '@eslint-config-opencover/index.js';

const ruleName = '@typescript-eslint/no-unused-vars';

describe(ruleName, () => {
    it('should throw error for unused variable', async () => {
        const code = dedent`
            const unusedVar = 42;
            const usedVar = 10;
            console.log(usedVar);
        `;

        const result = await lintText(defaultConfig, code);

        expectRuleError(result, ruleName);
    });

    it('should throw error for unused function parameter', async () => {
        const code = dedent`
            function example(unusedParam: string, usedParam: number) {
                console.log(usedParam);
            }
        `;

        const result = await lintText(defaultConfig, code);

        expectRuleError(result, ruleName);
    });

    it('should throw error for unused import', async () => {
        const code = dedent`
            import { used, unused } from 'some-module';
            console.log(used);
        `;

        const result = await lintText(defaultConfig, code);

        expectRuleError(result, ruleName);
    });

    it('should not throw error when variable is used', async () => {
        const code = dedent`
            const usedVar = 42;
            console.log(usedVar);
        `;

        const result = await lintText(defaultConfig, code);

        expectNoRuleError(result, ruleName);
    });

    it('should throw error for unused type parameter', async () => {
        const code = dedent`
            function example<T, U>(value: T): T {
                return value;
            }
        `;

        const result = await lintText(defaultConfig, code);

        expectRuleError(result, ruleName);
    });
});
