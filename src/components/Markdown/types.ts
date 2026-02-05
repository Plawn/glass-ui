import type { JSX } from 'solid-js';
import type { BaseComponentProps } from '../../types';

/**
 * Context passed to code block action handlers
 */
export interface CodeBlockActionContext {
  /** The code content of the block */
  code: string;
  /** The language identifier (e.g., 'typescript', 'python') */
  language: string | undefined;
}

/**
 * Definition for a custom code block action button
 */
export interface CodeBlockAction {
  /** Unique identifier for the action */
  id: string;
  /** Button label (used for accessibility) */
  label: string;
  /** Icon to display in the button */
  icon: JSX.Element;
  /** Callback when the action is triggered */
  onClick: (context: CodeBlockActionContext) => void | Promise<void>;
}

export interface MarkdownProps extends BaseComponentProps {
  /** The markdown content to render */
  content: string | undefined;
  /** Custom actions to display on code blocks */
  codeBlockActions?: CodeBlockAction[];
}
