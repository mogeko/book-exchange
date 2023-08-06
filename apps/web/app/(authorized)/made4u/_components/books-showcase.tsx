"use client";

import { useEffect } from "react";

import { useBooksContext } from "@/app/(authorized)/made4u/_components/books-context";

export const BooksShowcase: React.FC = () => {
  const { books } = useBooksContext();

  useEffect(() => {
    console.log(books);
  }, [books]);

  return <div></div>;
};
