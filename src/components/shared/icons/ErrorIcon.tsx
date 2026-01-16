import { createIcon } from './createIcon';

/** Error icon - circle with exclamation mark */
export const ErrorIcon = createIcon({
  path: (
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  ),
});
