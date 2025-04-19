declare namespace React {
  interface TdHTMLAttributes<T> extends HTMLAttributes<T> {
    sorttable_customkey?: string | number;
  }
}

declare module "sorttable" {
  global {
    const sorttable: {
      init: () => void;
      makeSortable: (table: HTMLTableElement) => void;
    };
  }
}
