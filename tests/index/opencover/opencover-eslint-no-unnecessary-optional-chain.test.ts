import { describe, it, expect } from 'vitest';
import dedent from 'dedent';
import { lintWithDefaultConfig } from '@tests/test-utils.js';

const ruleName = 'opencover/no-unnecessary-optional-chain';

describe(ruleName, () => {
    it('should throw error for ex?.value when ex is not nullable', async () => {
        const code = dedent`
            type Example = { value: boolean };
            const ex: Example = { value: true };
            const result = ex?.value;
        `;
        expect(await lintWithDefaultConfig(code)).toHaveRuleError(ruleName);
    });

    it('should throw error for ex.value?.() when value is not a function', async () => {
        const code = dedent`
            type Example = { value: boolean };
            const ex: Example = { value: true };
            const result = ex.value?.();
        `;
        expect(await lintWithDefaultConfig(code)).toHaveRuleError(ruleName);
    });

    it('should throw error for ex?.[0] when ex is not nullable', async () => {
        const code = dedent`
            type Example = { value: boolean };
            const ex: Example = { value: true };
            const result = ex?.[0];
        `;
        expect(await lintWithDefaultConfig(code)).toHaveRuleError(ruleName);
    });

    it('should not throw error for error.response?.headers when error.response is nullable', async () => {
        const code = dedent`
            type Response = { headers: { 'retry-after'?: string } };
            type Error = { response?: Response };
            const error: Error = { response: { headers: { 'retry-after': '60' } } };
            const response = error.response?.headers['retry-after'];
        `;
        expect(await lintWithDefaultConfig(code)).toHaveNoRuleError(ruleName);
    });

    it('should not throw error for nested optional chain when base is nullable', async () => {
        const code = dedent`
            type Headers = { 'retry-after'?: string };
            type Response = { headers: Headers };
            type Error = { response?: Response };
            const error: Error = { response: { headers: { 'retry-after': '60' } } };
            const retryAfter = error.response?.headers['retry-after'];
        `;
        expect(await lintWithDefaultConfig(code)).toHaveNoRuleError(ruleName);
    });

    it('should not throw error for optional property access like AxiosError.response', async () => {
        const code = dedent`
            type AxiosResponse = { headers: { 'retry-after'?: string } };
            type AxiosError = { response?: AxiosResponse };
            function handleError(error: AxiosError) {
                const response = error.response?.headers['retry-after'];
                return response;
            }
        `;
        expect(await lintWithDefaultConfig(code)).toHaveNoRuleError(ruleName);
    });

    it('should not throw error for optional call when callee is nullable', async () => {
        const code = dedent`
            type Example = { callback?: () => string };
            const ex: Example = { callback: () => 'hello' };
            const result = ex.callback?.();
        `;
        expect(await lintWithDefaultConfig(code)).toHaveNoRuleError(ruleName);
    });

    it('should throw error for nested optional chain when inner property is not nullable', async () => {
        const code = dedent`
            type Inner = { value: string };
            type Middle = { inner: Inner };
            type Outer = { middle?: Middle };
            function getValue(obj: Outer) {
                return obj?.middle?.inner?.value;
            }
        `;
        expect(await lintWithDefaultConfig(code)).toHaveRuleError(ruleName);
    });
});
