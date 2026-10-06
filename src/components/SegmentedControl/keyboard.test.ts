import { describe, expect, test } from 'bun:test';
import { nextRadioIndex } from './keyboard';

describe('nextRadioIndex', () => {
  test('arrows move forward/backward and wrap', () => {
    expect(nextRadioIndex('ArrowRight', 0, 3)).toBe(1);
    expect(nextRadioIndex('ArrowDown', 2, 3)).toBe(0);
    expect(nextRadioIndex('ArrowLeft', 0, 3)).toBe(2);
    expect(nextRadioIndex('ArrowUp', 2, 3)).toBe(1);
  });

  test('Home/End jump to the ends', () => {
    expect(nextRadioIndex('Home', 2, 3)).toBe(0);
    expect(nextRadioIndex('End', 0, 3)).toBe(2);
  });

  test('missing selection starts from the matching end', () => {
    expect(nextRadioIndex('ArrowRight', -1, 3)).toBe(0);
    expect(nextRadioIndex('ArrowLeft', -1, 3)).toBe(2);
  });

  test('ignores other keys and empty groups', () => {
    expect(nextRadioIndex('Enter', 0, 3)).toBeUndefined();
    expect(nextRadioIndex('ArrowRight', -1, 0)).toBeUndefined();
  });
});
