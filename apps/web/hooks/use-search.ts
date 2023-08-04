"use client";

import { search } from "@/actions/search";
import useSWR from "swr";

import { useDebounce } from "@/hooks/use-debounce";

export function useSearch(value: string) {
  const debouncedValue = useDebounce(value, 500);
  const { data, error, isLoading } = useSWR(
    () => (value.length > 0 ? debouncedValue : null),
    (value: string) => search(value),
    { keepPreviousData: true }
  );

  if (value.length <= 0) {
    return { isLoading: false, data: null, error: null };
  } else {
    return { isLoading, data, error };
  }
}

export type Book = Awaited<ReturnType<typeof search>>[number];
