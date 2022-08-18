import LikeButton from "@/components/comment/likeButton";
import DislikeButton from "@/components/comment/dislikeButton";
import ResponsesButton from "@/components/comment/responsesButton";
import extensions from "@/components/editor/extensions";
import Skeleton from "@/components/base/skeleton";
import StarsRate from "@/components/stars";
import { generateHTML } from "@tiptap/react";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import { useMemo } from "react";
import type { CommentType } from "@/lib/hooks/useComments";

const Card: React.FC<CardProps> = ({ comment }) => {
  const Content = useMemo(() => {
    return (
      <div
        className="prose prose-h1:text-lg px-2"
        dangerouslySetInnerHTML={{
          __html: generateHTML(comment.msg, extensions),
        }}
      />
    );
  }, [comment.msg]);
  const UserMeta = useMemo(() => {
    return (
      <div className="inline-flex">
        <Link href={`/${comment.author_meta.username}`}>
          <a className="avatar">
            <div className="relative w-10 aspect-square rounded-full">
              <Image
                src={comment.author_meta.avatar}
                alt="Avatar of the commentator"
                layout="fill"
              />
            </div>
          </a>
        </Link>
        <div className="flex flex-col items-start">
          <Link href={`/${comment.author_meta.username}`}>
            <a className="btn btn-xs btn-link">
              {comment.author_meta.username}
            </a>
          </Link>
          <span className="text-xs px-2 text-gray-500">
            {dayjs(comment.meta.created_at).format("YYYY-MM-DD")}
            <span> in {comment.meta.location}</span>
          </span>
        </div>
      </div>
    );
  }, [comment.author_meta, comment.meta.created_at, comment.meta.location]);

  return (
    <div className="flex flex-col p-4 border rounded-lg gap-2 border-slate-600">
      <div className="flex justify-between items-center">
        {UserMeta}
        <div>
          <StarsRate rates={comment.meta.rates} />
        </div>
      </div>
      {Content}
      <div className="flex gap-8">
        <div className="inline-flex items-center justify-between w-32">
          <LikeButton like={comment.meta.likes} />
          <DislikeButton dislike={comment.meta.dislike} />
        </div>
        <ResponsesButton length={comment.responses.length} />
      </div>
    </div>
  );
};

const CardSkeleton: React.FC = () => {
  return (
    <Skeleton>
      <div className="flex flex-col p-4 border rounded-lg gap-2 border-slate-600">
        <div className="flex">
          <Skeleton.Circle className="w-10" />
          <div className="flex flex-col items-start">
            <Skeleton.Line className="h-3 w-32 mx-2" />
            <Skeleton.Line className="h-3 w-40 mx-2" />
          </div>
        </div>
        <Skeleton.Line className="h-3 w-56 mx-2 mb-4" />
        <Skeleton.Line className="h-3 w-full mx-2" count={2} />
        <Skeleton.Line className="h-3 w-32 mx-2" />
      </div>
    </Skeleton>
  );
};

interface CardProps {
  comment: CommentType;
}

const CommentCard = Object.assign(Card, { Skeleton: CardSkeleton });

export default CommentCard;
