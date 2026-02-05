/**
 * liquidGL – Ultra-light glassmorphism for the web
 * Adapted for ES modules from original by NaughtyDuk
 * Original: https://github.com/naughtyduk/liquidGL
 * License: MIT
 */

import type {
  LensOptions,
  LiquidGLLensInstance,
  LiquidGLRendererInstance,
} from './types';

// Global html2canvas reference
let html2canvasModule: typeof import('html2canvas').default | null = null;

/** Load html2canvas dynamically */
export async function loadHtml2Canvas(): Promise<void> {
  if (html2canvasModule) {
    return;
  }
  const module = await import('html2canvas');
  html2canvasModule = module.default;
  // Make it available globally for the liquidGL code
  (window as unknown as { html2canvas: typeof html2canvasModule }).html2canvas =
    html2canvasModule;
}

/* --------------------------------------------------
 *  Utilities
 * ------------------------------------------------*/
function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let t: ReturnType<typeof setTimeout>;
  return (...a: Parameters<T>) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...a), wait);
  };
}

function effectiveZ(el: HTMLElement): number {
  let node: HTMLElement | null = el;
  while (node && node !== document.body) {
    const style = window.getComputedStyle(node);
    if (style.position !== 'static' && style.zIndex !== 'auto') {
      const z = Number.parseInt(style.zIndex, 10);
      if (!Number.isNaN(z)) {
        return z;
      }
    }
    node = node.parentElement;
  }
  return 0;
}

/* --------------------------------------------------
 *  WebGL helpers
 * ------------------------------------------------*/
function compileShader(
  gl: WebGLRenderingContext,
  type: number,
  src: string,
): WebGLShader | null {
  const s = gl.createShader(type);
  if (!s) {
    return null;
  }
  gl.shaderSource(s, src.trim());
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.error('Shader error', gl.getShaderInfoLog(s));
    gl.deleteShader(s);
    return null;
  }
  return s;
}

function createProgram(
  gl: WebGLRenderingContext,
  vsSource: string,
  fsSource: string,
): WebGLProgram | null {
  const vs = compileShader(gl, gl.VERTEX_SHADER, vsSource);
  const fs = compileShader(gl, gl.FRAGMENT_SHADER, fsSource);
  if (!vs || !fs) {
    return null;
  }
  const p = gl.createProgram();
  if (!p) {
    return null;
  }
  gl.attachShader(p, vs);
  gl.attachShader(p, fs);
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
    console.error('Program link error', gl.getProgramInfoLog(p));
    return null;
  }
  return p;
}

/* --------------------------------------------------
 *  Shader sources
 * ------------------------------------------------*/
const VERTEX_SHADER = `
  attribute vec2 a_position;
  varying vec2 v_uv;
  void main(){
    v_uv = (a_position + 1.0) * 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision mediump float;
  varying vec2 v_uv;
  uniform sampler2D u_tex;
  uniform vec2  u_resolution;
  uniform vec2  u_textureResolution;
  uniform vec4  u_bounds;
  uniform float u_refraction;
  uniform float u_bevelDepth;
  uniform float u_bevelWidth;
  uniform float u_frost;
  uniform float u_radius;
  uniform float u_time;
  uniform bool  u_specular;
  uniform float u_revealProgress;
  uniform int   u_revealType;
  uniform float u_tiltX;
  uniform float u_tiltY;
  uniform float u_magnify;

  float udRoundBox( vec2 p, vec2 b, float r ) {
    return length(max(abs(p)-b+r,0.0))-r;
  }

  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  float edgeFactor(vec2 uv, float radius_px){
    vec2 p_px = (uv - 0.5) * u_resolution;
    vec2 b_px = 0.5 * u_resolution;
    float d = -udRoundBox(p_px, b_px, radius_px);
    float bevel_px = u_bevelWidth * min(u_resolution.x, u_resolution.y);
    return 1.0 - smoothstep(0.0, bevel_px, d);
  }

  void main(){
    vec2 p = v_uv - 0.5;
    p.x *= u_resolution.x / u_resolution.y;

    float edge = edgeFactor(v_uv, u_radius);
    float offsetAmt = (edge * u_refraction + pow(edge, 10.0) * u_bevelDepth);
    float centreBlend = smoothstep(0.15, 0.45, length(p));
    vec2 offset = normalize(p) * offsetAmt * centreBlend;

    float tiltRefractionScale = 0.05;
    vec2 tiltOffset = vec2(tan(radians(u_tiltY)), -tan(radians(u_tiltX))) * tiltRefractionScale;

    vec2 localUV = (v_uv - 0.5) / u_magnify + 0.5;
    vec2 flippedUV = vec2(localUV.x, 1.0 - localUV.y);
    vec2 mapped = u_bounds.xy + flippedUV * u_bounds.zw;
    vec2 refracted = mapped + offset - tiltOffset;

    float oob = max(max(-refracted.x, refracted.x - 1.0), max(-refracted.y, refracted.y - 1.0));
    float blend = 1.0 - smoothstep(0.0, 0.01, oob);
    vec2 sampleUV = mix(mapped, refracted, blend);

    vec4 baseCol = texture2D(u_tex, mapped);
    vec2 texel = 1.0 / u_textureResolution;
    vec4 refrCol;

    if (u_frost > 0.0) {
      float radius = u_frost * 4.0;
      vec4 sum = vec4(0.0);
      const int SAMPLES = 16;

      for (int i = 0; i < SAMPLES; i++) {
        float angle = random(v_uv + float(i)) * 6.283185;
        float dist = sqrt(random(v_uv - float(i))) * radius;
        vec2 off = vec2(cos(angle), sin(angle)) * texel * dist;
        sum += texture2D(u_tex, sampleUV + off);
      }
      refrCol = sum / float(SAMPLES);
    } else {
      refrCol = texture2D(u_tex, sampleUV);
      refrCol += texture2D(u_tex, sampleUV + vec2( texel.x, 0.0));
      refrCol += texture2D(u_tex, sampleUV + vec2(-texel.x, 0.0));
      refrCol += texture2D(u_tex, sampleUV + vec2(0.0,  texel.y));
      refrCol += texture2D(u_tex, sampleUV + vec2(0.0, -texel.y));
      refrCol /= 5.0;
    }

    if (refrCol.a < 0.1) {
      refrCol = baseCol;
    }

    vec4 final = refrCol;

    vec2 p_px = (v_uv - 0.5) * u_resolution;
    vec2 b_px = 0.5 * u_resolution;
    float dmask = udRoundBox(p_px, b_px, u_radius);
    float inShape = 1.0 - step(0.0, dmask);

    if (u_specular) {
      vec2 lp1 = vec2(sin(u_time*0.2), cos(u_time*0.3))*0.6 + 0.5;
      vec2 lp2 = vec2(sin(u_time*-0.4+1.5), cos(u_time*0.25-0.5))*0.6 + 0.5;
      float h = 0.0;
      h += smoothstep(0.4,0.0,distance(v_uv, lp1))*0.1;
      h += smoothstep(0.5,0.0,distance(v_uv, lp2))*0.08;
      final.rgb += h;
    }

    if (u_revealType == 1) {
      final.rgb *= u_revealProgress;
      final.a  *= u_revealProgress;
    }

    final.rgb *= inShape;
    final.a   *= inShape;

    gl_FragColor = final;
  }
`;

/* --------------------------------------------------
 *  Types
 * ------------------------------------------------*/
interface Uniforms {
  tex: WebGLUniformLocation | null;
  res: WebGLUniformLocation | null;
  textureResolution: WebGLUniformLocation | null;
  bounds: WebGLUniformLocation | null;
  refraction: WebGLUniformLocation | null;
  bevelDepth: WebGLUniformLocation | null;
  bevelWidth: WebGLUniformLocation | null;
  frost: WebGLUniformLocation | null;
  radius: WebGLUniformLocation | null;
  time: WebGLUniformLocation | null;
  specular: WebGLUniformLocation | null;
  revealProgress: WebGLUniformLocation | null;
  revealType: WebGLUniformLocation | null;
  tiltX: WebGLUniformLocation | null;
  tiltY: WebGLUniformLocation | null;
  magnify: WebGLUniformLocation | null;
}

/* --------------------------------------------------
 *  Renderer class
 * ------------------------------------------------*/
export class LiquidGLRenderer implements LiquidGLRendererInstance {
  canvas: HTMLCanvasElement;
  gl: WebGLRenderingContext;
  lenses: LiquidGLLens[] = [];
  texture: WebGLTexture | null = null;
  textureWidth = 0;
  textureHeight = 0;
  scaleFactor = 1;
  startTime = Date.now();
  snapshotTarget: HTMLElement;
  staticSnapshotCanvas: HTMLCanvasElement | null = null;

  private program: WebGLProgram | null = null;
  private u: Uniforms | null = null;
  private _capturing = false;
  private _isScrolling = false;
  private _scrollUpdateCounter = 0;
  private _snapshotResolution: number;
  private _pendingReveal: LiquidGLLens[] = [];
  private _rafId: number | null = null;
  private _videoNodes: HTMLVideoElement[] = [];
  private _tmpCanvas: HTMLCanvasElement;
  private _tmpCtx: CanvasRenderingContext2D | null;
  private _destroyed = false;
  private _resizeHandler: () => void;
  _revealAnimating = false;

  constructor(snapshotSelector: string, snapshotResolution = 2.0) {
    this.canvas = document.createElement('canvas');
    this.canvas.style.cssText =
      'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;';
    this.canvas.setAttribute('data-liquid-ignore', '');
    document.body.appendChild(this.canvas);

    const ctxAttribs: WebGLContextAttributes = {
      alpha: true,
      premultipliedAlpha: true,
      preserveDrawingBuffer: true,
    };
    this.gl = (this.canvas.getContext('webgl2', ctxAttribs) ||
      this.canvas.getContext('webgl', ctxAttribs) ||
      this.canvas.getContext(
        'experimental-webgl',
        ctxAttribs,
      )) as WebGLRenderingContext;

    if (!this.gl) {
      throw new Error('liquidGL: WebGL unavailable');
    }

    this._initGL();

    this.snapshotTarget =
      document.querySelector(snapshotSelector) || document.body;

    this._snapshotResolution = Math.max(0.1, Math.min(3.0, snapshotResolution));

    // Scroll detection
    let lastScrollY = window.scrollY;
    let scrollTimeout: ReturnType<typeof setTimeout>;
    const scrollCheck = () => {
      if (this._destroyed) {
        return;
      }
      if (window.scrollY !== lastScrollY) {
        this._isScrolling = true;
        lastScrollY = window.scrollY;
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          this._isScrolling = false;
        }, 200);
      }
      requestAnimationFrame(scrollCheck);
    };
    requestAnimationFrame(scrollCheck);

    // Resize handling
    this._resizeHandler = debounce(() => {
      if (this._capturing || this._isScrolling || this._destroyed) {
        return;
      }
      this._resizeCanvas();
      for (const l of this.lenses) {
        l.updateMetrics();
      }
      this.captureSnapshot();
    }, 250);
    window.addEventListener('resize', this._resizeHandler, { passive: true });

    // Temp canvas for video
    this._tmpCanvas = document.createElement('canvas');
    this._tmpCtx = this._tmpCanvas.getContext('2d');

    // Video nodes
    this._videoNodes = Array.from(
      this.snapshotTarget.querySelectorAll('video'),
    ).filter((v) => !this._isIgnored(v as HTMLElement)) as HTMLVideoElement[];

    this.canvas.style.opacity = '0';
    this._resizeCanvas();
  }

  private _initGL(): void {
    this.program = createProgram(this.gl, VERTEX_SHADER, FRAGMENT_SHADER);
    const gl = this.gl;
    if (!this.program) {
      throw new Error('liquidGL: Shader failed');
    }

    const posBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );

    const posLoc = gl.getAttribLocation(this.program, 'a_position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    this.u = {
      tex: gl.getUniformLocation(this.program, 'u_tex'),
      res: gl.getUniformLocation(this.program, 'u_resolution'),
      textureResolution: gl.getUniformLocation(
        this.program,
        'u_textureResolution',
      ),
      bounds: gl.getUniformLocation(this.program, 'u_bounds'),
      refraction: gl.getUniformLocation(this.program, 'u_refraction'),
      bevelDepth: gl.getUniformLocation(this.program, 'u_bevelDepth'),
      bevelWidth: gl.getUniformLocation(this.program, 'u_bevelWidth'),
      frost: gl.getUniformLocation(this.program, 'u_frost'),
      radius: gl.getUniformLocation(this.program, 'u_radius'),
      time: gl.getUniformLocation(this.program, 'u_time'),
      specular: gl.getUniformLocation(this.program, 'u_specular'),
      revealProgress: gl.getUniformLocation(this.program, 'u_revealProgress'),
      revealType: gl.getUniformLocation(this.program, 'u_revealType'),
      tiltX: gl.getUniformLocation(this.program, 'u_tiltX'),
      tiltY: gl.getUniformLocation(this.program, 'u_tiltY'),
      magnify: gl.getUniformLocation(this.program, 'u_magnify'),
    };
  }

  private _resizeCanvas(): void {
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    this.canvas.width = innerWidth * dpr;
    this.canvas.height = innerHeight * dpr;
    this.canvas.style.width = `${innerWidth}px`;
    this.canvas.style.height = `${innerHeight}px`;
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
  }

  async captureSnapshot(): Promise<boolean> {
    if (this._capturing || this._destroyed) {
      return false;
    }
    this._capturing = true;

    try {
      const fullW = this.snapshotTarget.scrollWidth;
      const fullH = this.snapshotTarget.scrollHeight;
      const maxTex = this.gl.getParameter(this.gl.MAX_TEXTURE_SIZE) || 8192;

      let scale = Math.min(
        this._snapshotResolution,
        maxTex / fullW,
        maxTex / fullH,
      );

      const isMobileSafari = /iPad|iPhone|iPod/.test(navigator.userAgent);
      if (isMobileSafari) {
        const MAX_MOBILE_DIM = 4096;
        const over = (Math.max(fullW, fullH) * scale) / MAX_MOBILE_DIM;
        if (over > 1) {
          scale = scale / over;
        }
      }
      this.scaleFactor = Math.max(0.1, scale);

      // Try native canvas capture first (faster, supports oklch)
      const nativeCapture = await this._captureWithDrawWindow(
        fullW,
        fullH,
        scale,
      );
      if (nativeCapture) {
        this._uploadTexture(nativeCapture);
        return true;
      }

      // Fallback to html2canvas if available
      if (html2canvasModule) {
        const prevVisibility = this.canvas.style.visibility;
        this.canvas.style.visibility = 'hidden';

        const lensElements = this.lenses
          .flatMap((lens) => [lens.el, lens._shadowEl])
          .filter(Boolean);

        const ignoreElementsFunc = (element: Element) => {
          if (!element || !(element instanceof HTMLElement)) {
            return false;
          }
          if (element === this.canvas || lensElements.includes(element)) {
            return true;
          }
          const style = window.getComputedStyle(element);
          if (style.position === 'fixed') {
            return true;
          }
          return (
            element.hasAttribute('data-liquid-ignore') ||
            !!element.closest('[data-liquid-ignore]')
          );
        };

        // Inject a style to override common oklch variables with RGB fallbacks
        // This runs BEFORE html2canvas to prevent parsing errors
        const overrideStyle = document.createElement('style');
        overrideStyle.id = 'liquid-glass-oklch-override';
        overrideStyle.textContent = `
          * {
            --color-surface-50: rgb(250, 250, 250) !important;
            --color-surface-100: rgb(245, 245, 245) !important;
            --color-surface-200: rgb(229, 229, 229) !important;
            --color-surface-300: rgb(212, 212, 212) !important;
            --color-surface-400: rgb(163, 163, 163) !important;
            --color-surface-500: rgb(115, 115, 115) !important;
            --color-surface-600: rgb(82, 82, 82) !important;
            --color-surface-700: rgb(64, 64, 64) !important;
            --color-surface-800: rgb(38, 38, 38) !important;
            --color-surface-900: rgb(23, 23, 23) !important;
            --color-surface-950: rgb(10, 10, 10) !important;
            --color-accent-50: rgb(239, 246, 255) !important;
            --color-accent-100: rgb(219, 234, 254) !important;
            --color-accent-200: rgb(191, 219, 254) !important;
            --color-accent-300: rgb(147, 197, 253) !important;
            --color-accent-400: rgb(96, 165, 250) !important;
            --color-accent-500: rgb(59, 130, 246) !important;
            --color-accent-600: rgb(37, 99, 235) !important;
            --color-accent-700: rgb(29, 78, 216) !important;
            --color-accent-800: rgb(30, 64, 175) !important;
            --color-accent-900: rgb(30, 58, 138) !important;
          }
        `;
        document.head.appendChild(overrideStyle);

        // Pre-process: convert oklch to RGB by walking the DOM before html2canvas
        const convertOklchToRgb = (doc: Document) => {
          // Helper to convert oklch string to rgb using canvas
          const oklchToRgb = (oklchStr: string): string => {
            try {
              const canvas = document.createElement('canvas');
              canvas.width = 1;
              canvas.height = 1;
              const ctx = canvas.getContext('2d');
              if (!ctx) {
                return 'rgb(128, 128, 128)';
              }
              ctx.fillStyle = oklchStr;
              ctx.fillRect(0, 0, 1, 1);
              const data = ctx.getImageData(0, 0, 1, 1).data;
              return `rgb(${data[0]}, ${data[1]}, ${data[2]})`;
            } catch {
              return 'rgb(128, 128, 128)';
            }
          };

          // Walk all elements and convert oklch colors to inline RGB
          const elements = doc.querySelectorAll('*');
          for (const el of elements) {
            if (!(el instanceof HTMLElement)) {
              continue;
            }
            const computed = window.getComputedStyle(el);

            // Properties that might have oklch colors
            const colorProps = [
              'color',
              'backgroundColor',
              'borderColor',
              'borderTopColor',
              'borderRightColor',
              'borderBottomColor',
              'borderLeftColor',
              'outlineColor',
              'textDecorationColor',
              'caretColor',
            ];

            for (const prop of colorProps) {
              const value = computed.getPropertyValue(
                prop.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`),
              );
              if (value?.includes('oklch')) {
                const cssProp = prop.replace(
                  /[A-Z]/g,
                  (m) => `-${m.toLowerCase()}`,
                );
                el.style.setProperty(cssProp, oklchToRgb(value), 'important');
              }
            }

            // Handle background-image gradients with oklch
            const bgImage = computed.backgroundImage;
            if (bgImage?.includes('oklch')) {
              // Replace oklch in gradients - this is a simplified approach
              const converted = bgImage.replace(/oklch\([^)]+\)/g, (match) =>
                oklchToRgb(match),
              );
              el.style.setProperty('background-image', converted, 'important');
            }
          }

          // Also disable stylesheets that might cause issues
          const stylesheets = doc.styleSheets;
          for (let i = 0; i < stylesheets.length; i++) {
            try {
              const sheet = stylesheets[i];
              if (sheet.cssRules) {
                // Iterate rules and disable ones with oklch
                for (let j = sheet.cssRules.length - 1; j >= 0; j--) {
                  const rule = sheet.cssRules[j];
                  if (rule.cssText?.includes('oklch')) {
                    sheet.deleteRule(j);
                  }
                }
              }
            } catch {
              // Cross-origin stylesheets can't be modified
            }
          }
        };

        try {
          const snapCanvas = await html2canvasModule(this.snapshotTarget, {
            allowTaint: false,
            useCORS: true,
            backgroundColor: null,
            removeContainer: true,
            width: fullW,
            height: fullH,
            scrollX: 0,
            scrollY: 0,
            scale: scale,
            ignoreElements: ignoreElementsFunc,
            onclone: (doc: Document) => {
              convertOklchToRgb(doc);
            },
          });

          // Clean up the override style
          overrideStyle.remove();
          this.canvas.style.visibility = prevVisibility;
          this._uploadTexture(snapCanvas);
          return true;
        } catch (html2canvasError) {
          // Clean up the override style even on error
          overrideStyle.remove();
          console.warn(
            'liquidGL: html2canvas failed, using solid color fallback',
            html2canvasError,
          );
          this.canvas.style.visibility = prevVisibility;
        }
      }

      // Final fallback: create a simple gradient texture
      const fallbackCanvas = this._createFallbackTexture(fullW, fullH, scale);
      this._uploadTexture(fallbackCanvas);
      return true;
    } catch (e) {
      console.error('liquidGL snapshot failed', e);
      return false;
    } finally {
      this._capturing = false;
    }
  }

  /**
   * Try to capture using native browser APIs (not widely supported)
   */
  private async _captureWithDrawWindow(
    _width: number,
    _height: number,
    _scale: number,
  ): Promise<HTMLCanvasElement | null> {
    // drawWindow is Firefox-only and deprecated
    // For now, return null to use fallback
    return null;
  }

  /**
   * Create a fallback texture when html2canvas fails
   * Renders elements manually using canvas 2D
   */
  private _createFallbackTexture(
    width: number,
    height: number,
    scale: number,
  ): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(width * scale);
    canvas.height = Math.round(height * scale);
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return canvas;
    }

    ctx.scale(scale, scale);

    const targetRect = this.snapshotTarget.getBoundingClientRect();

    // Helper to convert oklch to RGB using canvas
    const safeColor = (color: string): string => {
      if (!color || color === 'transparent' || color === 'rgba(0, 0, 0, 0)') {
        return 'transparent';
      }
      if (color.includes('oklch')) {
        try {
          const tempCanvas = document.createElement('canvas');
          tempCanvas.width = 1;
          tempCanvas.height = 1;
          const tempCtx = tempCanvas.getContext('2d');
          if (tempCtx) {
            tempCtx.fillStyle = color;
            tempCtx.fillRect(0, 0, 1, 1);
            const data = tempCtx.getImageData(0, 0, 1, 1).data;
            return `rgb(${data[0]}, ${data[1]}, ${data[2]})`;
          }
        } catch {
          // Fallback
        }
        return 'rgb(128, 128, 128)';
      }
      return color;
    };

    // Helper to parse and render gradients
    const renderGradient = (
      gradientStr: string,
      x: number,
      y: number,
      w: number,
      h: number,
    ): boolean => {
      // Parse linear-gradient
      const linearMatch = gradientStr.match(/linear-gradient\(([^)]+)\)/);
      if (linearMatch) {
        const content = linearMatch[1];
        // Parse angle (default 180deg = top to bottom)
        let angle = 180;
        const angleMatch = content.match(/^(\d+)deg/);
        if (angleMatch) {
          angle = Number.parseFloat(angleMatch[1]);
        }

        // Convert angle to gradient coordinates
        const rad = ((angle - 90) * Math.PI) / 180;
        const x1 = x + w / 2 - (Math.cos(rad) * w) / 2;
        const y1 = y + h / 2 - (Math.sin(rad) * h) / 2;
        const x2 = x + w / 2 + (Math.cos(rad) * w) / 2;
        const y2 = y + h / 2 + (Math.sin(rad) * h) / 2;

        const gradient = ctx.createLinearGradient(x1, y1, x2, y2);

        // Parse color stops - simplified parsing
        const colorStops = content
          .split(/,\s*(?![^(]*\))/)
          .slice(angleMatch ? 1 : 0);
        for (const [i, stop] of colorStops.entries()) {
          const parts = stop.trim().split(/\s+/);
          let color = parts[0];
          let position = i / Math.max(1, colorStops.length - 1);

          // Check for percentage
          if (parts.length > 1 && parts[1].endsWith('%')) {
            position = Number.parseFloat(parts[1]) / 100;
          }

          // Handle color names like #hex or rgb(...)
          if (color.startsWith('#') || color.startsWith('rgb')) {
            color = safeColor(color);
          } else if (color.startsWith('oklch')) {
            color = safeColor(color);
          }

          try {
            gradient.addColorStop(Math.max(0, Math.min(1, position)), color);
          } catch {
            // Invalid color, skip
          }
        }

        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, w, h);
        return true;
      }
      return false;
    };

    // Fill background
    const targetStyle = window.getComputedStyle(this.snapshotTarget);
    const bgImage = targetStyle.backgroundImage;
    const bgColor = safeColor(targetStyle.backgroundColor);

    if (bgColor !== 'transparent') {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, width, height);
    }

    if (bgImage && bgImage !== 'none') {
      renderGradient(bgImage, 0, 0, width, height);
    }

    // Recursively render visible elements
    const renderElement = (el: Element, depth = 0) => {
      if (depth > 10) {
        return; // Prevent infinite recursion
      }
      if (!(el instanceof HTMLElement)) {
        return;
      }
      if (el.hasAttribute('data-liquid-ignore')) {
        return;
      }
      if (el.hasAttribute('data-liquid-glass')) {
        return; // Skip LiquidSurface elements
      }

      const style = window.getComputedStyle(el);
      if (style.display === 'none' || style.visibility === 'hidden') {
        return;
      }
      if (style.position === 'fixed') {
        return;
      }

      const rect = el.getBoundingClientRect();
      const x = rect.left - targetRect.left;
      const y = rect.top - targetRect.top;
      const w = rect.width;
      const h = rect.height;

      if (w <= 0 || h <= 0) {
        return;
      }

      // Draw background color
      const elBgColor = safeColor(style.backgroundColor);
      if (elBgColor !== 'transparent') {
        ctx.fillStyle = elBgColor;
        const radius = Number.parseFloat(style.borderRadius) || 0;
        if (radius > 0 && typeof ctx.roundRect === 'function') {
          ctx.beginPath();
          ctx.roundRect(x, y, w, h, radius);
          ctx.fill();
        } else if (radius > 0) {
          // Polyfill for roundRect
          ctx.beginPath();
          ctx.moveTo(x + radius, y);
          ctx.lineTo(x + w - radius, y);
          ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
          ctx.lineTo(x + w, y + h - radius);
          ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
          ctx.lineTo(x + radius, y + h);
          ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
          ctx.lineTo(x, y + radius);
          ctx.quadraticCurveTo(x, y, x + radius, y);
          ctx.closePath();
          ctx.fill();
        } else {
          ctx.fillRect(x, y, w, h);
        }
      }

      // Draw background gradient
      const elBgImage = style.backgroundImage;
      if (elBgImage && elBgImage !== 'none') {
        renderGradient(elBgImage, x, y, w, h);
      }

      // Draw text content
      if (
        el.childNodes.length === 1 &&
        el.childNodes[0].nodeType === Node.TEXT_NODE
      ) {
        const text = el.textContent?.trim();
        if (text) {
          const color = safeColor(style.color);
          const fontSize = Number.parseFloat(style.fontSize) || 16;
          const fontWeight = style.fontWeight || 'normal';
          const fontFamily = style.fontFamily || 'sans-serif';

          ctx.fillStyle = color;
          ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
          ctx.textBaseline = 'middle';

          const textX = x + Number.parseFloat(style.paddingLeft || '0');
          const textY = y + h / 2;
          ctx.fillText(text, textX, textY);
        }
      }

      // Render children
      for (const child of el.children) {
        renderElement(child, depth + 1);
      }
    };

    // Render all elements
    for (const child of this.snapshotTarget.children) {
      renderElement(child);
    }

    return canvas;
  }

  private _uploadTexture(srcCanvas: HTMLCanvasElement): void {
    if (!srcCanvas || srcCanvas.width === 0 || srcCanvas.height === 0) {
      return;
    }

    this.staticSnapshotCanvas = srcCanvas;
    const gl = this.gl;

    if (!this.texture) {
      this.texture = gl.createTexture();
    }
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      srcCanvas,
    );
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    this.textureWidth = srcCanvas.width;
    this.textureHeight = srcCanvas.height;

    this.render();

    if (this._pendingReveal.length) {
      for (const ln of this._pendingReveal) {
        ln._reveal();
      }
      this._pendingReveal.length = 0;
    }
  }

  addLens(element: HTMLElement, options: LensOptions): LiquidGLLensInstance {
    const lens = new LiquidGLLens(this, element, options);
    this.lenses.push(lens);

    const maxZ = this._getMaxLensZ();
    if (maxZ > 0) {
      this.canvas.style.zIndex = String(maxZ - 1);
    }

    if (!this.texture) {
      this._pendingReveal.push(lens);
    } else {
      lens._reveal();
    }
    return lens;
  }

  removeLens(lens: LiquidGLLensInstance): void {
    const lensImpl = lens as LiquidGLLens;
    const idx = this.lenses.indexOf(lensImpl);
    if (idx !== -1) {
      this.lenses.splice(idx, 1);
      lensImpl._cleanup();
    }
  }

  render(): void {
    if (this._destroyed) {
      return;
    }
    const gl = this.gl;
    if (!this.texture || !this.u || !this.program) {
      return;
    }

    if (this._isScrolling) {
      this._scrollUpdateCounter++;
    }

    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(this.program);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.uniform1i(this.u.tex, 0);

    const time = (Date.now() - this.startTime) / 1000;
    gl.uniform1f(this.u.time, time);

    this._updateDynamicVideos();

    for (const lens of this.lenses) {
      lens.updateMetrics();
      this._renderLens(lens);
    }

    // Clear lens areas for transparency when mirror is active
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    for (const ln of this.lenses) {
      if (ln._mirrorActive && ln.rectPx) {
        const { left, top, width, height } = ln.rectPx;
        const expand = 2;
        const x = Math.max(0, Math.round(left * dpr) - expand);
        const y = Math.max(
          0,
          Math.round(this.canvas.height - (top + height) * dpr) - expand,
        );
        const w = Math.min(
          this.canvas.width - x,
          Math.round(width * dpr) + expand * 2,
        );
        const h = Math.min(
          this.canvas.height - y,
          Math.round(height * dpr) + expand * 2,
        );
        if (w > 0 && h > 0) {
          gl.enable(gl.SCISSOR_TEST);
          gl.scissor(x, y, w, h);
          gl.clearColor(0, 0, 0, 0);
          gl.clear(gl.COLOR_BUFFER_BIT);
          gl.disable(gl.SCISSOR_TEST);
        }
      }
    }
  }

  private _renderLens(lens: LiquidGLLens): void {
    const gl = this.gl;
    const rect = lens.rectPx;
    if (!rect || !this.u) {
      return;
    }

    const dpr = Math.min(2, window.devicePixelRatio || 1);

    let overscrollY = 0;
    let overscrollX = 0;
    if (window.visualViewport) {
      overscrollX = window.visualViewport.offsetLeft;
      overscrollY = window.visualViewport.offsetTop;
    }

    const x = (rect.left + overscrollX) * dpr;
    const y = this.canvas.height - (rect.top + overscrollY + rect.height) * dpr;
    const w = rect.width * dpr;
    const h = rect.height * dpr;

    gl.viewport(x, y, w, h);
    gl.uniform2f(this.u.res, w, h);

    const snapRect = this.snapshotTarget.getBoundingClientRect();
    const docX = rect.left - snapRect.left;
    const docY = rect.top - snapRect.top;
    const leftUV = (docX * this.scaleFactor) / this.textureWidth;
    const topUV = (docY * this.scaleFactor) / this.textureHeight;
    const wUV = (rect.width * this.scaleFactor) / this.textureWidth;
    const hUV = (rect.height * this.scaleFactor) / this.textureHeight;
    gl.uniform4f(this.u.bounds, leftUV, topUV, wUV, hUV);

    gl.uniform2f(
      this.u.textureResolution,
      this.textureWidth,
      this.textureHeight,
    );
    gl.uniform1f(this.u.refraction, lens.options.refraction);
    gl.uniform1f(this.u.bevelDepth, lens.options.bevelDepth);
    gl.uniform1f(this.u.bevelWidth, lens.options.bevelWidth);
    gl.uniform1f(this.u.frost, lens.options.frost);
    gl.uniform1f(this.u.radius, lens.radiusGl);
    gl.uniform1i(this.u.specular, lens.options.specular ? 1 : 0);
    gl.uniform1f(this.u.revealProgress, lens._revealProgress || 1.0);
    gl.uniform1i(this.u.revealType, lens.revealTypeIndex || 0);

    const mag = Math.max(0.001, Math.min(3.0, lens.options.magnify ?? 1.0));
    gl.uniform1f(this.u.magnify, mag);

    gl.uniform1f(this.u.tiltX, lens.tiltX || 0);
    gl.uniform1f(this.u.tiltY, lens.tiltY || 0);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  private _updateDynamicVideos(): void {
    if (this._isScrolling && this._scrollUpdateCounter % 2 !== 0) {
      return;
    }
    if (
      !this.texture ||
      !this.staticSnapshotCanvas ||
      !this._videoNodes.length
    ) {
      return;
    }

    const gl = this.gl;
    const snapRect = this.snapshotTarget.getBoundingClientRect();
    const maxLensZ = this._getMaxLensZ();

    for (const vid of this._videoNodes) {
      if (effectiveZ(vid) >= maxLensZ) {
        continue;
      }
      if (this._isIgnored(vid) || vid.readyState < 2) {
        continue;
      }

      const rect = vid.getBoundingClientRect();
      const texX = (rect.left - snapRect.left) * this.scaleFactor;
      const texY = (rect.top - snapRect.top) * this.scaleFactor;
      const texW = rect.width * this.scaleFactor;
      const texH = rect.height * this.scaleFactor;

      const drawW = Math.round(texW);
      const drawH = Math.round(texH);

      if (drawW <= 0 || drawH <= 0) {
        continue;
      }

      if (this._tmpCanvas.width !== drawW || this._tmpCanvas.height !== drawH) {
        this._tmpCanvas.width = drawW;
        this._tmpCanvas.height = drawH;
      }

      if (!this._tmpCtx) {
        continue;
      }

      try {
        this._tmpCtx.save();
        this._tmpCtx.clearRect(0, 0, drawW, drawH);

        if (this.staticSnapshotCanvas) {
          this._tmpCtx.drawImage(
            this.staticSnapshotCanvas,
            texX,
            texY,
            texW,
            texH,
            0,
            0,
            drawW,
            drawH,
          );
        }

        this._tmpCtx.drawImage(vid, 0, 0, drawW, drawH);
        this._tmpCtx.restore();
      } catch (e) {
        console.warn('liquidGL: Error drawing video frame', e);
        continue;
      }

      const drawX = Math.round(texX);
      const drawY = Math.round(texY);

      gl.bindTexture(gl.TEXTURE_2D, this.texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
      gl.texSubImage2D(
        gl.TEXTURE_2D,
        0,
        drawX,
        drawY,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        this._tmpCanvas,
      );
    }
  }

  private _getMaxLensZ(): number {
    let maxZ = 0;
    for (const ln of this.lenses) {
      const z = effectiveZ(ln.el);
      if (z > maxZ) {
        maxZ = z;
      }
    }
    return maxZ;
  }

  addDynamicElement(el: Element | string | NodeList | Element[]): void {
    // Simplified - just refresh snapshot
    if (el) {
      this.captureSnapshot();
    }
  }

  private _isIgnored(el: HTMLElement): boolean {
    return !!el?.closest?.('[data-liquid-ignore]');
  }

  startRenderLoop(): void {
    if (this._rafId !== null || this._destroyed) {
      return;
    }
    const loop = () => {
      if (this._destroyed) {
        return;
      }
      this.render();
      this._rafId = requestAnimationFrame(loop);
    };
    this._rafId = requestAnimationFrame(loop);
  }

  stopRenderLoop(): void {
    if (this._rafId !== null) {
      cancelAnimationFrame(this._rafId);
      this._rafId = null;
    }
  }

  destroy(): void {
    this._destroyed = true;
    this.stopRenderLoop();
    window.removeEventListener('resize', this._resizeHandler);

    for (const lens of this.lenses) {
      lens._cleanup();
    }
    this.lenses = [];

    if (this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
  }
}

/* --------------------------------------------------
 *  Lens class
 * ------------------------------------------------*/
export class LiquidGLLens implements LiquidGLLensInstance {
  renderer: LiquidGLRenderer;
  el: HTMLElement;
  options: LensOptions;
  rectPx: { left: number; top: number; width: number; height: number } | null =
    null;
  radiusGl = 0;
  radiusCss = 0;
  revealTypeIndex: number;
  _revealProgress: number;
  tiltX = 0;
  tiltY = 0;
  _mirrorActive = false;
  _shadowEl: HTMLElement | null = null;

  private _initCalled = false;
  private originalShadow: string;
  private originalOpacity: string;
  private originalTransition: string;
  private _shadowSyncFn: (() => void) | null = null;
  private _sizeObs: ResizeObserver | null = null;
  private _tiltHandlersBound = false;
  private _savedTransform?: string;
  private _savedTransformStyle?: string;
  private _tiltInteracting = false;
  private _baseRect: DOMRect | null = null;
  private _mirror: HTMLCanvasElement | null = null;
  private _mirrorClipUpdater: (() => void) | null = null;
  private _pivotOrigin?: string;
  private _resetCleanupTimer: ReturnType<typeof setTimeout> | null = null;
  private _applyTilt?: (x: number, y: number) => void;
  private _smoothReset?: () => void;
  private _docPointerMove?: (e: PointerEvent) => void;
  private _tiltActive = false;

  constructor(
    renderer: LiquidGLRenderer,
    element: HTMLElement,
    options: LensOptions,
  ) {
    this.renderer = renderer;
    this.el = element;
    this.options = options;
    this.revealTypeIndex = options.reveal === 'fade' ? 1 : 0;
    this._revealProgress = this.revealTypeIndex === 0 ? 1 : 0;

    this.originalShadow = this.el.style.boxShadow;
    this.originalOpacity = this.el.style.opacity;
    this.originalTransition = this.el.style.transition;
    this.el.style.transition = 'none';
    this.el.style.opacity = '0';

    const currentPos = window.getComputedStyle(this.el).position;
    if (currentPos === 'static') {
      this.el.style.position = 'relative';
    }

    // Make background transparent
    this.el.style.backdropFilter = 'none';
    (this.el.style as unknown as Record<string, string>).webkitBackdropFilter =
      'none';
    this.el.style.backgroundImage = 'none';
    this.el.style.background = 'transparent';
    this.el.style.pointerEvents = 'none';

    this.updateMetrics();
    this.setShadow(options.shadow);
    if (options.tilt) {
      this._bindTiltHandlers();
    }

    if (typeof ResizeObserver !== 'undefined') {
      this._sizeObs = new ResizeObserver(() => {
        this.updateMetrics();
        this.renderer.render();
      });
      this._sizeObs.observe(this.el);
    }
  }

  updateMetrics(): void {
    const rect =
      this._mirrorActive && this._baseRect
        ? this._baseRect
        : this.el.getBoundingClientRect();

    this.rectPx = {
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height,
    };

    const style = window.getComputedStyle(this.el);
    const brRaw = style.borderTopLeftRadius.split(' ')[0];
    const isPct = brRaw.trim().endsWith('%');
    let brPx: number;
    if (isPct) {
      const pct = Number.parseFloat(brRaw);
      brPx = (Math.min(rect.width, rect.height) * pct) / 100;
    } else {
      brPx = Number.parseFloat(brRaw);
    }
    const maxAllowedCss = Math.min(rect.width, rect.height) * 0.5;
    this.radiusCss = Math.min(brPx, maxAllowedCss);

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    this.radiusGl = this.radiusCss * dpr;

    if (this._shadowSyncFn) {
      this._shadowSyncFn();
    }
  }

  setTilt(enabled: boolean): void {
    this.options.tilt = enabled;
    if (enabled) {
      this._bindTiltHandlers();
    } else {
      this._unbindTiltHandlers();
    }
  }

  setShadow(enabled: boolean): void {
    this.options.shadow = enabled;
    const SHADOW_VAL =
      '0 10px 30px rgba(0,0,0,0.1), 0 0 0 0.5px rgba(0,0,0,0.05)';

    const syncShadow = () => {
      if (!this._shadowEl) {
        return;
      }
      const r =
        this._mirrorActive && this._baseRect
          ? this._baseRect
          : this.el.getBoundingClientRect();
      this._shadowEl.style.left = `${r.left}px`;
      this._shadowEl.style.top = `${r.top}px`;
      this._shadowEl.style.width = `${r.width}px`;
      this._shadowEl.style.height = `${r.height}px`;
      this._shadowEl.style.borderRadius = `${this.radiusCss}px`;
    };

    if (enabled) {
      this.el.style.boxShadow = SHADOW_VAL;

      if (!this._shadowEl) {
        this._shadowEl = document.createElement('div');
        Object.assign(this._shadowEl.style, {
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: String(effectiveZ(this.el) - 2),
          boxShadow: SHADOW_VAL,
          willChange: 'transform, width, height',
          opacity: this.revealTypeIndex === 1 ? '0' : '1',
        });
        document.body.appendChild(this._shadowEl);

        this._shadowSyncFn = syncShadow;
        window.addEventListener('resize', this._shadowSyncFn, {
          passive: true,
        });
      }
      syncShadow();
    } else {
      if (this._shadowEl) {
        if (this._shadowSyncFn) {
          window.removeEventListener('resize', this._shadowSyncFn);
        }
        this._shadowEl.remove();
        this._shadowEl = null;
      }
      this.el.style.boxShadow = this.originalShadow;
    }
  }

  _reveal(): void {
    if (this.revealTypeIndex === 0) {
      this.el.style.opacity = this.originalOpacity || '1';
      this.renderer.canvas.style.opacity = '1';
      this._revealProgress = 1;
      this._triggerInit();
      return;
    }

    // Fade reveal animation
    if (this.renderer._revealAnimating) {
      return;
    }
    this.renderer._revealAnimating = true;

    const dur = 1000;
    const start = performance.now();

    const animate = () => {
      const progress = Math.min(1, (performance.now() - start) / dur);

      for (const ln of this.renderer.lenses) {
        ln._revealProgress = progress;
        ln.el.style.opacity = String(
          (Number.parseFloat(ln.originalOpacity) || 1) * progress,
        );
        if (ln._shadowEl) {
          ln._shadowEl.style.opacity = String(progress);
        }
      }

      this.renderer.canvas.style.opacity = String(progress);
      this.renderer.render();

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        this.renderer._revealAnimating = false;
        for (const ln of this.renderer.lenses) {
          ln.el.style.transition = ln.originalTransition || '';
          ln._triggerInit();
        }
      }
    };

    requestAnimationFrame(animate);
  }

  private _triggerInit(): void {
    if (this._initCalled) {
      return;
    }
    this._initCalled = true;
    if (this.options.on?.init) {
      this.options.on.init(this);
    }
  }

  private _bindTiltHandlers(): void {
    if (this._tiltHandlersBound) {
      return;
    }

    if (this._savedTransform === undefined) {
      const currentTransform = this.el.style.transform;
      if (currentTransform?.includes('translate')) {
        this._savedTransform = currentTransform
          .replace(/translate\([^)]*\)\s*/g, '')
          .trim();
        if (this._savedTransform === '') {
          this._savedTransform = 'none';
        }
      } else {
        this._savedTransform = currentTransform;
      }
    }
    if (this._savedTransformStyle === undefined) {
      this._savedTransformStyle = this.el.style.transformStyle;
    }
    this.el.style.transformStyle = 'preserve-3d';

    const getMaxTilt = () =>
      Number.isFinite(this.options.tiltFactor) ? this.options.tiltFactor : 5;

    this._applyTilt = (clientX: number, clientY: number) => {
      if (!this._tiltInteracting) {
        this._tiltInteracting = true;
        this.el.style.transition =
          'transform 0.12s cubic-bezier(0.33,1,0.68,1)';
        this._createMirrorCanvas();
        if (this._mirror) {
          this._mirror.style.transition =
            'transform 0.12s cubic-bezier(0.33,1,0.68,1)';
        }
        if (this._shadowEl) {
          this._shadowEl.style.transition =
            'transform 0.12s cubic-bezier(0.33,1,0.68,1)';
        }
      }

      const r = this._baseRect || this.el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;

      this._pivotOrigin = `${cx}px ${cy}px`;

      const pctX = (clientX - cx) / (r.width / 2);
      const pctY = (clientY - cy) / (r.height / 2);
      const maxTilt = getMaxTilt();
      const rotY = pctX * maxTilt;
      const rotX = -pctY * maxTilt;
      const baseTransform =
        this._savedTransform && this._savedTransform !== 'none'
          ? `${this._savedTransform} `
          : '';

      const transformStr = `${baseTransform}perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;

      this.tiltX = rotX;
      this.tiltY = rotY;

      this.el.style.transformOrigin = '50% 50%';
      this.el.style.transform = transformStr;

      if (this._mirror) {
        this._mirror.style.transformOrigin = this._pivotOrigin;
        this._mirror.style.transform = transformStr;
      }

      if (this._shadowEl) {
        this._shadowEl.style.transformOrigin = '50% 50%';
        this._shadowEl.style.transform = transformStr;
      }

      this.renderer.render();
    };

    this._smoothReset = () => {
      this.el.style.transition = 'transform 0.4s cubic-bezier(0.33,1,0.68,1)';
      this.el.style.transformOrigin = '50% 50%';
      const baseRest =
        this._savedTransform && this._savedTransform !== 'none'
          ? `${this._savedTransform} `
          : '';

      this.el.style.transform = `${baseRest}perspective(800px) rotateX(0deg) rotateY(0deg)`;

      this.tiltX = 0;
      this.tiltY = 0;
      this.renderer.render();

      if (this._mirror) {
        this._mirror.style.transition =
          'transform 0.4s cubic-bezier(0.33, 1, 0.68, 1)';
        this._mirror.style.transformOrigin = this._pivotOrigin || '50% 50%';
        this._mirror.style.transform = `${baseRest}perspective(800px) rotateX(0deg) rotateY(0deg)`;
        const clean = () => {
          this._destroyMirrorCanvas();
          this._resetCleanupTimer = null;
        };
        this._mirror.addEventListener('transitionend', clean, { once: true });
        this._resetCleanupTimer = setTimeout(clean, 350);
      }

      if (this._shadowEl) {
        this._shadowEl.style.transition =
          'transform 0.4s cubic-bezier(0.33,1,0.68,1)';
        this._shadowEl.style.transformOrigin = '50% 50%';
        this._shadowEl.style.transform = `${baseRest}perspective(800px) rotateX(0deg) rotateY(0deg)`;
      }
    };

    this._docPointerMove = (e: PointerEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      const r = this.el.getBoundingClientRect();
      const inside = x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;

      if (inside) {
        if (!this._tiltActive) {
          this._tiltActive = true;
          this._tiltInteracting = false;
          this._createMirrorCanvas();
          const cx = r.left + r.width / 2;
          const cy = r.top + r.height / 2;
          this._applyTilt?.(cx, cy);
          requestAnimationFrame(() => {
            this._applyTilt?.(x, y);
          });
        } else {
          this._applyTilt?.(x, y);
        }
      } else if (this._tiltActive) {
        this._tiltActive = false;
        this._smoothReset?.();
      }
    };

    document.addEventListener('pointermove', this._docPointerMove, {
      passive: true,
    });

    this._tiltHandlersBound = true;
  }

  private _unbindTiltHandlers(): void {
    if (!this._tiltHandlersBound) {
      return;
    }

    if (this._docPointerMove) {
      document.removeEventListener('pointermove', this._docPointerMove);
      this._docPointerMove = undefined;
    }
    this._tiltHandlersBound = false;

    this.el.style.transform = this._savedTransform || '';
    this.el.style.transformStyle = this._savedTransformStyle || '';

    this.renderer.render();
  }

  private _createMirrorCanvas(): void {
    this._baseRect = this.el.getBoundingClientRect();
    if (this._mirror) {
      return;
    }

    this._mirror = document.createElement('canvas');
    Object.assign(this._mirror.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: String(effectiveZ(this.el) - 1),
      willChange: 'transform',
    });
    document.body.appendChild(this._mirror);

    const updateClip = () => {
      if (!this._mirror) {
        return;
      }
      if (this._mirrorActive) {
        this._baseRect = this._baseRect || this.el.getBoundingClientRect();
      }
      const r = this._baseRect || this.el.getBoundingClientRect();
      const radius = `${this.radiusCss}px`;
      this._mirror.style.clipPath = `inset(${r.top}px ${
        innerWidth - r.right
      }px ${innerHeight - r.bottom}px ${r.left}px round ${radius})`;
    };
    updateClip();
    this._mirrorClipUpdater = updateClip;
    window.addEventListener('resize', updateClip, { passive: true });

    this._mirrorActive = true;
  }

  private _destroyMirrorCanvas(): void {
    if (!this._mirror) {
      return;
    }
    if (this._mirrorClipUpdater) {
      window.removeEventListener('resize', this._mirrorClipUpdater);
    }
    this._mirror.remove();
    this._mirror = null;
    this._baseRect = null;
    this._mirrorActive = false;
  }

  _cleanup(): void {
    this._unbindTiltHandlers();
    this._destroyMirrorCanvas();

    if (this._sizeObs) {
      this._sizeObs.disconnect();
      this._sizeObs = null;
    }

    if (this._shadowEl) {
      if (this._shadowSyncFn) {
        window.removeEventListener('resize', this._shadowSyncFn);
      }
      this._shadowEl.remove();
      this._shadowEl = null;
    }

    if (this._resetCleanupTimer) {
      clearTimeout(this._resetCleanupTimer);
    }

    // Restore original styles
    this.el.style.opacity = this.originalOpacity;
    this.el.style.boxShadow = this.originalShadow;
    this.el.style.transition = this.originalTransition;
    this.el.style.pointerEvents = '';
    this.el.style.background = '';
    this.el.style.backdropFilter = '';
  }
}

/** Check if WebGL is supported */
export function isWebGLSupported(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  const testCanvas = document.createElement('canvas');
  const testCtx =
    testCanvas.getContext('webgl2') ||
    testCanvas.getContext('webgl') ||
    testCanvas.getContext('experimental-webgl');
  return !!testCtx;
}
