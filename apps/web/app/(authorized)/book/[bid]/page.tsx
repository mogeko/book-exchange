import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/database";
import { Separator } from "@/components/ui/separator";
import { Description } from "@/app/(authorized)/book/[bid]/_components/description";
import { Language } from "@/app/(authorized)/book/[bid]/_components/language";
import { PublishDate } from "@/app/(authorized)/book/[bid]/_components/publish-date";
import { Publisher } from "@/app/(authorized)/book/[bid]/_components/publisher";
import { Statistics } from "@/app/(authorized)/book/[bid]/_components/statistics";

const BookPage: React.FC<{ params: { bid: string } }> = async ({ params }) => {
  const { authors, translators, publisher, ...book } =
    (await prisma.book.findUnique({
      where: { id: parseInt(params.bid) },
      include: { authors: true, translators: true, publisher: true },
    })) ?? notFound();

  return (
    <div className="flex flex-col">
      <div className="p-8">
        <section className="flex flex-col flex-nowrap items-center gap-10 md:flex-row md:items-start">
          <div className="w-[300px] min-w-[300px] overflow-hidden rounded-sm">
            <Image
              src={book.cover ?? ""}
              alt="book-cover"
              className="aspect-[2/3] h-auto w-auto object-cover"
              width={300}
              height={450}
            />
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
                    <>
                      <Link
                        className="text-primary underline-offset-4 hover:underline"
                        href={`/author/${author.id}`}
                      >
                        {author.name}
                      </Link>
                      {i <= arr.length - 3 && <span>, </span>}
                      {i === arr.length - 2 && <span> and </span>}
                      {i === arr.length - 1 && <span>.</span>}
                    </>
                  );
                })}
              </p>
            </div>
            <Statistics />
            <Description context={book.discription} />
            <Separator />
            <div className="grid gap-4 md:grid-cols-3">
              <div className="flex flex-row">
                <PublishDate className="flex-1" date={book.createdAt} />
              </div>
              <div className="flex flex-row">
                <Separator className="hidden md:block" orientation="vertical" />
                <Publisher className="flex-1" publisher={publisher} />
              </div>
              <div className="flex flex-row">
                <Separator className="hidden md:block" orientation="vertical" />
                <Language className="flex-1" lang="English" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BookPage;
