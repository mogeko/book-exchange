"use client";

import type { Table } from "@tanstack/react-table";
import { RxMixerHorizontal } from "react-icons/rx";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function DataTableViewOptions<TData>(props: { table: Table<TData> }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="ml-auto hidden h-8 lg:flex"
          size="sm"
          variant="outline"
        >
          <RxMixerHorizontal className="mr-2 h-4 w-4" />
          View
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {props.table
          .getAllColumns()
          .filter(({ accessorFn, getCanHide }) => {
            return typeof accessorFn !== "undefined" && getCanHide();
          })
          .map(({ id, getIsVisible, toggleVisibility }) => {
            return (
              <DropdownMenuCheckboxItem
                key={`view-options-dropdown-menu-checkbox-${id}`}
                className="capitalize"
                onCheckedChange={(value) => toggleVisibility(!!value)}
                checked={getIsVisible()}
              >
                {id}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
