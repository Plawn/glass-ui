import { type Component, For, createMemo, createSignal } from 'solid-js';
import { ChevronLeftIcon, ChevronRightIcon } from '../shared/icons/ChevronIcon';
import type { CalendarProps, CalendarDay, WeekStartDay } from './types';

/** Day names for header */
const DAY_NAMES_SUNDAY_START = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const DAY_NAMES_MONDAY_START = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

/** Month names for header */
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
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
  const d2 = new Date(compareDate.getFullYear(), compareDate.getMonth(), compareDate.getDate());
  return d1.getTime() < d2.getTime();
};

/**
 * Check if a date is after another date (day comparison only)
 */
const isAfterDay = (date: Date, compareDate: Date): boolean => {
  const d1 = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const d2 = new Date(compareDate.getFullYear(), compareDate.getMonth(), compareDate.getDate());
  return d1.getTime() > d2.getTime();
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

/**
 * Generate calendar days for display
 */
const generateCalendarDays = (
  year: number,
  month: number,
  selectedDate: Date | null,
  min: Date | undefined,
  max: Date | undefined,
  weekStartsOn: WeekStartDay
): CalendarDay[] => {
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

  // Add days from previous month
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i;
    const date = new Date(year, month - 1, day);
    days.push({
      date,
      day,
      isCurrentMonth: false,
      isToday: isSameDay(date, today),
      isSelected: selectedDate ? isSameDay(date, selectedDate) : false,
      isDisabled: (min && isBeforeDay(date, min)) || (max && isAfterDay(date, max)) || false,
    });
  }

  // Add days from current month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    days.push({
      date,
      day,
      isCurrentMonth: true,
      isToday: isSameDay(date, today),
      isSelected: selectedDate ? isSameDay(date, selectedDate) : false,
      isDisabled: (min && isBeforeDay(date, min)) || (max && isAfterDay(date, max)) || false,
    });
  }

  // Add days from next month to complete the grid (always 6 rows = 42 days)
  const remainingDays = 42 - days.length;
  for (let day = 1; day <= remainingDays; day++) {
    const date = new Date(year, month + 1, day);
    days.push({
      date,
      day,
      isCurrentMonth: false,
      isToday: isSameDay(date, today),
      isSelected: selectedDate ? isSameDay(date, selectedDate) : false,
      isDisabled: (min && isBeforeDay(date, min)) || (max && isAfterDay(date, max)) || false,
    });
  }

  return days;
};

/**
 * Internal Calendar component for date selection
 */
export const Calendar: Component<CalendarProps> = (props) => {
  // Track current view month/year using signals for reactivity
  const initialDate = () => props.value ?? new Date();
  const [viewYear, setViewYear] = createSignal(initialDate().getFullYear());
  const [viewMonth, setViewMonth] = createSignal(initialDate().getMonth());

  const dayNames = () =>
    props.weekStartsOn === 1 ? DAY_NAMES_MONDAY_START : DAY_NAMES_SUNDAY_START;

  const calendarDays = createMemo(() =>
    generateCalendarDays(viewYear(), viewMonth(), props.value, props.min, props.max, props.weekStartsOn)
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

  const getDayClasses = (day: CalendarDay): string => {
    const base = 'w-8 h-8 flex items-center justify-center text-sm rounded-full transition-colors cursor-pointer';

    if (day.isDisabled) {
      return `${base} text-surface-300 dark:text-surface-600 cursor-not-allowed`;
    }

    if (day.isSelected) {
      return `${base} bg-primary-500 text-white font-medium`;
    }

    if (day.isToday) {
      return `${base} border border-primary-500 text-primary-600 dark:text-primary-400 font-medium hover:bg-primary-50 dark:hover:bg-primary-900/30`;
    }

    if (!day.isCurrentMonth) {
      return `${base} text-surface-400 dark:text-surface-500 hover:bg-surface-100 dark:hover:bg-surface-700`;
    }

    return `${base} text-surface-700 dark:text-surface-200 hover:bg-surface-100 dark:hover:bg-surface-700`;
  };

  return (
    <div class="p-3 select-none">
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
      <div class="grid grid-cols-7 gap-1 mb-1">
        <For each={dayNames()}>
          {(dayName) => (
            <div class="w-8 h-6 flex items-center justify-center text-xs font-medium text-surface-500 dark:text-surface-400">
              {dayName}
            </div>
          )}
        </For>
      </div>

      {/* Calendar grid */}
      <div class="grid grid-cols-7 gap-1">
        <For each={calendarDays()}>
          {(day) => (
            <button
              type="button"
              onClick={() => handleDayClick(day)}
              class={getDayClasses(day)}
              disabled={day.isDisabled}
              aria-label={day.date.toLocaleDateString()}
              aria-selected={day.isSelected}
            >
              {day.day}
            </button>
          )}
        </For>
      </div>
    </div>
  );
};
