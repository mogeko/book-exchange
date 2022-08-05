import useQuery from "./useQuery";

function useComments(param: ParamProps = {}) {
  return useQuery<CommentsType>(["/api/comments", param]);
}

export function useComment(id?: string) {
  return useQuery<CommentType>(id ? `/api/comments/${id}` : undefined);
}

export type CommentsType = ({
  meta: {
    short_review: string;
    rates: number;
  };
  responds: SubCommentType[];
  belongs_to: `bk${number}`;
} & Omit<SubCommentType, "belongs_to">)[];

interface SubCommentType {
  id: `cm${number}`;
  author_meta: {
    uid: `${number}`;
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
  belongs_to: `cm${number}`;
  msg: string;
  is_folded: boolean;
}

export interface CommentType {
  id: `cm${number}`;
  msg: string;
}

interface ParamProps {
  uid?: `${number}`;
  bkid?: `bk${number}`;
  limit?: number;
  page?: number;
}

export default useComments;
