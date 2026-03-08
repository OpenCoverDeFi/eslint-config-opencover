import { ESLint } from 'eslint';

export async function lint(code: string, filename: string): Promise<ESLint.LintResult[]> {
    return new ESLint({
        overrideConfig: {
            languageOptions: {
                parserOptions: {
                    projectService: {
                        allowDefaultProject: ['*.ts'],
                    },
                    debugLevel: true,
                },
            },
        },
    }).lintText(code, { filePath: filename });
}

export async function lintAndFix(code: string, filename: string): Promise<ESLint.LintResult[]> {
    return new ESLint({ fix: true }).lintText(code, { filePath: filename });
}
