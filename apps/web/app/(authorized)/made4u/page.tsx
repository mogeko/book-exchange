import { loginUser } from "@/lib/user";
import { BooksShowcase } from "@/app/(authorized)/made4u/_components/books-showcase";
import { DatePicker } from "@/app/(authorized)/made4u/_components/date-picker";

const MadeForYouPage: React.FC = async () => {
  const { uid } = loginUser();

  return (
    <>
      <DatePicker uid={uid} />
      <BooksShowcase />
    </>
  );
};

export default MadeForYouPage;
