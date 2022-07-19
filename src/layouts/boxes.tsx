import BookGrid from "@/layouts/contexts/bookGrid";
import BookList from "@/layouts/contexts/bookList";
import Pagination from "@/components/pagination";

const BoxRoot: React.FC<BoxProps> = ({ title, children }) => {
  return (
    <div className="flex flex-col">
      {title && <Header>{title}</Header>}
      {children}
    </div>
  );
};

const SubBox: React.FC<BoxProps> = ({ title, children }) => {
  return (
    <div className="flex flex-col items-start my-2">
      {title && <h2 className="text-lg capitalize w-full my-2">{title}</h2>}
      {children}
    </div>
  );
};

const Header: React.FC<HeaderProps> = ({ children }) => {
  return <h1 className="text-2xl w-full py-2">{children}</h1>;
};

const Contexts = { BookGrid, BookList };
const Box = Object.assign(BoxRoot, { SubBox, Header, Pagination, ...Contexts });

interface BoxProps {
  title?: string;
  children: React.ReactNode;
}

interface HeaderProps {
  children: React.ReactNode;
}

export default Box;
