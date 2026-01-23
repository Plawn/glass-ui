import type { Component } from 'solid-js';
import { For, mergeProps } from 'solid-js';
import type { GlassBackgroundBlob, GlassBackgroundProps } from './types';
import './GlassBackground.css';

const defaultBlobs: GlassBackgroundBlob[] = [
  {
    top: '-10rem',
    right: '-10rem',
    size: '20rem',
    colors: ['rgb(167, 139, 250)', 'rgb(168, 85, 247)'], // violet-400 to purple-500
    opacity: 0.3,
    darkOpacity: 0.2,
    duration: 20,
    delay: 0,
  },
  {
    top: '33%',
    left: '-10rem',
    size: '24rem',
    colors: ['rgb(244, 114, 182)', 'rgb(244, 63, 94)'], // pink-400 to rose-500
    opacity: 0.25,
    darkOpacity: 0.15,
    duration: 25,
    delay: -5,
  },
  {
    bottom: '5rem',
    right: '25%',
    size: '18rem',
    colors: ['rgb(34, 211, 238)', 'rgb(20, 184, 166)'], // cyan-400 to teal-500
    opacity: 0.25,
    darkOpacity: 0.15,
    duration: 22,
    delay: -10,
  },
  {
    top: '66%',
    left: '33%',
    size: '16rem',
    colors: ['rgb(252, 211, 77)', 'rgb(251, 146, 60)'], // amber-300 to orange-400
    opacity: 0.2,
    darkOpacity: 0.1,
    duration: 18,
    delay: -8,
  },
];

export const GlassBackground: Component<GlassBackgroundProps> = (rawProps) => {
  const props = mergeProps(
    {
      animated: true,
      blobs: defaultBlobs,
      gradient: {
        from: 'rgb(237, 233, 254)', // violet-100
        via: 'rgb(253, 242, 248)', // pink-50
        to: 'rgb(207, 250, 254)', // cyan-100
      },
      darkGradient: {
        from: 'rgb(46, 16, 101)', // violet-950
        via: 'rgb(9, 9, 11)', // surface-950
        to: 'rgb(8, 51, 68)', // cyan-950
      },
    },
    rawProps,
  );

  return (
    <div
      class={`glass-background min-h-screen relative overflow-x-hidden ${props.class ?? ''}`}
      style={{
        '--bg-from': props.gradient.from,
        '--bg-via': props.gradient.via ?? props.gradient.from,
        '--bg-to': props.gradient.to,
        '--bg-from-dark': props.darkGradient.from,
        '--bg-via-dark': props.darkGradient.via ?? props.darkGradient.from,
        '--bg-to-dark': props.darkGradient.to,
      }}
    >
      {/* Decorative blobs */}
      <div class="fixed inset-0 overflow-hidden pointer-events-none">
        <For each={props.blobs}>
          {(blob) => (
            <div
              class={`glass-blob absolute ${props.animated ? 'glass-blob-animate' : 'rounded-full'} blur-3xl`}
              style={{
                top: blob.top,
                left: blob.left,
                right: blob.right,
                bottom: blob.bottom,
                width: blob.size ?? '16rem',
                height: blob.size ?? '16rem',
                background: `linear-gradient(to bottom right, ${blob.colors[0]}, ${blob.colors[1]})`,
                '--blob-opacity': blob.opacity ?? 0.25,
                '--blob-opacity-dark': blob.darkOpacity ?? 0.15,
                '--blob-duration': `${blob.duration ?? 20}s`,
                '--blob-delay': `${blob.delay ?? 0}s`,
              }}
            />
          )}
        </For>
      </div>

      {/* Content */}
      <div class="relative z-10">{props.children}</div>
    </div>
  );
};
