import { createSignal } from 'solid-js';
import {
  GlassRendererProvider,
  GlassSurface,
} from '../../components/GlassRenderer';
import {
  GlassRendererWebGLProvider,
  GlassSurfaceWebGL,
} from '../../components/GlassRendererWebGL';

export default function Glass3DButtonsPage() {
  const [useWebGL, setUseWebGL] = createSignal(false);

  // Dynamically select components based on toggle
  const Provider = () =>
    useWebGL() ? GlassRendererWebGLProvider : GlassRendererProvider;
  const Surface = () => (useWebGL() ? GlassSurfaceWebGL : GlassSurface);

  return (
    <div class="min-h-[80vh] rounded-2xl overflow-hidden">
      {/* Renderer Toggle */}
      <div class="absolute top-4 right-4 z-50 flex items-center gap-3 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
        <span class="text-white/70 text-sm font-medium">Three.js</span>
        <button
          type="button"
          class={`relative w-12 h-6 rounded-full transition-colors ${
            useWebGL() ? 'bg-emerald-500' : 'bg-white/20'
          }`}
          onClick={() => setUseWebGL(!useWebGL())}
        >
          <span
            class={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
              useWebGL() ? 'translate-x-7' : 'translate-x-1'
            }`}
          />
        </button>
        <span class="text-white/70 text-sm font-medium">WebGL Pure</span>
        <span
          class={`text-xs px-2 py-0.5 rounded-full ${
            useWebGL()
              ? 'bg-emerald-500/20 text-emerald-300'
              : 'bg-purple-500/20 text-purple-300'
          }`}
        >
          {useWebGL() ? '~10kb' : '~600kb'}
        </span>
      </div>

      {useWebGL() ? (
        <GlassRendererWebGLProvider>
          <GlassContent Surface={GlassSurfaceWebGL} isWebGL />
        </GlassRendererWebGLProvider>
      ) : (
        <GlassRendererProvider>
          <GlassContent Surface={GlassSurface} isWebGL={false} />
        </GlassRendererProvider>
      )}
    </div>
  );
}

// Extracted content component to avoid duplication
function GlassContent(props: {
  Surface: typeof GlassSurface | typeof GlassSurfaceWebGL;
  isWebGL: boolean;
}) {
  const Surface = props.Surface;

  return (
    <>
      {/* Hero */}
      <div class="min-h-[35vh] flex flex-col items-center justify-center text-center px-6 pt-12">
        <h1 class="text-5xl md:text-6xl font-black text-white mb-3 tracking-tight">
          Glass Surface
        </h1>
        <p class="text-base text-white/50 max-w-md">
          {props.isWebGL
            ? 'Version WebGL pure - ~10kb, pas de dépendance Three.js'
            : 'Version Three.js - PBR transmission, qualité maximale'}
        </p>
      </div>

      {/* Icon buttons grid */}
      <div class="flex flex-wrap justify-center gap-5 px-6 py-8 max-w-3xl mx-auto">
        <Surface
          as="button"
          class="w-32 h-32 rounded-2xl cursor-pointer transition-transform hover:scale-105 flex flex-col items-center justify-center gap-2"
        >
          <svg
            class="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
          <span class="text-white text-sm font-medium">Home</span>
        </Surface>

        <Surface
          as="button"
          class="w-32 h-32 rounded-2xl cursor-pointer transition-transform hover:scale-105 flex flex-col items-center justify-center gap-2"
        >
          <svg
            class="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          <span class="text-white text-sm font-medium">Search</span>
        </Surface>

        <Surface
          as="button"
          class="w-32 h-32 rounded-2xl cursor-pointer transition-transform hover:scale-105 flex flex-col items-center justify-center gap-2"
        >
          <svg
            class="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
          <span class="text-white text-sm font-medium">Profile</span>
        </Surface>

        <Surface
          as="button"
          class="w-32 h-32 rounded-2xl cursor-pointer transition-transform hover:scale-105 flex flex-col items-center justify-center gap-2"
        >
          <svg
            class="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span class="text-white text-sm font-medium">Settings</span>
        </Surface>
      </div>

      {/* Pill buttons */}
      <div class="flex flex-wrap justify-center gap-3 px-6 py-6">
        <Surface
          as="button"
          class="h-12 px-6 rounded-full cursor-pointer transition-transform hover:scale-105 flex items-center gap-2"
        >
          <svg
            class="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          <span class="text-white text-sm font-medium">New Project</span>
        </Surface>

        <Surface
          as="button"
          class="h-12 px-6 rounded-full cursor-pointer transition-transform hover:scale-105 flex items-center"
        >
          <span class="text-white text-sm font-medium">Documentation</span>
        </Surface>

        <Surface
          as="button"
          class="h-12 px-6 rounded-full cursor-pointer transition-transform hover:scale-105 flex items-center"
        >
          <span class="text-white text-sm font-medium">Examples</span>
        </Surface>
      </div>

      {/* Cards */}
      <div class="px-6 py-8 max-w-4xl mx-auto">
        <div class="grid md:grid-cols-2 gap-5">
          <Surface class="rounded-2xl p-6">
            <h3 class="text-xl font-bold text-white mb-2">
              {props.isWebGL ? 'WebGL2 Instancing' : 'Single Renderer'}
            </h3>
            <p class="text-white/50 text-sm leading-relaxed">
              {props.isWebGL
                ? 'Utilise gl.drawElementsInstanced() pour dessiner tous les éléments en un seul draw call.'
                : 'Un seul contexte WebGL partagé entre tous les composants GlassSurface. Les meshes sont créés/détruits dynamiquement.'}
            </p>
          </Surface>

          <Surface class="rounded-2xl p-6">
            <h3 class="text-xl font-bold text-white mb-2">
              {props.isWebGL ? 'Chromatic Aberration' : 'Auto Cleanup'}
            </h3>
            <p class="text-white/50 text-sm leading-relaxed">
              {props.isWebGL
                ? "Effet d'aberration chromatique dans le shader pour un rendu glass plus réaliste."
                : 'Les éléments sont automatiquement enregistrés au mount et nettoyés au unmount. Pas de memory leaks.'}
            </p>
          </Surface>

          <Surface class="rounded-2xl p-6">
            <h3 class="text-xl font-bold text-white mb-2">Viewport Culling</h3>
            <p class="text-white/50 text-sm leading-relaxed">
              Les éléments hors écran ne sont pas rendus. Scroll pour voir
              l'effet.
            </p>
          </Surface>

          <Surface class="rounded-2xl p-6">
            <h3 class="text-xl font-bold text-white mb-2">
              {props.isWebGL ? 'Zero Dependencies' : 'Shared Resources'}
            </h3>
            <p class="text-white/50 text-sm leading-relaxed">
              {props.isWebGL
                ? 'Aucune dépendance externe - WebGL2 pur avec shaders GLSL ES 3.0.'
                : 'Geometry et Material partagés. Seule la position/scale/rotation varie par élément.'}
            </p>
          </Surface>
        </div>
      </div>

      {/* Usage code */}
      <div class="px-6 py-6 max-w-2xl mx-auto">
        <div class="bg-black/50 backdrop-blur-sm rounded-xl p-5 border border-white/10">
          <h3 class="text-sm font-bold text-white/70 mb-3 uppercase tracking-wider">
            Usage {props.isWebGL ? '(WebGL Pure)' : '(Three.js)'}
          </h3>
          <pre class="text-sm text-white/80 font-mono overflow-x-auto">
            <code>
              {props.isWebGL
                ? `<GlassRendererWebGLProvider>
  <GlassSurfaceWebGL as="button" class="...">
    Click me
  </GlassSurfaceWebGL>

  <GlassSurfaceWebGL class="rounded-2xl p-6">
    Card content
  </GlassSurfaceWebGL>
</GlassRendererWebGLProvider>`
                : `<GlassRendererProvider>
  <GlassSurface as="button" class="...">
    Click me
  </GlassSurface>

  <GlassSurface class="rounded-2xl p-6">
    Card content
  </GlassSurface>
</GlassRendererProvider>`}
            </code>
          </pre>
        </div>
      </div>

      {/* More items to test scroll */}
      <div class="px-6 py-8">
        <p class="text-center text-white/30 text-sm mb-6">
          Scroll test - more surfaces below
        </p>
        <div class="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
          <Surface
            as="button"
            class="w-24 h-24 rounded-xl cursor-pointer transition-transform hover:scale-105 flex items-center justify-center"
          >
            <span class="text-white text-2xl font-bold">1</span>
          </Surface>
          <Surface
            as="button"
            class="w-24 h-24 rounded-xl cursor-pointer transition-transform hover:scale-105 flex items-center justify-center"
          >
            <span class="text-white text-2xl font-bold">2</span>
          </Surface>
          <Surface
            as="button"
            class="w-24 h-24 rounded-xl cursor-pointer transition-transform hover:scale-105 flex items-center justify-center"
          >
            <span class="text-white text-2xl font-bold">3</span>
          </Surface>
          <Surface
            as="button"
            class="w-24 h-24 rounded-xl cursor-pointer transition-transform hover:scale-105 flex items-center justify-center"
          >
            <span class="text-white text-2xl font-bold">4</span>
          </Surface>
          <Surface
            as="button"
            class="w-24 h-24 rounded-xl cursor-pointer transition-transform hover:scale-105 flex items-center justify-center"
          >
            <span class="text-white text-2xl font-bold">5</span>
          </Surface>
          <Surface
            as="button"
            class="w-24 h-24 rounded-xl cursor-pointer transition-transform hover:scale-105 flex items-center justify-center"
          >
            <span class="text-white text-2xl font-bold">6</span>
          </Surface>
          <Surface
            as="button"
            class="w-24 h-24 rounded-xl cursor-pointer transition-transform hover:scale-105 flex items-center justify-center"
          >
            <span class="text-white text-2xl font-bold">7</span>
          </Surface>
          <Surface
            as="button"
            class="w-24 h-24 rounded-xl cursor-pointer transition-transform hover:scale-105 flex items-center justify-center"
          >
            <span class="text-white text-2xl font-bold">8</span>
          </Surface>
        </div>
      </div>

      <div class="h-24" />
    </>
  );
}
