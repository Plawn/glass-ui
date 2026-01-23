// Shared components barrel export
export { CloseButton } from './CloseButton';
export type { CloseButtonProps, CloseButtonSize } from './CloseButton';

// Notification store factory
export {
  createNotificationStore,
  createTypedNotificationStore,
} from './createNotificationStore';
export type {
  BaseNotification,
  TypedNotification,
  NotificationStore,
  CreateNotificationStoreOptions,
  NotificationStoreAPI,
  TypedNotificationAPI,
} from './createNotificationStore';

export { OverlayContent } from './OverlayContent';
export type { OverlayContentProps } from './OverlayContent';

export { PortalWithDarkMode } from './PortalWithDarkMode';
export type { PortalWithDarkModeProps } from './PortalWithDarkMode';

export { PortalOverlay } from './PortalOverlay';
export type {
  PortalOverlayProps,
  PortalOverlayRenderProps,
  PortalOverlayChildProps,
} from './PortalOverlay';

// Icon components
export * from './icons';
