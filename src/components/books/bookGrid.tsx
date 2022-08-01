import Card from "@/components/base/card";
import Alert from "@/components/base/alert";
import Pagination from "@/components/pagination";
import useBooks from "@/lib/hooks/useBooks";
import { useState } from "react";

const BookGrid: React.FC<DataProps> = ({ maxPages = 1, page, ...other }) => {
  const [index, setIndex] = useState(0);
  const query = { page: page ?? 1 + index, ...other };
  const { data, isError, isLoading } = useBooks(query);
  // Cache the next page of books
  useBooks({ page: query.page + (index < maxPages - 1 ? 1 : 0), ...other });

  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap gap-6 my-8 w-full">
        {isError && <Alert.Error message="Network Error!" />}
        {isLoading
          ? Array.from({ length: 10 }, (_, i) => <Card.Skeleton key={i} />)
          : data?.map((book, i) => <Card key={i} {...book} />)}
      </div>
      <Pagination length={maxPages} index={index} setIndex={setIndex} />
    </div>
  );
};

type DataProps = {
  maxPages?: number;
} & Parameters<typeof useBooks>[0];

export default BookGrid;
