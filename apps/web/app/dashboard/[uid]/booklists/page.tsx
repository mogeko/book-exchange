import { prisma } from "@/lib/database";
import { DataTable } from "@/app/dashboard/[uid]/booklists/_components/data-table";

const BooklistsPage: React.FC<{
  params: { uid: string };
}> = async ({ params: { uid } }) => {
  const booklists = await getBooklists(parseInt(uid));
  console.log(booklists);

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
      <DataTable data={booklists} columns={[]} />
    </>
  );
};

async function getBooklists(uid: number) {
  return await prisma.booklist.findMany({
    where: { userId: uid },
    select: { id: true, title: true, status: true, priority: true },
  });
}

export default BooklistsPage;
