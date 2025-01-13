export type Hydratable<Type> = {
  [Property in keyof Type]: Type[Property] extends Set<infer E> | (infer E)[]
    ? Iterable<Hydratable<E>>
    : Type[Property] extends Date
      ? Type[Property] | string
      : Type[Property] extends Map<infer K, infer V>
        ? Iterable<[K, Hydratable<V>]>
        : Type[Property] extends Record<string, unknown>
          ? Hydratable<Type[Property]>
          : Type[Property];
};
