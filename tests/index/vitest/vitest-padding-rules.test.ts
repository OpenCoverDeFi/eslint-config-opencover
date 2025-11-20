import { describe, it, beforeAll, expect } from 'vitest';
import dedent from 'dedent';
import { lintDefaultConfig, createTempFile } from '@tests/test-utils.js';

let filePath: string;

beforeAll(() => {
    filePath = createTempFile('test.test.ts');
});

describe('Vitest Padding Rules', () => {
    describe('@vitest/padding-around-before-all-blocks', () => {
        const ruleName = '@vitest/padding-around-before-all-blocks';

        it('should throw error when beforeAll has no padding before', async () => {
            const code = dedent`
                import { describe, beforeAll } from 'vitest';

                describe('test', () => {
                    const x = 1;
                beforeAll(() => {
                    // test
                });
                });
            `;
            expect(await lintDefaultConfig(code, filePath)).toHaveRuleError(ruleName);
        });

        it('should throw error when beforeAll has no padding after', async () => {
            const code = dedent`
                import { describe, beforeAll, it } from 'vitest';
                describe('test', () => {
                beforeAll(() => {
                    // test
                });
                it('should work', () => {});
                });
            `;
            expect(await lintDefaultConfig(code, filePath)).toHaveRuleError(ruleName);
        });

        it('should not throw error when beforeAll has proper padding', async () => {
            const code = dedent`
                import { describe, beforeAll, it } from 'vitest';
                describe('test', () => {

                beforeAll(() => {
                    // test
                });

                it('should work', () => {});
                });
            `;
            expect(await lintDefaultConfig(code, filePath)).toHaveNoRuleError(ruleName);
        });
    });

    describe('@vitest/padding-around-describe-blocks', () => {
        const ruleName = '@vitest/padding-around-describe-blocks';

        it('should throw error when describe has no padding before', async () => {
            const code = dedent`
                import { describe } from 'vitest';
                describe('test', () => {
                    it('should work', () => {});
                });
            `;
            expect(await lintDefaultConfig(code, filePath)).toHaveRuleError(ruleName);
        });

        it('should throw error when describe has no padding after', async () => {
            const code = dedent`
                import { describe } from 'vitest';
                describe('test', () => {
                    it('should work', () => {});
                });
                describe('test2', () => {
                    it('should work', () => {});
                });
            `;
            expect(await lintDefaultConfig(code, filePath)).toHaveRuleError(ruleName);
        });

        it('should not throw error when describe has proper padding', async () => {
            const code = dedent`
                import { describe } from 'vitest';

                describe('test', () => {
                    it('should work', () => {});
                });

                describe('test2', () => {
                    it('should work', () => {});
                });
            `;
            expect(await lintDefaultConfig(code, filePath)).toHaveNoRuleError(ruleName);
        });
    });

    describe('@vitest/padding-around-before-each-blocks', () => {
        const ruleName = '@vitest/padding-around-before-each-blocks';

        it('should throw error when beforeEach has no padding before', async () => {
            const code = dedent`
                import { describe, beforeEach } from 'vitest';

                describe('test', () => {
                    const x = 1;
                beforeEach(() => {
                    // test
                });
                });
            `;
            expect(await lintDefaultConfig(code, filePath)).toHaveRuleError(ruleName);
        });

        it('should throw error when beforeEach has no padding after', async () => {
            const code = dedent`
                import { describe, beforeEach, it } from 'vitest';
                describe('test', () => {
                beforeEach(() => {
                    // test
                });
                it('should work', () => {});
                });
            `;

            expect(await lintDefaultConfig(code, filePath)).toHaveRuleError(ruleName);
        });

        it('should not throw error when beforeEach has proper padding', async () => {
            const code = dedent`
                import { describe, beforeEach, it } from 'vitest';
                describe('test', () => {

                beforeEach(() => {
                    // test
                });

                it('should work', () => {});
                });
            `;
            expect(await lintDefaultConfig(code, filePath)).toHaveNoRuleError(ruleName);
        });
    });

    describe('@vitest/padding-around-after-all-blocks', () => {
        const ruleName = '@vitest/padding-around-after-all-blocks';

        it('should throw error when afterAll has no padding before', async () => {
            const code = dedent`
                import { describe, afterAll } from 'vitest';

                describe('test', () => {
                    const x = 1;
                afterAll(() => {
                    // test
                });
                });
            `;
            expect(await lintDefaultConfig(code, filePath)).toHaveRuleError(ruleName);
        });

        it('should throw error when afterAll has no padding after', async () => {
            const code = dedent`
                import { describe, it, afterAll } from 'vitest';
                describe('test', () => {
                it('should work', () => {});
                afterAll(() => {
                    // test
                });
                });
            `;
            expect(await lintDefaultConfig(code, filePath)).toHaveRuleError(ruleName);
        });

        it('should not throw error when afterAll has proper padding', async () => {
            const code = dedent`
                import { describe, it, afterAll } from 'vitest';
                describe('test', () => {
                it('should work', () => {});

                afterAll(() => {
                    // test
                });

                });
            `;
            expect(await lintDefaultConfig(code, filePath)).toHaveNoRuleError(ruleName);
        });
    });

    describe('@vitest/padding-around-after-each-blocks', () => {
        const ruleName = '@vitest/padding-around-after-each-blocks';

        it('should throw error when afterEach has no padding before', async () => {
            const code = dedent`
                import { describe, afterEach } from 'vitest';

                describe('test', () => {
                    const x = 1;
                afterEach(() => {
                    // test
                });
                });
            `;
            expect(await lintDefaultConfig(code, filePath)).toHaveRuleError(ruleName);
        });

        it('should throw error when afterEach has no padding after', async () => {
            const code = dedent`
                import { describe, it, afterEach } from 'vitest';
                describe('test', () => {
                it('should work', () => {});
                afterEach(() => {
                    // test
                });
                });
            `;
            expect(await lintDefaultConfig(code, filePath)).toHaveRuleError(ruleName);
        });

        it('should not throw error when afterEach has proper padding', async () => {
            const code = dedent`
                import { describe, it, afterEach } from 'vitest';
                describe('test', () => {
                it('should work', () => {});

                afterEach(() => {
                    // test
                });

                });
            `;
            expect(await lintDefaultConfig(code, filePath)).toHaveNoRuleError(ruleName);
        });
    });

    describe('@vitest/padding-around-test-blocks', () => {
        const ruleName = '@vitest/padding-around-test-blocks';

        it('should throw error when it/test has no padding before', async () => {
            const code = dedent`
                import { describe, it } from 'vitest';

                describe('test', () => {
                    const x = 1;
                it('should work', () => {});
                });
            `;
            expect(await lintDefaultConfig(code, filePath)).toHaveRuleError(ruleName);
        });

        it('should throw error when it/test has no padding after', async () => {
            const code = dedent`
                import { describe, it } from 'vitest';
                describe('test', () => {
                it('should work', () => {});
                it('should work2', () => {});
                });
            `;
            expect(await lintDefaultConfig(code, filePath)).toHaveRuleError(ruleName);
        });

        it('should not throw error when it/test has proper padding', async () => {
            const code = dedent`
                import { describe, it } from 'vitest';
                describe('test', () => {

                it('should work', () => {});

                it('should work2', () => {});

                });
            `;
            expect(await lintDefaultConfig(code, filePath)).toHaveNoRuleError(ruleName);
        });
    });
});
