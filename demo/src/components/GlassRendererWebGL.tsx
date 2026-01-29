import {
  type Accessor,
  type JSX,
  createContext,
  createEffect,
  createSignal,
  onCleanup,
  onMount,
  useContext,
} from 'solid-js';

import fragmentShaderSource from './shaders/glass.frag?raw';
// Import shaders as raw strings
import vertexShaderSource from './shaders/glass.vert?raw';

// Types
interface GlassElementWebGL {
  id: string;
  element: HTMLElement;
  index: number;
  targetRotX: number;
  targetRotY: number;
  currentRotX: number;
  currentRotY: number;
}

interface GlassRendererWebGLContextValue {
  register: (id: string, element: HTMLElement) => void;
  unregister: (id: string) => void;
  isReady: Accessor<boolean>;
  webglSupported: Accessor<boolean>;
}

interface WebGL2GlassInstance {
  gl: WebGL2RenderingContext;
  program: WebGLProgram;
  vao: WebGLVertexArrayObject;

  // Geometry buffers (shared, 1 quad)
  positionBuffer: WebGLBuffer;
  texCoordBuffer: WebGLBuffer;
  indexBuffer: WebGLBuffer;

  // Instance buffers (updated each frame)
  modelMatrixBuffer: WebGLBuffer;
  rotationBuffer: WebGLBuffer;

  // Background rendering
  bgProgram: WebGLProgram;
  bgVao: WebGLVertexArrayObject;
  backgroundTexture: WebGLTexture;
  backgroundFramebuffer: WebGLFramebuffer;

  // Uniform locations for glass shader
  uniforms: {
    projectionMatrix: WebGLUniformLocation | null;
    viewMatrix: WebGLUniformLocation | null;
    backgroundTexture: WebGLUniformLocation | null;
    ior: WebGLUniformLocation | null;
    thickness: WebGLUniformLocation | null;
    roughness: WebGLUniformLocation | null;
    resolution: WebGLUniformLocation | null;
    chromaticAberration: WebGLUniformLocation | null;
  };

  // Background shader uniforms
  bgUniforms: {
    time: WebGLUniformLocation | null;
    resolution: WebGLUniformLocation | null;
  };

  // Elements tracking
  elements: Map<string, GlassElementWebGL>;

  // Instance data arrays (reused each frame)
  modelMatrices: Float32Array;
  rotations: Float32Array;
  instanceCount: number;

  // Camera matrices
  projectionMatrix: Float32Array;
  viewMatrix: Float32Array;

  // State
  animationId: number;
  isRunning: boolean;
  lastHoverCheck: number;
  resizeObserver: ResizeObserver | null;
  startTime: number;
}

const MAX_INSTANCES = 64;
const HOVER_THROTTLE = 50;
const FOV = 45;
const NEAR = 0.1;
const FAR = 1000;
const CAMERA_Z = 50;

const GlassRendererWebGLContext =
  createContext<GlassRendererWebGLContextValue>();

// Background fragment shader (renders gradient + orbs)
const bgVertexShader = `#version 300 es
in vec2 aPosition;
out vec2 vUv;
void main() {
  vUv = aPosition * 0.5 + 0.5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

const bgFragmentShader = `#version 300 es
precision highp float;
uniform float uTime;
uniform vec2 uResolution;
in vec2 vUv;
out vec4 fragColor;

void main() {
  vec2 uv = vUv;

  // Base gradient (radial from center) - DARKER colors
  vec2 center = vec2(0.5, 0.5);
  float dist = length(uv - center);

  vec3 color1 = vec3(0.08, 0.06, 0.20);  // Deep dark blue
  vec3 color2 = vec3(0.15, 0.12, 0.35);  // Dark indigo
  vec3 color3 = vec3(0.20, 0.08, 0.40);  // Dark purple

  vec3 grad = mix(color1, color2, smoothstep(0.0, 0.5, dist));
  grad = mix(grad, color3, smoothstep(0.5, 1.0, dist));

  // Grid pattern - subtle white lines
  vec2 gridUv = uv * 16.0;
  vec2 grid = abs(fract(gridUv) - 0.5);
  float gridLine = min(grid.x, grid.y);
  float gridVisible = 1.0 - smoothstep(0.0, 0.03, gridLine);
  grad += vec3(1.0) * gridVisible * 0.08;

  // Animated orbs
  float t = uTime * 0.0001;

  // Orb 1 - Bright Indigo
  vec2 orb1Pos = vec2(0.25 + sin(t) * 0.08, 0.3 + cos(t * 0.8) * 0.08);
  float orb1Dist = length(uv - orb1Pos);
  vec3 orb1Color = vec3(0.4, 0.4, 1.0);
  float orb1 = smoothstep(0.3, 0.0, orb1Dist);
  grad = mix(grad, orb1Color, orb1 * 0.8);

  // Orb 2 - Bright Purple
  vec2 orb2Pos = vec2(0.75 + cos(t * 1.1) * 0.06, 0.35 + sin(t * 0.7) * 0.06);
  float orb2Dist = length(uv - orb2Pos);
  vec3 orb2Color = vec3(0.7, 0.3, 1.0);
  float orb2 = smoothstep(0.35, 0.0, orb2Dist);
  grad = mix(grad, orb2Color, orb2 * 0.7);

  // Orb 3 - Bright Pink/Magenta
  vec2 orb3Pos = vec2(0.35 + sin(t * 0.9) * 0.07, 0.7 + cos(t * 1.2) * 0.05);
  float orb3Dist = length(uv - orb3Pos);
  vec3 orb3Color = vec3(1.0, 0.3, 0.6);
  float orb3 = smoothstep(0.28, 0.0, orb3Dist);
  grad = mix(grad, orb3Color, orb3 * 0.7);

  // Orb 4 - Bright Cyan
  vec2 orb4Pos = vec2(0.7 + cos(t * 0.6) * 0.08, 0.75 + sin(t * 1.3) * 0.06);
  float orb4Dist = length(uv - orb4Pos);
  vec3 orb4Color = vec3(0.2, 0.9, 1.0);
  float orb4 = smoothstep(0.25, 0.0, orb4Dist);
  grad = mix(grad, orb4Color, orb4 * 0.6);

  // Orb 5 - Extra accent (orange/yellow)
  vec2 orb5Pos = vec2(0.5 + sin(t * 0.5) * 0.1, 0.5 + cos(t * 0.9) * 0.1);
  float orb5Dist = length(uv - orb5Pos);
  vec3 orb5Color = vec3(1.0, 0.5, 0.2);
  float orb5 = smoothstep(0.2, 0.0, orb5Dist);
  grad = mix(grad, orb5Color, orb5 * 0.5);

  fragColor = vec4(grad, 1.0);
}
`;

function createShader(
  gl: WebGL2RenderingContext,
  type: number,
  source: string,
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) {
    return null;
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Shader compile error:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function createProgram(
  gl: WebGL2RenderingContext,
  vertSrc: string,
  fragSrc: string,
): WebGLProgram | null {
  const vert = createShader(gl, gl.VERTEX_SHADER, vertSrc);
  const frag = createShader(gl, gl.FRAGMENT_SHADER, fragSrc);
  if (!vert || !frag) {
    return null;
  }

  const program = gl.createProgram();
  if (!program) {
    return null;
  }

  gl.attachShader(program, vert);
  gl.attachShader(program, frag);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Program link error:', gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }

  // Clean up shaders after linking
  gl.deleteShader(vert);
  gl.deleteShader(frag);

  return program;
}

function createPerspectiveMatrix(
  fovY: number,
  aspect: number,
  near: number,
  far: number,
): Float32Array {
  const f = 1.0 / Math.tan((fovY * Math.PI) / 360.0);
  const nf = 1.0 / (near - far);

  return new Float32Array([
    f / aspect,
    0,
    0,
    0,
    0,
    f,
    0,
    0,
    0,
    0,
    (far + near) * nf,
    -1,
    0,
    0,
    2 * far * near * nf,
    0,
  ]);
}

function createViewMatrix(cameraZ: number): Float32Array {
  // Simple translation for camera at (0, 0, cameraZ)
  return new Float32Array([
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    -cameraZ,
    1,
  ]);
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function GlassRendererWebGLProvider(props: { children: JSX.Element }) {
  const [isReady, setIsReady] = createSignal(false);
  const [webglSupported, setWebglSupported] = createSignal(true);
  let canvasRef: HTMLCanvasElement | undefined;
  let containerRef: HTMLDivElement | undefined;
  let instance: WebGL2GlassInstance | null = null;

  const doRegister = (id: string, element: HTMLElement) => {
    if (!instance) {
      return;
    }
    if (instance.elements.has(id)) {
      return;
    }

    const index = instance.elements.size;
    if (index >= MAX_INSTANCES) {
      console.warn('Max glass instances reached');
      return;
    }

    instance.elements.set(id, {
      id,
      element,
      index,
      targetRotX: 0,
      targetRotY: 0,
      currentRotX: 0,
      currentRotY: 0,
    });
  };

  const initRenderer = () => {
    if (!canvasRef || !containerRef) {
      return;
    }

    const canvas = canvasRef;
    const container = containerRef;
    const gl = canvas.getContext('webgl2', {
      alpha: true,
      antialias: true,
      premultipliedAlpha: false,
      powerPreference: 'high-performance',
    });

    if (!gl) {
      console.warn('WebGL2 not supported, falling back to CSS');
      setWebglSupported(false);
      return;
    }

    // Create glass shader program
    const program = createProgram(gl, vertexShaderSource, fragmentShaderSource);
    if (!program) {
      console.error('Failed to create glass shader program');
      setWebglSupported(false);
      return;
    }

    // Create background shader program
    const bgProgram = createProgram(gl, bgVertexShader, bgFragmentShader);
    if (!bgProgram) {
      console.error('Failed to create background shader program');
      setWebglSupported(false);
      return;
    }

    const rect = container.getBoundingClientRect();
    const width = rect.width || 800;
    const height = rect.height || 600;
    canvas.width = width * Math.min(window.devicePixelRatio, 2);
    canvas.height = height * Math.min(window.devicePixelRatio, 2);
    gl.viewport(0, 0, canvas.width, canvas.height);

    // Create VAO for glass quads
    const vao = gl.createVertexArray()!;
    gl.bindVertexArray(vao);

    // Quad geometry (positions)
    const positions = new Float32Array([
      -0.5, -0.5, 0, 0.5, -0.5, 0, 0.5, 0.5, 0, -0.5, 0.5, 0,
    ]);
    const positionBuffer = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const aPosition = gl.getAttribLocation(program, 'aPosition');
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, 0, 0);

    // Texture coordinates
    const texCoords = new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]);
    const texCoordBuffer = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW);

    const aTexCoord = gl.getAttribLocation(program, 'aTexCoord');
    gl.enableVertexAttribArray(aTexCoord);
    gl.vertexAttribPointer(aTexCoord, 2, gl.FLOAT, false, 0, 0);

    // Index buffer
    const indices = new Uint16Array([0, 1, 2, 0, 2, 3]);
    const indexBuffer = gl.createBuffer()!;
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

    // Instance buffers
    const modelMatrixBuffer = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, modelMatrixBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, MAX_INSTANCES * 16 * 4, gl.DYNAMIC_DRAW);

    // mat4 takes 4 attribute locations
    const aModelMatrix = gl.getAttribLocation(program, 'aModelMatrix');
    for (let i = 0; i < 4; i++) {
      const loc = aModelMatrix + i;
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 4, gl.FLOAT, false, 64, i * 16);
      gl.vertexAttribDivisor(loc, 1); // Instance attribute
    }

    const rotationBuffer = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, rotationBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, MAX_INSTANCES * 2 * 4, gl.DYNAMIC_DRAW);

    const aRotation = gl.getAttribLocation(program, 'aRotation');
    gl.enableVertexAttribArray(aRotation);
    gl.vertexAttribPointer(aRotation, 2, gl.FLOAT, false, 0, 0);
    gl.vertexAttribDivisor(aRotation, 1); // Instance attribute

    gl.bindVertexArray(null);

    // Create background VAO
    const bgVao = gl.createVertexArray()!;
    gl.bindVertexArray(bgVao);

    const bgPositions = new Float32Array([
      -1, -1, 1, -1, 1, 1, -1, -1, 1, 1, -1, 1,
    ]);
    const bgPosBuffer = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, bgPosBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, bgPositions, gl.STATIC_DRAW);

    const bgAPosition = gl.getAttribLocation(bgProgram, 'aPosition');
    gl.enableVertexAttribArray(bgAPosition);
    gl.vertexAttribPointer(bgAPosition, 2, gl.FLOAT, false, 0, 0);

    gl.bindVertexArray(null);

    // Create background texture and framebuffer
    const backgroundTexture = gl.createTexture()!;
    gl.bindTexture(gl.TEXTURE_2D, backgroundTexture);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      canvas.width,
      canvas.height,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      null,
    );
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    const backgroundFramebuffer = gl.createFramebuffer()!;
    gl.bindFramebuffer(gl.FRAMEBUFFER, backgroundFramebuffer);
    gl.framebufferTexture2D(
      gl.FRAMEBUFFER,
      gl.COLOR_ATTACHMENT0,
      gl.TEXTURE_2D,
      backgroundTexture,
      0,
    );

    // Check framebuffer is complete
    const fbStatus = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
    if (fbStatus !== gl.FRAMEBUFFER_COMPLETE) {
      console.error('Framebuffer not complete:', fbStatus);
    }

    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.bindTexture(gl.TEXTURE_2D, null);

    // Get uniform locations for glass shader
    const uniforms = {
      projectionMatrix: gl.getUniformLocation(program, 'uProjectionMatrix'),
      viewMatrix: gl.getUniformLocation(program, 'uViewMatrix'),
      backgroundTexture: gl.getUniformLocation(program, 'uBackgroundTexture'),
      ior: gl.getUniformLocation(program, 'uIOR'),
      thickness: gl.getUniformLocation(program, 'uThickness'),
      roughness: gl.getUniformLocation(program, 'uRoughness'),
      resolution: gl.getUniformLocation(program, 'uResolution'),
      chromaticAberration: gl.getUniformLocation(
        program,
        'uChromaticAberration',
      ),
    };

    // Get uniform locations for background shader
    const bgUniforms = {
      time: gl.getUniformLocation(bgProgram, 'uTime'),
      resolution: gl.getUniformLocation(bgProgram, 'uResolution'),
    };

    // Initialize matrices
    const projectionMatrix = createPerspectiveMatrix(
      FOV,
      width / height,
      NEAR,
      FAR,
    );
    const viewMatrix = createViewMatrix(CAMERA_Z);

    instance = {
      gl,
      program,
      vao,
      positionBuffer,
      texCoordBuffer,
      indexBuffer,
      modelMatrixBuffer,
      rotationBuffer,
      bgProgram,
      bgVao,
      backgroundTexture,
      backgroundFramebuffer,
      uniforms,
      bgUniforms,
      elements: new Map(),
      modelMatrices: new Float32Array(MAX_INSTANCES * 16),
      rotations: new Float32Array(MAX_INSTANCES * 2),
      instanceCount: 0,
      projectionMatrix,
      viewMatrix,
      animationId: 0,
      isRunning: true,
      lastHoverCheck: 0,
      resizeObserver: null,
      startTime: performance.now(),
    };

    // Resize observer
    const resizeObserver = new ResizeObserver((entries) => {
      if (!instance || !canvasRef) {
        return;
      }
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          const dpr = Math.min(window.devicePixelRatio, 2);
          canvasRef.width = width * dpr;
          canvasRef.height = height * dpr;
          instance.gl.viewport(0, 0, canvasRef.width, canvasRef.height);

          // Update projection matrix
          instance.projectionMatrix = createPerspectiveMatrix(
            FOV,
            width / height,
            NEAR,
            FAR,
          );

          // Resize background texture
          instance.gl.bindTexture(
            instance.gl.TEXTURE_2D,
            instance.backgroundTexture,
          );
          instance.gl.texImage2D(
            instance.gl.TEXTURE_2D,
            0,
            instance.gl.RGBA,
            canvasRef.width,
            canvasRef.height,
            0,
            instance.gl.RGBA,
            instance.gl.UNSIGNED_BYTE,
            null,
          );
        }
      }
    });
    resizeObserver.observe(container);
    instance.resizeObserver = resizeObserver;

    // Animation loop
    const animate = () => {
      if (!instance || !instance.isRunning || !containerRef || !canvasRef) {
        return;
      }
      instance.animationId = requestAnimationFrame(animate);

      const {
        gl,
        elements,
        bgProgram,
        bgVao,
        bgUniforms,
        program,
        vao,
        uniforms,
      } = instance;
      const now = performance.now();
      const time = now - instance.startTime;

      const shouldCheckHover = now - instance.lastHoverCheck > HOVER_THROTTLE;
      if (shouldCheckHover) {
        instance.lastHoverCheck = now;
      }

      const containerRect = containerRef.getBoundingClientRect();
      const containerWidth = containerRect.width;
      const containerHeight = containerRect.height;

      // Calculate visible dimensions in world space
      const vFOV = (FOV * Math.PI) / 180;
      const visibleHeight = 2 * Math.tan(vFOV / 2) * CAMERA_Z;
      const visibleWidth = visibleHeight * (containerWidth / containerHeight);

      // 1. Render background to texture
      gl.bindFramebuffer(gl.FRAMEBUFFER, instance.backgroundFramebuffer);
      gl.viewport(0, 0, canvasRef.width, canvasRef.height);
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(bgProgram);
      gl.bindVertexArray(bgVao);
      gl.uniform1f(bgUniforms.time, time);
      gl.uniform2f(bgUniforms.resolution, canvasRef.width, canvasRef.height);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      // Unbind VAO and framebuffer
      gl.bindVertexArray(null);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);

      // 2. Render to screen (background first)
      gl.viewport(0, 0, canvasRef.width, canvasRef.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      // Draw background to screen
      gl.useProgram(bgProgram);
      gl.bindVertexArray(bgVao);
      gl.uniform1f(bgUniforms.time, time);
      gl.uniform2f(bgUniforms.resolution, canvasRef.width, canvasRef.height);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      gl.bindVertexArray(null);

      // 3. Update instance data and render glass elements
      let visibleCount = 0;

      for (const item of elements.values()) {
        const rect = item.element.getBoundingClientRect();

        // Position relative to container
        const relLeft = rect.left - containerRect.left;
        const relTop = rect.top - containerRect.top;

        // Viewport culling
        if (relTop + rect.height < 0 || relTop > containerHeight) {
          continue;
        }

        // Calculate world position
        const x =
          ((relLeft + rect.width / 2 - containerWidth / 2) / containerWidth) *
          visibleWidth;
        const y =
          (-(relTop + rect.height / 2 - containerHeight / 2) /
            containerHeight) *
          visibleHeight;
        const scaleX = (rect.width / containerWidth) * visibleWidth;
        const scaleY = (rect.height / containerHeight) * visibleHeight;

        // Check hover
        if (shouldCheckHover) {
          const isHovered = item.element.matches(':hover');
          item.targetRotX = isHovered ? 0.1 : 0;
          item.targetRotY = isHovered ? 0.1 : 0;
        }

        // Lerp rotation
        item.currentRotX = lerp(item.currentRotX, item.targetRotX, 0.1);
        item.currentRotY = lerp(item.currentRotY, item.targetRotY, 0.1);

        // Build model matrix (translation + scale, rotation is handled in shader)
        const offset = visibleCount * 16;
        // Column 0
        instance.modelMatrices[offset + 0] = scaleX;
        instance.modelMatrices[offset + 1] = 0;
        instance.modelMatrices[offset + 2] = 0;
        instance.modelMatrices[offset + 3] = 0;
        // Column 1
        instance.modelMatrices[offset + 4] = 0;
        instance.modelMatrices[offset + 5] = scaleY;
        instance.modelMatrices[offset + 6] = 0;
        instance.modelMatrices[offset + 7] = 0;
        // Column 2
        instance.modelMatrices[offset + 8] = 0;
        instance.modelMatrices[offset + 9] = 0;
        instance.modelMatrices[offset + 10] = 1;
        instance.modelMatrices[offset + 11] = 0;
        // Column 3 (translation)
        instance.modelMatrices[offset + 12] = x;
        instance.modelMatrices[offset + 13] = y;
        instance.modelMatrices[offset + 14] = 0;
        instance.modelMatrices[offset + 15] = 1;

        // Rotation data
        instance.rotations[visibleCount * 2] = item.currentRotX;
        instance.rotations[visibleCount * 2 + 1] = item.currentRotY;

        visibleCount++;
      }

      if (visibleCount > 0) {
        // Upload instance data
        gl.bindBuffer(gl.ARRAY_BUFFER, instance.modelMatrixBuffer);
        gl.bufferSubData(
          gl.ARRAY_BUFFER,
          0,
          instance.modelMatrices.subarray(0, visibleCount * 16),
        );

        gl.bindBuffer(gl.ARRAY_BUFFER, instance.rotationBuffer);
        gl.bufferSubData(
          gl.ARRAY_BUFFER,
          0,
          instance.rotations.subarray(0, visibleCount * 2),
        );

        // Draw glass elements
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        gl.useProgram(program);
        gl.bindVertexArray(vao);

        // Set uniforms
        gl.uniformMatrix4fv(
          uniforms.projectionMatrix,
          false,
          instance.projectionMatrix,
        );
        gl.uniformMatrix4fv(uniforms.viewMatrix, false, instance.viewMatrix);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, instance.backgroundTexture);
        gl.uniform1i(uniforms.backgroundTexture, 0);

        gl.uniform1f(uniforms.ior, 1.45);
        gl.uniform1f(uniforms.thickness, 2.5);
        gl.uniform1f(uniforms.roughness, 0.03);
        gl.uniform2f(uniforms.resolution, canvasRef.width, canvasRef.height);
        gl.uniform1f(uniforms.chromaticAberration, 0.02);

        gl.drawElementsInstanced(
          gl.TRIANGLES,
          6,
          gl.UNSIGNED_SHORT,
          0,
          visibleCount,
        );

        gl.disable(gl.BLEND);
      }

      instance.instanceCount = visibleCount;
    };

    animate();
    setIsReady(true);
  };

  const destroyRenderer = () => {
    if (!instance) {
      return;
    }

    instance.isRunning = false;
    cancelAnimationFrame(instance.animationId);

    if (instance.resizeObserver) {
      instance.resizeObserver.disconnect();
    }

    const { gl } = instance;

    gl.deleteProgram(instance.program);
    gl.deleteProgram(instance.bgProgram);
    gl.deleteVertexArray(instance.vao);
    gl.deleteVertexArray(instance.bgVao);
    gl.deleteBuffer(instance.positionBuffer);
    gl.deleteBuffer(instance.texCoordBuffer);
    gl.deleteBuffer(instance.indexBuffer);
    gl.deleteBuffer(instance.modelMatrixBuffer);
    gl.deleteBuffer(instance.rotationBuffer);
    gl.deleteTexture(instance.backgroundTexture);
    gl.deleteFramebuffer(instance.backgroundFramebuffer);

    instance.elements.clear();
    instance = null;
  };

  const register = (id: string, element: HTMLElement) => {
    if (!instance || !isReady()) {
      return;
    }
    doRegister(id, element);
  };

  const unregister = (id: string) => {
    if (!instance) {
      return;
    }
    instance.elements.delete(id);
  };

  onMount(() => {
    initRenderer();
  });

  onCleanup(() => {
    destroyRenderer();
  });

  const contextValue: GlassRendererWebGLContextValue = {
    register,
    unregister,
    isReady,
    webglSupported,
  };

  // CSS fallback styles
  const cssFallbackClass =
    'backdrop-blur-lg bg-white/10 border border-white/20';

  return (
    <GlassRendererWebGLContext.Provider value={contextValue}>
      {webglSupported() ? (
        <div ref={containerRef} class="relative w-full min-h-[inherit]">
          <canvas
            ref={canvasRef}
            class="absolute inset-0 w-full h-full pointer-events-none rounded-[inherit]"
            style={{ 'z-index': 0 }}
          />
          <div class="relative" style={{ 'z-index': 10 }}>
            {props.children}
          </div>
        </div>
      ) : (
        <div class="relative w-full min-h-[inherit]">
          <div
            class="absolute inset-0 w-full h-full rounded-[inherit]"
            style={{
              background:
                'radial-gradient(circle at center, #1e1b4b 0%, #312e81 50%, #4c1d95 100%)',
              'z-index': 0,
            }}
          />
          <div class="relative" style={{ 'z-index': 10 }}>
            {props.children}
          </div>
        </div>
      )}
    </GlassRendererWebGLContext.Provider>
  );
}

export function useGlassRendererWebGL() {
  const ctx = useContext(GlassRendererWebGLContext);
  if (!ctx) {
    throw new Error(
      'useGlassRendererWebGL must be used within GlassRendererWebGLProvider',
    );
  }
  return ctx;
}

let idCounterWebGL = 0;

export function GlassSurfaceWebGL(props: {
  children: JSX.Element;
  class?: string;
  as?: 'div' | 'button' | 'a' | 'span' | 'section' | 'article';
}) {
  const ctx = useContext(GlassRendererWebGLContext);
  const id = `glass-webgl-${++idCounterWebGL}`;
  let elementRef: HTMLElement | null = null;

  const setRef = (el: HTMLElement) => {
    elementRef = el;
    if (ctx && el) {
      ctx.register(id, el);
    }
  };

  createEffect(() => {
    if (ctx?.isReady() && elementRef) {
      ctx.register(id, elementRef);
    }
  });

  onCleanup(() => {
    if (ctx) {
      ctx.unregister(id);
    }
  });

  const Tag = props.as || 'div';

  // CSS fallback class when WebGL is not supported
  const fallbackClass = () =>
    ctx?.webglSupported()
      ? props.class
      : `${props.class || ''} backdrop-blur-lg bg-white/10 border border-white/20`;

  switch (Tag) {
    case 'button':
      return (
        <button ref={setRef} class={fallbackClass()}>
          {props.children}
        </button>
      );
    case 'a':
      return (
        <a ref={setRef} class={fallbackClass()}>
          {props.children}
        </a>
      );
    case 'span':
      return (
        <span ref={setRef} class={fallbackClass()}>
          {props.children}
        </span>
      );
    case 'section':
      return (
        <section ref={setRef} class={fallbackClass()}>
          {props.children}
        </section>
      );
    case 'article':
      return (
        <article ref={setRef} class={fallbackClass()}>
          {props.children}
        </article>
      );
    default:
      return (
        <div ref={setRef} class={fallbackClass()}>
          {props.children}
        </div>
      );
  }
}
