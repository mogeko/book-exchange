"use client";

import type { Table } from "@tanstack/react-table";
import { RxCross2 } from "react-icons/rx";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableFacetedFilter } from "@/app/dashboard/[uid]/booklists/_components/data-table-faceted-filter";
import { DataTableViewOptions } from "@/app/dashboard/[uid]/booklists/_components/data-table-view-options";
import { priorities } from "@/app/dashboard/[uid]/booklists/_lib/priorities";
import { statuses } from "@/app/dashboard/[uid]/booklists/_lib/statues";

export function DataTableToolbar<TData>({ table }: { table: Table<TData> }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter booklists..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={priorities}
          />
        )}
        {table.getState().columnFilters.length > 0 && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <RxCross2 className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
