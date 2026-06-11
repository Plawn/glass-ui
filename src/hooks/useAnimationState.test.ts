import { describe, expect, test } from 'bun:test';
import { type Accessor, createRoot, createSignal } from 'solid-js';
import { useAnimationState } from './useAnimationState';

// Let Solid flush its effect queue (effects run on a microtask).
const flush = () => new Promise<void>((r) => queueMicrotask(r));
const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

describe('useAnimationState', () => {
  test('starts hidden when closed', async () => {
    await new Promise<void>((resolve) => {
      createRoot(async (dispose) => {
        const { visible, isClosing } = useAnimationState({
          open: () => false,
          duration: () => 10,
        });
        await flush();
        expect(visible()).toBe(false);
        expect(isClosing()).toBe(false);
        dispose();
        resolve();
      });
    });
  });

  test('becomes visible immediately when opened', async () => {
    await new Promise<void>((resolve) => {
      createRoot(async (dispose) => {
        const [open, setOpen] = createSignal(false);
        const { visible, isClosing } = useAnimationState({
          open,
          duration: () => 10,
        });
        await flush();

        setOpen(true);
        await flush();
        expect(visible()).toBe(true);
        expect(isClosing()).toBe(false);

        dispose();
        resolve();
      });
    });
  });

  test('stays visible during the closing animation, then hides', async () => {
    await new Promise<void>((resolve) => {
      createRoot(async (dispose) => {
        const [open, setOpen]: [Accessor<boolean>, (v: boolean) => void] =
          createSignal(true);
        const { visible, isClosing } = useAnimationState({
          open,
          duration: () => 20,
        });
        await flush();
        expect(visible()).toBe(true);

        // Begin closing: still visible, but marked as closing.
        setOpen(false);
        await flush();
        expect(visible()).toBe(true);
        expect(isClosing()).toBe(true);

        // After the duration elapses, it is fully hidden.
        await wait(40);
        expect(visible()).toBe(false);
        expect(isClosing()).toBe(false);

        dispose();
        resolve();
      });
    });
  });
});
