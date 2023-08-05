"use client";

import { search } from "@/actions/search";
import useSWR from "swr";

import { useDebounce } from "@/hooks/use-debounce";
import { useToast } from "@/hooks/use-toast";

export function useSearch(value: string, initialData?: Book[]) {
  const debouncedValue = useDebounce(value, 500);
  const { toast } = useToast();

  return useSWR(
    () => (value.length ? debouncedValue : null),
    (value: string) => search(value),
    {
      keepPreviousData: !!value.length,
      fallbackData: initialData ?? [],
      onError: (error) => {
        toast({
          variant: "destructive",
          title: "Oooooops! Something went wrong.",
          description: error.message,
        });
      },
    }
  );
}

export type Book = Awaited<ReturnType<typeof search>>[number];
