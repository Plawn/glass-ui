import {
  type Component,
  For,
  Show,
  createEffect,
  createMemo,
  createSignal,
  createUniqueId,
  on,
  onCleanup,
} from 'solid-js';
import {
  DROPDOWN_ITEM_SIZE_CLASSES,
  INPUT_SIZE_CLASSES,
} from '../../constants';
import { useClickOutside } from '../../hooks';
import { Spinner } from '../Spinner';
import { ChevronDownIcon, CloseIcon, PortalWithDarkMode } from '../shared';
import type { AutocompleteOption, AutocompleteProps } from './types';

/**
 * Default filter function - case-insensitive substring match
 */
const defaultFilterFn = (
  option: AutocompleteOption,
  inputValue: string,
): boolean => {
  return option.label.toLowerCase().includes(inputValue.toLowerCase());
};

/**
 * Highlight matching text in a string
 */
const HighlightedText: Component<{ text: string; highlight: string }> = (
  props,
) => {
  const parts = createMemo(() => {
    if (!props.highlight.trim()) {
      return [{ text: props.text, match: false }];
    }

    const lowerText = props.text.toLowerCase();
    const lowerHighlight = props.highlight.toLowerCase();
    const result: { text: string; match: boolean }[] = [];
    let lastIndex = 0;

    let index = lowerText.indexOf(lowerHighlight, lastIndex);
    while (index !== -1) {
      if (index > lastIndex) {
        result.push({ text: props.text.slice(lastIndex, index), match: false });
      }
      result.push({
        text: props.text.slice(index, index + props.highlight.length),
        match: true,
      });
      lastIndex = index + props.highlight.length;
      index = lowerText.indexOf(lowerHighlight, lastIndex);
    }

    if (lastIndex < props.text.length) {
      result.push({ text: props.text.slice(lastIndex), match: false });
    }

    return result.length > 0 ? result : [{ text: props.text, match: false }];
  });

  return (
    <span>
      <For each={parts()}>
        {(part) => (
          <Show when={part.match} fallback={<span>{part.text}</span>}>
            <mark class="bg-primary-200 dark:bg-primary-700/50 text-inherit rounded-sm px-0.5">
              {part.text}
            </mark>
          </Show>
        )}
      </For>
    </span>
  );
};

/**
 * A glassmorphic Autocomplete/Combobox component with dropdown suggestions.
 *
 * @example
 * ```tsx
 * const [value, setValue] = createSignal('');
 *
 * <Autocomplete
 *   options={[
 *     { value: 'apple', label: 'Apple' },
 *     { value: 'banana', label: 'Banana' },
 *     { value: 'cherry', label: 'Cherry' },
 *   ]}
 *   value={value()}
 *   onChange={setValue}
 *   placeholder="Select a fruit..."
 * />
 * ```
 */
export const Autocomplete: Component<AutocompleteProps> = (props) => {
  const [isOpen, setIsOpen] = createSignal(false);
  const [inputValue, setInputValue] = createSignal('');
  const [focusedIndex, setFocusedIndex] = createSignal(-1);

  const listboxId = createUniqueId();
  let internalInputRef: HTMLInputElement | undefined;
  let containerRef: HTMLDivElement | undefined;
  let dropdownRef: HTMLDivElement | undefined;
  let justSelected = false;

  // Combine internal ref with user-provided ref
  const setInputRef = (el: HTMLInputElement) => {
    internalInputRef = el;
    if (typeof props.ref === 'function') {
      props.ref(el);
    } else if (props.ref !== undefined) {
      // For direct assignment refs, we can't set them directly
      // but SolidJS handles this case automatically
    }
  };

  const size = () => props.size ?? 'md';
  const emptyText = () => props.emptyText ?? 'No options found';
  const filterFn = () => props.filterFn ?? defaultFilterFn;

  // Sync input value with selected value
  createEffect(() => {
    const selectedOption = props.options.find(
      (opt) => opt.value === props.value,
    );
    if (selectedOption) {
      setInputValue(selectedOption.label);
    } else if (props.allowCustomValue) {
      setInputValue(props.value);
    } else {
      setInputValue('');
    }
  });

  // Filtered options based on input
  const filteredOptions = createMemo(() => {
    const input = inputValue().trim();
    if (!input) {
      return props.options;
    }
    return props.options.filter((opt) => filterFn()(opt, input));
  });

  // Focusable options (non-disabled)
  const focusableOptions = createMemo(() => {
    return filteredOptions().filter((opt) => !opt.disabled);
  });

  // Reset focused index when options change (keep first item highlighted)
  createEffect(
    on(
      () => filteredOptions(),
      () => {
        if (isOpen()) {
          const firstFocusable = focusableOptions().length > 0 ? 0 : -1;
          setFocusedIndex(firstFocusable);
        }
      },
    ),
  );

  // Scroll focused item into view
  createEffect(() => {
    const idx = focusedIndex();
    if (idx >= 0 && dropdownRef) {
      const items = dropdownRef.querySelectorAll('[data-option]');
      const item = items[idx];
      if (item) {
        item.scrollIntoView({ block: 'nearest' });
      }
    }
  });

  const handleOpen = () => {
    if (props.disabled) {
      return;
    }
    setIsOpen(true);
    // Pre-select first focusable option
    const firstFocusable = focusableOptions().length > 0 ? 0 : -1;
    setFocusedIndex(firstFocusable);
  };

  const handleToggle = () => {
    if (props.disabled) {
      return;
    }
    if (isOpen()) {
      handleClose();
    } else {
      handleOpen();
      internalInputRef?.focus();
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setFocusedIndex(-1);
  };

  const handleSelect = (option: AutocompleteOption) => {
    if (option.disabled) {
      return;
    }
    setInputValue(option.label);
    props.onChange(option.value);
    handleClose();
    justSelected = true;
    internalInputRef?.focus();
  };

  const handleClear = (e: MouseEvent) => {
    e.stopPropagation();
    setInputValue('');
    props.onChange('');
    props.onInputChange?.('');
    internalInputRef?.focus();
  };

  const hasValue = () => !!props.value;

  const handleInputChange = (value: string) => {
    setInputValue(value);
    props.onInputChange?.(value);
    if (!isOpen()) {
      handleOpen();
    }
  };

  const handleInputFocus = () => {
    if (justSelected) {
      justSelected = false;
      return;
    }
    handleOpen();
  };

  const handleInputBlur = (e: FocusEvent) => {
    // Delay close to allow click on option to register
    const relatedTarget = e.relatedTarget as Node | null;
    if (dropdownRef?.contains(relatedTarget)) {
      return;
    }

    // On blur, validate the input
    setTimeout(() => {
      if (!isOpen()) {
        return;
      }

      const matchingOption = props.options.find(
        (opt) => opt.label.toLowerCase() === inputValue().toLowerCase(),
      );

      if (matchingOption) {
        props.onChange(matchingOption.value);
        setInputValue(matchingOption.label);
      } else if (props.allowCustomValue) {
        props.onChange(inputValue());
      } else {
        // Reset to current value
        const selectedOption = props.options.find(
          (opt) => opt.value === props.value,
        );
        setInputValue(selectedOption?.label ?? '');
      }

      handleClose();
    }, 150);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    const options = focusableOptions();
    const len = options.length;
    const open = isOpen();
    const idx = focusedIndex();

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (!open) {
          handleOpen();
        } else if (len > 0) {
          setFocusedIndex((prev) => Math.min(prev + 1, len - 1));
        }
        break;

      case 'ArrowUp':
        e.preventDefault();
        if (open && len > 0) {
          setFocusedIndex((prev) => Math.max(prev - 1, 0));
        }
        break;

      case 'Enter':
        e.preventDefault();
        if (open && idx >= 0 && idx < len) {
          handleSelect(options[idx]);
        } else if (props.allowCustomValue && inputValue().trim()) {
          props.onChange(inputValue());
          handleClose();
        }
        break;

      case 'Escape':
        if (open) {
          e.preventDefault();
          handleClose();
          const selected = props.options.find(
            (opt) => opt.value === props.value,
          );
          setInputValue(
            selected?.label ?? (props.allowCustomValue ? props.value : ''),
          );
        }
        break;

      case 'Tab':
        if (open) {
          handleClose();
        }
        break;

      case 'Home':
        if (open && len > 0) {
          e.preventDefault();
          setFocusedIndex(0);
        }
        break;

      case 'End':
        if (open && len > 0) {
          e.preventDefault();
          setFocusedIndex(len - 1);
        }
        break;
    }
  };

  // Click outside to close
  useClickOutside({
    refs: () => [containerRef, dropdownRef],
    onClickOutside: handleClose,
    enabled: isOpen,
  });

  // Close on scroll (any scrollable container, but not internal scroll)
  createEffect(() => {
    if (!isOpen()) {
      return;
    }

    const handleScroll = (e: Event) => {
      // Ignore scroll events from inside the dropdown
      if (dropdownRef?.contains(e.target as Node)) {
        return;
      }
      handleClose();
    };

    // Use capture to catch scroll events on any scrollable ancestor
    window.addEventListener('scroll', handleScroll, true);
    onCleanup(() => window.removeEventListener('scroll', handleScroll, true));
  });

  // Calculate dropdown position
  const dropdownPosition = createMemo(() => {
    // Track isOpen to recalculate when dropdown opens
    if (!isOpen() || !containerRef) {
      return {};
    }

    const rect = containerRef.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    const dropdownHeight = 240; // max-h-60 = 15rem = 240px

    // Prefer below, flip to above if not enough space
    const showAbove = spaceBelow < dropdownHeight && spaceAbove > spaceBelow;

    return {
      left: `${rect.left}px`,
      width: `${rect.width}px`,
      ...(showAbove
        ? { bottom: `${window.innerHeight - rect.top + 4}px` }
        : { top: `${rect.bottom + 4}px` }),
    };
  });

  const sizeClasses = () => INPUT_SIZE_CLASSES[size()];
  const itemSizeClasses = () => DROPDOWN_ITEM_SIZE_CLASSES[size()];

  return (
    <div class={`w-full ${props.class ?? ''}`} ref={containerRef}>
      <Show when={props.label}>
        <label
          for={props.id}
          class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5"
        >
          {props.label}
        </label>
      </Show>

      <div class="relative">
        <input
          ref={setInputRef}
          type="text"
          id={props.id}
          name={props.name}
          class={`w-full glass-input text-surface-900 dark:text-surface-100 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${hasValue() && !props.disabled ? 'pr-16' : 'pr-10'} ${sizeClasses()} ${props.error ? 'border-error-500 dark:border-error-400' : ''}`}
          placeholder={props.placeholder}
          value={inputValue()}
          disabled={props.disabled}
          autocomplete="off"
          role="combobox"
          aria-expanded={isOpen()}
          aria-haspopup="listbox"
          aria-autocomplete="list"
          aria-controls={isOpen() ? listboxId : undefined}
          aria-activedescendant={
            isOpen() && focusedIndex() >= 0
              ? `${listboxId}-option-${focusedIndex()}`
              : undefined
          }
          aria-invalid={!!props.error}
          aria-describedby={
            props.error && props.id ? `${props.id}-error` : undefined
          }
          onInput={(e) => handleInputChange(e.currentTarget.value)}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          onClick={() => !isOpen() && handleOpen()}
        />

        {/* Right side indicators */}
        <div class="absolute inset-y-0 right-0 flex items-center gap-1 pr-2">
          <Show when={props.loading}>
            <div class="pointer-events-none">
              <Spinner size="sm" />
            </div>
          </Show>

          <Show when={!props.loading && hasValue() && !props.disabled}>
            <button
              type="button"
              class="p-1 rounded-full text-surface-400 hover:text-surface-600 dark:hover:text-surface-300 hover:bg-surface-200/50 dark:hover:bg-surface-700/50 transition-colors"
              onClick={handleClear}
              tabIndex={-1}
              aria-label="Clear selection"
            >
              <CloseIcon class="w-4 h-4" />
            </button>
          </Show>

          <Show when={!props.loading}>
            <button
              type="button"
              class="p-1 text-surface-400 cursor-pointer disabled:cursor-not-allowed"
              onClick={handleToggle}
              disabled={props.disabled}
              tabIndex={-1}
              aria-label={isOpen() ? 'Close dropdown' : 'Open dropdown'}
            >
              <ChevronDownIcon
                class={`transition-transform duration-150 ${isOpen() ? 'rotate-180' : ''}`}
              />
            </button>
          </Show>
        </div>
      </div>

      <Show when={props.error}>
        <p
          id={props.id ? `${props.id}-error` : undefined}
          class="mt-1.5 text-sm text-error-500 dark:text-error-400"
          role="alert"
        >
          {props.error}
        </p>
      </Show>

      {/* Dropdown */}
      <Show when={isOpen()}>
        <PortalWithDarkMode>
          <div
            ref={dropdownRef}
            id={listboxId}
            class="fixed z-50 glass-card rounded-xl shadow-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150"
            style={dropdownPosition()}
            role="listbox"
          >
            <div class="max-h-60 overflow-y-auto scrollbar-thin py-1">
              <Show
                when={filteredOptions().length > 0}
                fallback={
                  <div
                    class={`text-surface-500 dark:text-surface-400 text-center ${itemSizeClasses()}`}
                  >
                    {emptyText()}
                  </div>
                }
              >
                <For each={filteredOptions()}>
                  {(option) => {
                    const isFocused = () => {
                      const focusableIdx = focusableOptions().indexOf(option);
                      return focusableIdx === focusedIndex();
                    };
                    const isSelected = () => option.value === props.value;

                    const focusableIdx = () =>
                      focusableOptions().indexOf(option);

                    return (
                      <button
                        type="button"
                        data-option
                        id={
                          !option.disabled
                            ? `${listboxId}-option-${focusableIdx()}`
                            : undefined
                        }
                        class={`w-full text-left transition-colors ${itemSizeClasses()}
                          ${
                            option.disabled
                              ? 'text-surface-400 dark:text-surface-600 cursor-not-allowed'
                              : 'text-surface-700 dark:text-surface-200 cursor-pointer'
                          }
                          ${isFocused() ? 'bg-black/5 dark:bg-white/5' : ''}
                          ${isSelected() ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300' : ''}
                          ${!option.disabled && !isFocused() && !isSelected() ? 'hover:bg-black/5 dark:hover:bg-white/5' : ''}
                        `}
                        onClick={() => handleSelect(option)}
                        onMouseEnter={() => {
                          if (!option.disabled) {
                            setFocusedIndex(focusableIdx());
                          }
                        }}
                        disabled={option.disabled}
                        role="option"
                        aria-selected={isSelected()}
                        tabIndex={-1}
                      >
                        <HighlightedText
                          text={option.label}
                          highlight={inputValue()}
                        />
                      </button>
                    );
                  }}
                </For>
              </Show>
            </div>
          </div>
        </PortalWithDarkMode>
      </Show>
    </div>
  );
};
