import { parse } from 'fast-uri';
import { expect, it } from 'vitest';

it('loads the deliberately vulnerable dependency-review fixture', () => {
    expect(parse('https://example.com').host).toBe('example.com');
});
