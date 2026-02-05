import clsx from 'clsx';
import { type JSX, createEffect, onCleanup, splitProps } from 'solid-js';
import { useLiquidGlassOptional } from './LiquidGlassContext';
import type {
  LensOptions,
  LiquidGLLensInstance,
  LiquidSurfaceProps,
} from './types';

/**
 * A surface component that renders with the LiquidGlass effect.
 * Must be used within a LiquidGlassProvider.
 *
 * If used outside a provider or when WebGL is not supported,
 * falls back to CSS backdrop-filter blur.
 *
 * @example
 * ```tsx
 * <LiquidSurface class="p-6 rounded-2xl" frost={5} tilt>
 *   <h1>Content on glass</h1>
 * </LiquidSurface>
 * ```
 */
export function LiquidSurface(props: LiquidSurfaceProps): JSX.Element {
  const [local, surfaceOptions, divProps] = splitProps(
    props,
    ['children', 'class', 'ref'],
    [
      'refraction',
      'bevelDepth',
      'bevelWidth',
      'frost',
      'shadow',
      'specular',
      'reveal',
      'tilt',
      'tiltFactor',
      'magnify',
      'onInit',
    ],
  );

  const context = useLiquidGlassOptional();
  let elementRef: HTMLDivElement | undefined;
  let lensRef: LiquidGLLensInstance | null = null;

  const setRef = (el: HTMLDivElement) => {
    elementRef = el;
    if (typeof local.ref === 'function') {
      local.ref(el);
    }
  };

  createEffect(() => {
    if (!context || !elementRef) {
      return;
    }

    const renderer = context.renderer();
    if (!renderer) {
      return;
    }

    // Merge options with defaults from provider
    const defaults = context.defaultOptions;
    const options: LensOptions = {
      refraction: surfaceOptions.refraction ?? defaults.refraction ?? 0.01,
      bevelDepth: surfaceOptions.bevelDepth ?? defaults.bevelDepth ?? 0.08,
      bevelWidth: surfaceOptions.bevelWidth ?? defaults.bevelWidth ?? 0.15,
      frost: surfaceOptions.frost ?? defaults.frost ?? 0,
      shadow: surfaceOptions.shadow ?? defaults.shadow ?? true,
      specular: surfaceOptions.specular ?? defaults.specular ?? true,
      reveal: surfaceOptions.reveal ?? defaults.reveal ?? 'fade',
      tilt: surfaceOptions.tilt ?? defaults.tilt ?? false,
      tiltFactor: surfaceOptions.tiltFactor ?? defaults.tiltFactor ?? 5,
      magnify: surfaceOptions.magnify ?? defaults.magnify ?? 1,
      on: {
        init: surfaceOptions.onInit,
      },
    };

    // Add lens to renderer
    lensRef = renderer.addLens(elementRef, options);

    onCleanup(() => {
      if (lensRef && renderer) {
        renderer.removeLens(lensRef);
        lensRef = null;
      }
    });
  });

  // Fallback styles for when WebGL is not available
  const fallbackStyles = (): JSX.CSSProperties | undefined => {
    if (context?.isSupported()) {
      return undefined;
    }

    return {
      background: 'rgba(255, 255, 255, 0.07)',
      'backdrop-filter': `blur(${surfaceOptions.frost ?? 12}px)`,
      '-webkit-backdrop-filter': `blur(${surfaceOptions.frost ?? 12}px)`,
    };
  };

  return (
    <div
      {...divProps}
      ref={setRef}
      class={clsx('liquid-glass-surface', local.class)}
      style={fallbackStyles()}
      data-liquid-glass
    >
      {/* Content wrapper - must be above WebGL canvas */}
      <div
        class="relative"
        style={{
          'pointer-events': 'auto',
          position: 'relative',
          'z-index': '100',
        }}
      >
        {local.children}
      </div>
    </div>
  );
}
