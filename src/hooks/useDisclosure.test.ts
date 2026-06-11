import { describe, expect, test } from 'bun:test';
import { createRoot } from 'solid-js';
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
      expect(isOpen()).toBe(true);
      onOpen(); // idempotent
      expect(isOpen()).toBe(true);
      onClose();
      expect(isOpen()).toBe(false);
      onClose(); // idempotent
      expect(isOpen()).toBe(false);
      dispose();
    });
  });

  test('onToggle flips the state', () => {
    createRoot((dispose) => {
      const { isOpen, onToggle } = useDisclosure();
      onToggle();
      expect(isOpen()).toBe(true);
      onToggle();
      expect(isOpen()).toBe(false);
      dispose();
    });
  });
});
