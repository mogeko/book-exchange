import Editor from "@/components/editor/editor";
import fetcher from "@/lib/fetcher";
import type { EditorFormInput } from "@/components/editor/editor";

const Comments: React.FC<CommentsProps> = ({ id }) => {
  const handleSubmit = async (data: EditorFormInput) => {
    await fetcher("/api/comments/submit", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return <Editor onSubmit={handleSubmit} />;
};

interface CommentsProps {
  id: string;
}

export default Comments;
