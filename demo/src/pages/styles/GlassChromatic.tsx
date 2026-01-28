import { Card } from 'glass-ui-solid';
import { DemoSection, PageHeader } from '../../components/demo';

export default function GlassChromaticPage() {
  return (
    <div class="relative min-h-screen">
      {/* Dynamic background for blur demonstration */}
      <div class="fixed inset-0 -z-10 overflow-hidden pointer-events-none opacity-50">
        <div class="absolute top-[10%] left-[5%] w-64 h-64 rounded-full bg-blue-500/30 blur-[80px] animate-pulse" />
        <div class="absolute top-[40%] right-[10%] w-96 h-96 rounded-full bg-purple-500/20 blur-[100px]" />
        <div class="absolute bottom-[20%] left-[15%] w-80 h-80 rounded-full bg-pink-500/25 blur-[90px]" />
        <div
          class="absolute top-[60%] left-[40%] w-72 h-72 rounded-full bg-cyan-400/20 blur-[70px] animate-bounce"
          style="animation-duration: 10s"
        />

        {/* Decorative lines/shapes to see refraction */}
        <div class="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-surface-300/20 to-transparent" />
        <div class="absolute top-0 left-2/4 w-px h-full bg-gradient-to-b from-transparent via-surface-300/20 to-transparent" />
        <div class="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-surface-300/20 to-transparent" />
      </div>

      <div class="space-y-8 relative z-10 p-8">
        <PageHeader
          title="Glass Effects"
          description="Advanced glassmorphism effects with ultra-transparent backgrounds, soft glowing borders, and optional chromatic aberration."
        />

        {/* GLASS MORPHIC SECTION */}
        <div class="space-y-6">
          <h2 class="text-xl font-bold text-surface-900 dark:text-white">
            Glass Morphic
          </h2>
          <p class="text-surface-600 dark:text-surface-400">
            Clean glass effect with soft glowing borders and top highlight
            reflection.
          </p>

          <DemoSection
            title="Usage"
            code={`<div class="glass-morphic rounded-3xl p-6">
  Content with glass morphic effect
</div>

// Available variants:
// glass-morphic         - Standard clean glass
// glass-morphic-thick   - Thicker border for larger elements
// glass-morphic-subtle  - Minimal, subtle effect`}
          />

          <DemoSection title="Standard" card={false}>
            <div class="glass-morphic rounded-3xl p-6">
              <h3 class="text-lg font-semibold text-surface-900 dark:text-white mb-2">
                glass-morphic
              </h3>
              <p class="text-surface-600 dark:text-surface-400">
                Ultra-transparent glass with soft white border, outer glow, and
                top highlight reflection. Background is only 8% opaque.
              </p>
            </div>
          </DemoSection>

          <DemoSection title="Thick" card={false}>
            <div class="glass-morphic-thick rounded-[2rem] p-8">
              <h3 class="text-lg font-semibold text-surface-900 dark:text-white mb-2">
                glass-morphic-thick
              </h3>
              <p class="text-surface-600 dark:text-surface-400">
                Thicker border (2px) with more pronounced glow and highlight.
                Ideal for larger panels and hero sections.
              </p>
            </div>
          </DemoSection>

          <DemoSection title="Subtle" card={false}>
            <div class="glass-morphic-subtle rounded-2xl p-6">
              <h3 class="text-lg font-semibold text-surface-900 dark:text-white mb-2">
                glass-morphic-subtle
              </h3>
              <p class="text-surface-600 dark:text-surface-400">
                Minimal glass effect with thin border. Good for smaller UI
                elements where you want less visual weight.
              </p>
            </div>
          </DemoSection>

          <DemoSection title="Pill Shape (like reference)" card={false}>
            <div class="glass-morphic-thick rounded-full px-12 py-8">
              <h3 class="text-lg font-semibold text-surface-900 dark:text-white mb-2 text-center">
                Pill-shaped glass panel
              </h3>
              <p class="text-surface-600 dark:text-surface-400 text-center">
                Use rounded-full for the pill shape from the reference image.
              </p>
            </div>
          </DemoSection>

          <DemoSection title="Comparison" card={false}>
            <div class="grid gap-6 md:grid-cols-2">
              <Card class="p-6">
                <h3 class="text-sm font-medium text-surface-500 dark:text-surface-400 mb-1">
                  Standard Glass Card
                </h3>
                <p class="text-surface-700 dark:text-surface-300">
                  Regular glass effect for comparison.
                </p>
              </Card>

              <div class="glass-morphic rounded-xl p-6">
                <h3 class="text-sm font-medium text-surface-500 dark:text-surface-400 mb-1">
                  Glass Morphic
                </h3>
                <p class="text-surface-700 dark:text-surface-300">
                  More transparent with glowing border.
                </p>
              </div>
            </div>
          </DemoSection>

          <DemoSection title="Nested Layout" card={false}>
            <div class="glass-morphic-thick rounded-[2rem] p-8">
              <h3 class="text-xl font-bold text-surface-900 dark:text-white mb-4">
                Dashboard Panel
              </h3>
              <div class="grid gap-4 md:grid-cols-3">
                <div class="glass-morphic-subtle rounded-xl p-4">
                  <div class="text-2xl font-bold text-surface-900 dark:text-white">
                    42
                  </div>
                  <div class="text-sm text-surface-500 dark:text-surface-400">
                    Active Users
                  </div>
                </div>
                <div class="glass-morphic-subtle rounded-xl p-4">
                  <div class="text-2xl font-bold text-surface-900 dark:text-white">
                    128
                  </div>
                  <div class="text-sm text-surface-500 dark:text-surface-400">
                    Projects
                  </div>
                </div>
                <div class="glass-morphic-subtle rounded-xl p-4">
                  <div class="text-2xl font-bold text-surface-900 dark:text-white">
                    99%
                  </div>
                  <div class="text-sm text-surface-500 dark:text-surface-400">
                    Uptime
                  </div>
                </div>
              </div>
            </div>
          </DemoSection>

          <DemoSection title="Interactive Buttons" card={false}>
            <div class="flex flex-wrap gap-4">
              <button class="glass-morphic rounded-full px-6 py-3 font-medium text-surface-900 dark:text-white hover:scale-[1.02] hover:bg-white/15 transition-all">
                Glass Button
              </button>

              <button class="glass-morphic-thick rounded-full px-6 py-3 font-medium text-surface-900 dark:text-white hover:scale-[1.02] hover:bg-white/15 transition-all">
                Thick Button
              </button>

              <button class="glass-morphic-subtle rounded-xl px-6 py-3 font-medium text-surface-900 dark:text-white hover:scale-[1.02] hover:bg-white/10 transition-all">
                Subtle Button
              </button>
            </div>
          </DemoSection>
        </div>

        {/* DIVIDER */}
        <div class="border-t border-surface-200 dark:border-surface-700 my-12" />

        {/* GLASS CHROMATIC SECTION */}
        <div class="space-y-6">
          <h2 class="text-xl font-bold text-surface-900 dark:text-white">
            Glass Chromatic
          </h2>
          <p class="text-surface-600 dark:text-surface-400">
            Glass effect with chromatic aberration (rainbow) borders.
          </p>

          <DemoSection
            title="Usage"
            code={`<div class="glass-chromatic rounded-2xl p-6">
  Content with chromatic effect
</div>

// Available variants:
// glass-chromatic         - Standard rainbow border
// glass-chromatic-subtle  - Softer effect
// glass-chromatic-intense - Maximum aberration
// glass-chromatic-animated - Rotating rainbow`}
          />

          <DemoSection title="Standard Chromatic" card={false}>
            <div class="glass-chromatic rounded-2xl p-6">
              <h3 class="text-lg font-semibold text-surface-900 dark:text-white mb-2">
                glass-chromatic
              </h3>
              <p class="text-surface-600 dark:text-surface-400">
                Rainbow gradient border with chromatic aberration effect.
              </p>
            </div>
          </DemoSection>

          <DemoSection title="Subtle Chromatic" card={false}>
            <div class="glass-chromatic-subtle rounded-2xl p-6">
              <h3 class="text-lg font-semibold text-surface-900 dark:text-white mb-2">
                glass-chromatic-subtle
              </h3>
              <p class="text-surface-600 dark:text-surface-400">
                Softer 3-color gradient (red to blue to cyan).
              </p>
            </div>
          </DemoSection>

          <DemoSection title="Intense Chromatic" card={false}>
            <div class="glass-chromatic-intense rounded-2xl p-6">
              <h3 class="text-lg font-semibold text-surface-900 dark:text-white mb-2">
                glass-chromatic-intense
              </h3>
              <p class="text-surface-600 dark:text-surface-400">
                Maximum aberration with conic gradient and extended glow.
              </p>
            </div>
          </DemoSection>

          <DemoSection title="Animated Chromatic" card={false}>
            <div class="glass-chromatic-animated rounded-2xl p-6">
              <h3 class="text-lg font-semibold text-surface-900 dark:text-white mb-2">
                glass-chromatic-animated
              </h3>
              <p class="text-surface-600 dark:text-surface-400">
                Rotating rainbow border animation (8 second cycle).
              </p>
            </div>
          </DemoSection>
        </div>

        {/* CSS VARIABLES REFERENCE */}
        <div class="border-t border-surface-200 dark:border-surface-700 my-12" />

        <DemoSection title="CSS Variables Reference" card={false}>
          <div class="overflow-x-auto">
            <table class="w-full text-left text-sm">
              <thead>
                <tr class="border-b border-surface-200 dark:border-surface-700">
                  <th class="py-3 pr-4 font-semibold text-surface-900 dark:text-white">
                    Variable
                  </th>
                  <th class="py-3 pr-4 font-semibold text-surface-900 dark:text-white">
                    Default
                  </th>
                  <th class="py-3 font-semibold text-surface-900 dark:text-white">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody class="text-surface-600 dark:text-surface-400">
                <tr class="border-b border-surface-100 dark:border-surface-800">
                  <td class="py-3 pr-4 font-mono text-xs">--glass-blur-thin</td>
                  <td class="py-3 pr-4">1rem</td>
                  <td class="py-3">Blur for subtle variants</td>
                </tr>
                <tr class="border-b border-surface-100 dark:border-surface-800">
                  <td class="py-3 pr-4 font-mono text-xs">
                    --glass-blur-standard
                  </td>
                  <td class="py-3 pr-4">2rem</td>
                  <td class="py-3">Standard blur amount</td>
                </tr>
                <tr class="border-b border-surface-100 dark:border-surface-800">
                  <td class="py-3 pr-4 font-mono text-xs">
                    --glass-blur-thick
                  </td>
                  <td class="py-3 pr-4">3rem</td>
                  <td class="py-3">Heavy blur for thick variants</td>
                </tr>
                <tr class="border-b border-surface-100 dark:border-surface-800">
                  <td class="py-3 pr-4 font-mono text-xs">
                    --chromatic-spread
                  </td>
                  <td class="py-3 pr-4">2px</td>
                  <td class="py-3">Chromatic glow distance</td>
                </tr>
                <tr>
                  <td class="py-3 pr-4 font-mono text-xs">
                    --chromatic-intensity
                  </td>
                  <td class="py-3 pr-4">0.6</td>
                  <td class="py-3">Chromatic color opacity (0-1)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </DemoSection>
      </div>
    </div>
  );
}
