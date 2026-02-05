import type { Accessor, JSX } from 'solid-js';

/** Options for the LiquidGL renderer */
export interface LiquidGlassOptions {
  /** CSS selector for the snapshot source element */
  snapshot?: string;
  /** Resolution multiplier for the snapshot (0.1-3.0) */
  resolution?: number;
  /** Default refraction intensity (0-1) */
  refraction?: number;
  /** Default bevel depth (0-1) */
  bevelDepth?: number;
  /** Default bevel width (0-1) */
  bevelWidth?: number;
  /** Default frost blur in pixels */
  frost?: number;
  /** Enable drop shadows by default */
  shadow?: boolean;
  /** Enable specular highlights by default */
  specular?: boolean;
  /** Reveal animation type */
  reveal?: 'fade' | 'none';
  /** Enable 3D tilt effect by default */
  tilt?: boolean;
  /** Tilt intensity factor */
  tiltFactor?: number;
  /** Magnification factor */
  magnify?: number;
}

/** Options for individual LiquidSurface components */
export interface LiquidSurfaceOptions {
  /** Refraction intensity (0-1) */
  refraction?: number;
  /** Bevel depth (0-1) */
  bevelDepth?: number;
  /** Bevel width (0-1) */
  bevelWidth?: number;
  /** Frost blur in pixels */
  frost?: number;
  /** Enable drop shadow */
  shadow?: boolean;
  /** Enable specular highlights */
  specular?: boolean;
  /** Reveal animation type */
  reveal?: 'fade' | 'none';
  /** Enable 3D tilt effect on hover */
  tilt?: boolean;
  /** Tilt intensity factor */
  tiltFactor?: number;
  /** Magnification factor */
  magnify?: number;
  /** Callback when lens is initialized */
  onInit?: (lens: LiquidGLLensInstance) => void;
}

/** Props for LiquidGlassProvider */
export interface LiquidGlassProviderProps extends LiquidGlassOptions {
  children: JSX.Element;
  /** Disable the effect (useful for SSR or fallback) */
  disabled?: boolean;
}

/** Props for LiquidSurface */
export interface LiquidSurfaceProps
  extends LiquidSurfaceOptions,
    Omit<JSX.HTMLAttributes<HTMLDivElement>, 'children'> {
  children?: JSX.Element;
  /** Additional CSS classes */
  class?: string;
  /** Ref callback */
  ref?: (el: HTMLDivElement) => void;
}

/** Internal lens options passed to the renderer */
export interface LensOptions {
  refraction: number;
  bevelDepth: number;
  bevelWidth: number;
  frost: number;
  shadow: boolean;
  specular: boolean;
  reveal: 'fade' | 'none';
  tilt: boolean;
  tiltFactor: number;
  magnify: number;
  on: {
    init?: (lens: LiquidGLLensInstance) => void;
  };
}

/** Public interface for a lens instance */
export interface LiquidGLLensInstance {
  /** Set tilt enabled/disabled */
  setTilt: (enabled: boolean) => void;
  /** Set shadow enabled/disabled */
  setShadow: (enabled: boolean) => void;
  /** Update metrics (position, size) */
  updateMetrics: () => void;
  /** Current tilt X rotation */
  tiltX: number;
  /** Current tilt Y rotation */
  tiltY: number;
  /** Lens options */
  options: LensOptions;
}

/** Public interface for the renderer */
export interface LiquidGLRendererInstance {
  /** Capture a new snapshot */
  captureSnapshot: () => Promise<boolean>;
  /** Register dynamic elements for live updates */
  addDynamicElement: (el: Element | string | NodeList | Element[]) => void;
  /** Add a lens to the renderer */
  addLens: (element: HTMLElement, options: LensOptions) => LiquidGLLensInstance;
  /** Remove a lens from the renderer */
  removeLens: (lens: LiquidGLLensInstance) => void;
  /** Render all lenses */
  render: () => void;
  /** Destroy the renderer */
  destroy: () => void;
}

/** Context value for LiquidGlass */
export interface LiquidGlassContextValue {
  /** The renderer instance (null if not initialized or disabled) */
  renderer: Accessor<LiquidGLRendererInstance | null>;
  /** Whether the effect is ready */
  isReady: Accessor<boolean>;
  /** Whether WebGL is supported */
  isSupported: Accessor<boolean>;
  /** Default options from provider */
  defaultOptions: LiquidGlassOptions;
  /** Refresh the snapshot */
  refresh: () => Promise<void>;
  /** Register a dynamic element */
  registerDynamic: (el: Element | string) => void;
}
