import Editor from "@/components/editor/editor";
import fetcher from "@/lib/fetcher";
import useComments, { type CommentType } from "@/lib/hooks/useComments";
import type { EditorFormInput } from "@/components/editor/editor";
import extensions from "@/components/editor/extensions";
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
        className="prose prose-h1:text-lg"
        dangerouslySetInnerHTML={{
          __html: generateHTML(comment.msg, extensions),
        }}
      />
    );
  }, [comment.msg]);
  const Avatar = useMemo(() => {
    return (
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
    );
  }, [comment.author_meta]);
  const Username = useMemo(() => {
    return (
      <Link href={`/${comment.author_meta.username}`}>
        <a className="btn btn-xs btn-link">{comment.author_meta.username}</a>
      </Link>
    );
  }, [comment.author_meta.username]);

  return (
    <div className="flex flex-col p-4 border rounded-lg gap-2 border-slate-600">
      <div className="inline-flex">
        {Avatar}
        <div className="flex flex-col items-start">
          {Username}
          <span className="text-xs px-2 text-gray-500">
            {dayjs(comment.meta.created_at).format("YYYY-MM-DD HH:mm:ss")}
          </span>
        </div>
      </div>
      {Content}
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
