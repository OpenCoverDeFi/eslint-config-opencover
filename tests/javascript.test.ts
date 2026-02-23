import { describe, it, expect } from 'vitest';
import { lint } from './setup.js';

describe('no-console', () => {
    it('allows console.warn and console.error', () => {
        const messages = lint('console.warn("ok"); console.error("ok");', 'test.ts');

        expect(messages.filter((m) => m.ruleId === 'no-console')).toHaveLength(0);
    });

    it('disallows console.log', () => {
        const messages = lint('console.log("not ok");', 'test.ts');

        expect(messages.some((m) => m.ruleId === 'no-console')).toBe(true);
    });
});

describe('quotes', () => {
    it('enforces single quotes', () => {
        const messages = lint('const x = "hello";', 'test.ts');

        expect(messages.some((m) => m.ruleId === 'quotes')).toBe(true);
    });
});

describe('semi', () => {
    it('requires semicolons', () => {
        const messages = lint('const x = 1', 'test.ts');

        expect(messages.some((m) => m.ruleId === 'semi')).toBe(true);
    });
});

describe('no-restricted-syntax', () => {
    it('bans TS enums', () => {
        const messages = lint('enum Direction { Up, Down }', 'test.ts');

        expect(messages.some((m) => m.ruleId === 'no-restricted-syntax')).toBe(true);
    });
});

describe('no-unneeded-ternary', () => {
    it('bans boolean ternaries', () => {
        const messages = lint('const x = a ? true : false;', 'test.ts');

        expect(messages.some((m) => m.ruleId === 'no-unneeded-ternary')).toBe(true);
    });
});

describe('spaced-comment', () => {
    it('requires space after //', () => {
        const messages = lint('//not fine', 'test.ts');

        expect(messages.some((m) => m.ruleId === 'spaced-comment')).toBe(true);
    });
});
