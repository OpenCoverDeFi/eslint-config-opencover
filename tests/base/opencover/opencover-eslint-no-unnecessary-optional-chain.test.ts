import { describe, it } from 'vitest';
import dedent from 'dedent';
import { lintText, expectRuleError, expectNoRuleError } from '@tests/test-utils.js';
import defaultConfig from '@/index.js';

const ruleName = '@opencover-eslint/no-unnecessary-optional-chain';

describe(ruleName, () => {
    it('should throw error for ex?.value when ex is not nullable', async () => {
        const code = dedent`
            type Example = { value: boolean };
            const ex: Example = { value: true };
            const result = ex?.value;
        `;
        const result = await lintText(defaultConfig, code);
        expectRuleError(result, ruleName);
    });

    it('should throw error for ex.value?.() when value is not a function', async () => {
        const code = dedent`
            type Example = { value: boolean };
            const ex: Example = { value: true };
            const result = ex.value?.();
        `;
        const result = await lintText(defaultConfig, code);
        expectRuleError(result, ruleName);
    });

    it('should throw error for ex?.[0] when ex is not nullable', async () => {
        const code = dedent`
            type Example = { value: boolean };
            const ex: Example = { value: true };
            const result = ex?.[0];
        `;
        const result = await lintText(defaultConfig, code);
        expectRuleError(result, ruleName);
    });

    it('should not throw error for error.response?.headers when error.response is nullable', async () => {
        const code = dedent`
            type Response = { headers: { 'retry-after'?: string } };
            type Error = { response?: Response };
            const error: Error = { response: { headers: { 'retry-after': '60' } } };
            const response = error.response?.headers['retry-after'];
        `;
        const result = await lintText(defaultConfig, code);
        expectNoRuleError(result, ruleName);
    });

    it('should not throw error for nested optional chain when base is nullable', async () => {
        const code = dedent`
            type Headers = { 'retry-after'?: string };
            type Response = { headers: Headers };
            type Error = { response?: Response };
            const error: Error = { response: { headers: { 'retry-after': '60' } } };
            const retryAfter = error.response?.headers['retry-after'];
        `;
        const result = await lintText(defaultConfig, code);
        expectNoRuleError(result, ruleName);
    });
});
