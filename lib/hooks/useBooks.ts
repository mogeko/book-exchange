import useQuery, { useQueryInfinite } from "@/lib/hooks/useQuery";
import handleQuery from "@/lib/utils/handleQuery";
import type { XOR } from "@/lib/utils/typeTools";

function useBooks(param: ParamProps = {}) {
  return useQuery<BooksType>(["/api/books", param]);
}

export function useBook(id?: string) {
  return useQuery<BookType>(id ? `/api/books/${id}` : void 0);
}

export function useBooksInfinite(
  { page = 1, ...other }: ParamProps = { page: 1 }
) {
  return useQueryInfinite<BooksType>((index, previous) => {
    if (previous && !previous.length) return null;
    return handleQuery("/api/books", { page: index + page, ...other });
  });
}

interface ParamProps {
  limit?: number;
  page?: number;
  tag?: string | string[];
}

export type BooksType = {
  id: `bk${number}`;
  title: string;
  cover: string;
  tags: string[];
  rates: number;
  mate: {
    author: string;
  };
  desc?: {
    text: string;
  };
}[];

export type BookType = {
  mate: {
    publisher?: string;
    subtitle?: string;
    language?: string;
    publication_date?: string;
    isbn?: `${number}-${number}`;
  } & XOR<{ paperback?: number }, { hardcover?: number }>;
  desc?: {
    is_folded: boolean;
  };
  digest?: {
    text: string;
    is_folded: boolean;
  };
} & BooksType[0];

export default useBooks;
