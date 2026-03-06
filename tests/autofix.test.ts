import { describe, it, expect } from 'vitest';
import { lintAndFix } from './lint.js';

describe('autofix', () => {
    it('fixes double quotes to single quotes', () => {
        const result = lintAndFix('const _x = "hello";', 'autofix-1.test.ts');

        expect(result.fixed).toBe(true);
        expect(result.output).toBe("const _x = 'hello';");
    });

    it('fixes missing semicolons', () => {
        const result = lintAndFix('const _x = 1', 'autofix-2.test.ts');

        expect(result.fixed).toBe(true);
        expect(result.output).toBe('const _x = 1;');
    });

    it('fixes unspaced comments', () => {
        const result = lintAndFix('//Comment', 'autofix-2.test.ts');

        expect(result.fixed).toBe(true);
        expect(result.output).toBe('// Comment');
    });

    it('does not modify already-correct code', () => {
        const code = "const _x = 'hello';";
        const result = lintAndFix(code, 'autofix-3.test.ts');

        expect(result.fixed).toBe(false);
        expect(result.output).toBe(code);
    });
});
