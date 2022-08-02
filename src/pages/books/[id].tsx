import { DefaultLayout } from "@/layouts/layout";
import Box from "@/layouts/boxes";
import { useBook } from "@/lib/hooks/useBooks";
import Skeleton from "@/components/base/skeleton";
import withReadMore from "@/components/readMore";
import BookInfo, { BookInfoSkeleton } from "@/components/books/bookInfoBox";
import { useRouter } from "next/router";
import { NextPage } from "next";

const BookPage: NextPage = () => {
  const { query } = useRouter();
  return (
    <DefaultLayout>
      <BookView id={query.id as string} />
    </DefaultLayout>
  );
};

export const BookView: React.FC<BookViewProps> = ({ id }) => {
  const { data, isLoading } = useBook(id);

  if (isLoading) return <BookViewSkeleton />;
  return (
    <Box>
      <Box.Header>{data?.title}</Box.Header>
      <BookInfo title={data?.title} cover={data?.cover} mate={data?.mate} />
      <Box.SubBox title="About this book">
        <BookDesc foldedData={data?.desc} url={`/api/books/${id}/desc`} />
      </Box.SubBox>
      <Box.SubBox title="Popular Highlights in this book">
        <BookDesc foldedData={data?.digest} url={`/api/books/${id}/digest`} />
      </Box.SubBox>
    </Box>
  );
};

const BookDesc = withReadMore(({ children }) => (
  <p className="indent-8">{children}</p>
));

const BookViewSkeleton: React.FC = () => (
  <Skeleton.Pulse>
    <Box>
      <Skeleton.Square className="h-6 w-40 my-1" />
      <BookInfoSkeleton />
      <Box.SubBox>
        <Skeleton.Square className="h-4 w-44 mb-4" />
        <BookDescSkeleton />
      </Box.SubBox>
      <Box.SubBox>
        <Skeleton.Square className="h-4 w-44 mb-4" />
        <BookDescSkeleton />
      </Box.SubBox>
    </Box>
  </Skeleton.Pulse>
);

const BookDescSkeleton: React.FC = () => (
  <>
    <div className="inline-flex w-full mb-3">
      <div className="w-8" />
      <Skeleton.Line className="w-full" />
    </div>
    {Array.from({ length: 3 }).map((_, i) => (
      <Skeleton.Line key={i} className="w-full mb-3" />
    ))}
    <Skeleton.Line className="w-64" />
  </>
);

interface BookViewProps {
  id?: string;
}

export default BookPage;
