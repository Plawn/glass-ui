import { type Component, Show, createSignal } from 'solid-js';
import type { ComponentSize } from '../../types';
import { Popover } from '../Popover';
import { CloseIcon } from '../shared/icons/CloseIcon';
import { Calendar } from './Calendar';
import type { DateRangePickerProps, DateFormat } from './types';

/** Size classes for the input */
const getSizeClasses = (size: ComponentSize): string => {
  switch (size) {
    case 'sm':
      return 'px-2.5 py-1.5 text-xs';
    case 'lg':
      return 'px-4 py-3 text-base';
    default:
      return 'px-3 sm:px-4 py-2 sm:py-2.5 text-sm';
  }
};

/** Calendar icon SVG */
const CalendarIcon: Component<{ size?: number }> = (props) => {
  const size = () => props.size ?? 16;
  return (
    <svg
      width={size()}
      height={size()}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
      aria-hidden="true"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );
};

/** Format a date according to the specified format */
const formatDate = (date: Date, format: DateFormat): string => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const pad = (n: number) => n.toString().padStart(2, '0');

  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

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
      return `${monthNames[date.getMonth()]} ${pad(day)}, ${year}`;
    default:
      return `${year}-${pad(month)}-${pad(day)}`;
  }
};

/** Check if date1 is before date2 */
const isBeforeDay = (date1: Date, date2: Date): boolean => {
  const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
  return d1.getTime() < d2.getTime();
};

/**
 * A glassmorphic date range picker component with a single calendar.
 *
 * @example
 * ```tsx
 * const [range, setRange] = createSignal<DateRange>({ start: null, end: null });
 *
 * <DateRangePicker
 *   value={range()}
 *   onChange={setRange}
 *   label="Select date range"
 * />
 * ```
 */
export const DateRangePicker: Component<DateRangePickerProps> = (props) => {
  const [isOpen, setIsOpen] = createSignal(false);
  const [hoverDate, setHoverDate] = createSignal<Date | null>(null);

  // Local state for selection in progress
  const [localStart, setLocalStart] = createSignal<Date | null>(props.value.start);
  const [localEnd, setLocalEnd] = createSignal<Date | null>(props.value.end);

  const size = () => props.size ?? 'md';
  const format = () => props.format ?? 'yyyy-MM-dd';
  const weekStartsOn = () => props.weekStartsOn ?? 0;
  const clearable = () => props.clearable ?? false;
  const disabled = () => props.disabled ?? false;
  const separator = () => props.separator ?? ' - ';

  const displayValue = () => {
    const start = props.value.start;
    const end = props.value.end;
    if (start && end) {
      return `${formatDate(start, format())}${separator()}${formatDate(end, format())}`;
    }
    if (start) {
      return `${formatDate(start, format())}${separator()}...`;
    }
    return '';
  };

  const hasValue = () => props.value.start !== null || props.value.end !== null;

  const handleDateSelect = (date: Date) => {
    console.log('handleDateSelect called', date);
    try {
      const start = localStart();
      const end = localEnd();
      console.log('current state:', { start, end });

      if (!start || (start && end)) {
        // No selection or complete selection: start a new range
        setLocalStart(date);
        if (end) {
          // Only reset end if it was set (avoid setting null which breaks reactivity)
          setLocalEnd(null);
        }
        console.log('select2, localStart is now:', localStart());
        // props.onChange({ start: date, end: null });
        console.log('select3');
      } else {
        // We have a start but no end
        console.log('select4');
        if (isBeforeDay(date, start)) {
          // Clicked before start: make this the new start
          setLocalStart(date);
          setLocalEnd(null);
          props.onChange({ start: date, end: null });
        } else {
          // Clicked on or after start: complete the range
          setLocalEnd(date);
          props.onChange({ start, end: date });
          setIsOpen(false);
        }
      }
    } catch (e) {
      console.error("failed", e);
    }

  };

  const handleHover = (date: Date | null) => {
    // Only show hover preview when we have start but not end
    if (localStart() && !localEnd()) {
      setHoverDate(date);
    } else {
      setHoverDate(null);
    }
  };

  const handleClear = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setLocalStart(null);
    setLocalEnd(null);
    props.onChange({ start: null, end: null });
  };

  const handleOpenChange = (open: boolean) => {
    if (!disabled()) {
      const wasOpen = isOpen();
      console.log('handleOpenChange:', { open, wasOpen });
      setIsOpen(open);
      if (open && !wasOpen) {
        // Sync local state with props only when first opening (not on quick re-open)
        console.log('syncing from props:', props.value);
        setLocalStart(props.value.start);
        setLocalEnd(props.value.end);
      }
      if (!open) {
        setHoverDate(null);
      }
    }
  };

  const placeholder = () => {
    if (props.placeholder) return props.placeholder;
    const startText = props.startPlaceholder ?? 'Start date';
    const endText = props.endPlaceholder ?? 'End date';
    return `${startText}${separator()}${endText}`;
  };

  return (
    <div class={`w-full ${props.class ?? ''}`} style={props.style}>
      <Show when={props.label}>
        <label
          for={props.id}
          class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5"
        >
          {props.label}
        </label>
      </Show>

      <Popover
        open={isOpen()}
        onOpenChange={handleOpenChange}
        placement="bottom-start"
        offset={4}
        triggerProps={{
          class: `
            w-full glass-input cursor-pointer
            text-surface-900 dark:text-surface-100
            focus:outline-none
            ${disabled() ? 'opacity-50 cursor-not-allowed' : ''}
            ${props.error ? 'border-red-500 dark:border-red-400' : ''}
            ${getSizeClasses(size())}
          `,
          'aria-haspopup': 'dialog',
        }}
        trigger={
          <div class="flex items-center gap-2 w-full">
            <CalendarIcon size={size() === 'sm' ? 14 : size() === 'lg' ? 18 : 16} />
            <span class={`flex-1 text-left ${displayValue() ? '' : 'text-surface-400 dark:text-surface-500'}`}>
              {displayValue() || placeholder()}
            </span>

            {/* Clear button */}
            <Show when={clearable() && hasValue() && !disabled()}>
              <span
                onClick={handleClear}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.stopPropagation();
                    e.preventDefault();
                    setLocalStart(null);
                    setLocalEnd(null);
                    props.onChange({ start: null, end: null });
                  }
                }}
                class="p-1 rounded-full hover:bg-surface-200 dark:hover:bg-surface-600 text-surface-400 dark:text-surface-500 transition-colors"
                role="button"
                tabIndex={0}
                aria-label="Clear date range"
              >
                <CloseIcon size={14} />
              </span>
            </Show>
          </div>
        }
        contentClass="p-0"
      >
        <Calendar
          value={null}
          onSelect={handleDateSelect}
          min={props.min}
          max={props.max}
          weekStartsOn={weekStartsOn()}
          rangeStart={localStart()}
          rangeEnd={localEnd()}
          hoverDate={hoverDate()}
          onHover={handleHover}
        />
      </Popover>

      {/* Error message */}
      <Show when={props.error}>
        <p class="mt-1.5 text-sm text-red-500 dark:text-red-400">{props.error}</p>
      </Show>
    </div>
  );
};
