import { For, createSignal } from 'solid-js';
import { A, useLocation } from '@solidjs/router';
import { navigation, type NavGroup } from '../config/navigation';

function NavGroupComponent(props: { group: NavGroup; defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = createSignal(props.defaultOpen ?? true);
  const location = useLocation();

  const isGroupActive = () =>
    props.group.items.some((item) => location.pathname === item.path);

  return (
    <div class="mb-2">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen())}
        class="w-full flex items-center justify-between px-2 py-1.5 text-sm font-semibold text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-800 rounded-md transition-colors"
      >
        <span>{props.group.label}</span>
        <svg
          class={`w-4 h-4 transition-transform ${isOpen() ? 'rotate-90' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {isOpen() && (
        <div class="mt-1 ml-2 space-y-0.5">
          <For each={props.group.items}>
            {(item) => (
              <A
                href={item.path}
                class={`block px-2 py-1 text-sm rounded-md transition-colors ${
                  location.pathname === item.path
                    ? 'bg-accent-500 text-white'
                    : 'text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800'
                }`}
              >
                {item.label}
              </A>
            )}
          </For>
        </div>
      )}
    </div>
  );
}

export default function DocSidebar() {
  return (
    <nav class="w-48 shrink-0">
      <div class="sticky top-20 space-y-1">
        <A
          href="/"
          class="block px-2 py-1.5 text-sm font-semibold text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-800 rounded-md transition-colors mb-4"
        >
          Home
        </A>

        <For each={navigation}>
          {(group) => <NavGroupComponent group={group} />}
        </For>
      </div>
    </nav>
  );
}
