import { Card, Button } from 'glass-ui-solid';
import { A } from '@solidjs/router';
import { navigation } from '../config/navigation';
import { For } from 'solid-js';

export default function Home() {
  return (
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-bold text-surface-900 dark:text-white mb-2">
          Glass UI
        </h1>
        <p class="text-lg text-surface-600 dark:text-surface-400">
          iOS 26-inspired glassmorphism UI components for SolidJS.
        </p>
      </div>

      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <For each={navigation}>
          {(group) => (
            <Card class="p-4">
              <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-3">
                {group.label}
              </h2>
              <div class="flex flex-wrap gap-2">
                <For each={group.items}>
                  {(item) => (
                    <A href={item.path}>
                      <Button variant="ghost" size="sm">
                        {item.label}
                      </Button>
                    </A>
                  )}
                </For>
              </div>
            </Card>
          )}
        </For>
      </div>
    </div>
  );
}
