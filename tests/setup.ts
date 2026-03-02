import { Linter } from 'eslint';
import { recommended } from '@/index.js';
import type { TypedFlatConfigItem } from '@/types.js';

const linter = new Linter({ configType: 'flat' });

export function createLinter(extraConfigs: TypedFlatConfigItem[] = []) {
    const config: Linter.Config[] = [
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

    return function lint(code: string, filename: string): Linter.LintMessage[] {
        return linter.verify(code, config, { filename });
    };
}

export const lint = createLinter();
