import { DataTable } from "@/app/dashboard/[uid]/booklists/_components/data-table";

const BooklistsPage: React.FC = () => {
  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of your booklists.
          </p>
        </div>
      </div>
      <DataTable data={[]} columns={[]} />
    </>
  );
};

export default BooklistsPage;
