import type { Component } from 'solid-js';
import type { ErrorDisplayProps } from './types';

export const ErrorDisplay: Component<ErrorDisplayProps> = (props) => (
  <div
    class={`mt-4 md:mt-6 p-3 md:p-4 glass-card rounded-xl border-error-200/30 dark:border-error-800/20 shadow-lg shadow-error-500/5 ${props.class ?? ''}`}
  >
    <div class="flex items-start gap-3">
      <div class="flex-shrink-0 w-9 h-9 rounded-xl bg-error-500/15 dark:bg-error-500/20 flex items-center justify-center">
        <svg
          class="w-5 h-5 text-error-600 dark:text-error-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
      <div>
        <h4 class="text-base font-bold text-error-800 dark:text-error-200">
          {props.title ?? 'Request Failed'}
        </h4>
        <p class="text-sm text-error-600 dark:text-error-400 mt-1 leading-relaxed">
          {props.message}
        </p>
      </div>
    </div>
  </div>
);
