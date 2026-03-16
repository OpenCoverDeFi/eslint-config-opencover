import type { Linter } from 'eslint';
import { ESLint } from 'eslint';

const config: Linter.Config = {
    languageOptions: {
        parserOptions: {
            projectService: {
                allowDefaultProject: ['*.js', '*.jsx', '*.ts', '*.tsx'],
            },
        },
    },
};

const linter = new ESLint({ overrideConfig: config });
const fixer = new ESLint({ fix: true, overrideConfig: config });

export async function lint(code: string, filePath: string): Promise<ESLint.LintResult[]> {
    return linter.lintText(code, { filePath });
}

export async function lintAndFix(code: string, filePath: string): Promise<ESLint.LintResult[]> {
    return fixer.lintText(code, { filePath });
}
