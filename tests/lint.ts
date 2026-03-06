import { Linter } from 'eslint';
import opencover from '@/index.js';

const linter = new Linter({ configType: 'flat' });

const config: Linter.Config[] = [
    ...opencover,
    {
        languageOptions: {
            parserOptions: {
                projectService: {
                    allowDefaultProject: ['*.ts', '*.tsx', '*.js', '*.jsx', '*.test.ts', '*.test.tsx'],
                    defaultProject: 'tsconfig.json',
                },
                tsconfigRootDir: process.cwd(),
            },
        },
    },
] as Linter.Config[];

export function lint(code: string, filename: string): Linter.LintMessage[] {
    return linter.verify(code, config, { filename });
}

export function lintAndFix(code: string, filename: string): Linter.FixReport {
    return linter.verifyAndFix(code, config, { filename });
}
