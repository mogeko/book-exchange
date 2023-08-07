import { loginUser } from "@/lib/user";
import { BooksShowcase } from "@/app/(authorized)/made4u/_components/books-showcase";
import { DatePicker } from "@/app/(authorized)/made4u/_components/date-picker";

const MadeForYouPage: React.FC = async () => {
  const { uid } = loginUser();

  return (
    <div className="flex h-full flex-1 flex-col space-y-6 border-none p-0">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            Made for You
          </h2>
          <p className="text-muted-foreground text-sm">
            Your personal booklists. Updated daily.
          </p>
        </div>
      </div>
      <div className="flex flex-1 flex-col space-y-4">
        <DatePicker uid={uid} />
        <BooksShowcase className="flex-1" />
      </div>
    </div>
  );
};

export default MadeForYouPage;
