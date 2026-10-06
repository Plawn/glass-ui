import { describe, expect, test } from 'bun:test';
import { createRoot, createSignal } from 'solid-js';
import {
  dispatchEscape,
  escapeStackSize,
  pushEscapeHandler,
} from './escapeStack';
import { useEscapeKey } from './useEscapeKey';

describe('escape stack', () => {
  test('only the top-most handler runs', () => {
    const calls: string[] = [];
    const removeDrawer = pushEscapeHandler(() => calls.push('drawer'));
    const removeDialog = pushEscapeHandler(() => calls.push('dialog'));

    expect(dispatchEscape({ key: 'Escape' })).toBe(true);
    expect(calls).toEqual(['dialog']);

    removeDialog();
    dispatchEscape({ key: 'Escape' });
    expect(calls).toEqual(['dialog', 'drawer']);

    removeDrawer();
    expect(dispatchEscape({ key: 'Escape' })).toBe(false);
    expect(escapeStackSize()).toBe(0);
  });

  test('removing a lower entry keeps the top one active', () => {
    const calls: string[] = [];
    const removeA = pushEscapeHandler(() => calls.push('a'));
    const removeB = pushEscapeHandler(() => calls.push('b'));
    removeA();
    dispatchEscape({ key: 'Escape' });
    expect(calls).toEqual(['b']);
    removeB();
    removeB(); // idempotent
    expect(escapeStackSize()).toBe(0);
  });

  test('ignores other keys, prevented events and IME composition', () => {
    const calls: string[] = [];
    const remove = pushEscapeHandler(() => calls.push('x'));
    expect(dispatchEscape({ key: 'Enter' })).toBe(false);
    expect(dispatchEscape({ key: 'Escape', defaultPrevented: true })).toBe(
      false,
    );
    expect(dispatchEscape({ key: 'Escape', isComposing: true })).toBe(false);
    expect(calls).toEqual([]);
    remove();
  });

  test('useEscapeKey registers only while enabled', () => {
    const calls: string[] = [];
    const [outerOpen, setOuterOpen] = createSignal(true);
    const [innerOpen, setInnerOpen] = createSignal(false);
    const dispose = createRoot((dispose) => {
      useEscapeKey({ onEscape: () => calls.push('outer'), enabled: outerOpen });
      useEscapeKey({ onEscape: () => calls.push('inner'), enabled: innerOpen });
      return dispose;
    });

    expect(escapeStackSize()).toBe(1);
    setInnerOpen(true);
    expect(escapeStackSize()).toBe(2);
    dispatchEscape({ key: 'Escape' });
    expect(calls).toEqual(['inner']);
    setInnerOpen(false);
    dispatchEscape({ key: 'Escape' });
    expect(calls).toEqual(['inner', 'outer']);
    setOuterOpen(false);
    expect(escapeStackSize()).toBe(0);
    setOuterOpen(true);
    dispose();
    expect(escapeStackSize()).toBe(0);
  });
});
