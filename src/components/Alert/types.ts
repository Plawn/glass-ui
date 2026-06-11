import type { JSX } from 'solid-js';
import type { IconProps, StatusColor } from '../../types';

export interface AlertProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    IconProps {
  /** Type of alert, determines color styling */
  type: StatusColor;
  /** Optional title displayed prominently */
  title?: string;
  /** Alert content */
  children: JSX.Element;
  /** Callback when close button is clicked (shows close button when provided) */
  onClose?: () => void;
}

// Re-export shared types for convenience
export type { StatusColor as AlertType } from '../../types';
