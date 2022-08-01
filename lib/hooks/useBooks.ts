import useQuery, {
  useQueryInfinite,
  type Opts,
  type OptsInfinite,
} from "@/lib/hooks/useQuery";
import handleQuery from "@/lib/utils/queryTools";
import { type XOR } from "@/lib/utils/typeTools";

function useBooks(param: ParamProps = {}, opts?: Opts<BooksType>) {
  return useQuery<BooksType>("/api/books", param, opts);
}

export function useBook(id?: string, opts?: Opts<BookType>) {
  return useQuery<BookType>(id ? `/api/books/${id}` : null, {}, opts);
}

export function useBooksInfinite(
  { page = 1, ...other }: ParamProps = { page: 1 },
  opts: OptsInfinite<BooksType> = {}
) {
  return useQueryInfinite<BooksType>((index, previous) => {
    if (previous && !previous.length) return null;
    return handleQuery("/api/books", { page: index + page, ...other });
  }, opts);
}

interface ParamProps {
  limit?: number;
  page?: number;
  tags_include?: string | string[];
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
