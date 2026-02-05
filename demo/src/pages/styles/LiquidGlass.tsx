import { Show, createSignal } from 'solid-js';
import {
  LiquidGlassProvider,
  LiquidSurface,
  useLiquidGlass,
} from '../../components/LiquidGlass';

function LiquidGlassDemo() {
  const { refresh } = useLiquidGlass();
  const [frost, setFrost] = createSignal(5);
  const [tilt, setTilt] = createSignal(true);
  const [shadow, setShadow] = createSignal(true);
  const [refraction, setRefraction] = createSignal(0.02);

  return (
    <div style={{ display: 'flex', 'flex-direction': 'column', gap: '32px' }}>
      {/* Controls - using inline styles with RGB colors */}
      <div
        style={{
          padding: '16px',
          'border-radius': '12px',
          background: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        <h3
          style={{
            'font-weight': '600',
            color: '#ffffff',
            'margin-bottom': '16px',
          }}
        >
          Controls
        </h3>
        <div
          style={{
            display: 'grid',
            'grid-template-columns': '1fr 1fr',
            gap: '16px',
          }}
        >
          <div>
            <label style={{ 'font-size': '14px', color: '#aaaaaa' }}>
              Frost: {frost()}px
            </label>
            <input
              type="range"
              min="0"
              max="20"
              value={frost()}
              onInput={(e) => setFrost(Number.parseInt(e.currentTarget.value))}
              style={{ width: '100%' }}
            />
          </div>
          <div>
            <label style={{ 'font-size': '14px', color: '#aaaaaa' }}>
              Refraction: {refraction().toFixed(3)}
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={refraction() * 1000}
              onInput={(e) =>
                setRefraction(Number.parseInt(e.currentTarget.value) / 1000)
              }
              style={{ width: '100%' }}
            />
          </div>
          <div style={{ display: 'flex', 'align-items': 'center', gap: '8px' }}>
            <input
              type="checkbox"
              checked={tilt()}
              onChange={(e) => setTilt(e.currentTarget.checked)}
            />
            <span style={{ 'font-size': '14px', color: '#aaaaaa' }}>
              3D Tilt Effect
            </span>
          </div>
          <div style={{ display: 'flex', 'align-items': 'center', gap: '8px' }}>
            <input
              type="checkbox"
              checked={shadow()}
              onChange={(e) => setShadow(e.currentTarget.checked)}
            />
            <span style={{ 'font-size': '14px', color: '#aaaaaa' }}>
              Drop Shadow
            </span>
          </div>
        </div>
        <button
          onClick={() => refresh()}
          style={{
            'margin-top': '16px',
            padding: '8px 16px',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            'border-radius': '8px',
            color: '#ffffff',
            cursor: 'pointer',
          }}
        >
          Refresh Snapshot
        </button>
      </div>

      {/* Demo surfaces */}
      <div
        id="liquid-glass-container"
        style={{
          position: 'relative',
          'min-height': '500px',
          'border-radius': '16px',
          overflow: 'hidden',
        }}
      >
        {/* Background - pure RGB colors */}
        <div
          style={{
            position: 'absolute',
            inset: '0',
            background:
              'linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #f97316 100%)',
          }}
        >
          {/* Decorative blobs */}
          <div
            style={{
              position: 'absolute',
              top: '40px',
              left: '40px',
              width: '128px',
              height: '128px',
              background: '#ffffff',
              'border-radius': '50%',
              filter: 'blur(40px)',
              opacity: '0.4',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '160px',
              right: '80px',
              width: '192px',
              height: '192px',
              background: '#fde047',
              'border-radius': '50%',
              filter: 'blur(60px)',
              opacity: '0.4',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              left: '33%',
              width: '256px',
              height: '256px',
              background: '#60a5fa',
              'border-radius': '50%',
              filter: 'blur(80px)',
              opacity: '0.4',
            }}
          />
          {/* Center text */}
          <div
            style={{
              position: 'absolute',
              inset: '0',
              display: 'flex',
              'align-items': 'center',
              'justify-content': 'center',
            }}
          >
            <p
              style={{
                'font-size': '64px',
                'font-weight': '900',
                'letter-spacing': '0.1em',
                color: 'rgba(255, 255, 255, 0.5)',
              }}
            >
              LIQUID GLASS
            </p>
          </div>
        </div>

        {/* LiquidSurface components */}
        <div
          style={{
            position: 'relative',
            'z-index': '10',
            padding: '32px',
            display: 'flex',
            'flex-wrap': 'wrap',
            gap: '24px',
            'align-items': 'flex-start',
          }}
        >
          <LiquidSurface
            style={{
              padding: '24px',
              'border-radius': '16px',
              'min-width': '200px',
            }}
            frost={frost()}
            tilt={tilt()}
            shadow={shadow()}
            refraction={refraction()}
          >
            <h3
              style={{
                'font-size': '18px',
                'font-weight': '600',
                color: '#ffffff',
                'margin-bottom': '8px',
              }}
            >
              Card Title
            </h3>
            <p
              style={{ 'font-size': '14px', color: 'rgba(255, 255, 255, 0.7)' }}
            >
              This content is rendered on a liquid glass surface with WebGL
              refraction effects.
            </p>
          </LiquidSurface>

          <LiquidSurface
            style={{ padding: '16px', 'border-radius': '12px' }}
            frost={frost()}
            tilt={tilt()}
            shadow={shadow()}
            refraction={refraction()}
          >
            <div
              style={{ display: 'flex', 'align-items': 'center', gap: '12px' }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  'border-radius': '50%',
                  background:
                    'linear-gradient(135deg, #60a5fa 0%, #a855f7 100%)',
                }}
              />
              <div>
                <p style={{ 'font-weight': '500', color: '#ffffff' }}>
                  John Doe
                </p>
                <p
                  style={{
                    'font-size': '14px',
                    color: 'rgba(255, 255, 255, 0.6)',
                  }}
                >
                  @johndoe
                </p>
              </div>
            </div>
          </LiquidSurface>

          <LiquidSurface
            style={{ padding: '24px', 'border-radius': '24px' }}
            frost={frost() + 5}
            tilt={tilt()}
            shadow={shadow()}
            refraction={refraction() * 2}
          >
            <div style={{ 'text-align': 'center' }}>
              <p
                style={{
                  'font-size': '36px',
                  'font-weight': '900',
                  color: '#ffffff',
                }}
              >
                99%
              </p>
              <p
                style={{
                  'font-size': '14px',
                  color: 'rgba(255, 255, 255, 0.6)',
                  'margin-top': '4px',
                }}
              >
                Conversion Rate
              </p>
            </div>
          </LiquidSurface>
        </div>
      </div>
    </div>
  );
}

export default function LiquidGlassPage() {
  const [enabled, setEnabled] = createSignal(true);

  return (
    <div style={{ display: 'flex', 'flex-direction': 'column', gap: '32px' }}>
      {/* Page header */}
      <div>
        <h1
          style={{
            'font-size': '32px',
            'font-weight': '700',
            color: '#ffffff',
          }}
        >
          LiquidGlass
        </h1>
        <p style={{ color: 'rgba(255, 255, 255, 0.6)', 'margin-top': '8px' }}>
          WebGL-powered glassmorphism with real-time refraction effects. Based
          on liquidGL by NaughtyDuk.
        </p>
      </div>

      {/* Enable toggle */}
      <div
        style={{
          display: 'flex',
          'align-items': 'center',
          gap: '8px',
          padding: '16px',
          background: 'rgba(255, 255, 255, 0.1)',
          'border-radius': '12px',
        }}
      >
        <input
          type="checkbox"
          checked={enabled()}
          onChange={(e) => setEnabled(e.currentTarget.checked)}
        />
        <span
          style={{ 'font-size': '14px', color: 'rgba(255, 255, 255, 0.7)' }}
        >
          Enable LiquidGlass (WebGL)
        </span>
      </div>

      <Show
        when={enabled()}
        fallback={
          <div
            style={{
              padding: '32px',
              'text-align': 'center',
              color: 'rgba(255, 255, 255, 0.5)',
            }}
          >
            LiquidGlass is disabled. Enable it to see the WebGL effects.
          </div>
        }
      >
        <LiquidGlassProvider
          snapshot="#liquid-glass-container"
          resolution={2}
          refraction={0.01}
          bevelDepth={0.08}
          reveal="fade"
        >
          <LiquidGlassDemo />
        </LiquidGlassProvider>
      </Show>

      {/* Usage section */}
      <div
        style={{
          padding: '24px',
          background: 'rgba(255, 255, 255, 0.05)',
          'border-radius': '12px',
          'margin-top': '32px',
        }}
      >
        <h2
          style={{
            'font-size': '20px',
            'font-weight': '600',
            color: '#ffffff',
            'margin-bottom': '16px',
          }}
        >
          Basic Usage
        </h2>
        <pre
          style={{
            background: 'rgba(0, 0, 0, 0.3)',
            padding: '16px',
            'border-radius': '8px',
            overflow: 'auto',
            'font-size': '13px',
            color: '#e0e0e0',
          }}
        >
          {`// LiquidGlass is an experimental component (not exported from library)
import { LiquidGlassProvider, LiquidSurface } from './components/LiquidGlass';

function App() {
  return (
    <LiquidGlassProvider resolution={2} refraction={0.01}>
      <div style={{ background: 'linear-gradient(...)' }}>
        <LiquidSurface frost={5} tilt shadow>
          <h1>Content on glass</h1>
        </LiquidSurface>
      </div>
    </LiquidGlassProvider>
  );
}`}
        </pre>
      </div>

      {/* Note about oklch */}
      <div
        style={{
          padding: '16px',
          background: 'rgba(251, 191, 36, 0.1)',
          border: '1px solid rgba(251, 191, 36, 0.3)',
          'border-radius': '8px',
        }}
      >
        <p style={{ 'font-size': '14px', color: 'rgba(255, 255, 255, 0.8)' }}>
          <strong>Note:</strong> html2canvas (used for background capture)
          doesn't support oklch colors. Use RGB/hex colors in the snapshot
          target area for best results.
        </p>
      </div>
    </div>
  );
}
