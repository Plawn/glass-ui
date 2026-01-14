import type { JSX } from 'solid-js';

export interface CollapsibleProps {
  /** Whether the collapsible is open (controlled mode) */
  open?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Whether the collapsible is open by default (uncontrolled mode) */
  defaultOpen?: boolean;
  /** The trigger element that toggles the collapsible */
  trigger: JSX.Element;
  /** The content to show/hide */
  children: JSX.Element;
  /** Whether the collapsible is disabled */
  disabled?: boolean;
  /** Additional CSS classes for the container */
  class?: string;
}
