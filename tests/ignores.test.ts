import { describe, it, expect } from 'vitest';
import { lint } from './setup.js';

describe('ignores', () => {
    it('produces no lint errors for files in node_modules', () => {
        const messages = lint('const x = "bad"', 'node_modules/pkg/index.ts');
        const lintErrors = messages.filter((m) => m.ruleId !== null);

        expect(lintErrors).toHaveLength(0);
    });

    it('produces no lint errors for files in dist', () => {
        const messages = lint('const x = "bad"', 'dist/index.ts');
        const lintErrors = messages.filter((m) => m.ruleId !== null);

        expect(lintErrors).toHaveLength(0);
    });

    it('produces no lint errors for files in coverage', () => {
        const messages = lint('const x = "bad"', 'coverage/lcov.ts');
        const lintErrors = messages.filter((m) => m.ruleId !== null);

        expect(lintErrors).toHaveLength(0);
    });

    it('still lints files outside ignored directories', () => {
        const messages = lint('const x = "bad"', 'src/index.ts');

        expect(messages.length).toBeGreaterThan(0);
    });
});
