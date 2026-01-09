import type { BaseComponentProps } from '../../types';

export interface MarkdownProps extends BaseComponentProps {
  /** The markdown content to render */
  content: string | undefined;
}
