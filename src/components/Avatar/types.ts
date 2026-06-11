import type { JSX } from 'solid-js';
import type { AvatarSize } from '../../types';

export interface AvatarProps extends JSX.HTMLAttributes<HTMLDivElement> {
  /** Image source URL */
  src?: string;
  /** Name for generating initials fallback */
  name: string;
  /** Avatar size */
  size?: AvatarSize;
  /** Custom fallback background color */
  fallbackColor?: string;
  /** Alt text for the image */
  alt?: string;
}

// Re-export shared types for convenience
export type { AvatarSize } from '../../types';
