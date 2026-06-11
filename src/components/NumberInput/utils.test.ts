import { describe, expect, test } from 'bun:test';
import { clampValue } from './utils';

describe('clampValue', () => {
  test('returns the value unchanged when within bounds', () => {
    expect(clampValue(5, 0, 10)).toBe(5);
  });

  test('clamps to min when below', () => {
    expect(clampValue(-3, 0, 10)).toBe(0);
  });

  test('clamps to max when above', () => {
    expect(clampValue(42, 0, 10)).toBe(10);
  });

  test('treats undefined min as unbounded below', () => {
    expect(clampValue(-1000, undefined, 10)).toBe(-1000);
    expect(clampValue(50, undefined, 10)).toBe(10);
  });

  test('treats undefined max as unbounded above', () => {
    expect(clampValue(1000, 0, undefined)).toBe(1000);
    expect(clampValue(-5, 0, undefined)).toBe(0);
  });

  test('no bounds: returns value as-is', () => {
    expect(clampValue(7)).toBe(7);
    expect(clampValue(-7)).toBe(-7);
  });

  test('boundary values are inclusive', () => {
    expect(clampValue(0, 0, 10)).toBe(0);
    expect(clampValue(10, 0, 10)).toBe(10);
  });

  test('handles fractional values', () => {
    expect(clampValue(2.5, 0, 5)).toBe(2.5);
    expect(clampValue(5.5, 0, 5)).toBe(5);
  });

  test('handles negative ranges', () => {
    expect(clampValue(-5, -10, -1)).toBe(-5);
    expect(clampValue(0, -10, -1)).toBe(-1);
    expect(clampValue(-20, -10, -1)).toBe(-10);
  });
});
