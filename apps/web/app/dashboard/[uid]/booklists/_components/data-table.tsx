"use client";

import { useMemo, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function DataTable<TData, TValue>(props: {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}) {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    state: { sorting, columnVisibility, rowSelection, columnFilters },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    ...props,
  });

  const tableHeader = useMemo(() => {
    return table.getHeaderGroups().map((headerGroup) => (
      <TableRow key={headerGroup.id}>
        {headerGroup.headers.map(
          ({ id, isPlaceholder, column, getContext }) => {
            return (
              <TableHead key={`table-head-${id}`}>
                {!isPlaceholder
                  ? flexRender(column.columnDef.header, getContext())
                  : null}
              </TableHead>
            );
          }
        )}
      </TableRow>
    ));
  }, [table]);

  const tableBody = useMemo(() => {
    if (table.getRowModel().rows?.length) {
      return table.getRowModel().rows.map((row) => (
        <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
          {row.getVisibleCells().map(({ id, column, getContext }) => (
            <TableCell key={`table-body-${id}`}>
              {flexRender(column.columnDef.cell, getContext())}
            </TableCell>
          ))}
        </TableRow>
      ));
    } else {
      return (
        <TableRow>
          <TableCell
            colSpan={props.columns.length}
            className="h-24 text-center"
          >
            No results.
          </TableCell>
        </TableRow>
      );
    }
  }, [table, props.columns]);

  return (
    <div className="space-y-4 flex-1">
      <div /> {/* TODO: Add toolbar */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>{tableHeader}</TableHeader>
          <TableBody>{tableBody}</TableBody>
        </Table>
      </div>
      <div /> {/* TODO: Add pagination */}
    </div>
  );
}
