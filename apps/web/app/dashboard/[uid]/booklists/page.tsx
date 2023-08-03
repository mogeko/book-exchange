import { prisma } from "@/lib/database";
import { DataTable } from "@/components/data-table";
import { columns } from "@/app/dashboard/[uid]/booklists/_components/columns";

const BooklistsPage: React.FC<{
  params: { uid: string };
}> = async ({ params: { uid } }) => {
  const booklists = await getBooklists(parseInt(uid));

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
      <DataTable data={booklists} columns={columns} />
    </>
  );
};

async function getBooklists(uid: number) {
  return await prisma.booklist.findMany({
    where: { userId: uid },
    select: { id: true, title: true, status: true, priority: true },
  });
}

export type Booklist = Awaited<ReturnType<typeof getBooklists>>[number];

export default BooklistsPage;
