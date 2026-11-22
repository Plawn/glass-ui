import { describe, expect, test } from 'bun:test';
import { createRoot, createSignal, flush } from 'solid-js';
import { useControlled } from './useControlled';

describe('useControlled', () => {
  test('uncontrolled: starts at defaultValue and updates on setValue', () => {
    createRoot((dispose) => {
      const changes: string[] = [];
      const [value, setValue] = useControlled<string>({
        value: () => undefined,
        defaultValue: 'initial',
        onChange: (v) => changes.push(v),
      });

      expect(value()).toBe('initial');

      setValue('next');
      flush();
      expect(value()).toBe('next');
      expect(changes).toEqual(['next']);

      dispose();
    });
  });

  test('controlled: follows the external value and ignores internal state', () => {
    createRoot((dispose) => {
      const [external, setExternal] = createSignal<string | undefined>('a');
      const changes: string[] = [];
      const [value, setValue] = useControlled<string>({
        value: external,
        defaultValue: '',
        onChange: (v) => changes.push(v),
      });

      expect(value()).toBe('a');

      // setValue notifies but does not change the value (parent owns it)
      setValue('b');
      flush();
      expect(value()).toBe('a');
      expect(changes).toEqual(['b']);

      // Parent updates -> value follows
      setExternal('c');
      flush();
      expect(value()).toBe('c');

      dispose();
    });
  });

  test('controlled with null value stays controlled', () => {
    createRoot((dispose) => {
      const [external] = createSignal<string | null | undefined>(null);
      const [value, setValue] = useControlled<string | null>({
        value: external,
        defaultValue: 'fallback',
      });

      expect(value()).toBe(null);

      setValue('ignored');
      flush();
      expect(value()).toBe(null);

      dispose();
    });
  });

  test('stores a function-valued default and replacement without invoking them', () => {
    createRoot((dispose) => {
      const initial = () => 'initial';
      const next = () => 'next';
      const [value, setValue] = useControlled({
        value: undefined,
        defaultValue: initial,
      });

      expect(value()).toBe(initial);
      setValue(next);
      flush();
      expect(value()).toBe(next);
      dispose();
    });
  });

  test('works without an onChange callback', () => {
    createRoot((dispose) => {
      const [value, setValue] = useControlled<number>({
        value: () => undefined,
        defaultValue: 0,
      });

      setValue(42);
      flush();
      expect(value()).toBe(42);

      dispose();
    });
  });

  test('follows a reactive default until the value is set, and resets when it changes', () => {
    createRoot((dispose) => {
      const [first, setFirst] = createSignal('a');
      const [value, setValue] = useControlled<string>({
        value: () => undefined,
        getDefaultValue: () => first(),
      });

      expect(value()).toBe('a');
      setValue('picked');
      flush();
      expect(value()).toBe('picked');

      setFirst('b');
      flush();
      expect(value()).toBe('b');

      dispose();
    });
  });
});
