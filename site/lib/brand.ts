// Branded types allow behavior more like nominative types, so you can distinguish between e.g.
// different usages of `string`
declare const __brand: unique symbol;
type Brand<B> = { [__brand]: B };
export type Branded<T, B> = T & Brand<B>;
