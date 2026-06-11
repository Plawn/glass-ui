import { type Component, Show, createSignal, splitProps } from 'solid-js';
import { useControlled } from '../../hooks';
import type { ComponentSize } from '../../types';
import { Popover } from '../Popover';
import { CloseIcon } from '../shared/icons/CloseIcon';
import { Calendar } from './Calendar';
import type { DateRange, DateRangePickerProps } from './types';
import { formatDate } from './utils';

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
  const [local, rest] = splitProps(props, [
    'value',
    'defaultValue',
    'onChange',
    'placeholder',
    'startPlaceholder',
    'endPlaceholder',
    'format',
    'min',
    'max',
    'size',
    'clearable',
    'weekStartsOn',
    'separator',
    'name',
    'required',
    'disabled',
    'label',
    'error',
    'id',
    'class',
    'style',
  ]);

  const [isOpen, setIsOpen] = createSignal(false);
  const [hoverDate, setHoverDate] = createSignal<Date | null>(null);

  const [value, setValue] = useControlled<DateRange>({
    value: () => local.value,
    defaultValue: local.defaultValue ?? { start: null, end: null },
    onChange: (v) => local.onChange?.(v),
  });

  // Local state for selection in progress
  const [localStart, setLocalStart] = createSignal<Date | null>(value().start);
  const [localEnd, setLocalEnd] = createSignal<Date | null>(value().end);

  const size = () => local.size ?? 'md';
  const format = () => local.format ?? 'yyyy-MM-dd';
  const weekStartsOn = () => local.weekStartsOn ?? 0;
  const clearable = () => local.clearable ?? false;
  const disabled = () => local.disabled ?? false;
  const separator = () => local.separator ?? ' - ';

  const displayValue = () => {
    const start = value().start;
    const end = value().end;
    if (start && end) {
      return `${formatDate(start, format())}${separator()}${formatDate(end, format())}`;
    }
    if (start) {
      return `${formatDate(start, format())}${separator()}...`;
    }
    return '';
  };

  const hasValue = () => value().start !== null || value().end !== null;

  const handleDateSelect = (date: Date) => {
    const start = localStart();
    const end = localEnd();

    if (!start || (start && end)) {
      // No selection or complete selection: start a new range
      setLocalStart(date);
      if (end) {
        // Only reset end if it was set (avoid setting null which breaks reactivity)
        setLocalEnd(null);
      }
    } else {
      // We have a start but no end
      if (isBeforeDay(date, start)) {
        // Clicked before start: make this the new start
        setLocalStart(date);
        setLocalEnd(null);
        setValue({ start: date, end: null });
      } else {
        // Clicked on or after start: complete the range
        setLocalEnd(date);
        setValue({ start, end: date });
        setIsOpen(false);
      }
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
    setValue({ start: null, end: null });
  };

  const handleOpenChange = (open: boolean) => {
    if (!disabled()) {
      const wasOpen = isOpen();
      setIsOpen(open);
      if (open && !wasOpen) {
        // Sync local state with props only when first opening (not on quick re-open)
        setLocalStart(value().start);
        setLocalEnd(value().end);
      }
      if (!open) {
        setHoverDate(null);
      }
    }
  };

  const placeholder = () => {
    if (local.placeholder) {
      return local.placeholder;
    }
    const startText = local.startPlaceholder ?? 'Start date';
    const endText = local.endPlaceholder ?? 'End date';
    return `${startText}${separator()}${endText}`;
  };

  return (
    <div {...rest} class={`w-full ${local.class ?? ''}`} style={local.style}>
      <Show when={local.label}>
        <label
          for={local.id}
          class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5"
        >
          {local.label}
          <Show when={local.required}>
            <span class="text-error-500 ml-0.5">*</span>
          </Show>
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
            ${local.error ? 'border-error-500 dark:border-error-400' : ''}
            ${getSizeClasses(size())}
          `,
          'aria-haspopup': 'dialog',
        }}
        trigger={
          <div class="flex items-center gap-2 w-full">
            <CalendarIcon
              size={size() === 'sm' ? 14 : size() === 'lg' ? 18 : 16}
            />
            <span
              class={`flex-1 text-left ${displayValue() ? '' : 'text-surface-400 dark:text-surface-500'}`}
            >
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
                    setValue({ start: null, end: null });
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
          min={local.min}
          max={local.max}
          weekStartsOn={weekStartsOn()}
          rangeStart={localStart()}
          rangeEnd={localEnd()}
          hoverDate={hoverDate()}
          onHover={handleHover}
        />
      </Popover>

      {/* Hidden inputs for native form submission */}
      <Show when={local.name}>
        <input
          type="hidden"
          name={`${local.name}-start`}
          value={
            value().start ? formatDate(value().start as Date, 'yyyy-MM-dd') : ''
          }
        />
        <input
          type="hidden"
          name={`${local.name}-end`}
          value={
            value().end ? formatDate(value().end as Date, 'yyyy-MM-dd') : ''
          }
        />
      </Show>

      {/* Error message */}
      <Show when={local.error}>
        <p
          id={local.id ? `${local.id}-error` : undefined}
          class="mt-1.5 text-sm text-error-500 dark:text-error-400"
          role="alert"
        >
          {local.error}
        </p>
      </Show>
    </div>
  );
};
