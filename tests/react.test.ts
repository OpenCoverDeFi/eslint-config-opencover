import { describe, it, expect, beforeAll } from 'vitest';
import { Linter } from 'eslint';
import { recommended } from '@/index.js';
import { reactConfig } from '@/configs/react.js';
import type { TypedFlatConfigItem } from '@/types.js';

let config: Linter.Config[];

beforeAll(async () => {
    const react = await reactConfig();
    config = [
        ...recommended,
        ...react,
        {
            settings: { react: { version: '18' } },
            languageOptions: {
                parserOptions: {
                    projectService: {
                        allowDefaultProject: ['*.ts', '*.tsx', '*.js', '*.jsx'],
                    },
                    ecmaFeatures: { jsx: true },
                },
            },
        },
    ] satisfies TypedFlatConfigItem[];
});

const linter = new Linter({ configType: 'flat' });

function lint(code: string, filename: string): Linter.LintMessage[] {
    return linter.verify(code, config, { filename });
}

describe('react/jsx-key', () => {
    it('requires key prop in mapped JSX', () => {
        const messages = lint('const el = [1,2].map((x) => <div />);', 'test.tsx');

        expect(messages.some((m) => m.ruleId === 'react/jsx-key')).toBe(true);
    });
});

describe('react/no-deprecated', () => {
    it('bans deprecated React APIs', () => {
        const messages = lint("import React from 'react'; React.render(<div />, document.body);", 'test.tsx');

        expect(messages.some((m) => m.ruleId === 'react/no-deprecated')).toBe(true);
    });
});

describe('react-hooks/rules-of-hooks', () => {
    it('bans hooks called conditionally', () => {
        const messages = lint(
            [
                'function MyComponent({ flag }) {',
                '  if (flag) { const [s, setS] = useState(0); }',
                '  return null;',
                '}',
            ].join('\n'),
            'test.tsx'
        );

        expect(messages.some((m) => m.ruleId === 'react-hooks/rules-of-hooks')).toBe(true);
    });
});

describe('react-hooks/exhaustive-deps', () => {
    it('bans missing dependencies in useEffect', () => {
        const messages = lint(
            [
                'function MyComponent({ value }) {',
                '  useEffect(() => { console.warn(value); }, []);',
                '  return null;',
                '}',
            ].join('\n'),
            'test.tsx'
        );

        expect(messages.some((m) => m.ruleId === 'react-hooks/exhaustive-deps')).toBe(true);
    });
});
