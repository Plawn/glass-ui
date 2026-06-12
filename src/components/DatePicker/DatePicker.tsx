import { type Component, Show, createSignal, splitProps } from 'solid-js';
import { useControlled } from '../../hooks';
import type { ComponentSize } from '../../types';
import { Popover } from '../Popover';
import { Spinner } from '../Spinner';
import { CloseIcon } from '../shared/icons/CloseIcon';
import { Calendar } from './Calendar';
import type { DatePickerProps } from './types';
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
  const [local, rest] = splitProps(props, [
    'value',
    'defaultValue',
    'onChange',
    'placeholder',
    'format',
    'min',
    'max',
    'size',
    'clearable',
    'weekStartsOn',
    'name',
    'required',
    'disabled',
    'loading',
    'label',
    'error',
    'id',
    'class',
    'style',
  ]);

  const [isOpen, setIsOpen] = createSignal(false);

  const size = () => local.size ?? 'md';
  const format = () => local.format ?? 'yyyy-MM-dd';
  const weekStartsOn = () => local.weekStartsOn ?? 0;
  const clearable = () => local.clearable ?? false;
  const disabled = () => local.disabled ?? false;

  const [value, setValue] = useControlled<Date | null>({
    value: () => local.value,
    defaultValue: local.defaultValue ?? null,
    onChange: (v) => local.onChange?.(v),
  });

  const displayValue = () => {
    const current = value();
    if (current) {
      return formatDate(current, format());
    }
    return '';
  };

  const handleDateSelect = (date: Date) => {
    setValue(date);
    setIsOpen(false);
  };

  const handleClear = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setValue(null);
  };

  const handleOpenChange = (open: boolean) => {
    if (!disabled()) {
      setIsOpen(open);
    }
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
          'aria-busy': local.loading || undefined,
        }}
        trigger={
          <div class="flex items-center gap-2 w-full">
            <Show
              when={local.loading}
              fallback={
                <CalendarIcon
                  size={size() === 'sm' ? 14 : size() === 'lg' ? 18 : 16}
                />
              }
            >
              <Spinner size="sm" />
            </Show>
            <span
              class={`flex-1 text-left ${displayValue() ? '' : 'text-surface-400 dark:text-surface-500'}`}
            >
              {displayValue() || local.placeholder || 'Select date'}
            </span>

            {/* Clear button */}
            <Show when={clearable() && value() && !disabled()}>
              <button
                type="button"
                onClick={handleClear}
                class="p-1 rounded-full hover:bg-surface-200 dark:hover:bg-surface-600 text-surface-400 dark:text-surface-500 transition-colors"
                aria-label="Clear date"
              >
                <CloseIcon size={14} />
              </button>
            </Show>
          </div>
        }
        contentClass="p-0"
      >
        <Calendar
          value={value()}
          onSelect={handleDateSelect}
          min={local.min}
          max={local.max}
          weekStartsOn={weekStartsOn()}
        />
      </Popover>

      {/* Hidden input for native form submission */}
      <Show when={local.name}>
        <input
          type="hidden"
          name={local.name}
          value={value() ? formatDate(value() as Date, 'yyyy-MM-dd') : ''}
          required={local.required}
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
