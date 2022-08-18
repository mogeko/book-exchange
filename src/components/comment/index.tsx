import CommentCard from "@/components/comment/commentCard";
import useComments from "@/lib/hooks/useComments";
import Editor from "@/components/editor";
import fetcher from "@/lib/fetcher";
import type { EditorFormInput } from "@/components/editor";
import type { CommentType } from "@/lib/hooks/useComments";

const Comments: React.FC<CommentsProps> = ({ id }) => {
  const { data, isLoading } = useComments({ bkid: id });
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
      {isLoading ? (
        <CommentCard.Skeleton />
      ) : (
        data?.map((comment: CommentType, index) => (
          <CommentCard key={index} comment={comment} />
        ))
      )}
    </div>
  );
};

interface CommentsProps {
  id: `bk${number}`;
}

export default Comments;
