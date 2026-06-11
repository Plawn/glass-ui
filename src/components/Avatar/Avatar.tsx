import type { Component } from 'solid-js';
import { Show, createMemo, createSignal, splitProps } from 'solid-js';
import type { AvatarProps, AvatarSize } from './types';

const sizeStyles: Record<AvatarSize, { container: string; text: string }> = {
  xs: { container: 'w-6 h-6', text: 'text-[0.5rem]' },
  sm: { container: 'w-8 h-8', text: 'text-xs' },
  md: { container: 'w-10 h-10', text: 'text-sm' },
  lg: { container: 'w-12 h-12', text: 'text-base' },
  xl: { container: 'w-16 h-16', text: 'text-lg' },
};

// Color palette for fallback backgrounds
const fallbackColors = [
  'bg-blue-500',
  'bg-emerald-500',
  'bg-violet-500',
  'bg-amber-500',
  'bg-rose-500',
  'bg-cyan-500',
  'bg-fuchsia-500',
  'bg-lime-500',
];

// Generate a consistent color based on name
const getColorFromName = (name: string): string => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % fallbackColors.length;
  return fallbackColors[index];
};

// Generate initials from name
const getInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

export const Avatar: Component<AvatarProps> = (props) => {
  const [local, rest] = splitProps(props, [
    'src',
    'name',
    'size',
    'fallbackColor',
    'alt',
    'class',
  ]);
  const [imageError, setImageError] = createSignal(false);
  const size = () => local.size ?? 'md';
  const styles = () => sizeStyles[size()];

  const initials = createMemo(() => getInitials(local.name));
  const fallbackBg = createMemo(
    () => local.fallbackColor ?? getColorFromName(local.name),
  );

  const showImage = () => local.src && !imageError();

  return (
    <div
      {...rest}
      class={`relative inline-flex items-center justify-center rounded-full overflow-hidden border-2 border-white/30 dark:border-white/10 shadow-sm ${styles().container} ${local.class ?? ''}`}
    >
      <Show
        when={showImage()}
        fallback={
          <div
            class={`w-full h-full flex items-center justify-center font-semibold text-white ${fallbackBg()}`}
            role="img"
            aria-label={local.name}
          >
            <span class={styles().text}>{initials()}</span>
          </div>
        }
      >
        <img
          src={local.src}
          alt={local.alt ?? local.name}
          class="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
      </Show>
    </div>
  );
};
