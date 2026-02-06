import {
  type Component,
  For,
  Show,
  createEffect,
  createMemo,
  createSignal,
  on,
  onCleanup,
  onMount,
} from 'solid-js';
import { BACKDROP_ENTER, COMMAND_PALETTE_PANEL_ENTER } from '../../constants';
import { useControlled, useDialogState } from '../../hooks';
import { PortalWithDarkMode } from '../shared';
import { CommandPaletteItem } from './CommandPaletteItem';
import type {
  CommandPaletteProps,
  CommandPaletteSearchResult,
  CommandPaletteItem as ItemType,
} from './types';

const MAX_RESULTS = 50;

/**
 * Simple fuzzy search implementation
 * Returns match positions for highlighting
 */
function fuzzySearch<T>(
  query: string,
  items: ItemType<T>[],
): CommandPaletteSearchResult<T>[] {
  const lowerQuery = query.toLowerCase();
  const results: CommandPaletteSearchResult<T>[] = [];

  for (const item of items) {
    const labelLower = item.label.toLowerCase();
    const descLower = item.description?.toLowerCase() ?? '';
    const keywordsLower = item.keywords?.map((k) => k.toLowerCase()) ?? [];

    // Check label match
    const labelMatches = findMatches(labelLower, lowerQuery);

    // Check description match
    const descMatches = item.description
      ? findMatches(descLower, lowerQuery)
      : undefined;

    // Check keywords match
    const keywordMatch = keywordsLower.some((kw) => kw.includes(lowerQuery));

    // Calculate score (lower is better)
    let score = Number.POSITIVE_INFINITY;
    if (labelMatches.length > 0) {
      score = labelMatches[0][0]; // Prefer earlier matches
    } else if (descMatches && descMatches.length > 0) {
      score = 100 + descMatches[0][0];
    } else if (keywordMatch) {
      score = 200;
    }

    if (score < Number.POSITIVE_INFINITY) {
      results.push({
        item,
        labelMatches: labelMatches.length > 0 ? labelMatches : undefined,
        descriptionMatches:
          descMatches && descMatches.length > 0 ? descMatches : undefined,
        score,
      });
    }
  }

  // Sort by score
  return results
    .sort(
      (a, b) =>
        (a.score ?? Number.POSITIVE_INFINITY) -
        (b.score ?? Number.POSITIVE_INFINITY),
    )
    .slice(0, MAX_RESULTS);
}

/**
 * Find all positions where query matches in text
 */
function findMatches(text: string, query: string): [number, number][] {
  const matches: [number, number][] = [];
  let pos = 0;
  while (pos < text.length) {
    const idx = text.indexOf(query, pos);
    if (idx === -1) {
      break;
    }
    matches.push([idx, idx + query.length]);
    pos = idx + 1;
  }
  return matches;
}

/**
 * Search icon SVG
 */
const SearchIcon: Component = () => (
  <svg
    class="w-5 h-5 text-surface-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    stroke-width="2"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

/**
 * Keyboard key badge
 */
const Kbd: Component<{ children: string }> = (props) => (
  <kbd class="px-1.5 py-0.5 text-xs font-medium bg-surface-100 dark:bg-white/10 text-surface-500 dark:text-surface-400 rounded border border-surface-200 dark:border-white/10">
    {props.children}
  </kbd>
);

/**
 * Command Palette component
 *
 * A searchable command menu that can be triggered via keyboard shortcut (Cmd/Ctrl+K).
 * Supports fuzzy search, recent items, keyboard navigation, and item grouping.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <CommandPalette
 *   items={[
 *     { id: '1', label: 'Search files', description: 'Find files in project' },
 *     { id: '2', label: 'Open settings', group: 'Preferences' },
 *   ]}
 *   onSelect={(item) => console.log('Selected:', item)}
 *   placeholder="Type a command or search..."
 * />
 *
 * // With recent items tracking
 * const [recentIds, setRecentIds] = createSignal<string[]>([]);
 *
 * <CommandPalette
 *   items={items}
 *   recentIds={recentIds()}
 *   onSelect={(item) => {
 *     setRecentIds((prev) => [item.id, ...prev.filter((id) => id !== item.id)].slice(0, 5));
 *     handleSelect(item);
 *   }}
 * />
 * ```
 */
export const CommandPalette: Component<CommandPaletteProps> = (props) => {
  // State
  const [query, setQuery] = createSignal('');
  const [selectedIndex, setSelectedIndex] = createSignal(0);
  const [mouseEnabled, setMouseEnabled] = createSignal(false);

  let inputRef: HTMLInputElement | undefined;
  let listRef: HTMLDivElement | undefined;

  // Controlled/uncontrolled state management
  const [isOpen, setOpen] = useControlled({
    value: () => props.open,
    defaultValue: false,
    onChange: props.onOpenChange,
  });

  // Config
  const shortcutKey = () => props.shortcutKey ?? 'k';
  const placeholder = () => props.placeholder ?? 'Search...';
  const emptyText = () => props.emptyText ?? 'No results found';

  // Recent IDs from props
  const recentIds = () => props.recentIds ?? [];

  // Create item lookup map
  const itemMap = createMemo(() => {
    const map = new Map<string, ItemType>();
    for (const item of props.items) {
      map.set(item.id, item);
    }
    return map;
  });

  // Get recent items that still exist
  const recentItems = createMemo(() => {
    const ids = recentIds();
    const map = itemMap();
    return ids
      .map((id) => map.get(id))
      .filter((item): item is ItemType => item !== undefined);
  });

  // Search results
  const searchResults = createMemo((): CommandPaletteSearchResult[] => {
    const q = query().trim();

    if (!q) {
      // No query: show recents first, then other items
      const recent = recentItems();
      const recentIdSet = new Set(recent.map((r) => r.id));
      const others = props.items.filter((item) => !recentIdSet.has(item.id));

      return [
        ...recent.map((item) => ({ item, isRecent: true })),
        ...others
          .slice(0, MAX_RESULTS - recent.length)
          .map((item) => ({ item })),
      ] as CommandPaletteSearchResult[];
    }

    // Use custom search or default fuzzy search
    if (props.searchFn) {
      return props.searchFn(q, props.items);
    }

    return fuzzySearch(q, props.items);
  });

  // Group results by category
  const groupedResults = createMemo(() => {
    const results = searchResults();
    const groups = new Map<string, CommandPaletteSearchResult[]>();
    const noGroup: CommandPaletteSearchResult[] = [];

    for (const result of results) {
      const group = result.item.group;
      if (group) {
        const existing = groups.get(group) ?? [];
        existing.push(result);
        groups.set(group, existing);
      } else {
        noGroup.push(result);
      }
    }

    return { groups, noGroup };
  });

  // Flat list for keyboard navigation - must match display order (noGroup first, then groups)
  const flatResults = createMemo(() => {
    const { noGroup, groups } = groupedResults();
    const flat: CommandPaletteSearchResult[] = [...noGroup];
    for (const items of groups.values()) {
      flat.push(...items);
    }
    return flat;
  });

  // Expose handle
  onMount(() => {
    props.ref?.({
      open: () => setOpen(true),
      close: () => setOpen(false),
      toggle: () => setOpen(!isOpen()),
      isOpen,
    });
  });

  // Global keyboard shortcut
  createEffect(() => {
    if (props.disableShortcut || props.items.length === 0) {
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = shortcutKey();
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === key) {
        e.preventDefault();
        setOpen(!isOpen());
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    onCleanup(() => document.removeEventListener('keydown', handleKeyDown));
  });

  // Focus input and reset state when opened
  createEffect(() => {
    if (isOpen()) {
      setQuery('');
      setSelectedIndex(0);
      setMouseEnabled(false);
      // Focus after a tick to ensure the input is rendered
      requestAnimationFrame(() => {
        inputRef?.focus();
      });
    }
  });

  // Reset selection when results change
  createEffect(
    on(
      () => flatResults(),
      () => setSelectedIndex(0),
    ),
  );

  // Scroll selected item into view
  createEffect(() => {
    const idx = selectedIndex();
    const container = listRef;
    if (!container) {
      return;
    }

    const items = container.querySelectorAll('[data-command-item]');
    const item = items[idx];
    if (item) {
      item.scrollIntoView({ block: 'nearest' });
    }
  });

  // Dialog behavior: escape key, scroll lock, backdrop click
  const { handleBackdropClick } = useDialogState({
    open: isOpen,
    onClose: () => setOpen(false),
  });

  const handleSelect = (item: ItemType) => {
    if (item.disabled) {
      return;
    }
    setOpen(false);
    props.onSelect(item);
  };

  const handleInputKeyDown = (e: KeyboardEvent) => {
    const results = flatResults();
    const idx = selectedIndex();

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(Math.min(idx + 1, results.length - 1));
        setMouseEnabled(false);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(Math.max(idx - 1, 0));
        setMouseEnabled(false);
        break;
      case 'Enter':
        e.preventDefault();
        if (results[idx]) {
          handleSelect(results[idx].item);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setOpen(false);
        break;
    }
  };

  const handleMouseMove = () => {
    setMouseEnabled(true);
  };

  return (
    <Show when={isOpen()}>
      <PortalWithDarkMode>
        <div
          class={`fixed inset-0 z-50 flex items-start justify-center pt-[15vh] bg-black/20 dark:bg-black/40 backdrop-blur-md ${BACKDROP_ENTER}`}
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
        >
          <div
            class={`w-full max-w-xl mx-4 glass-card rounded-2xl shadow-2xl overflow-hidden ${COMMAND_PALETTE_PANEL_ENTER} ${props.class ?? ''}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search input */}
            <div class="flex items-center gap-3 px-4 py-3 border-b border-surface-200 dark:border-white/10">
              <SearchIcon />
              <input
                ref={inputRef}
                type="text"
                class="flex-1 bg-transparent text-surface-900 dark:text-white placeholder-surface-400 outline-none text-sm"
                placeholder={placeholder()}
                value={query()}
                onInput={(e) => setQuery(e.currentTarget.value)}
                onKeyDown={handleInputKeyDown}
              />
              <Kbd>Esc</Kbd>
            </div>

            {/* Results */}
            <div
              ref={listRef}
              class="max-h-80 overflow-y-auto scrollbar-thin"
              onMouseMove={handleMouseMove}
            >
              <Show
                when={flatResults().length > 0}
                fallback={
                  <div class="px-4 py-8 text-center text-sm text-surface-500 dark:text-surface-400">
                    {emptyText()}
                  </div>
                }
              >
                {/* Ungrouped items */}
                <For each={groupedResults().noGroup}>
                  {(result, index) => (
                    <div data-command-item>
                      <CommandPaletteItem
                        item={result.item}
                        selected={selectedIndex() === index()}
                        isRecent={
                          'isRecent' in result
                            ? (result as { isRecent?: boolean }).isRecent
                            : false
                        }
                        labelMatches={result.labelMatches}
                        descriptionMatches={result.descriptionMatches}
                        onClick={() => handleSelect(result.item)}
                        onMouseEnter={() =>
                          mouseEnabled() && setSelectedIndex(index())
                        }
                      />
                    </div>
                  )}
                </For>

                {/* Grouped items */}
                <For each={Array.from(groupedResults().groups.entries())}>
                  {([groupName, results]) => (
                    <>
                      <div class="px-4 py-2 text-xs font-semibold text-surface-500 dark:text-surface-400 uppercase tracking-wider bg-surface-50 dark:bg-white/5">
                        {groupName}
                      </div>
                      <For each={results}>
                        {(result, idx) => {
                          const globalIndex = () => {
                            // Calculate global index for this item
                            let offset = groupedResults().noGroup.length;
                            for (const [
                              name,
                              items,
                            ] of groupedResults().groups.entries()) {
                              if (name === groupName) {
                                break;
                              }
                              offset += items.length;
                            }
                            return offset + idx();
                          };
                          return (
                            <div data-command-item>
                              <CommandPaletteItem
                                item={result.item}
                                selected={selectedIndex() === globalIndex()}
                                labelMatches={result.labelMatches}
                                descriptionMatches={result.descriptionMatches}
                                onClick={() => handleSelect(result.item)}
                                onMouseEnter={() =>
                                  mouseEnabled() &&
                                  setSelectedIndex(globalIndex())
                                }
                              />
                            </div>
                          );
                        }}
                      </For>
                    </>
                  )}
                </For>
              </Show>
            </div>

            {/* Footer */}
            <Show
              when={props.footer}
              fallback={
                <div class="flex items-center justify-between px-4 py-2 border-t border-surface-200 dark:border-white/10 text-xs text-surface-500 dark:text-surface-400">
                  <div class="flex items-center gap-3">
                    <span class="flex items-center gap-1">
                      <Kbd>↑</Kbd>
                      <Kbd>↓</Kbd>
                      <span>navigate</span>
                    </span>
                    <span class="flex items-center gap-1">
                      <Kbd>↵</Kbd>
                      <span>select</span>
                    </span>
                  </div>
                </div>
              }
            >
              {props.footer}
            </Show>
          </div>
        </div>
      </PortalWithDarkMode>
    </Show>
  );
};
