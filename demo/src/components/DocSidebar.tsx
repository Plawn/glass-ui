import { A, useLocation } from '@solidjs/router';
import { For, createSignal } from 'solid-js';
import { type NavGroup, navigation } from '../config/navigation';

function NavGroupComponent(props: { group: NavGroup; defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = createSignal(props.defaultOpen ?? true);
  const location = useLocation();

  return (
    <div class="mb-4">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen())}
        class="w-full flex items-center justify-between px-4 py-2 text-[11px] font-bold uppercase tracking-[0.1em] text-surface-400 dark:text-surface-500 hover:text-surface-600 dark:hover:text-surface-300 transition-colors"
      >
        <span>{props.group.label}</span>
        <svg
          class={`w-3 h-3 transition-transform duration-300 ${isOpen() ? 'rotate-90' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2.5"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      <div
        class={`mt-1 space-y-1 transition-all duration-300 ease-in-out ${
          isOpen()
            ? 'max-h-[1000px] opacity-100'
            : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <For each={props.group.items}>
          {(item) => (
            <A
              href={item.path}
              activeClass="active"
              class="glass-nav-item block mx-1"
            >
              {item.label}
            </A>
          )}
        </For>
      </div>
    </div>
  );
}

export default function DocSidebar() {
  return (
    <nav class="w-60 shrink-0">
      <div class="sticky top-24 pb-12">
        <div class="px-1 mb-6">
          <A
            href="/"
            activeClass="active"
            class="glass-nav-item block font-semibold"
            end
          >
            Overview
          </A>
        </div>

        <For each={navigation}>
          {(group) => <NavGroupComponent group={group} />}
        </For>
      </div>
    </nav>
  );
}
