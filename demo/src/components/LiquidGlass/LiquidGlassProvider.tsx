import { type JSX, createEffect, createSignal, onCleanup } from 'solid-js';
import { LiquidGlassContext } from './LiquidGlassContext';
import {
  LiquidGLRenderer,
  isWebGLSupported,
  loadHtml2Canvas,
} from './liquidGL';
import type {
  LiquidGLRendererInstance,
  LiquidGlassContextValue,
  LiquidGlassProviderProps,
} from './types';

/**
 * Provider component that initializes the LiquidGlass WebGL renderer.
 * Wrap your app or a section of your app with this to enable LiquidGlass effects.
 *
 * @example
 * ```tsx
 * <LiquidGlassProvider resolution={2} refraction={0.01}>
 *   <App />
 * </LiquidGlassProvider>
 * ```
 */
export function LiquidGlassProvider(
  props: LiquidGlassProviderProps,
): JSX.Element {
  const [renderer, setRenderer] = createSignal<LiquidGLRendererInstance | null>(
    null,
  );
  const [isReady, setIsReady] = createSignal(false);
  const [isSupported, setIsSupported] = createSignal(true);

  // Check if we're in a browser environment
  const isBrowser = typeof window !== 'undefined';

  createEffect(() => {
    if (!isBrowser || props.disabled) {
      setIsSupported(false);
      return;
    }

    // Check WebGL support
    if (!isWebGLSupported()) {
      console.warn(
        'LiquidGlass: WebGL not supported, falling back to CSS effects',
      );
      setIsSupported(false);
      return;
    }

    setIsSupported(true);

    // Initialize the renderer
    const initRenderer = async () => {
      try {
        // Preload html2canvas
        await loadHtml2Canvas();

        const instance = new LiquidGLRenderer(
          props.snapshot ?? 'body',
          props.resolution ?? 2.0,
        );

        // Set renderer first so LiquidSurface components can register
        setRenderer(instance);

        // Wait for next frame to ensure DOM is painted
        await new Promise<void>((resolve) => {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              resolve();
            });
          });
        });

        // Capture initial snapshot after DOM is ready
        await instance.captureSnapshot();

        // Start the render loop
        instance.startRenderLoop();

        setIsReady(true);
      } catch (error) {
        console.error('LiquidGlass: Failed to initialize renderer', error);
        setIsSupported(false);
      }
    };

    // Delay initialization to ensure DOM is ready - use requestAnimationFrame
    let rafId: number;
    const startInit = () => {
      rafId = requestAnimationFrame(() => {
        initRenderer();
      });
    };
    const timeoutId = setTimeout(startInit, 50); // Small delay for initial render

    onCleanup(() => {
      clearTimeout(timeoutId);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      const currentRenderer = renderer();
      if (currentRenderer) {
        currentRenderer.destroy();
      }
    });
  });

  const defaultOptions = {
    snapshot: props.snapshot ?? 'body',
    resolution: props.resolution ?? 2.0,
    refraction: props.refraction ?? 0.01,
    bevelDepth: props.bevelDepth ?? 0.08,
    bevelWidth: props.bevelWidth ?? 0.15,
    frost: props.frost ?? 0,
    shadow: props.shadow ?? true,
    specular: props.specular ?? true,
    reveal: props.reveal ?? 'fade',
    tilt: props.tilt ?? false,
    tiltFactor: props.tiltFactor ?? 5,
    magnify: props.magnify ?? 1,
  };

  const contextValue: LiquidGlassContextValue = {
    renderer,
    isReady,
    isSupported,
    defaultOptions,
    refresh: async () => {
      const r = renderer();
      if (r) {
        await r.captureSnapshot();
      }
    },
    registerDynamic: (el: Element | string) => {
      const r = renderer();
      if (r) {
        r.addDynamicElement(el);
      }
    },
  };

  return (
    <LiquidGlassContext.Provider value={contextValue}>
      {props.children}
    </LiquidGlassContext.Provider>
  );
}
