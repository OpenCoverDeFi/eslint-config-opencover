import { describe, it, expect } from 'vitest';
import { lint } from './lint.js';

describe('vitest', () => {
    describe('vitest/expect-expect', () => {
        it('requires assertions in tests', async () => {
            const results = await lint("it('no assertion', () => { const x = 1; });", 'tests/vitest.test.ts');

            results.forEach((result) => {
                expect(result.messages.some((m) => m.ruleId === 'vitest/expect-expect')).toBe(true);
            });
        });
    });

    describe('vitest/no-identical-title', () => {
        it('bans duplicate test titles', async () => {
            const results = await lint("it('duplicate', () => {}); it('duplicate', () => {});", 'tests/vitest.test.ts');

            results.forEach((result) => {
                expect(result.messages.some((m) => m.ruleId === 'vitest/no-identical-title')).toBe(true);
            });
        });
    });

    describe('vitest/padding-around-test-blocks', () => {
        it('requires blank line before test block', async () => {
            const results = await lint("const x = 1;\nit('test', () => {});", 'tests/vitest.test.ts');

            results.forEach((result) => {
                expect(result.messages.some((m) => m.ruleId === 'vitest/padding-around-test-blocks')).toBe(true);
            });
        });
    });

    describe('vitest/padding-around-describe-blocks', () => {
        it('requires blank line before describe block', async () => {
            const results = await lint("const x = 1;\ndescribe('suite', () => {});", 'tests/vitest.test.ts');

            results.forEach((result) => {
                expect(result.messages.some((m) => m.ruleId === 'vitest/padding-around-describe-blocks')).toBe(true);
            });
        });
    });
});
