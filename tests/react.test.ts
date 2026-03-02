import { describe, it, expect, beforeAll } from 'vitest';
import { createLinter } from './setup.js';
import { reactConfig } from '@/configs/react.js';

let lint: ReturnType<typeof createLinter>;

beforeAll(async () => {
    const react = await reactConfig();
    lint = createLinter([
        ...react,
        {
            settings: { react: { version: '18' } },
            languageOptions: {
                parserOptions: {
                    ecmaFeatures: { jsx: true },
                },
            },
        },
    ]);
});

describe('react/jsx-key', () => {
    it('requires key prop in mapped JSX', () => {
        const messages = lint('const el = [1,2].map((x) => <div />);', 'test.tsx');

        expect(messages.filter((m) => m.ruleId === 'react/jsx-key')).toHaveLength(1);
    });
});

describe('react/no-deprecated', () => {
    it('bans deprecated React APIs', () => {
        const messages = lint("import React from 'react'; React.render(<div />, document.body);", 'test.tsx');

        expect(messages.filter((m) => m.ruleId === 'react/no-deprecated')).toHaveLength(1);
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

        expect(messages.filter((m) => m.ruleId === 'react-hooks/rules-of-hooks')).toHaveLength(1);
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

        expect(messages.filter((m) => m.ruleId === 'react-hooks/exhaustive-deps')).toHaveLength(1);
    });
});
