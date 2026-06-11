import { describe, expect, test } from 'bun:test';
import type { AutocompleteOption } from './types';
import { defaultFilterFn } from './utils';

const opt = (label: string, value = label): AutocompleteOption => ({
  label,
  value,
});

describe('defaultFilterFn', () => {
  test('matches a case-insensitive substring of the label', () => {
    expect(defaultFilterFn(opt('Banana'), 'ana')).toBe(true);
    expect(defaultFilterFn(opt('Banana'), 'BAN')).toBe(true);
    expect(defaultFilterFn(opt('banana'), 'NAN')).toBe(true);
  });

  test('returns false when there is no match', () => {
    expect(defaultFilterFn(opt('Apple'), 'xyz')).toBe(false);
  });

  test('an empty query matches everything', () => {
    expect(defaultFilterFn(opt('Anything'), '')).toBe(true);
  });

  test('filters against the label, not the value', () => {
    expect(defaultFilterFn(opt('France', 'fr'), 'fr')).toBe(true); // label contains "Fr"
    expect(defaultFilterFn(opt('France', 'xx'), 'xx')).toBe(false); // value ignored
  });

  test('works as the predicate of Array.filter', () => {
    const options = [opt('Argentina'), opt('Brazil'), opt('Australia')];
    const result = options.filter((o) => defaultFilterFn(o, 'a'));
    // all three contain an "a" (case-insensitive)
    expect(result.map((o) => o.label)).toEqual([
      'Argentina',
      'Brazil',
      'Australia',
    ]);
  });

  test('narrows correctly on a more specific query', () => {
    const options = [opt('Argentina'), opt('Brazil'), opt('Australia')];
    const result = options.filter((o) => defaultFilterFn(o, 'aus'));
    expect(result.map((o) => o.label)).toEqual(['Australia']);
  });
});
