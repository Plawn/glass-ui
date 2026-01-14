import type { JSX } from 'solid-js';
import { type Component, Show, createEffect, onCleanup, createSignal } from 'solid-js';
import { useDisclosure } from '../../hooks';
import type { ComponentSize } from '../../types';
import { PortalWithDarkMode } from '../shared/PortalWithDarkMode';
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

/** Position styles for dropdown placement */
type PositionStyles = Pick<JSX.CSSProperties, 'top' | 'bottom' | 'left' | 'right'>;

/** Minimum space required between dropdown and viewport edge */
const VIEWPORT_PADDING = 8;
/** Gap between trigger and dropdown */
const DROPDOWN_GAP = 4;

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
  const disclosure = useDisclosure(false);
  let inputContainerRef: HTMLDivElement | undefined;
  let contentRef: HTMLDivElement | undefined;

  const size = () => props.size ?? 'md';
  const format = () => props.format ?? 'yyyy-MM-dd';
  const weekStartsOn = () => props.weekStartsOn ?? 0;
  const clearable = () => props.clearable ?? false;
  const disabled = () => props.disabled ?? false;

  const [position, setPosition] = createSignal<PositionStyles>({});

  const displayValue = () => {
    if (props.value) {
      return formatDate(props.value, format());
    }
    return '';
  };

  const handleOpen = () => {
    if (!disabled()) {
      disclosure.onOpen();
    }
  };

  const handleClose = () => {
    disclosure.onClose();
  };

  const handleDateSelect = (date: Date) => {
    props.onChange(date);
    handleClose();
  };

  const handleClear = (e: MouseEvent) => {
    e.stopPropagation();
    props.onChange(null);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && disclosure.isOpen()) {
      e.preventDefault();
      handleClose();
    } else if ((e.key === 'Enter' || e.key === ' ') && !disclosure.isOpen()) {
      e.preventDefault();
      handleOpen();
    }
  };

  // Calculate position when opening
  const updatePosition = () => {
    if (!inputContainerRef) return;

    const rect = inputContainerRef.getBoundingClientRect();
    const calendarHeight = 320; // Approximate calendar height
    const calendarWidth = 280; // Approximate calendar width

    const spaceBelow = window.innerHeight - rect.bottom - VIEWPORT_PADDING;
    const spaceAbove = rect.top - VIEWPORT_PADDING;

    const styles: PositionStyles = {};

    // Vertical positioning
    if (spaceBelow >= calendarHeight || spaceBelow >= spaceAbove) {
      styles.top = `${rect.bottom + DROPDOWN_GAP}px`;
    } else {
      styles.bottom = `${window.innerHeight - rect.top + DROPDOWN_GAP}px`;
    }

    // Horizontal positioning - align to left of input, but keep in viewport
    const leftPosition = rect.left;
    const rightOverflow = leftPosition + calendarWidth - window.innerWidth + VIEWPORT_PADDING;

    if (rightOverflow > 0) {
      styles.left = `${Math.max(VIEWPORT_PADDING, leftPosition - rightOverflow)}px`;
    } else {
      styles.left = `${Math.max(VIEWPORT_PADDING, leftPosition)}px`;
    }

    setPosition(styles);
  };

  // Update position when opened
  createEffect(() => {
    if (disclosure.isOpen()) {
      updatePosition();
    }
  });

  // Close on click outside
  createEffect(() => {
    if (!disclosure.isOpen()) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        contentRef &&
        !contentRef.contains(target) &&
        inputContainerRef &&
        !inputContainerRef.contains(target)
      ) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    onCleanup(() => document.removeEventListener('mousedown', handleClickOutside));
  });

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

      {/* Input container */}
      <div
        ref={inputContainerRef}
        onClick={handleOpen}
        onKeyDown={handleKeyDown}
        class={`
          relative w-full glass-input cursor-pointer
          text-surface-900 dark:text-surface-100
          focus-within:outline-none
          ${disabled() ? 'opacity-50 cursor-not-allowed' : ''}
          ${props.error ? 'border-red-500 dark:border-red-400' : ''}
          ${getSizeClasses(size())}
        `}
        tabIndex={disabled() ? -1 : 0}
        role="combobox"
        aria-expanded={disclosure.isOpen()}
        aria-haspopup="dialog"
      >
        <div class="flex items-center gap-2">
          <CalendarIcon size={size() === 'sm' ? 14 : size() === 'lg' ? 18 : 16} />
          <span class={displayValue() ? '' : 'text-surface-400 dark:text-surface-500'}>
            {displayValue() || props.placeholder || 'Select date'}
          </span>
        </div>

        {/* Clear button */}
        <Show when={clearable() && props.value && !disabled()}>
          <button
            type="button"
            onClick={handleClear}
            class="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-surface-200 dark:hover:bg-surface-600 text-surface-400 dark:text-surface-500 transition-colors"
            aria-label="Clear date"
          >
            <CloseIcon size={14} />
          </button>
        </Show>
      </div>

      {/* Error message */}
      <Show when={props.error}>
        <p class="mt-1.5 text-sm text-red-500 dark:text-red-400">{props.error}</p>
      </Show>

      {/* Calendar popup */}
      <Show when={disclosure.isOpen()}>
        <PortalWithDarkMode>
          <div
            ref={contentRef}
            class="fixed z-50 glass-card rounded-xl shadow-lg animate-in fade-in zoom-in-95 duration-150"
            style={position()}
            role="dialog"
            aria-label="Date picker calendar"
          >
            <Calendar
              value={props.value}
              onSelect={handleDateSelect}
              min={props.min}
              max={props.max}
              weekStartsOn={weekStartsOn()}
            />
          </div>
        </PortalWithDarkMode>
      </Show>
    </div>
  );
};
