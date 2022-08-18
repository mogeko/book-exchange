import LikeButton from "@/components/comment/likeButton";
import DislikeButton from "@/components/comment/dislikeButton";
import ResponsesButton from "@/components/comment/responsesButton";
import Editor from "@/components/editor";
import fetcher from "@/lib/fetcher";
import useComments, { type CommentType } from "@/lib/hooks/useComments";
import type { EditorFormInput } from "@/components/editor";
import extensions from "@/components/editor/extensions";
import StarsRate from "@/components/stars";
import { generateHTML } from "@tiptap/react";
import Image from "next/image";
import { useMemo } from "react";
import Link from "next/link";
import dayjs from "dayjs";

const Comments: React.FC<CommentsProps> = ({ id }) => {
  const { data } = useComments({ bkid: id });
  const handleSubmit = async (data: EditorFormInput) => {
    await fetcher("/api/comments/submit", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <div className="flex flex-col gap-4 max-w-xl">
      <Editor onSubmit={handleSubmit} />
      {data?.map((comment: CommentType, index) => (
        <CommentCard key={index} comment={comment} />
      ))}
    </div>
  );
};

const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
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
      <div className="inline-flex justify-between items-center">
        {UserMeta}
        <div className="">
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

interface CommentsProps {
  id: `bk${number}`;
}

interface CommentCardProps {
  comment: CommentType;
}

export default Comments;
