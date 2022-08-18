import { AiOutlineDislike, AiFillDislike } from "react-icons/ai";

const DislikeButton: React.FC<DislikesButtonProps> = ({ dislike }) => {
  return (
    <label className="swap">
      <input type="checkbox" />
      <div className="swap-on btn btn-xs btn-ghost gap-1 text-error">
        <AiFillDislike className="w-4 h-4" />
        {dislike < 998 ? dislike + 1 : "999+"}
      </div>
      <div className="swap-off btn btn-xs btn-ghost gap-1">
        <AiOutlineDislike className="w-4 h-4" />
        {dislike < 999 ? dislike : "999+"}
      </div>
    </label>
  );
};

interface DislikesButtonProps {
  dislike: number;
}

export default DislikeButton;
