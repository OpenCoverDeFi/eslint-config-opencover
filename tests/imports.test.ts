import { describe, it, expect } from 'vitest';
import { lint } from './lint.js';

describe('import-x/order', () => {
    it('allows node: imports before external', async () => {
        const results = await lint(
            ["import fs from 'node:fs';", "import path from 'node:path';"].join('\n'),
            'file.ts'
        );

        results.forEach((result) => {
            expect(result.messages.filter((m) => m.ruleId === 'import-x/order')).toHaveLength(0);
        });
    });

    it('requires node: imports before external', async () => {
        const results = await lint(
            ["import express from 'express';", "import fs from 'node:fs';"].join('\n'),
            'file.ts'
        );

        results.forEach((result) => {
            expect(result.messages.filter((m) => m.ruleId === 'import-x/order')).toHaveLength(1);
        });
    });

    it('allows @/ alias imports before parent imports', async () => {
        const results = await lint(
            ["import { foo } from '@/utils/foo';", "import { bar } from '../bar';"].join('\n'),
            'file.ts'
        );

        results.forEach((result) => {
            expect(result.messages.filter((m) => m.ruleId === 'import-x/order')).toHaveLength(0);
        });
    });

    it('warns when parent imports come before @/ alias imports', async () => {
        const results = await lint(
            ["import { bar } from '../bar';", "import { foo } from '@/utils/foo';"].join('\n'),
            'file.ts'
        );

        results.forEach((result) => {
            expect(result.messages.filter((m) => m.ruleId === 'import-x/order')).toHaveLength(1);
        });
    });

    it('allows @tests/ alias imports before parent imports', async () => {
        const results = await lint(
            ["import { setup } from '@tests/setup';", "import { bar } from '../bar';"].join('\n'),
            'file.ts'
        );

        results.forEach((result) => {
            expect(result.messages.filter((m) => m.ruleId === 'import-x/order')).toHaveLength(0);
        });
    });

    it('warns when parent imports come before @tests/ alias imports', async () => {
        const results = await lint(
            ["import { bar } from '../bar';", "import { setup } from '@tests/setup';"].join('\n'),
            'file.ts'
        );

        results.forEach((result) => {
            expect(result.messages.filter((m) => m.ruleId === 'import-x/order')).toHaveLength(1);
        });
    });
});
