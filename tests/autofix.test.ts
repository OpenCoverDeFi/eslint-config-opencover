import { describe, it, expect } from 'vitest';
import { lint, lintAndFix } from './lint.js';

describe('autofix', () => {
    it('fixes double quotes to single quotes', async () => {
        const results = await lintAndFix('const _x = "hello";', 'tests/autofix.test.ts');

        results.forEach((result) => {
            expect(result.errorCount).toBe(0);
            expect(result.output).toBe("const _x = 'hello';");
        });
    });

    it('fixes missing semicolons', async () => {
        const results = await lintAndFix('const _x = 1', 'tests/autofix.test.ts');

        results.forEach((result) => {
            expect(result.errorCount).toBe(0);
            expect(result.output).toBe('const _x = 1;');
        });
    });

    it('fixes unspaced comments', async () => {
        const results = await lintAndFix(['//Comment', 'const _x = 0;'].join('\n'), 'tests/autofix.test.ts');

        results.forEach((result) => {
            expect(result.errorCount).toBe(0);
            expect(result.output).toBe(['// Comment', 'const _x = 0;'].join('\n'));
        });
    });

    it('does not modify already-correct code', async () => {
        const results = await lint("const _x = 'hello';", 'tests/autofix.test.ts');

        results.forEach((result) => {
            expect(result.errorCount).toBe(0);
        });
    });
});
