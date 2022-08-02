import { HiSearch } from "react-icons/hi";
import Link from "next/link";

const Search: React.FC = () => {
  return (
    <>
      <div className="hidden md:block relative">
        <HiSearch className="h-6 w-6 absolute top-3 left-3 text-gray-400" />
        <div className="form-control">
          <input
            type="text"
            className="input bg-base-300 text-xl w-96 pl-10"
            placeholder="Search..."
            role="search"
            aria-label="Search Bar"
          />
        </div>
      </div>
      <Link href="#">
        <a className="btn btn-ghost btn-circle md:hidden" role="button">
          <HiSearch className="h-6 w-6" aria-hidden="true" />
          <span className="sr-only">Search</span>
        </a>
      </Link>
    </>
  );
};

export default Search;
