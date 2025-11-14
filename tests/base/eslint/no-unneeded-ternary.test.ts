import { describe, it } from 'vitest';
import { lintText, expectRuleError, expectNoRuleError } from '@tests/test-utils.js';
import defaultConfig from '@eslint-config-opencover/index.js';

const ruleName = 'no-unneeded-ternary';

describe(ruleName, () => {
    it('should throw error for ternary with true/false', async () => {
        const code = 'const value = x === 2 ? true : false;';

        const result = await lintText(defaultConfig, code);

        expectRuleError(result, ruleName);
    });

    it('should throw error for ternary with false/true', async () => {
        const code = 'const value = x === 2 ? false : true;';

        const result = await lintText(defaultConfig, code);

        expectRuleError(result, ruleName);
    });

    it('should throw error for ternary with boolean condition returning true/false', async () => {
        const code = 'const value = x ? true : false;';

        const result = await lintText(defaultConfig, code);

        expectRuleError(result, ruleName);
    });

    it('should throw error for ternary with boolean condition returning false/true', async () => {
        const code = 'const value = x ? false : true;';

        const result = await lintText(defaultConfig, code);

        expectRuleError(result, ruleName);
    });

    it('should throw error for ternary with comparison returning true/false', async () => {
        const code = `const value = a > b ? true : false;
    `;

        const result = await lintText(defaultConfig, code);

        expectRuleError(result, ruleName);
    });

    it('should not throw error for ternary with different values', async () => {
        const code = "const value = x === 2 ? 'yes' : 'no';";

        const result = await lintText(defaultConfig, code);

        expectNoRuleError(result, ruleName);
    });

    it('should not throw error for ternary with numbers', async () => {
        const code = 'const value = x === 2 ? 1 : 0;';

        const result = await lintText(defaultConfig, code);

        expectNoRuleError(result, ruleName);
    });

    it('should not throw error for ternary with expressions', async () => {
        const code = 'const value = x === 2 ? getValue() : getOtherValue();';

        const result = await lintText(defaultConfig, code);

        expectNoRuleError(result, ruleName);
    });

    it('should not throw error for ternary with default assignment pattern', async () => {
        const code = 'const value = x ? x : defaultValue;';

        const result = await lintText(defaultConfig, code);

        expectNoRuleError(result, ruleName);
    });
});
