import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { Linter } from 'eslint';
import opencover from '@/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const linter = new Linter({ configType: 'flat' });

function buildConfig(extraConfigs: Linter.Config[] = []): Linter.Config[] {
    return [
        ...opencover,
        ...extraConfigs,
        {
            languageOptions: {
                parserOptions: {
                    projectService: {
                        allowDefaultProject: ['*.ts', '*.tsx', '*.js', '*.jsx', '*.test.ts', '*.test.tsx'],
                        defaultProject: 'tsconfig.json',
                    },
                    tsconfigRootDir: path.resolve(__dirname, '..'),
                },
            },
        },
    ] as Linter.Config[];
}

export function createLinter(extraConfigs: Linter.Config[] = []) {
    const config = buildConfig(extraConfigs);

    return function lint(code: string, filename: string): Linter.LintMessage[] {
        return linter.verify(code, config, { filename });
    };
}

export function createFixLinter(extraConfigs: Linter.Config[] = []) {
    const config = buildConfig(extraConfigs);

    return function lintAndFix(code: string, filename: string): Linter.FixReport {
        return linter.verifyAndFix(code, config, { filename });
    };
}

export const lint = createLinter();

export const lintAndFix = createFixLinter();
