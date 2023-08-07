import { prisma } from "@/lib/database";
import { BookScrollArea, ViewAll } from "@/components/book-scroll-area";

const BrowsePage: React.FC = async () => {
  const data = [
    {
      title: "Fiction",
      description: "Popular novels.",
      books: await getBooksByTag("fiction"),
    },
    {
      title: "Arts",
      description: "Books about art.",
      books: await getBooksByTag("arts"),
    },
    {
      title: "Biographies",
      description: "Books about people.",
      books: await getBooksByTag("biography"),
    },
    {
      title: "History",
      description: "Books about the past.",
      books: await getBooksByTag("history"),
    },
    {
      title: "Business",
      description: "Books about business.",
      books: await getBooksByTag("business"),
    },
    {
      title: "Science",
      description: "Books about science.",
      books: await getBooksByTag("science"),
    },
    {
      title: "Social Sciences",
      description: "Books about society.",
      books: await getBooksByTag("social sciences"),
    },
  ];

  return (
    <>
      {data.map(({ title, description, books }, i) => (
        <BookScrollArea
          key={`${title}-scroll-area-${i}`}
          title={title}
          description={description}
          books={books}
        >
          <ViewAll href={`./browse/${title.toLowerCase().replace(" ", "-")}`} />
        </BookScrollArea>
      ))}
    </>
  );
};

async function getBooksByTag(tag: string, options?: Options) {
  "use server";

  return await prisma.book.findMany({
    where: { tags: { some: { name: tag } } },
    orderBy: {
      owners: { _count: "desc" },
    },
    select: {
      id: true,
      title: true,
      cover: true,
      authors: {
        select: { name: true },
      },
    },
    skip: options?.skip ?? 0,
    take: options?.take ?? 10,
  });
}

type Options = { skip?: number; take?: number };

export default BrowsePage;
