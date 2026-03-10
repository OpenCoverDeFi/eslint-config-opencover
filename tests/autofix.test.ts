import { describe, it, expect } from 'vitest';
import { lint, lintAndFix } from './lint.js';

describe('autofix', () => {
    it('fixes unspaced comments', async () => {
        const results = await lintAndFix(['//Comment', 'const _x = 0;'].join('\n'), 'file.ts');

        results.forEach((result) => {
            expect(result.errorCount).toBe(0);
            expect(result.output).toBe(['// Comment', 'const _x = 0;'].join('\n'));
        });
    });

    it('does not modify already-correct code', async () => {
        const results = await lint(['// Comment', 'const _x = 0;'].join('\n'), 'file.ts');

        results.forEach((result) => {
            expect(result.errorCount).toBe(0);
        });
    });
});
