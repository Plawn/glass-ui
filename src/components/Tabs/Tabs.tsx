import {
  type Component,
  For,
  Show,
  createEffect,
  createMemo,
  createSignal,
  on,
  onMount,
} from 'solid-js';
import { useControlled } from '../../hooks';
import { GAP_SIZES, ICON_SIZES, TAB_PADDING, TEXT_SIZES } from '../../constants';
import type { ComponentSize } from '../../types';
import type { TabsProps } from './types';

// =============================================================================
// STYLE CONSTANTS
// =============================================================================

const sizeStyles: Record<ComponentSize, { tab: string; icon: string; badge: string }> = {
  sm: {
    tab: `${TAB_PADDING.sm} ${TEXT_SIZES.sm} ${GAP_SIZES.sm}`,
    icon: ICON_SIZES.sm,
    badge: 'px-1.5 py-0.5 text-[0.625rem]',
  },
  md: {
    tab: `${TAB_PADDING.md} ${TEXT_SIZES.md} ${GAP_SIZES.md}`,
    icon: ICON_SIZES.md,
    badge: 'px-2 py-0.5 text-xs',
  },
  lg: {
    tab: `${TAB_PADDING.lg} ${TEXT_SIZES.lg} ${GAP_SIZES.lg}`,
    icon: ICON_SIZES.lg,
    badge: 'px-2 py-1 text-xs',
  },
};

// =============================================================================
// COMPONENT
// =============================================================================

export const Tabs: Component<TabsProps> = (props) => {
  // --- Refs for indicator animation ---
  let containerRef: HTMLDivElement | undefined;
  const buttonRefs: Map<string, HTMLButtonElement> = new Map();

  // --- Indicator state ---
  const [indicatorStyle, setIndicatorStyle] = createSignal({ x: 0, y: 0, width: 0, height: 0 });
  const [isInitialized, setIsInitialized] = createSignal(false);

  // --- Defaults ---
  const size = () => props.size ?? 'md';
  const orientation = () => props.orientation ?? 'horizontal';
  const fullWidth = () => props.fullWidth ?? false;
  const lazy = () => props.lazy ?? true;
  const keepMounted = () => props.keepMounted ?? false;

  const isVertical = () => orientation() === 'vertical';

  // --- Controlled/uncontrolled state management ---
  const [activeTab, setActiveTab] = useControlled({
    value: () => props.activeTab,
    defaultValue: props.defaultTab || props.items[0]?.id,
    onChange: props.onTabChange,
  });

  // Track which tabs have been visited (for lazy loading with keepMounted)
  const [visitedTabs, setVisitedTabs] = createSignal<Set<string>>(
    new Set([props.defaultTab || props.items[0]?.id]),
  );

  // --- Indicator animation ---
  const updateIndicator = () => {
    const activeButton = buttonRefs.get(activeTab());
    if (activeButton && containerRef) {
      const containerRect = containerRef.getBoundingClientRect();
      const buttonRect = activeButton.getBoundingClientRect();
      setIndicatorStyle({
        x: buttonRect.left - containerRect.left,
        y: buttonRect.top - containerRect.top,
        width: buttonRect.width,
        height: buttonRect.height,
      });
    }
  };

  onMount(() => {
    updateIndicator();
    requestAnimationFrame(() => setIsInitialized(true));
  });

  createEffect(
    on(
      () => activeTab(),
      () => {
        if (isInitialized()) {
          updateIndicator();
        }
      }
    )
  );

  const handleTabChange = (tabId: string) => {
    const tab = props.items.find((item) => item.id === tabId);
    if (tab?.disabled) return;

    setActiveTab(tabId);

    if (keepMounted()) {
      setVisitedTabs((prev) => new Set([...prev, tabId]));
    }
  };

  // --- Computed styles ---
  const sizeStyle = () => sizeStyles[size()];

  const getTabClass = (isActive: boolean, isDisabled: boolean) => {
    const base = `relative z-10 flex items-center font-medium transition-colors duration-200 whitespace-nowrap select-none outline-none focus-visible:ring-2 focus-visible:ring-accent-500/50 focus-visible:ring-offset-1 rounded-lg ${sizeStyle().tab}`;

    if (isDisabled) {
      return `${base} opacity-40 cursor-not-allowed`;
    }

    const state = isActive
      ? 'text-surface-900 dark:text-surface-100'
      : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-100 cursor-pointer';

    return `${base} ${state}`;
  };

  // --- Render helpers ---
  const shouldRenderContent = (tabId: string) => {
    if (!lazy()) return true;
    if (keepMounted()) return visitedTabs().has(tabId);
    return activeTab() === tabId;
  };

  const indicatorCssStyle = createMemo(() => {
    const style = indicatorStyle();
    return {
      left: `${style.x}px`,
      top: `${style.y}px`,
      width: `${style.width}px`,
      height: `${style.height}px`,
      'transition-timing-function': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    };
  });

  return (
    <div class={`w-full flex ${isVertical() ? 'flex-row gap-4' : 'flex-col'} ${props.class ?? ''}`}>
      {/* Tab List - Segmented Control Style */}
      <div
        ref={containerRef}
        class={`relative flex gap-0.5 p-1 bg-black/5 dark:bg-white/10 rounded-xl ${
          isVertical() ? 'flex-col shrink-0 h-fit' : 'flex-row items-center'
        } ${fullWidth() && !isVertical() ? 'w-full' : 'w-fit'} ${props.tabListClass ?? ''}`}
        role="tablist"
        aria-orientation={orientation()}
      >
        {/* Sliding indicator */}
        <div
          class={`absolute rounded-lg bg-white dark:bg-white/15 shadow-sm dark:shadow-none ${
            isInitialized() ? 'transition-all duration-300' : ''
          }`}
          style={indicatorCssStyle()}
        />

        <For each={props.items}>
          {(item) => {
            const isActive = () => activeTab() === item.id;
            const isDisabled = () => item.disabled ?? false;

            return (
              <button
                ref={(el) => buttonRefs.set(item.id, el)}
                type="button"
                onClick={() => handleTabChange(item.id)}
                class={`${getTabClass(isActive(), isDisabled())} ${fullWidth() && !isVertical() ? 'flex-1 justify-center' : ''}`}
                aria-selected={isActive()}
                aria-disabled={isDisabled()}
                disabled={isDisabled()}
                role="tab"
                tabIndex={isActive() ? 0 : -1}
              >
                <Show when={item.icon}>
                  <span class={sizeStyle().icon}>{item.icon}</span>
                </Show>
                <span>{item.label}</span>
                <Show when={item.badge !== undefined}>
                  <span
                    class={`rounded-full font-medium tabular-nums ${sizeStyle().badge} ${
                      isActive()
                        ? 'bg-accent-500/15 text-accent-600 dark:text-accent-400'
                        : 'bg-black/5 dark:bg-white/10 text-surface-500 dark:text-surface-400'
                    }`}
                  >
                    {item.badge}
                  </span>
                </Show>
              </button>
            );
          }}
        </For>
      </div>

      {/* Tab Content */}
      <div class={`${isVertical() ? 'flex-1 min-w-0' : 'mt-4'} ${props.contentClass ?? ''}`}>
        <For each={props.items}>
          {(item) => (
            <Show when={shouldRenderContent(item.id)}>
              <div
                role="tabpanel"
                class={`${activeTab() === item.id ? 'animate-in fade-in slide-in-from-bottom-2 duration-200' : 'hidden'}`}
                aria-hidden={activeTab() !== item.id}
              >
                {item.content}
              </div>
            </Show>
          )}
        </For>
      </div>
    </div>
  );
};
