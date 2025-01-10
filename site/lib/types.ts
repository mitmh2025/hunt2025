export type Hydratable<Type> = {
  [Property in keyof Type]?: Type[Property] extends Set<infer E>
    ? Iterable<E>
    : Type[Property] extends Map<infer K, infer V>
      ? Iterable<[K, V]>
      : Type[Property];
};
