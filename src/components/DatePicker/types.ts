import type { BaseComponentProps, DisableableProps, ComponentSize } from '../../types';

/**
 * Day of week enumeration for week start configuration
 */
export type WeekStartDay = 0 | 1; // 0 = Sunday, 1 = Monday

/**
 * Date format presets
 */
export type DateFormat = 'yyyy-MM-dd' | 'MM/dd/yyyy' | 'dd/MM/yyyy' | 'dd.MM.yyyy' | 'MMM dd, yyyy';

/**
 * Props for the DatePicker component
 */
export interface DatePickerProps extends BaseComponentProps, DisableableProps {
  /** Currently selected date value */
  value: Date | null;
  /** Callback when date selection changes */
  onChange: (date: Date | null) => void;
  /** Label text displayed above the input */
  label?: string;
  /** Placeholder text when no date is selected */
  placeholder?: string;
  /** Date format string for display */
  format?: DateFormat;
  /** Minimum selectable date */
  min?: Date;
  /** Maximum selectable date */
  max?: Date;
  /** Size variant of the input */
  size?: ComponentSize;
  /** Error message displayed below the input */
  error?: string;
  /** Whether to show the clear button */
  clearable?: boolean;
  /** Day of week to start the calendar on (0 = Sunday, 1 = Monday) */
  weekStartsOn?: WeekStartDay;
  /** HTML id attribute */
  id?: string;
  /** HTML name attribute */
  name?: string;
}

/**
 * Props for the internal Calendar component
 */
export interface CalendarProps {
  /** Currently selected date */
  value: Date | null;
  /** Callback when a date is selected */
  onSelect: (date: Date) => void;
  /** Minimum selectable date */
  min?: Date;
  /** Maximum selectable date */
  max?: Date;
  /** Day of week to start the calendar on */
  weekStartsOn: WeekStartDay;
}

/**
 * Represents a day in the calendar grid
 */
export interface CalendarDay {
  /** The date object */
  date: Date;
  /** Day of the month (1-31) */
  day: number;
  /** Whether this day is in the current displayed month */
  isCurrentMonth: boolean;
  /** Whether this day is today */
  isToday: boolean;
  /** Whether this day is selected */
  isSelected: boolean;
  /** Whether this day is disabled (outside min/max range) */
  isDisabled: boolean;
}

// Re-export types for convenience
export type { ComponentSize as DatePickerSize } from '../../types';
