import { it } from 'vitest';
import type { OptionsConfig, TypedFlatConfigItem } from '../src/types.js';
import { opencover } from '../src/factory.js';

interface Suite {
    name: string;
    configs: OptionsConfig;
}

const suites: Suite[] = [
    {
        name: 'default',
        configs: {},
    },
    {
        name: 'react',
        configs: {
            react: true,
        },
    },
    {
        name: 'react-no-typescript',
        configs: {
            typescript: false,
            react: true,
        },
    },
    {
        name: 'no-style',
        configs: {
            stylistic: false,
        },
    },
    {
        name: 'no-test',
        configs: {
            test: false,
        },
    },
    {
        name: 'no-imports',
        configs: {
            imports: false,
        },
    },
    {
        name: 'no-unicorn',
        configs: {
            unicorn: false,
        },
    },
    {
        name: 'no-typescript',
        configs: {
            typescript: false,
        },
    },
];

const ignoreConfigs: string[] = ['opencover/gitignore', 'opencover/ignores', 'opencover/javascript/setup'];

interface ParserWithMeta {
    meta?: { name?: string };
    name?: string;
}

interface ProcessorWithMeta {
    meta?: { name?: string };
}

interface SerializedLanguageOptions {
    [key: string]: unknown;
    parser?: string;
    parserOptions?: Record<string, unknown>;
}

interface SerializedConfig {
    [key: string]: unknown;
    name?: string;
    files?: (string | string[])[];
    ignores?: string[];
    plugins?: string[];
    rules?: string[];
    processor?: string;
    languageOptions?: SerializedLanguageOptions;
    settings?: Record<string, unknown>;
}

function serializeConfigs(configs: TypedFlatConfigItem[]): (SerializedConfig | '<ignored>')[] {
    return configs.map((c) => {
        if (c.name && ignoreConfigs.includes(c.name)) {
            return '<ignored>' as const;
        }

        const clone: SerializedConfig = {
            name: c.name,
            ...(c.files !== undefined && { files: c.files }),
            ...(c.ignores !== undefined && { ignores: c.ignores }),
            ...(c.settings !== undefined && { settings: c.settings }),
            ...(c.linterOptions !== undefined && { linterOptions: c.linterOptions }),
        };

        if (c.plugins) {
            clone.plugins = Object.keys(c.plugins);
        }

        if (c.languageOptions) {
            const langOpts: SerializedLanguageOptions = { ...c.languageOptions };
            delete langOpts['globals'];

            if (c.languageOptions.parser && typeof c.languageOptions.parser !== 'string') {
                const parser = c.languageOptions.parser as ParserWithMeta;
                langOpts.parser = parser.meta?.name ?? parser.name ?? 'unknown';
            }

            if (c.languageOptions.parserOptions) {
                const parserOpts = { ...(c.languageOptions.parserOptions as Record<string, unknown>) };
                delete parserOpts['projectService'];
                delete parserOpts['tsconfigRootDir'];
                langOpts.parserOptions = parserOpts;
            }

            clone.languageOptions = langOpts;
        }

        if (c.processor && typeof c.processor !== 'string') {
            const processor = c.processor as ProcessorWithMeta;
            clone.processor = processor.meta?.name ?? 'unknown';
        }

        if (c.rules) {
            clone.rules = Object.entries(c.rules).map(([rule, value]) => {
                if (value === 'off' || value === 0) {
                    return `- ${rule}`;
                }

                return rule;
            });
        }

        return clone;
    });
}

suites.forEach(({ name, configs }) => {
    it.concurrent(`factory ${name}`, async ({ expect }) => {
        const config = await opencover(configs);

        await expect(serializeConfigs(config)).toMatchFileSnapshot(`./__snapshots__/factory/${name}.snap.js`);
    });
});
