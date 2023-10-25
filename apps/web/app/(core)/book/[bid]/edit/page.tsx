import { prisma } from "@/lib/database";
import { BookEditor } from "@/components/book-editor";

const BookEditPage: React.FC<{
  params: { bid: string };
}> = async ({ params: { bid } }) => {
  const book = await prisma.book.findUnique({
    where: { id: parseInt(bid) },
    include: {
      publisher: true,
      series: true,
      authors: true,
      translators: true,
    },
  });

  return (
    <BookEditor
      className="lg:max-w-2xl"
      initialValues={{
        title: book?.title,
        description: book?.description ?? "",
        series: book?.series?.name,
        authors: book?.authors.map((author) => ({ value: author.name })),
        translators: book?.translators.map((translator) => ({
          value: translator.name,
        })),
        publisher: book?.publisher?.name,
      }}
    />
  );
};

export default BookEditPage;
