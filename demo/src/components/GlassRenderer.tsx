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
import type * as THREE from 'three';

// Types
interface GlassElement {
  id: string;
  element: HTMLElement;
  mesh: THREE.Mesh;
  targetRotX: number;
  targetRotY: number;
}

interface GlassRendererContextValue {
  register: (id: string, element: HTMLElement) => void;
  unregister: (id: string) => void;
  isReady: Accessor<boolean>;
}

const GlassRendererContext = createContext<GlassRendererContextValue>();

const HOVER_THROTTLE = 50;

export function GlassRendererProvider(props: { children: JSX.Element }) {
  const [isReady, setIsReady] = createSignal(false);
  let canvasRef: HTMLCanvasElement | undefined;
  let containerRef: HTMLDivElement | undefined;

  // Local instance for this provider (not singleton anymore for proper container sizing)
  let instance: {
    THREE: typeof THREE;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    glassMaterial: THREE.MeshPhysicalMaterial;
    geometry: THREE.BufferGeometry;
    bgPlane: THREE.Mesh;
    bgTexture: THREE.CanvasTexture;
    elements: Map<string, GlassElement>;
    animationId: number;
    isRunning: boolean;
    lastHoverCheck: number;
    resizeObserver: ResizeObserver | null;
  } | null = null;

  const doRegister = (id: string, element: HTMLElement) => {
    if (!instance) {
      return;
    }
    if (instance.elements.has(id)) {
      return;
    }

    const mesh = new instance.THREE.Mesh(
      instance.geometry,
      instance.glassMaterial,
    );
    instance.scene.add(mesh);

    instance.elements.set(id, {
      id,
      element,
      mesh,
      targetRotX: 0,
      targetRotY: 0,
    });
  };

  const initRenderer = async () => {
    if (!canvasRef || !containerRef) {
      return;
    }

    const THREE = await import('three');
    const { RoundedBoxGeometry } = await import(
      'three/addons/geometries/RoundedBoxGeometry.js'
    );

    const canvas = canvasRef;
    const container = containerRef;
    const rect = container.getBoundingClientRect();

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      rect.width / rect.height,
      0.1,
      1000,
    );
    camera.position.z = 50;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(rect.width, rect.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Background
    const bgCanvas = document.createElement('canvas');
    bgCanvas.width = 1024;
    bgCanvas.height = 1024;
    const ctx = bgCanvas.getContext('2d')!;

    const grad = ctx.createRadialGradient(512, 512, 0, 512, 512, 700);
    grad.addColorStop(0, '#1e1b4b');
    grad.addColorStop(0.5, '#312e81');
    grad.addColorStop(1, '#4c1d95');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 1024);

    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 1024; i += 64) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, 1024);
      ctx.stroke();
      ctx.moveTo(0, i);
      ctx.lineTo(1024, i);
      ctx.stroke();
    }

    const drawOrb = (x: number, y: number, r: number, color: string) => {
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, color);
      g.addColorStop(1, 'transparent');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    };
    drawOrb(200, 200, 200, 'rgba(99, 102, 241, 0.8)');
    drawOrb(800, 300, 250, 'rgba(168, 85, 247, 0.7)');
    drawOrb(300, 700, 220, 'rgba(236, 72, 153, 0.6)');
    drawOrb(750, 800, 180, 'rgba(34, 211, 238, 0.5)');

    const bgTexture = new THREE.CanvasTexture(bgCanvas);
    const bgGeometry = new THREE.PlaneGeometry(160, 160);
    const bgMaterial = new THREE.MeshBasicMaterial({ map: bgTexture });
    const bgPlane = new THREE.Mesh(bgGeometry, bgMaterial);
    bgPlane.position.z = -12;
    scene.add(bgPlane);

    const glassMaterial = new THREE.MeshPhysicalMaterial({
      transmission: 1,
      thickness: 2.5,
      roughness: 0.03,
      ior: 1.45,
      color: 0xffffff,
      clearcoat: 1,
      clearcoatRoughness: 0,
      metalness: 0,
      side: THREE.DoubleSide,
    });

    const geometry = new RoundedBoxGeometry(1, 1, 0.25, 4, 0.15);

    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
    keyLight.position.set(5, 5, 10);
    scene.add(keyLight);
    const fillLight = new THREE.DirectionalLight(0xa78bfa, 0.4);
    fillLight.position.set(-5, 0, 5);
    scene.add(fillLight);

    instance = {
      THREE,
      scene,
      camera,
      renderer,
      glassMaterial,
      geometry,
      bgPlane,
      bgTexture,
      elements: new Map(),
      animationId: 0,
      isRunning: true,
      lastHoverCheck: 0,
      resizeObserver: null,
    };

    // Resize observer for container
    const resizeObserver = new ResizeObserver((entries) => {
      if (!instance) {
        return;
      }
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          instance.camera.aspect = width / height;
          instance.camera.updateProjectionMatrix();
          instance.renderer.setSize(width, height);
        }
      }
    });
    resizeObserver.observe(container);
    instance.resizeObserver = resizeObserver;

    const animate = () => {
      if (!instance || !instance.isRunning || !containerRef) {
        return;
      }
      instance.animationId = requestAnimationFrame(animate);

      const {
        THREE: T,
        camera: cam,
        elements,
        bgPlane: bg,
        renderer: rend,
        scene: sc,
      } = instance;

      const now = performance.now();
      const shouldCheckHover = now - instance.lastHoverCheck > HOVER_THROTTLE;
      if (shouldCheckHover) {
        instance.lastHoverCheck = now;
      }

      // Use container dimensions
      const containerRect = containerRef.getBoundingClientRect();
      const containerWidth = containerRect.width;
      const containerHeight = containerRect.height;

      const vFOV = T.MathUtils.degToRad(cam.fov);
      const visibleHeight = 2 * Math.tan(vFOV / 2) * cam.position.z;
      const visibleWidth = visibleHeight * cam.aspect;

      for (const item of elements.values()) {
        const rect = item.element.getBoundingClientRect();

        // Position relative to container
        const relLeft = rect.left - containerRect.left;
        const relTop = rect.top - containerRect.top;

        // Viewport culling relative to container
        if (relTop + rect.height < 0 || relTop > containerHeight) {
          item.mesh.visible = false;
          continue;
        }
        item.mesh.visible = true;

        const x =
          ((relLeft + rect.width / 2 - containerWidth / 2) / containerWidth) *
          visibleWidth;
        const y =
          (-(relTop + rect.height / 2 - containerHeight / 2) /
            containerHeight) *
          visibleHeight;

        item.mesh.position.set(x, y, 0);
        item.mesh.scale.set(
          (rect.width / containerWidth) * visibleWidth,
          (rect.height / containerHeight) * visibleHeight,
          1,
        );

        if (shouldCheckHover) {
          const isHovered = item.element.matches(':hover');
          item.targetRotX = isHovered ? 0.1 : 0;
          item.targetRotY = isHovered ? 0.1 : 0;
        }
        item.mesh.rotation.x = T.MathUtils.lerp(
          item.mesh.rotation.x,
          item.targetRotX,
          0.1,
        );
        item.mesh.rotation.y = T.MathUtils.lerp(
          item.mesh.rotation.y,
          item.targetRotY,
          0.1,
        );
      }

      const t = now * 0.0001;
      bg.position.x = Math.sin(t) * 1.5;
      bg.position.y = Math.cos(t * 0.8) * 1.5;

      rend.render(sc, cam);
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

    for (const item of instance.elements.values()) {
      instance.scene.remove(item.mesh);
    }
    instance.elements.clear();

    instance.geometry.dispose();
    instance.glassMaterial.dispose();
    instance.bgTexture.dispose();
    instance.scene.clear();
    instance.renderer.dispose();
    instance.renderer.forceContextLoss();

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

    const item = instance.elements.get(id);
    if (item) {
      instance.scene.remove(item.mesh);
      instance.elements.delete(id);
    }
  };

  onMount(() => {
    initRenderer();
  });

  onCleanup(() => {
    destroyRenderer();
  });

  const contextValue: GlassRendererContextValue = {
    register,
    unregister,
    isReady,
  };

  return (
    <GlassRendererContext.Provider value={contextValue}>
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
    </GlassRendererContext.Provider>
  );
}

export function useGlassRenderer() {
  const ctx = useContext(GlassRendererContext);
  if (!ctx) {
    throw new Error(
      'useGlassRenderer must be used within GlassRendererProvider',
    );
  }
  return ctx;
}

let idCounter = 0;

export function GlassSurface(props: {
  children: JSX.Element;
  class?: string;
  as?: 'div' | 'button' | 'a' | 'span' | 'section' | 'article';
}) {
  const ctx = useContext(GlassRendererContext);
  const id = `glass-${++idCounter}`;
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

  switch (Tag) {
    case 'button':
      return (
        <button ref={setRef} class={props.class}>
          {props.children}
        </button>
      );
    case 'a':
      return (
        <a ref={setRef} class={props.class}>
          {props.children}
        </a>
      );
    case 'span':
      return (
        <span ref={setRef} class={props.class}>
          {props.children}
        </span>
      );
    case 'section':
      return (
        <section ref={setRef} class={props.class}>
          {props.children}
        </section>
      );
    case 'article':
      return (
        <article ref={setRef} class={props.class}>
          {props.children}
        </article>
      );
    default:
      return (
        <div ref={setRef} class={props.class}>
          {props.children}
        </div>
      );
  }
}
