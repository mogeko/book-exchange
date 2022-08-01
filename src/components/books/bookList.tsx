import { LongCard } from "@/components/base/card";
import Alert from "@/components/base/alert";
import { useBooksInfinite } from "@/lib/hooks/useBooks";
import useOnScreen from "@/lib/hooks/useOnScreen";
import { useEffect, useRef } from "react";

const MAX_PAGES = 10;

const BookList: React.FC<ParamProps> = (query) => {
  const { data, size, setSize, ...state } = useBooksInfinite(query);
  const bottomRef = useRef<HTMLDivElement>(null);
  const isVisiable = useOnScreen(bottomRef);

  useEffect(() => {
    if (isVisiable && !state.isValidating && size < MAX_PAGES) {
      setSize(size + 1);
    }
  }, [isVisiable, state, size, setSize]);

  return (
    <>
      <div className="flex flex-col">
        {state.isError && <Alert.Error message="Network Error!" />}
        {state.isLoading ? (
          Array.from({ length: 10 }, (_, i) => <LongCard.Skeleton key={i} />)
        ) : (
          <div>
            {data?.map((books, i) => {
              return books.map((book, j) => {
                return <LongCard key={`${i}-${j}`} {...book} />;
              });
            })}
          </div>
        )}
      </div>
      <div ref={bottomRef} />
    </>
  );
};

type ParamProps = Parameters<typeof useBooksInfinite>[0];

export default BookList;
