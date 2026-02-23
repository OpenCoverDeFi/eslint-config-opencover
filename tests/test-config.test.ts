import { describe, it, expect } from 'vitest';
import { lint } from './setup.js';

describe('vitest/expect-expect', () => {
    it('requires assertions in tests', () => {
        const messages = lint("it('no assertion', () => { const x = 1; });", 'foo.test.ts');

        expect(messages.some((m) => m.ruleId === 'vitest/expect-expect')).toBe(true);
    });
});

describe('vitest/no-identical-title', () => {
    it('bans duplicate test titles', () => {
        const messages = lint("it('duplicate', () => {}); it('duplicate', () => {});", 'foo.test.ts');

        expect(messages.some((m) => m.ruleId === 'vitest/no-identical-title')).toBe(true);
    });
});

describe('vitest/padding-around-test-blocks', () => {
    it('requires blank line before test block', () => {
        const messages = lint("const x = 1;\nit('test', () => {});", 'foo.test.ts');

        expect(messages.some((m) => m.ruleId === 'vitest/padding-around-test-blocks')).toBe(true);
    });
});

describe('vitest/padding-around-describe-blocks', () => {
    it('requires blank line before describe block', () => {
        const messages = lint("const x = 1;\ndescribe('suite', () => {});", 'foo.test.ts');

        expect(messages.some((m) => m.ruleId === 'vitest/padding-around-describe-blocks')).toBe(true);
    });
});
