import { Linter } from 'eslint';
import { recommended } from '@/index.js';
import type { TypedFlatConfigItem } from '@/types.js';

const linter = new Linter({ configType: 'flat' });

function buildConfig(extraConfigs: TypedFlatConfigItem[] = []): Linter.Config[] {
    return [
        ...recommended,
        ...extraConfigs,
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
}

export function createLinter(extraConfigs: TypedFlatConfigItem[] = []) {
    const config = buildConfig(extraConfigs);

    return function lint(code: string, filename: string): Linter.LintMessage[] {
        return linter.verify(code, config, { filename });
    };
}

export function createFixLinter(extraConfigs: TypedFlatConfigItem[] = []) {
    const config = buildConfig(extraConfigs);

    return function lintAndFix(code: string, filename: string) {
        return linter.verifyAndFix(code, config, { filename });
    };
}

export const lint = createLinter();

export const lintAndFix = createFixLinter();
