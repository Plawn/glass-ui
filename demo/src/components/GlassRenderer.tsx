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

// Context
const GlassRendererContext = createContext<GlassRendererContextValue>();

// Singleton state
let rendererInstance: {
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
  canvas: HTMLCanvasElement;
  pendingRegistrations: Array<{ id: string; element: HTMLElement }>;
} | null = null;

let refCount = 0;

export function GlassRendererProvider(props: { children: JSX.Element }) {
  const [isReady, setIsReady] = createSignal(false);
  let canvasRef: HTMLCanvasElement | undefined;

  const doRegister = (id: string, element: HTMLElement) => {
    if (!rendererInstance) {
      return;
    }

    // Don't register twice
    if (rendererInstance.elements.has(id)) {
      return;
    }

    const mesh = new rendererInstance.THREE.Mesh(
      rendererInstance.geometry,
      rendererInstance.glassMaterial,
    );
    rendererInstance.scene.add(mesh);

    rendererInstance.elements.set(id, {
      id,
      element,
      mesh,
      targetRotX: 0,
      targetRotY: 0,
    });
  };

  const initRenderer = async () => {
    if (rendererInstance) {
      refCount++;
      // Process any pending registrations
      for (const { id, element } of rendererInstance.pendingRegistrations) {
        doRegister(id, element);
      }
      rendererInstance.pendingRegistrations = [];
      setIsReady(true);
      return;
    }

    const THREE = await import('three');
    const { RoundedBoxGeometry } = await import(
      'three/addons/geometries/RoundedBoxGeometry.js'
    );

    const canvas = canvasRef!;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
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
    renderer.setSize(window.innerWidth, window.innerHeight);
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

    rendererInstance = {
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
      canvas,
      pendingRegistrations: [],
    };

    refCount = 1;

    const handleResize = () => {
      if (!rendererInstance) {
        return;
      }
      rendererInstance.camera.aspect = window.innerWidth / window.innerHeight;
      rendererInstance.camera.updateProjectionMatrix();
      rendererInstance.renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    const animate = () => {
      if (!rendererInstance || !rendererInstance.isRunning) {
        return;
      }
      rendererInstance.animationId = requestAnimationFrame(animate);

      const {
        THREE: T,
        camera: cam,
        elements,
        bgPlane: bg,
        renderer: rend,
        scene: sc,
      } = rendererInstance;

      const vFOV = T.MathUtils.degToRad(cam.fov);
      const visibleHeight = 2 * Math.tan(vFOV / 2) * cam.position.z;
      const visibleWidth = visibleHeight * cam.aspect;

      for (const item of elements.values()) {
        const rect = item.element.getBoundingClientRect();

        if (rect.bottom < 0 || rect.top > window.innerHeight) {
          item.mesh.visible = false;
          continue;
        }
        item.mesh.visible = true;

        const x =
          ((rect.left + rect.width / 2 - window.innerWidth / 2) /
            window.innerWidth) *
          visibleWidth;
        const y =
          (-(rect.top + rect.height / 2 - window.innerHeight / 2) /
            window.innerHeight) *
          visibleHeight;

        item.mesh.position.set(x, y, 0);
        item.mesh.scale.set(
          (rect.width / window.innerWidth) * visibleWidth,
          (rect.height / window.innerHeight) * visibleHeight,
          1,
        );

        const isHovered = item.element.matches(':hover');
        item.targetRotX = isHovered ? 0.1 : 0;
        item.targetRotY = isHovered ? 0.1 : 0;
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

      const t = Date.now() * 0.0001;
      bg.position.x = Math.sin(t) * 1.5;
      bg.position.y = Math.cos(t * 0.8) * 1.5;

      rend.render(sc, cam);
    };

    animate();
    setIsReady(true);
  };

  const destroyRenderer = () => {
    if (!rendererInstance) {
      return;
    }

    refCount--;
    if (refCount > 0) {
      return;
    }

    rendererInstance.isRunning = false;
    cancelAnimationFrame(rendererInstance.animationId);

    for (const item of rendererInstance.elements.values()) {
      rendererInstance.scene.remove(item.mesh);
    }
    rendererInstance.elements.clear();

    rendererInstance.geometry.dispose();
    rendererInstance.glassMaterial.dispose();
    rendererInstance.bgTexture.dispose();
    rendererInstance.scene.clear();
    rendererInstance.renderer.dispose();
    rendererInstance.renderer.forceContextLoss();

    rendererInstance = null;
  };

  const register = (id: string, element: HTMLElement) => {
    if (!rendererInstance || !isReady()) {
      // Queue for later
      if (rendererInstance) {
        rendererInstance.pendingRegistrations.push({ id, element });
      }
      return;
    }
    doRegister(id, element);
  };

  const unregister = (id: string) => {
    if (!rendererInstance) {
      return;
    }

    const item = rendererInstance.elements.get(id);
    if (item) {
      rendererInstance.scene.remove(item.mesh);
      rendererInstance.elements.delete(id);
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
      <canvas
        ref={canvasRef}
        class="fixed inset-0 w-full h-full pointer-events-none"
        style={{ 'z-index': 0 }}
      />
      <div class="relative" style={{ 'z-index': 10 }}>
        {props.children}
      </div>
    </GlassRendererContext.Provider>
  );
}

// Hook
export function useGlassRenderer() {
  const ctx = useContext(GlassRendererContext);
  if (!ctx) {
    throw new Error(
      'useGlassRenderer must be used within GlassRendererProvider',
    );
  }
  return ctx;
}

// Component
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
