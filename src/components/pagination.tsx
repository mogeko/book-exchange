import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { type MouseEvent } from "react";

const Pagination: React.FC<PaginationProps> = ({ length, setIndex, index }) => {
  const gotoPrevPage = () => setIndex(() => Math.max(0, index - 1));
  const gotoCurrentPage = (e: MouseEvent<HTMLButtonElement>) => {
    setIndex(Number(e.currentTarget.value));
  };
  const gotoNextPage = () => setIndex(() => Math.min(length - 1, index + 1));

  return length > 1 ? (
    <div className="btn-group mx-auto">
      <button className="btn btn-xs" onClick={gotoPrevPage}>
        <FaCaretLeft />
        <span className="sr-only">Previous Page</span>
      </button>
      {Array.from({ length }, (_, i) => (
        <button
          className={"btn btn-xs" + (index === i ? " btn-active" : "")}
          onClick={gotoCurrentPage}
          key={i}
          value={i}
        >
          {i + 1}
        </button>
      ))}
      <button className="btn btn-xs" onClick={gotoNextPage}>
        <FaCaretRight />
        <span className="sr-only">Next Page</span>
      </button>
    </div>
  ) : (
    <></>
  );
};

interface PaginationProps {
  setIndex: (value: React.SetStateAction<number>) => void;
  index: number;
  length: number;
}

export default Pagination;
