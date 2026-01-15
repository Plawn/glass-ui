import { type Component, Show, createSignal } from 'solid-js';
import type { ComponentSize } from '../../types';
import { Popover } from '../Popover';
import { CloseIcon } from '../shared/icons/CloseIcon';
import { Calendar } from './Calendar';
import type { DatePickerProps, DateFormat } from './types';

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

/**
 * A glassmorphic date picker component with calendar popup.
 *
 * @example
 * ```tsx
 * const [date, setDate] = createSignal<Date | null>(null);
 *
 * <DatePicker
 *   value={date()}
 *   onChange={setDate}
 *   label="Select date"
 *   placeholder="Choose a date..."
 * />
 * ```
 */
export const DatePicker: Component<DatePickerProps> = (props) => {
  const [isOpen, setIsOpen] = createSignal(false);

  const size = () => props.size ?? 'md';
  const format = () => props.format ?? 'yyyy-MM-dd';
  const weekStartsOn = () => props.weekStartsOn ?? 0;
  const clearable = () => props.clearable ?? false;
  const disabled = () => props.disabled ?? false;

  const displayValue = () => {
    if (props.value) {
      return formatDate(props.value, format());
    }
    return '';
  };

  const handleDateSelect = (date: Date) => {
    props.onChange(date);
    setIsOpen(false);
  };

  const handleClear = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    props.onChange(null);
  };

  const handleOpenChange = (open: boolean) => {
    if (!disabled()) {
      setIsOpen(open);
    }
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
              {displayValue() || props.placeholder || 'Select date'}
            </span>

            {/* Clear button */}
            <Show when={clearable() && props.value && !disabled()}>
              <span
                onClick={handleClear}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.stopPropagation();
                    e.preventDefault();
                    props.onChange(null);
                  }
                }}
                class="p-1 rounded-full hover:bg-surface-200 dark:hover:bg-surface-600 text-surface-400 dark:text-surface-500 transition-colors"
                role="button"
                tabIndex={0}
                aria-label="Clear date"
              >
                <CloseIcon size={14} />
              </span>
            </Show>
          </div>
        }
        contentClass="p-0"
      >
        <Calendar
          value={props.value}
          onSelect={handleDateSelect}
          min={props.min}
          max={props.max}
          weekStartsOn={weekStartsOn()}
        />
      </Popover>

      {/* Error message */}
      <Show when={props.error}>
        <p class="mt-1.5 text-sm text-red-500 dark:text-red-400">{props.error}</p>
      </Show>
    </div>
  );
};
