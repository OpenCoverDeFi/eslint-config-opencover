import { describe, it, beforeAll, expect } from 'vitest';
import dedent from 'dedent';
import { lintDefault, createTempFile } from '@tests/test-utils.js';

describe('typescript-eslint extended rules', () => {
    it('should enforce consistent-type-imports', async () => {
        const code = dedent`
            import { Example } from './example';
            type Test = Example;
        `;
        expect(await lintDefault(code)).toHaveRuleError('@typescript-eslint/consistent-type-imports');
    });

    it('should enforce explicit-member-accessibility', async () => {
        const code = dedent`
            class Test {
                field: string;
            }
        `;
        expect(await lintDefault(code)).toHaveRuleError('@typescript-eslint/explicit-member-accessibility');
    });

    it('should enforce member-ordering', async () => {
        const code = dedent`
            class Test {
                public method(): void {
                }
                constructor() {
                }
            }
        `;
        expect(await lintDefault(code)).toHaveRuleError('@typescript-eslint/member-ordering');
    });

    it('should enforce no-non-null-assertion', async () => {
        const code = dedent`
            const value: string | null = null;
            const result = value!.toString();
        `;
        expect(await lintDefault(code)).toHaveRuleError('@typescript-eslint/no-non-null-assertion');
    });

    it('should enforce no-restricted-types (Map and Set)', async () => {
        const code = dedent`
            const map: Map<string, number> = new Map();
        `;
        expect(await lintDefault(code)).toHaveRuleError('@typescript-eslint/no-restricted-types');
    });

    it('should enforce no-unnecessary-type-assertion', async () => {
        const code = dedent`
            const value: string = 'hello';
            const result = value as string;
        `;
        expect(await lintDefault(code)).toHaveRuleError('@typescript-eslint/no-unnecessary-type-assertion');
    });

    it('should enforce no-unsafe-enum-comparison', async () => {
        const code = dedent`
            enum Status {
                Open = 'open',
            }
            const status: Status = Status.Open;
            if (status === 'open') {
            }
        `;
        expect(await lintDefault(code)).toHaveRuleError('@typescript-eslint/no-unsafe-enum-comparison');
    });

    it('should enforce no-unused-vars', async () => {
        const code = dedent`
            const unusedVar = 42;
        `;
        expect(await lintDefault(code)).toHaveRuleError('@typescript-eslint/no-unused-vars');
    });

    it('should ignore unused vars starting with underscore', async () => {
        const code = dedent`
            const _unusedVar = 42;
        `;
        expect(await lintDefault(code)).toHaveNoRuleError('@typescript-eslint/no-unused-vars');
    });

    it('should ignore unused function args starting with underscore', async () => {
        const code = dedent`
            function test(_unusedArg: number): void {
            }
            test(1);
        `;
        expect(await lintDefault(code)).toHaveNoRuleError('@typescript-eslint/no-unused-vars');
    });

    it('should ignore unused destructured array elements starting with underscore', async () => {
        const code = dedent`
            const [_first, _second] = [1, 2];
        `;
        expect(await lintDefault(code)).toHaveNoRuleError('@typescript-eslint/no-unused-vars');
    });

    it('should ignore unused caught errors starting with underscore', async () => {
        const code = dedent`
            try {
                throw new Error('test');
            } catch (_error) {
            }
        `;
        expect(await lintDefault(code)).toHaveNoRuleError('@typescript-eslint/no-unused-vars');
    });

    describe('@typescript-eslint/no-unsafe-assignment', () => {
        const ruleName = '@typescript-eslint/no-unsafe-assignment';
        let testFilePath: string;
        let regularFilePath: string;

        beforeAll(() => {
            testFilePath = createTempFile('test.test.ts');
            regularFilePath = createTempFile('regular.ts');
        });

        it('should NOT throw error for unsafe assignment in test files (expect.any)', async () => {
            const code = dedent`
                import { expect, it } from 'vitest';

                it('should work', () => {
                    const value: string = expect.any(String);
                });
            `;
            expect(await lintDefault(code, testFilePath)).toHaveNoRuleError(ruleName);
        });

        it('should NOT throw error for unsafe assignment in test files (any type)', async () => {
            const code = dedent`
                import { it } from 'vitest';

                it('should work', () => {
                    const value: string = 1 as any;
                });
            `;
            expect(await lintDefault(code, testFilePath)).toHaveNoRuleError(ruleName);
        });

        it('should NOT throw error for unsafe assignment in test files (function returning any)', async () => {
            const code = dedent`
                import { it } from 'vitest';

                function getAny(): any {
                    return 'test';
                }

                it('should work', () => {
                    const value: string = getAny();
                });
            `;
            expect(await lintDefault(code, testFilePath)).toHaveNoRuleError(ruleName);
        });

        it('should throw error for unsafe assignment in regular files (any type)', async () => {
            const code = dedent`
                const value: string = 1 as any;
            `;
            expect(await lintDefault(code, regularFilePath)).toHaveRuleError(ruleName);
        });

        it('should throw error for unsafe assignment in regular files (function returning any)', async () => {
            const code = dedent`
                function getAny(): any {
                    return 'test';
                }

                const value: string = getAny();
            `;
            expect(await lintDefault(code, regularFilePath)).toHaveRuleError(ruleName);
        });
    });
});
