import deepEqual from "fast-deep-equal";
import {
  type MRT_RowData,
  type MRT_TableOptions,
  type MRT_TableInstance,
  useMaterialReactTable,
  type MRT_TableState,
} from "material-react-table";
import { useEffect, useRef } from "react";

export function useOpsTable<TData extends MRT_RowData>(
  tableOptions: MRT_TableOptions<TData>,
): MRT_TableInstance<TData> {
  const handle = useMaterialReactTable({
    initialState: {
      density: "compact",
      showGlobalFilter: true,
      ...tableOptions.initialState,
    },
    enableDensityToggle: false,
    selectAllMode: "all",
    enableSelectAll: true,
    autoResetPageIndex: false,
    ...tableOptions,
  });

  const lastPageResetState = useRef<Partial<MRT_TableState<TData>>>({});
  const state = handle.getState();

  useEffect(() => {
    const newLastPageResetState = {
      sorting: state.sorting,
      pageSize: state.pagination.pageSize,
      globalFilter: state.globalFilter as string,
      columnFilters: state.columnFilters,
    };

    if (!deepEqual(newLastPageResetState, lastPageResetState.current)) {
      lastPageResetState.current = newLastPageResetState;
      handle.setPageIndex(0);
    }
  }, [state, handle]);

  return handle;
}
