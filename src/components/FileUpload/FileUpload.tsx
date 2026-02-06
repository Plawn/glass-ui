import clsx from 'clsx';
import { type Component, For, Show, createSignal } from 'solid-js';
import { TrashIcon } from '../shared';
import type { FileUploadProps } from './types';

/**
 * Format file size to human readable string
 */
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) {
    return '0 Bytes';
  }
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${Number.parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`;
};

/**
 * A glassmorphic file upload component with drag and drop support.
 *
 * @example
 * ```tsx
 * <FileUpload
 *   onFilesChange={setFiles}
 *   accept="image/*,.pdf"
 *   multiple
 *   maxSize={10 * 1024 * 1024}
 *   label="Upload files"
 *   description="PNG, JPG up to 10MB"
 * />
 * ```
 */
export const FileUpload: Component<FileUploadProps> = (props) => {
  const [isDragOver, setIsDragOver] = createSignal(false);
  const [files, setFiles] = createSignal<File[]>([]);
  const [validationError, setValidationError] = createSignal<string | null>(
    null,
  );
  let inputRef: HTMLInputElement | undefined;

  const isDisabled = () => props.disabled ?? false;
  const multiple = () => props.multiple ?? false;
  const maxFiles = () => props.maxFiles ?? Number.POSITIVE_INFINITY;
  const maxSize = () => props.maxSize ?? Number.POSITIVE_INFINITY;

  const validateFiles = (
    newFiles: File[],
  ): { valid: File[]; error: string | null } => {
    const currentFiles = files();
    const allFiles = [...currentFiles, ...newFiles];

    // Check max files limit
    if (allFiles.length > maxFiles()) {
      return {
        valid: [],
        error: `Maximum ${maxFiles()} file${maxFiles() === 1 ? '' : 's'} allowed`,
      };
    }

    // Check file sizes
    const oversizedFiles = newFiles.filter((f) => f.size > maxSize());
    if (oversizedFiles.length > 0) {
      return {
        valid: [],
        error: `File${oversizedFiles.length > 1 ? 's' : ''} exceed${oversizedFiles.length === 1 ? 's' : ''} maximum size of ${formatFileSize(maxSize())}`,
      };
    }

    return { valid: newFiles, error: null };
  };

  const addFiles = (newFiles: File[]) => {
    if (isDisabled()) {
      return;
    }

    const filesToAdd = multiple() ? newFiles : newFiles.slice(0, 1);
    const { valid, error } = validateFiles(filesToAdd);

    if (error) {
      setValidationError(error);
      return;
    }

    setValidationError(null);
    const updatedFiles = multiple() ? [...files(), ...valid] : valid;
    setFiles(updatedFiles);
    props.onFilesChange(updatedFiles);
  };

  const removeFile = (index: number) => {
    if (isDisabled()) {
      return;
    }

    const updatedFiles = files().filter((_, i) => i !== index);
    setFiles(updatedFiles);
    setValidationError(null);
    props.onFilesChange(updatedFiles);
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDisabled()) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    if (isDisabled() || !e.dataTransfer?.files) {
      return;
    }

    const droppedFiles = Array.from(e.dataTransfer.files);
    addFiles(droppedFiles);
  };

  const handleClick = () => {
    if (!isDisabled()) {
      inputRef?.click();
    }
  };

  const handleInputChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target.files) {
      const selectedFiles = Array.from(target.files);
      addFiles(selectedFiles);
      // Reset input to allow selecting same file again
      target.value = '';
    }
  };

  const displayError = () => props.error ?? validationError();

  return (
    <div class={clsx('w-full', props.class)} style={props.style}>
      <Show when={props.label}>
        <label class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">
          {props.label}
        </label>
      </Show>

      {/* Drop zone */}
      <div
        class={clsx(
          'relative rounded-xl border-2 border-dashed transition-all duration-200 cursor-pointer',
          'bg-surface-50/50 dark:bg-surface-800/30',
          'backdrop-blur-sm',
          {
            'border-surface-300 dark:border-surface-600 hover:border-primary-400 dark:hover:border-primary-500':
              !isDragOver() && !displayError() && !isDisabled(),
            'border-primary-500 dark:border-primary-400 bg-primary-50/50 dark:bg-primary-900/20':
              isDragOver() && !isDisabled(),
            'border-error-500 dark:border-error-400':
              displayError() && !isDisabled(),
            'border-surface-200 dark:border-surface-700 opacity-50 cursor-not-allowed':
              isDisabled(),
          },
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        role="button"
        tabindex={isDisabled() ? -1 : 0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
          }
        }}
        aria-disabled={isDisabled()}
      >
        <input
          ref={inputRef}
          type="file"
          class="hidden"
          accept={props.accept}
          multiple={multiple()}
          disabled={isDisabled()}
          onChange={handleInputChange}
        />

        <div class="flex flex-col items-center justify-center px-6 py-8">
          {/* Upload icon */}
          <div
            class={clsx(
              'w-12 h-12 rounded-full flex items-center justify-center mb-3',
              'bg-surface-100 dark:bg-surface-700/50',
              {
                'bg-primary-100 dark:bg-primary-900/50': isDragOver(),
              },
            )}
          >
            <svg
              class={clsx('w-6 h-6', {
                'text-surface-400 dark:text-surface-500': !isDragOver(),
                'text-primary-500 dark:text-primary-400': isDragOver(),
              })}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </div>

          <p class="text-sm text-surface-700 dark:text-surface-300 mb-1">
            <span class="font-medium text-primary-600 dark:text-primary-400">
              Click to upload
            </span>{' '}
            or drag and drop
          </p>

          <Show when={props.description}>
            <p class="text-xs text-surface-500 dark:text-surface-400">
              {props.description}
            </p>
          </Show>
        </div>
      </div>

      {/* Error message */}
      <Show when={displayError()}>
        <p class="mt-1.5 text-sm text-error-500 dark:text-error-400">
          {displayError()}
        </p>
      </Show>

      {/* File list */}
      <Show when={files().length > 0}>
        <ul class="mt-3 space-y-2">
          <For each={files()}>
            {(file, index) => (
              <li
                class={clsx(
                  'flex items-center justify-between px-3 py-2 rounded-lg',
                  'bg-surface-100/80 dark:bg-surface-800/50',
                  'border border-surface-200 dark:border-surface-700',
                )}
              >
                <div class="flex items-center gap-3 min-w-0">
                  {/* File icon */}
                  <div class="flex-shrink-0 w-8 h-8 rounded-md bg-surface-200/80 dark:bg-surface-700/50 flex items-center justify-center">
                    <svg
                      class="w-4 h-4 text-surface-500 dark:text-surface-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>

                  <div class="min-w-0">
                    <p class="text-sm font-medium text-surface-700 dark:text-surface-300 truncate">
                      {file.name}
                    </p>
                    <p class="text-xs text-surface-500 dark:text-surface-400">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  class={clsx(
                    'flex-shrink-0 p-1.5 rounded-md transition-colors',
                    'text-surface-400 hover:text-error-500 dark:text-surface-500 dark:hover:text-error-400',
                    'hover:bg-error-50 dark:hover:bg-error-900/20',
                    { 'opacity-50 cursor-not-allowed': isDisabled() },
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index());
                  }}
                  disabled={isDisabled()}
                  aria-label={`Remove ${file.name}`}
                >
                  <TrashIcon size={16} />
                </button>
              </li>
            )}
          </For>
        </ul>
      </Show>
    </div>
  );
};
