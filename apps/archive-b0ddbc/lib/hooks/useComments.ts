import useQuery from "@/lib/hooks/useQuery";
import type { JSONContent } from "@tiptap/react";

function useComments(param: ParamProps = {}) {
  return useQuery<CommentsType>(["/api/comments", param]);
}

export type CommentsType = CommentType[];

export type CommentType = {
  id: `cm${number}`;
  meta: {
    short_review: string;
    rates: number;
  };
  responses: SubCommentType[];
  belongs_to: `bk${number}`;
} & Omit<SubCommentType, "belongs_to" | "id">;

interface SubCommentType {
  id: `cm${number}-${number}`;
  author_meta: {
    id: `${number}`;
    username: string;
    email: string;
    avatar: string;
  };
  meta: {
    likes: number;
    dislike: number;
    created_at: string;
    location: string;
  };
  belongs_to: `cm${number}-${number}` | `cm${number}`;
  msg: JSONContent;
}

interface ParamProps {
  uid?: `${number}`;
  bkid?: `bk${number}`;
  limit?: number;
  page?: number;
}

export default useComments;
