import { AiOutlineLike, AiFillLike } from "react-icons/ai";

const LikeButton: React.FC<LikeButtonProps> = ({ like }) => {
  return (
    <label className="swap">
      <input type="checkbox" />
      <div className="swap-on btn btn-xs btn-ghost gap-1 text-success">
        <AiFillLike className="w-4 h-4" />
        {like < 998 ? like + 1 : "999+"}
      </div>
      <div className="swap-off btn btn-xs btn-ghost gap-1">
        <AiOutlineLike className="w-4 h-4" />
        {like < 999 ? like : "999+"}
      </div>
    </label>
  );
};

interface LikeButtonProps {
  like: number;
}

export default LikeButton;
