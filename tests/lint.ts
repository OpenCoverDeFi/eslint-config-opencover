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

type CalculatedConfig = {
    rules?: Linter.RulesRecord;
};

export async function calculateConfig(filePath: string): Promise<CalculatedConfig | undefined> {
    const calculatedConfig: unknown = await linter.calculateConfigForFile(filePath);

    return calculatedConfig as CalculatedConfig | undefined;
}

export async function lint(code: string, filePath: string): Promise<ESLint.LintResult[]> {
    return linter.lintText(code, { filePath });
}

export async function lintAndFix(code: string, filePath: string): Promise<ESLint.LintResult[]> {
    return fixer.lintText(code, { filePath });
}
