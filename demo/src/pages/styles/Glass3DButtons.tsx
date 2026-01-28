import {
  GlassRendererProvider,
  GlassSurface,
} from '../../components/GlassRenderer';

export default function Glass3DButtonsPage() {
  return (
    <div class="-m-4 -mt-8 min-h-screen overflow-hidden">
      <GlassRendererProvider>
        {/* Hero */}
        <div class="min-h-[35vh] flex flex-col items-center justify-center text-center px-6 pt-12">
          <h1 class="text-5xl md:text-6xl font-black text-white mb-3 tracking-tight">
            Glass Surface
          </h1>
          <p class="text-base text-white/50 max-w-md">
            Composant réutilisable avec renderer WebGL partagé
          </p>
        </div>

        {/* Icon buttons grid */}
        <div class="flex flex-wrap justify-center gap-5 px-6 py-8 max-w-3xl mx-auto">
          <GlassSurface
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
          </GlassSurface>

          <GlassSurface
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
          </GlassSurface>

          <GlassSurface
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
          </GlassSurface>

          <GlassSurface
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
          </GlassSurface>
        </div>

        {/* Pill buttons */}
        <div class="flex flex-wrap justify-center gap-3 px-6 py-6">
          <GlassSurface
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
          </GlassSurface>

          <GlassSurface
            as="button"
            class="h-12 px-6 rounded-full cursor-pointer transition-transform hover:scale-105 flex items-center"
          >
            <span class="text-white text-sm font-medium">Documentation</span>
          </GlassSurface>

          <GlassSurface
            as="button"
            class="h-12 px-6 rounded-full cursor-pointer transition-transform hover:scale-105 flex items-center"
          >
            <span class="text-white text-sm font-medium">Examples</span>
          </GlassSurface>
        </div>

        {/* Cards */}
        <div class="px-6 py-8 max-w-4xl mx-auto">
          <div class="grid md:grid-cols-2 gap-5">
            <GlassSurface class="rounded-2xl p-6">
              <h3 class="text-xl font-bold text-white mb-2">Single Renderer</h3>
              <p class="text-white/50 text-sm leading-relaxed">
                Un seul contexte WebGL partagé entre tous les composants
                GlassSurface. Les meshes sont créés/détruits dynamiquement.
              </p>
            </GlassSurface>

            <GlassSurface class="rounded-2xl p-6">
              <h3 class="text-xl font-bold text-white mb-2">Auto Cleanup</h3>
              <p class="text-white/50 text-sm leading-relaxed">
                Les éléments sont automatiquement enregistrés au mount et
                nettoyés au unmount. Pas de memory leaks.
              </p>
            </GlassSurface>

            <GlassSurface class="rounded-2xl p-6">
              <h3 class="text-xl font-bold text-white mb-2">
                Viewport Culling
              </h3>
              <p class="text-white/50 text-sm leading-relaxed">
                Les éléments hors écran ne sont pas rendus. Scroll pour voir
                l'effet.
              </p>
            </GlassSurface>

            <GlassSurface class="rounded-2xl p-6">
              <h3 class="text-xl font-bold text-white mb-2">
                Shared Resources
              </h3>
              <p class="text-white/50 text-sm leading-relaxed">
                Geometry et Material partagés. Seule la position/scale/rotation
                varie par élément.
              </p>
            </GlassSurface>
          </div>
        </div>

        {/* Usage code */}
        <div class="px-6 py-6 max-w-2xl mx-auto">
          <div class="bg-black/50 backdrop-blur-sm rounded-xl p-5 border border-white/10">
            <h3 class="text-sm font-bold text-white/70 mb-3 uppercase tracking-wider">
              Usage
            </h3>
            <pre class="text-sm text-white/80 font-mono overflow-x-auto">
              <code>{`<GlassRendererProvider>
  <GlassSurface as="button" class="...">
    Click me
  </GlassSurface>

  <GlassSurface class="rounded-2xl p-6">
    Card content
  </GlassSurface>
</GlassRendererProvider>`}</code>
            </pre>
          </div>
        </div>

        {/* More items to test scroll */}
        <div class="px-6 py-8">
          <p class="text-center text-white/30 text-sm mb-6">
            Scroll test - more surfaces below
          </p>
          <div class="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
            <GlassSurface
              as="button"
              class="w-24 h-24 rounded-xl cursor-pointer transition-transform hover:scale-105 flex items-center justify-center"
            >
              <span class="text-white text-2xl font-bold">1</span>
            </GlassSurface>
            <GlassSurface
              as="button"
              class="w-24 h-24 rounded-xl cursor-pointer transition-transform hover:scale-105 flex items-center justify-center"
            >
              <span class="text-white text-2xl font-bold">2</span>
            </GlassSurface>
            <GlassSurface
              as="button"
              class="w-24 h-24 rounded-xl cursor-pointer transition-transform hover:scale-105 flex items-center justify-center"
            >
              <span class="text-white text-2xl font-bold">3</span>
            </GlassSurface>
            <GlassSurface
              as="button"
              class="w-24 h-24 rounded-xl cursor-pointer transition-transform hover:scale-105 flex items-center justify-center"
            >
              <span class="text-white text-2xl font-bold">4</span>
            </GlassSurface>
            <GlassSurface
              as="button"
              class="w-24 h-24 rounded-xl cursor-pointer transition-transform hover:scale-105 flex items-center justify-center"
            >
              <span class="text-white text-2xl font-bold">5</span>
            </GlassSurface>
            <GlassSurface
              as="button"
              class="w-24 h-24 rounded-xl cursor-pointer transition-transform hover:scale-105 flex items-center justify-center"
            >
              <span class="text-white text-2xl font-bold">6</span>
            </GlassSurface>
            <GlassSurface
              as="button"
              class="w-24 h-24 rounded-xl cursor-pointer transition-transform hover:scale-105 flex items-center justify-center"
            >
              <span class="text-white text-2xl font-bold">7</span>
            </GlassSurface>
            <GlassSurface
              as="button"
              class="w-24 h-24 rounded-xl cursor-pointer transition-transform hover:scale-105 flex items-center justify-center"
            >
              <span class="text-white text-2xl font-bold">8</span>
            </GlassSurface>
          </div>
        </div>

        <div class="h-24" />
      </GlassRendererProvider>
    </div>
  );
}
