import type { BaseComponentProps, DisableableProps } from '../../types';

/**
 * Props for the FileUpload component
 */
export interface FileUploadProps extends BaseComponentProps, DisableableProps {
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
  /** Error message to display */
  error?: string;
  /** Label text above the upload zone */
  label?: string;
  /** Description text (e.g., "PNG, JPG up to 10MB") */
  description?: string;
}
