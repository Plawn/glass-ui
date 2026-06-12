import type { JSX } from 'solid-js';
import type { ComponentSize, FormFieldSemanticProps } from '../../types';

/**
 * Day of week enumeration for week start configuration
 */
export type WeekStartDay = 0 | 1; // 0 = Sunday, 1 = Monday

/**
 * Date format presets
 */
export type DateFormat =
  | 'yyyy-MM-dd'
  | 'MM/dd/yyyy'
  | 'dd/MM/yyyy'
  | 'dd.MM.yyyy'
  | 'MMM dd, yyyy';

/**
 * Props for the DatePicker component.
 *
 * Extends native `<div>` attributes (minus the ones we redefine with a
 * different shape) so arbitrary `data-*`/`aria-*`/HTML attributes are forwarded
 * to the outer wrapper element.
 */
export interface DatePickerProps
  extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'onChange'>,
    FormFieldSemanticProps {
  /** Currently selected date value (controlled). Omit to use uncontrolled mode. */
  value?: Date | null;
  /** Initial value for uncontrolled mode */
  defaultValue?: Date | null;
  /** Callback when date selection changes */
  onChange?: (date: Date | null) => void;
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
  /** Whether to show the clear button */
  clearable?: boolean;
  /** Day of week to start the calendar on (0 = Sunday, 1 = Monday) */
  weekStartsOn?: WeekStartDay;
  /** HTML name attribute (used for hidden form-submission input) */
  name?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Whether the field is disabled */
  disabled?: boolean;
  /** Whether the field is in a loading state. Shows a spinner in place of the calendar icon; the field stays usable. */
  loading?: boolean;
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
  /** Range mode: start date of the range */
  rangeStart?: Date | null;
  /** Range mode: end date of the range */
  rangeEnd?: Date | null;
  /** Range mode: hovered date for preview */
  hoverDate?: Date | null;
  /** Range mode: callback when hovering a date */
  onHover?: (date: Date | null) => void;
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
  /** Range mode: whether this is the start of range */
  isRangeStart?: boolean;
  /** Range mode: whether this is the end of range */
  isRangeEnd?: boolean;
  /** Range mode: whether this day is within the range */
  isInRange?: boolean;
}

/**
 * Represents a date range with start and end dates
 */
export interface DateRange {
  /** Start date of the range */
  start: Date | null;
  /** End date of the range */
  end: Date | null;
}

/**
 * Props for the DateRangePicker component.
 *
 * Extends native `<div>` attributes (minus the ones we redefine with a
 * different shape) so arbitrary `data-*`/`aria-*`/HTML attributes are forwarded
 * to the outer wrapper element.
 */
export interface DateRangePickerProps
  extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'onChange'>,
    FormFieldSemanticProps {
  /** Currently selected date range (controlled). Omit to use uncontrolled mode. */
  value?: DateRange;
  /** Initial range for uncontrolled mode */
  defaultValue?: DateRange;
  /** Callback when date range selection changes */
  onChange?: (range: DateRange) => void;
  /** Placeholder text when no dates are selected */
  placeholder?: string;
  /** Placeholder text for start date */
  startPlaceholder?: string;
  /** Placeholder text for end date */
  endPlaceholder?: string;
  /** Date format string for display */
  format?: DateFormat;
  /** Minimum selectable date */
  min?: Date;
  /** Maximum selectable date */
  max?: Date;
  /** Size variant of the input */
  size?: ComponentSize;
  /** Whether to show the clear button */
  clearable?: boolean;
  /** Day of week to start the calendar on (0 = Sunday, 1 = Monday) */
  weekStartsOn?: WeekStartDay;
  /** Separator text between start and end dates */
  separator?: string;
  /** HTML name attribute (used for hidden form-submission inputs) */
  name?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Whether the field is disabled */
  disabled?: boolean;
}

// Re-export types for convenience
export type { ComponentSize as DatePickerSize } from '../../types';
