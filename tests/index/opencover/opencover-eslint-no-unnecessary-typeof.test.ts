import { describe, it, expect } from 'vitest';
import dedent from 'dedent';
import { lintDefault } from '@tests/test-utils.js';

const ruleName = '@opencover-eslint/no-unnecessary-typeof';

describe(ruleName, () => {
    it('should throw error for unnecessary typeof check when type is already known', async () => {
        expect(
            await lintDefault(dedent`
                function test(value: string) {
                    return typeof value === 'string' && someCondition(value);
                }
            `)
        ).toHaveRuleError(ruleName);
    });

    it('should throw error for unnecessary typeof check for number', async () => {
        expect(
            await lintDefault(dedent`
                function test(value: number) {
                    return typeof value === 'number' && value > 0;
                }
            `)
        ).toHaveRuleError(ruleName);
    });

    it('should throw error for unnecessary typeof check for boolean', async () => {
        expect(
            await lintDefault(dedent`
                function test(value: boolean) {
                    if (typeof value === 'boolean') {
                        return value;
                    }
                }
            `)
        ).toHaveRuleError(ruleName);
    });

    it('should not throw error when typeof is needed for union type', async () => {
        expect(
            await lintDefault(dedent`
                const REQUEST_ID_PATTERN = /^[a-z]+$/;
                interface Request {
                    id: string | number;
                }
                function test(request: Request) {
                    return typeof request.id === 'string' && REQUEST_ID_PATTERN.test(request.id);
                }
            `)
        ).toHaveNoRuleError(ruleName);
    });

    it('should not throw error when typeof is needed for unknown', async () => {
        expect(
            await lintDefault(dedent`
                function test(value: unknown) {
                    return typeof value === 'string' && value;
                }
            `)
        ).toHaveNoRuleError(ruleName);
    });

    it('should not throw error when typeof is needed for any', async () => {
        expect(
            await lintDefault(dedent`
                function test(value: any) {
                    return typeof value === 'string' && value;
                }
            `)
        ).toHaveNoRuleError(ruleName);
    });
});
