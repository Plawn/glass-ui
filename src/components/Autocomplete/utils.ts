import type { AutocompleteOption } from './types';

/**
 * Default Autocomplete filter — case-insensitive substring match against the
 * option label. Pure function; exported so it can be reused and unit-tested.
 */
export const defaultFilterFn = (
  option: AutocompleteOption,
  inputValue: string,
): boolean => {
  return option.label.toLowerCase().includes(inputValue.toLowerCase());
};
