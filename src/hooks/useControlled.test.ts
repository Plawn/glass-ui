import { describe, expect, test } from 'bun:test';
import { createRoot, createSignal } from 'solid-js';
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
      expect(value()).toBe('a');
      expect(changes).toEqual(['b']);

      // Parent updates -> value follows
      setExternal('c');
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
      expect(value()).toBe(null);

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
      expect(value()).toBe(42);

      dispose();
    });
  });
});
