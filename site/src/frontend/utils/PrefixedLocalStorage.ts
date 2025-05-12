export type PrefixedStorageListener = (
  this: PrefixedLocalStorage,
  ev: StorageEvent,
) => void;

export default class PrefixedLocalStorage implements Storage {
  listeners = new Set<PrefixedStorageListener>();
  #wrap: Storage | null = null;

  constructor(
    private prefix: string,
    private getWrapper: () => Storage,
  ) {}

  get wrap(): Storage {
    this.#wrap ??= this.getWrapper();
    return this.#wrap;
  }

  private listener = (ev: StorageEvent): void => {
    if (ev.storageArea !== this.wrap) return;
    if (!ev.key?.startsWith(this.prefix)) return;
    const key = ev.key.slice(this.prefix.length);

    const wrappedEvent = new StorageEvent("storage", {
      key,
      oldValue: ev.oldValue,
      newValue: ev.newValue,
      url: ev.url,
      storageArea: this,
    });
    for (const listener of this.listeners) {
      listener.call(this, wrappedEvent);
    }
  };

  getItem = (key: string): string | null => {
    return this.wrap.getItem(this.prefix + key);
  };

  setItem = (key: string, value: string): void => {
    this.wrap.setItem(this.prefix + key, value);
  };

  removeItem = (key: string): void => {
    this.wrap.removeItem(this.prefix + key);
  };

  get keys(): string[] {
    const keys: string[] = [];
    for (let i = 0; i < this.wrap.length; i++) {
      const key = this.wrap.key(i);
      if (key?.startsWith(this.prefix)) {
        keys.push(key.slice(this.prefix.length));
      }
    }
    return keys;
  }

  key = (i: number): string | null => {
    return this.keys[i] ?? null;
  };

  get length(): number {
    return this.keys.length;
  }

  clear = (): void => {
    for (const key of this.keys) {
      this.wrap.removeItem(this.prefix + key);
    }
  };

  addEventListener = (
    type: "storage",
    listener: PrefixedStorageListener,
  ): void => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- runtime validation of type
    if (type !== "storage") {
      throw new Error(`Unsupported event type: ${type}`);
    }

    if (this.listeners.size === 0) {
      window.addEventListener("storage", this.listener);
    }
    this.listeners.add(listener);
  };

  removeEventListener = (
    type: "storage",
    listener: PrefixedStorageListener,
  ): void => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- runtime validation of type
    if (type !== "storage") {
      throw new Error(`Unsupported event type: ${type}`);
    }

    this.listeners.delete(listener);
    if (this.listeners.size === 0) {
      window.removeEventListener("storage", this.listener);
    }
  };
}
