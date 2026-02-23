import { Linter } from 'eslint';
import { recommended } from '@/index.js';

const config: Linter.Config[] = [
    ...recommended,
    {
        languageOptions: {
            parserOptions: {
                projectService: {
                    allowDefaultProject: ['*.ts', '*.tsx', '*.js', '*.jsx', '*.test.ts', '*.test.tsx'],
                },
            },
        },
    },
];

const linter = new Linter({ configType: 'flat' });

export function lint(code: string, filename: string): Linter.LintMessage[] {
    return linter.verify(code, config, { filename });
}
