import { type Component, For, createMemo, createSignal } from 'solid-js';
import { ChevronLeftIcon, ChevronRightIcon } from '../shared/icons/ChevronIcon';
import type { CalendarDay, CalendarProps, WeekStartDay } from './types';

/** Day names for header */
const DAY_NAMES_SUNDAY_START = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const DAY_NAMES_MONDAY_START = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

/** Month names for header */
const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

/**
 * Check if two dates are the same day
 */
const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

/**
 * Check if a date is before another date (day comparison only)
 */
const isBeforeDay = (date: Date, compareDate: Date): boolean => {
  const d1 = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const d2 = new Date(
    compareDate.getFullYear(),
    compareDate.getMonth(),
    compareDate.getDate(),
  );
  return d1.getTime() < d2.getTime();
};

/**
 * Check if a date is after another date (day comparison only)
 */
const isAfterDay = (date: Date, compareDate: Date): boolean => {
  const d1 = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const d2 = new Date(
    compareDate.getFullYear(),
    compareDate.getMonth(),
    compareDate.getDate(),
  );
  return d1.getTime() > d2.getTime();
};

/**
 * Check if a date is between two dates (exclusive of endpoints)
 */
const isBetweenDays = (date: Date, start: Date, end: Date): boolean => {
  const d = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  ).getTime();
  const s = new Date(
    start.getFullYear(),
    start.getMonth(),
    start.getDate(),
  ).getTime();
  const e = new Date(
    end.getFullYear(),
    end.getMonth(),
    end.getDate(),
  ).getTime();
  return d > s && d < e;
};

/**
 * Get the first day of the month
 */
const getFirstDayOfMonth = (year: number, month: number): Date => {
  return new Date(year, month, 1);
};

/**
 * Get the number of days in a month
 */
const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

interface GenerateCalendarDaysOptions {
  year: number;
  month: number;
  selectedDate: Date | null;
  min?: Date;
  max?: Date;
  weekStartsOn: WeekStartDay;
  rangeStart?: Date | null;
  rangeEnd?: Date | null;
  hoverDate?: Date | null;
}

/**
 * Generate calendar days for display
 */
const generateCalendarDays = (
  options: GenerateCalendarDaysOptions,
): CalendarDay[] => {
  const {
    year,
    month,
    selectedDate,
    min,
    max,
    weekStartsOn,
    rangeStart,
    rangeEnd,
    hoverDate,
  } = options;
  const days: CalendarDay[] = [];
  const today = new Date();
  const firstDay = getFirstDayOfMonth(year, month);
  const daysInMonth = getDaysInMonth(year, month);
  const daysInPrevMonth = getDaysInMonth(year, month - 1);

  // Calculate the day of week for the first day (0-6)
  let firstDayOfWeek = firstDay.getDay();

  // Adjust for week start day
  if (weekStartsOn === 1) {
    // If week starts on Monday, shift Sunday (0) to end (6)
    firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
  }

  // For range mode, determine effective end (could be hover date)
  let effectiveEnd = rangeEnd;
  if (rangeStart && !rangeEnd && hoverDate) {
    if (isAfterDay(hoverDate, rangeStart) || isSameDay(hoverDate, rangeStart)) {
      effectiveEnd = hoverDate;
    }
  }

  const createDay = (
    date: Date,
    day: number,
    isCurrentMonth: boolean,
  ): CalendarDay => {
    const isDisabled =
      (min && isBeforeDay(date, min)) ||
      (max && isAfterDay(date, max)) ||
      false;

    // Range calculations
    const isRangeStart = rangeStart ? isSameDay(date, rangeStart) : false;
    const isRangeEnd = effectiveEnd ? isSameDay(date, effectiveEnd) : false;
    const isInRange =
      rangeStart && effectiveEnd
        ? isBetweenDays(date, rangeStart, effectiveEnd)
        : false;

    return {
      date,
      day,
      isCurrentMonth,
      isToday: isSameDay(date, today),
      isSelected: selectedDate ? isSameDay(date, selectedDate) : false,
      isDisabled,
      isRangeStart,
      isRangeEnd,
      isInRange,
    };
  };

  // Add days from previous month
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i;
    const date = new Date(year, month - 1, day);
    days.push(createDay(date, day, false));
  }

  // Add days from current month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    days.push(createDay(date, day, true));
  }

  // Add days from next month to complete the grid (always 6 rows = 42 days)
  const remainingDays = 42 - days.length;
  for (let day = 1; day <= remainingDays; day++) {
    const date = new Date(year, month + 1, day);
    days.push(createDay(date, day, false));
  }

  return days;
};

/**
 * Internal Calendar component for date selection
 */
export const Calendar: Component<CalendarProps> = (props) => {
  // Track current view month/year using signals for reactivity
  const initialDate = () => props.value ?? props.rangeStart ?? new Date();
  const [viewYear, setViewYear] = createSignal(initialDate().getFullYear());
  const [viewMonth, setViewMonth] = createSignal(initialDate().getMonth());

  // Check if we're in range mode
  const isRangeMode = () => props.rangeStart !== undefined;

  const dayNames = () =>
    props.weekStartsOn === 1 ? DAY_NAMES_MONDAY_START : DAY_NAMES_SUNDAY_START;

  const calendarDays = createMemo(() =>
    generateCalendarDays({
      year: viewYear(),
      month: viewMonth(),
      selectedDate: props.value,
      min: props.min,
      max: props.max,
      weekStartsOn: props.weekStartsOn,
      rangeStart: props.rangeStart,
      rangeEnd: props.rangeEnd,
      hoverDate: props.hoverDate,
    }),
  );

  const monthYear = () => `${MONTH_NAMES[viewMonth()]} ${viewYear()}`;

  const goToPrevMonth = () => {
    if (viewMonth() === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const goToNextMonth = () => {
    if (viewMonth() === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const handleDayClick = (day: CalendarDay) => {
    if (!day.isDisabled) {
      props.onSelect(day.date);
    }
  };

  const handleDayMouseEnter = (day: CalendarDay) => {
    if (!day.isDisabled && props.onHover) {
      props.onHover(day.date);
    }
  };

  const handleMouseLeave = () => {
    if (props.onHover) {
      props.onHover(null);
    }
  };

  const getDayClasses = (day: CalendarDay): string => {
    const base =
      'w-8 h-8 flex items-center justify-center text-sm transition-colors cursor-pointer';

    if (day.isDisabled) {
      return `${base} text-surface-300 dark:text-surface-600 cursor-not-allowed rounded-full`;
    }

    // Range mode styles
    if (isRangeMode()) {
      // Start and end are same day
      if (day.isRangeStart && day.isRangeEnd) {
        return `${base} bg-primary-500 text-white font-medium rounded-full`;
      }
      // Range start
      if (day.isRangeStart) {
        return `${base} bg-primary-500 text-white font-medium rounded-l-full`;
      }
      // Range end
      if (day.isRangeEnd) {
        return `${base} bg-primary-500 text-white font-medium rounded-r-full`;
      }
      // In range
      if (day.isInRange) {
        return `${base} bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300`;
      }
    }

    // Single selection mode
    if (day.isSelected) {
      return `${base} bg-primary-500 text-white font-medium rounded-full`;
    }

    if (day.isToday) {
      return `${base} border border-primary-500 text-primary-600 dark:text-primary-400 font-medium rounded-full hover:bg-primary-50 dark:hover:bg-primary-900/30`;
    }

    if (!day.isCurrentMonth) {
      return `${base} text-surface-400 dark:text-surface-500 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700`;
    }

    return `${base} text-surface-700 dark:text-surface-200 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700`;
  };

  return (
    <div class="p-3 select-none" onMouseLeave={handleMouseLeave}>
      {/* Header with month/year and navigation */}
      <div class="flex items-center justify-between mb-3">
        <button
          type="button"
          onClick={goToPrevMonth}
          class="p-1.5 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-600 dark:text-surface-400 transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeftIcon size={16} />
        </button>
        <span class="text-sm font-medium text-surface-800 dark:text-surface-200">
          {monthYear()}
        </span>
        <button
          type="button"
          onClick={goToNextMonth}
          class="p-1.5 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-600 dark:text-surface-400 transition-colors"
          aria-label="Next month"
        >
          <ChevronRightIcon size={16} />
        </button>
      </div>

      {/* Day names header */}
      <div class="grid grid-cols-7 gap-0 mb-1">
        <For each={dayNames()}>
          {(dayName) => (
            <div class="w-8 h-6 flex items-center justify-center text-xs font-medium text-surface-500 dark:text-surface-400">
              {dayName}
            </div>
          )}
        </For>
      </div>

      {/* Calendar grid */}
      <div class="grid grid-cols-7 gap-0">
        <For each={calendarDays()}>
          {(day) => (
            <button
              type="button"
              onClick={() => handleDayClick(day)}
              onMouseEnter={() => handleDayMouseEnter(day)}
              class={getDayClasses(day)}
              disabled={day.isDisabled}
              aria-label={day.date.toLocaleDateString()}
              aria-selected={
                day.isSelected || day.isRangeStart || day.isRangeEnd
              }
            >
              {day.day}
            </button>
          )}
        </For>
      </div>
    </div>
  );
};
