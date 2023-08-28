"use client";

import { createContext, use, useState } from "react";

import type { Book } from "@/components/book-artwork";

const BooksContext = createContext<{
  setbooks: React.Dispatch<React.SetStateAction<Book[]>>;
  books: Book[];
}>({ books: [], setbooks: () => {} });

export const BooksProvider: React.FC<
  {
    books: Book[];
  } & Omit<
    React.ComponentPropsWithoutRef<typeof BooksContext.Provider>,
    "value"
  >
> = ({ books: initialValue, ...props }) => {
  const [books, setbooks] = useState<Book[]>(initialValue);

  return <BooksContext.Provider value={{ books, setbooks }} {...props} />;
};

export const useBooksContext = () => use(BooksContext);
