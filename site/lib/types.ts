export type Hydratable<Type> = Type extends Set<infer E> | (infer E)[]
  ? Iterable<Hydratable<E>>
  : Type extends Date
    ? string | Date
    : Type extends Map<infer K, infer V>
      ? Iterable<[K, Hydratable<V>]>
      : // eslint-disable-next-line @typescript-eslint/ban-types -- Object is not the same as Record<string, unknown>
        Type extends Object
        ? {
            // eslint-disable-next-line @typescript-eslint/ban-types -- Function should be general here
            [Property in keyof Type as Type[Property] extends Function
              ? never
              : Property]: Hydratable<Type[Property]>;
          }
        : Type;
