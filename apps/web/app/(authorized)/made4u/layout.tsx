import { getReferral } from "@/actions/made-fot-you";

import { loginUser } from "@/lib/user";
import { BooksProvider } from "@/app/(authorized)/made4u/_components/books-context";

const MadeForYouLayout: React.FC<{
  children: React.ReactNode;
}> = async ({ children }) => {
  const { books } = await getReferral({
    uid: loginUser().uid,
    date: new Date(),
  });

  return <BooksProvider books={books}>{children}</BooksProvider>;
};

export default MadeForYouLayout;
