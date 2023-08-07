"use client";

import { useCallback, useMemo } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

import { cn, range } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";

export const Pagination: React.FC<{
  totalPages: number;
}> = ({ totalPages }) => {
  const searchParams = useSearchParams()!;
  const pathname = usePathname();
  const currentPage = Number(searchParams.get("page") ?? 1);
  const createQueryString = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", page.toString());
      return params.toString();
    },
    [searchParams]
  );
  const createPagination = useCallback(
    (start: number, end: number) => {
      return range(start, end + 1).map((page) => (
        <Button
          className={cn(
            currentPage === page ? "pointer-events-none" : "",
            "h-8 w-8 rounded-full"
          )}
          variant={currentPage === page ? "default" : "ghost"}
          key={`pagination-${page}`}
          size={null}
        >
          <Link href={`${pathname}?${createQueryString(page)}`} replace>
            {page}
          </Link>
        </Button>
      ));
    },
    [currentPage, pathname, createQueryString]
  );
  const pagination = useMemo(() => {
    if (totalPages <= 9) return createPagination(1, totalPages);
    if (currentPage < 4 || currentPage > totalPages - 4) {
      return (
        <>
          {createPagination(1, 4)}
          <Ellipsis />
          {createPagination(totalPages - 3, totalPages)}
        </>
      );
    }
    return (
      <>
        {createPagination(1, 2)}
        <Ellipsis />
        {createPagination(currentPage - 1, currentPage + 1)}
        <Ellipsis />
        {createPagination(totalPages - 1, totalPages)}
      </>
    );
  }, [currentPage, totalPages, createPagination]);

  return (
    <nav className="flex flex-row flex-wrap items-center justify-center md:gap-1">
      <Button
        className="h-8 w-8 rounded-full"
        variant="ghost"
        disabled={currentPage === 1}
        size={null}
      >
        <Link
          href={`${pathname}?${createQueryString(currentPage - 1)}`}
          replace
        >
          <LuChevronLeft className="h-6 w-6" />
        </Link>
      </Button>
      {pagination}
      <Button
        className="h-8 w-8 rounded-full"
        variant="ghost"
        disabled={currentPage === totalPages}
        size={null}
      >
        <Link
          href={`${pathname}?${createQueryString(currentPage + 1)}`}
          replace
        >
          <LuChevronRight className="h-6 w-6" />
        </Link>
      </Button>
    </nav>
  );
};

const Ellipsis: React.FC = () => (
  <div
    className={cn(
      buttonVariants({ variant: null, size: null }),
      "pointer-events-none h-8 w-8"
    )}
  >
    ...
  </div>
);
