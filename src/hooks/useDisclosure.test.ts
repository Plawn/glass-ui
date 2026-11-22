import { describe, expect, test } from 'bun:test';
import { createRoot, flush } from 'solid-js';
import { useDisclosure } from './useDisclosure';

describe('useDisclosure', () => {
  test('defaults to closed', () => {
    createRoot((dispose) => {
      const { isOpen } = useDisclosure();
      expect(isOpen()).toBe(false);
      dispose();
    });
  });

  test('honors the initial state', () => {
    createRoot((dispose) => {
      const { isOpen } = useDisclosure(true);
      expect(isOpen()).toBe(true);
      dispose();
    });
  });

  test('onOpen / onClose set the state explicitly', () => {
    createRoot((dispose) => {
      const { isOpen, onOpen, onClose } = useDisclosure();
      onOpen();
      flush();
      expect(isOpen()).toBe(true);
      onOpen(); // idempotent
      flush();
      expect(isOpen()).toBe(true);
      onClose();
      flush();
      expect(isOpen()).toBe(false);
      onClose(); // idempotent
      flush();
      expect(isOpen()).toBe(false);
      dispose();
    });
  });

  test('onToggle flips the state', () => {
    createRoot((dispose) => {
      const { isOpen, onToggle } = useDisclosure();
      onToggle();
      flush();
      expect(isOpen()).toBe(true);
      onToggle();
      flush();
      expect(isOpen()).toBe(false);
      dispose();
    });
  });
});
