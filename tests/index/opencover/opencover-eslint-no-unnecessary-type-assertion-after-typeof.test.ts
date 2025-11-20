import { describe, it } from 'vitest';
import dedent from 'dedent';
import { lintDefault, expectRuleError, expectNoRuleError } from '@tests/test-utils.js';

const ruleName = '@opencover-eslint/no-unnecessary-typeof';

describe(ruleName, () => {
    it('should throw error for unnecessary typeof check when type is already known', async () => {
        const code = dedent`
            function test(value: string) {
                return typeof value === 'string' && someCondition(value);
            }
        `;
        const result = await lintDefault(code);
        expectRuleError(result, ruleName);
    });

    it('should throw error for unnecessary typeof check for number', async () => {
        const code = dedent`
            function test(value: number) {
                return typeof value === 'number' && value > 0;
            }
        `;
        const result = await lintDefault(code);
        expectRuleError(result, ruleName);
    });

    it('should throw error for unnecessary typeof check for boolean', async () => {
        const code = dedent`
            function test(value: boolean) {
                if (typeof value === 'boolean') {
                    return value;
                }
            }
        `;
        const result = await lintDefault(code);
        expectRuleError(result, ruleName);
    });

    it('should not throw error when typeof is needed for union type', async () => {
        const code = dedent`
            const REQUEST_ID_PATTERN = /^[a-z]+$/;
            interface Request {
                id: string | number;
            }
            function test(request: Request) {
                return typeof request.id === 'string' && REQUEST_ID_PATTERN.test(request.id);
            }
        `;
        const result = await lintDefault(code);
        expectNoRuleError(result, ruleName);
    });

    it('should not throw error when typeof is needed for unknown', async () => {
        const code = dedent`
            function test(value: unknown) {
                return typeof value === 'string' && value;
            }
        `;
        const result = await lintDefault(code);
        expectNoRuleError(result, ruleName);
    });

    it('should not throw error when typeof is needed for any', async () => {
        const code = dedent`
            function test(value: any) {
                return typeof value === 'string' && value;
            }
        `;
        const result = await lintDefault(code);
        expectNoRuleError(result, ruleName);
    });
});
