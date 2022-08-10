import { DefaultLayout } from "@/layouts/layout";
import Box from "@/layouts/boxes";
import { useBook } from "@/lib/hooks/useBooks";
import Skeleton from "@/components/base/skeleton";
import withReadMore from "@/components/readMore";
import BookInfo, { BookInfoSkeleton } from "@/components/books/bookInfoBox";
import { useRouter } from "next/router";
import { NextPage } from "next";
import Head from "next/head";

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
      <Head>
        <title>{data?.title}</title>
      </Head>
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
  <Skeleton>
    <Box>
      <Skeleton.Square className="h-4 w-1/6 my-1" />
      <BookInfoSkeleton />
      <Box.SubBox>
        <Skeleton.Square className="h-4 w-1/6 mb-4" />
        <BookDescSkeleton />
      </Box.SubBox>
      <Box.SubBox>
        <Skeleton.Square className="h-4 w-1/6 mb-4" />
        <BookDescSkeleton />
      </Box.SubBox>
    </Box>
  </Skeleton>
);

const BookDescSkeleton: React.FC = () => (
  <>
    <Skeleton.Line className="w-4/5 h-4" count={2} />
    <Skeleton.Line className="w-1/5 h-4" />
  </>
);

interface BookViewProps {
  id?: string;
}

export default BookPage;
