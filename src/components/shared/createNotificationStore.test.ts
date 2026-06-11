import { describe, expect, test } from 'bun:test';
import {
  createNotificationStore,
  createTypedNotificationStore,
} from './createNotificationStore';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

describe('createNotificationStore', () => {
  test('add pushes an item and returns a prefixed incrementing id', () => {
    const { store, add } = createNotificationStore({
      idPrefix: 'test',
      defaultDuration: 0,
    });

    const id1 = add({ message: 'hello' });
    const id2 = add({ message: 'world' });

    expect(id1).toBe('test-1');
    expect(id2).toBe('test-2');
    expect(store.items).toHaveLength(2);
    expect(store.items[0]?.message).toBe('hello');
  });

  test('dismiss removes the item by id', () => {
    const { store, add, dismiss } = createNotificationStore({
      defaultDuration: 0,
    });

    const id = add({ message: 'a' });
    add({ message: 'b' });

    dismiss(id);

    expect(store.items).toHaveLength(1);
    expect(store.items[0]?.message).toBe('b');
  });

  test('dismiss with unknown id is a no-op', () => {
    const { store, add, dismiss } = createNotificationStore({
      defaultDuration: 0,
    });

    add({ message: 'a' });
    dismiss('does-not-exist');

    expect(store.items).toHaveLength(1);
  });

  test('clear removes all items', () => {
    const { store, add, clear } = createNotificationStore({
      defaultDuration: 0,
    });

    add({ message: 'a' });
    add({ message: 'b' });
    clear();

    expect(store.items).toHaveLength(0);
  });

  test('auto-dismisses after the given duration', async () => {
    const { store, add } = createNotificationStore({ defaultDuration: 0 });

    add({ message: 'ephemeral', duration: 10 });
    expect(store.items).toHaveLength(1);

    await sleep(30);
    expect(store.items).toHaveLength(0);
  });

  test('duration 0 disables auto-dismiss', async () => {
    const { store, add } = createNotificationStore({ defaultDuration: 10 });

    add({ message: 'persistent', duration: 0 });

    await sleep(30);
    expect(store.items).toHaveLength(1);
  });

  test('dismiss cancels a pending auto-dismiss timer', async () => {
    const { store, add, dismiss } = createNotificationStore({
      defaultDuration: 0,
    });

    const id = add({ message: 'a', duration: 10 });
    dismiss(id);
    add({ message: 'b', duration: 0 });

    await sleep(30);
    expect(store.items).toHaveLength(1);
    expect(store.items[0]?.message).toBe('b');
  });
});

describe('createTypedNotificationStore', () => {
  test('helpers set the matching type', () => {
    const api = createTypedNotificationStore({ defaultDuration: 0 });

    api.success('ok');
    api.error('ko');
    api.warning('careful');
    api.info('fyi');

    expect(api.store.items.map((i) => i.type)).toEqual([
      'success',
      'error',
      'warning',
      'info',
    ]);
  });

  test('helpers accept a custom duration', async () => {
    const api = createTypedNotificationStore({ defaultDuration: 0 });

    api.success('short-lived', 10);

    await sleep(30);
    expect(api.store.items).toHaveLength(0);
  });
});
