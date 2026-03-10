import { describe, it, expect } from 'vitest';
import { lint } from './lint.js';

describe('ignores', () => {
    it('produces no lint errors for files in node_modules', async () => {
        const results = await lint('const x = "bad"', 'node_modules/pkg/index.ts');

        expect(results).toHaveLength(1);
        expect(results[0].errorCount).toBe(0);
    });

    it('produces no lint errors for files in dist', async () => {
        const results = await lint('const x = "bad"', 'dist/index.ts');

        expect(results).toHaveLength(1);
        expect(results[0].errorCount).toBe(0);
    });

    it('produces no lint errors for files in coverage', async () => {
        const results = await lint('const x = "bad"', 'coverage/lcov.ts');

        expect(results).toHaveLength(1);
        expect(results[0].errorCount).toBe(0);
    });

    it('still lints files outside ignored directories', async () => {
        const results = await lint('const x = "bad"', 'src/index.ts');

        expect(results.length).toBeGreaterThan(0);
        results.forEach((result) => {
            expect(result.errorCount).toBeGreaterThan(0);
            expect(result.messages.length).toBeGreaterThan(0);
        });
    });
});
