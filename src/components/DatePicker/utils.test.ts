import { describe, expect, test } from 'bun:test';
import { formatDate } from './utils';

// 2024-03-07 (March 7th). Local time to match the component's getFullYear/
// getMonth/getDate usage.
const date = new Date(2024, 2, 7);

describe('formatDate', () => {
  test('yyyy-MM-dd zero-pads month and day', () => {
    expect(formatDate(date, 'yyyy-MM-dd')).toBe('2024-03-07');
  });

  test('MM/dd/yyyy', () => {
    expect(formatDate(date, 'MM/dd/yyyy')).toBe('03/07/2024');
  });

  test('dd/MM/yyyy', () => {
    expect(formatDate(date, 'dd/MM/yyyy')).toBe('07/03/2024');
  });

  test('dd.MM.yyyy', () => {
    expect(formatDate(date, 'dd.MM.yyyy')).toBe('07.03.2024');
  });

  test('MMM dd, yyyy uses English month abbreviation', () => {
    expect(formatDate(date, 'MMM dd, yyyy')).toBe('Mar 07, 2024');
  });

  test('two-digit month/day are not over-padded', () => {
    const d = new Date(2024, 10, 23); // 2024-11-23
    expect(formatDate(d, 'yyyy-MM-dd')).toBe('2024-11-23');
    expect(formatDate(d, 'MMM dd, yyyy')).toBe('Nov 23, 2024');
  });

  test('December maps to Dec (last month index)', () => {
    const d = new Date(2024, 11, 1);
    expect(formatDate(d, 'MMM dd, yyyy')).toBe('Dec 01, 2024');
  });

  test('unknown format falls back to ISO yyyy-MM-dd', () => {
    // @ts-expect-error - exercising the default branch with an invalid format
    expect(formatDate(date, 'bogus')).toBe('2024-03-07');
  });
});
