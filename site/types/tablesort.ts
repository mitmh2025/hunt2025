declare module "tablesort" {
  const tablesort: (
    table: HTMLTableElement,
    options?: Record<string, never>,
  ) => void;
  export = tablesort;
}

declare module "tablesort/src/sorts/tablesort.number.js" {}
