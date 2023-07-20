import Card from "@/components/base/card";
import Pagination from "@/components/pagination";
import useBooks, { useBooksInfinite } from "@/lib/hooks/useBooks";
import { flatten, splitEvery } from "ramda";
import { useEffect, useState } from "react";

const BookGrid: React.FC<DataProps> = ({ maxPages = 1, ...query }) => {
  const { data, size, setSize, ...state } = useBooksInfinite(query);
  const [limit, setLimit] = useState(6);
  const pages = data ? splitEvery(limit, flatten(data)) : data;

  useEffect(() => {
    const md = window.matchMedia("(min-width: 768px)");
    const handleResize = (e: MediaQueryListEvent) => {
      setLimit(e.matches ? 10 : 6);
    };

    if (md.matches) setLimit(10);
    md.addEventListener("change", handleResize);

    return () => md.removeEventListener("change", handleResize);
  }, []);

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 my-8 w-full">
        {state.isValidating
          ? Array.from({ length: 10 }, (_, i) => <Card.Skeleton key={i} />)
          : pages?.[size - 1].map((book, i) => <Card key={i} {...book} />)}
      </div>
      <Pagination
        length={Math.floor((maxPages * 10) / limit)}
        setSize={(size) => setSize(Math.ceil((limit * size) / 10))}
      />
    </div>
  );
};

type DataProps = {
  maxPages?: number;
} & Parameters<typeof useBooks>[0];

export default BookGrid;
