import type { JSX } from 'solid-js';
import type { ComponentSize, FormFieldSemanticProps } from '../../types';

/**
 * Props for the FileUpload component.
 *
 * Extends native `<div>` attributes so arbitrary `data-*`/`aria-*`/HTML
 * attributes are forwarded to the outer wrapper element.
 */
export interface FileUploadProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    FormFieldSemanticProps {
  /** Callback when files are added or removed */
  onFilesChange: (files: File[]) => void;
  /** Accepted file types (e.g., "image/*,.pdf") */
  accept?: string;
  /** Whether to allow multiple files */
  multiple?: boolean;
  /** Maximum file size in bytes */
  maxSize?: number;
  /** Maximum number of files allowed */
  maxFiles?: number;
  /** Description text (e.g., "PNG, JPG up to 10MB") */
  description?: string;
  /** HTML name attribute (forwarded to the hidden file input) */
  name?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Whether the field is disabled */
  disabled?: boolean;
  /**
   * Size variant controlling dropzone padding, icon, and text scale.
   * @default 'md'
   */
  size?: ComponentSize;
}
