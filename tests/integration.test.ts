import { describe, it, expect } from 'vitest';
import { lint } from './setup.js';
import opencover from '@/index.js';

describe('integration', () => {
    it('lints a realistic TypeScript module with zero errors', () => {
        const code = [
            'interface Config {',
            '  readonly name: string;',
            '  readonly value: number;',
            '}',
            '',
            'class Service {',
            '  public readonly name: string;',
            '',
            '  private readonly config: Config;',
            '',
            '  public constructor(config: Config) {',
            '    this.name = config.name;',
            '    this.config = config;',
            '  }',
            '',
            '  public getValue(): number {',
            '    return this.config.value;',
            '  }',
            '}',
            '',
            'function createService(config: Config): Service {',
            '  return new Service(config);',
            '}',
            '',
            'export type { Config };',
            '',
            'export { Service, createService };',
        ].join('\n');

        const messages = lint(code, 'my-service.ts');
        const errors = messages.filter((m) => m.severity === 2);

        expect(errors).toHaveLength(0);
    });
});

describe('opencover preset', () => {
    it('contains all expected named configs', () => {
        const names = opencover.map((c) => c.name).filter(Boolean);

        expect(names).toContain('opencover');
        expect(names).toContain('opencover/typescript');
        expect(names).toContain('opencover/test');
    });

    it('has a reasonable number of config objects', () => {
        // Ignores (gitignore + globalIgnores) + base + typescript (setup + rules) + test = at least 5
        expect(opencover.length).toBeGreaterThanOrEqual(5);
    });
});
