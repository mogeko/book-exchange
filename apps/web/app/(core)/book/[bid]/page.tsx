import Image from "next/image";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/database";
import { loginedUserStatus } from "@/lib/user-actions";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";
import { Comment, CommentFeeds } from "@/components/comment-context";
import { Link } from "@/components/link";
import { AuthorScrollArea } from "@/app/(core)/book/[bid]/_components/author-scroll-area";
import { BookDetails } from "@/app/(core)/book/[bid]/_components/book-details";
import { CommentEditor } from "@/app/(core)/book/[bid]/_components/comment-editor";
import { Description } from "@/app/(core)/book/[bid]/_components/header-description";
import { Language } from "@/app/(core)/book/[bid]/_components/header-language";
import { PublishDate } from "@/app/(core)/book/[bid]/_components/header-publish-date";
import { Publisher } from "@/app/(core)/book/[bid]/_components/header-publisher";
import { Statistics } from "@/app/(core)/book/[bid]/_components/header-statistics";
import { removeComment } from "@/app/(core)/book/[bid]/comment-actions";
import { likeDislike } from "@/app/(core)/book/[bid]/like-dislike-actions";

const BookPage: React.FC<{ params: { bid: string } }> = async ({ params }) => {
  const { uid } = await loginedUserStatus();
  const loginedUser = await prisma.user.findUnique({ where: { id: uid } });
  const { authors, translators, scores, ...book } =
    (await prisma.book.findUnique({
      where: { id: parseInt(params.bid) },
      include: {
        authors: true,
        translators: true,
        scores: {
          select: {
            comment: {
              select: {
                id: true,
                commentator: {
                  select: { id: true, avatar: true, name: true },
                },
                votes: {
                  select: { voterId: true, vote: true },
                },
                createdAt: true,
                content: true,
              },
            },
            bookId: true,
            rate: true,
          },
          orderBy: { comment: { createdAt: "desc" } },
        },
        series: true,
        publisher: true,
        tags: true,
      },
    })) ?? notFound();
  const comments = scores.map(({ comment, rate }) => ({ ...comment, rate }));

  return (
    <div className="flex flex-col">
      <div className="p-8">
        <section className="flex flex-col flex-nowrap items-center gap-10 md:flex-row md:items-start">
          <div className="w-[300px] min-w-[300px] overflow-hidden">
            <AspectRatio ratio={2 / 3}>
              <Image
                src={book.cover ?? ""}
                className="rounded-sm object-cover"
                alt="book-cover"
                fill
              />
            </AspectRatio>
          </div>
          <div className="flex flex-col flex-wrap items-start gap-4">
            <div className="flex flex-col gap-1">
              <h2 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                {book.title}
              </h2>
              <p className="text-muted-foreground text-lg">
                <span>From: </span>
                {authors.map((author, i, arr) => {
                  return (
                    <span key={`author-name-${author.id}-${author.name}`}>
                      <Link href={`/author/${author.id}`}>{author.name}</Link>
                      {i <= arr.length - 3 && <span>, </span>}
                      {i === arr.length - 2 && <span> and </span>}
                      {i === arr.length - 1 && <span>.</span>}
                    </span>
                  );
                })}
              </p>
            </div>
            <Statistics bid={book.id} />
            <Description context={book.description} />
            <Separator />
            <div className="grid gap-4 md:grid-cols-3">
              <div className="flex flex-row">
                <PublishDate className="flex-1" date={book.createdAt} />
              </div>
              <div className="flex flex-row">
                <Separator className="hidden md:block" orientation="vertical" />
                <Publisher className="flex-1" publisher={book.publisher} />
              </div>
              <div className="flex flex-row">
                <Separator className="hidden md:block" orientation="vertical" />
                <Language className="flex-1" lang="English" />
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="grid grid-cols-5 gap-8 md:grid-cols-7">
        <div className="col-span-5">
          <AuthorScrollArea
            authors={[
              ...authors.map((author) => ({ type: "author", ...author })),
              ...translators.map((xs) => ({ type: "translator", ...xs })),
            ]}
          />
          <div className="space-y-5 border-none p-0 outline-none">
            <h2 className="text-2xl font-semibold tracking-tight">
              Comments ({scores.length})
            </h2>
            <div className="flex flex-col items-stretch justify-start">
              <Comment initialValue={{ comments, loginedUser }}>
                <CommentEditor bid={parseInt(params.bid)} />
                <CommentFeeds actions={{ removeComment, likeDislike }} />
              </Comment>
            </div>
          </div>
        </div>
        <BookDetails book={book} className="hidden md:col-span-2 md:flex" />
      </div>
    </div>
  );
};

export default BookPage;
