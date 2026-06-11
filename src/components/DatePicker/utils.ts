import type { DateFormat } from './types';

const MONTH_NAMES = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const pad = (n: number) => n.toString().padStart(2, '0');

/**
 * Format a Date into a display string according to a {@link DateFormat}.
 * Pure and locale-independent (uses fixed English month abbreviations).
 */
export const formatDate = (date: Date, format: DateFormat): string => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  switch (format) {
    case 'yyyy-MM-dd':
      return `${year}-${pad(month)}-${pad(day)}`;
    case 'MM/dd/yyyy':
      return `${pad(month)}/${pad(day)}/${year}`;
    case 'dd/MM/yyyy':
      return `${pad(day)}/${pad(month)}/${year}`;
    case 'dd.MM.yyyy':
      return `${pad(day)}.${pad(month)}.${year}`;
    case 'MMM dd, yyyy':
      return `${MONTH_NAMES[date.getMonth()]} ${pad(day)}, ${year}`;
    default:
      return `${year}-${pad(month)}-${pad(day)}`;
  }
};
