import { describe, it, expect } from 'vitest';
import { lint } from './lint.js';

describe('javascript', () => {
    describe('no-console', () => {
        it('allows console.warn and console.error', async () => {
            const results = await lint('console.warn("ok"); console.error("ok");', 'tests/javascript.test.ts');

            results.forEach((result) => {
                expect(result.messages.filter((m) => m.ruleId === 'no-console')).toHaveLength(0);
            });
        });

        it('disallows console.log', async () => {
            const results = await lint('console.log("not ok");', 'tests/javascript.test.ts');

            results.forEach((result) => {
                expect(result.messages.filter((m) => m.ruleId === 'no-console')).toHaveLength(1);
            });
        });
    });

    describe('no-restricted-syntax', () => {
        it('bans TS enums', async () => {
            const results = await lint('enum Direction { Up, Down }', 'tests/javascript.test.ts');

            results.forEach((result) => {
                expect(result.messages.filter((m) => m.ruleId === 'no-restricted-syntax')).toHaveLength(1);
                expect(result.messages.find((m) => m.ruleId === 'no-restricted-syntax')?.message).toContain(
                    'Enums are not allowed'
                );
            });
        });

        it('allows union types as enum alternatives', async () => {
            const results = await lint("type Direction = 'up' | 'down';", 'tests/javascript.test.ts');

            results.forEach((result) => {
                expect(result.messages.filter((m) => m.ruleId === 'no-restricted-syntax')).toHaveLength(0);
            });
        });
    });

    describe('no-unneeded-ternary', () => {
        it('bans boolean ternaries', async () => {
            const results = await lint('const x = a ? true : false;', 'tests/javascript.test.ts');

            results.forEach((result) => {
                expect(result.messages.filter((m) => m.ruleId === 'no-unneeded-ternary')).toHaveLength(1);
            });
        });

        it('allows non-trivial ternaries', async () => {
            const results = await lint("const _x = a ? 'yes' : 'no';", 'tests/javascript.test.ts');

            results.forEach((result) => {
                expect(result.messages.filter((m) => m.ruleId === 'no-unneeded-ternary')).toHaveLength(0);
            });
        });
    });

    describe('capitalized-comments', () => {
        it('warns on lowercase comments', async () => {
            const results = await lint('// not capitalized', 'tests/javascript.test.ts');

            results.forEach((result) => {
                expect(result.messages.filter((m) => m.ruleId === 'capitalized-comments')).toHaveLength(1);
            });
        });

        it('allows capitalized comments', async () => {
            const results = await lint('// Fine comment', 'tests/javascript.test.ts');

            results.forEach((result) => {
                expect(result.messages.filter((m) => m.ruleId === 'capitalized-comments')).toHaveLength(0);
            });
        });
    });
});
