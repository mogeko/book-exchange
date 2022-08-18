const ResponsesButton: React.FC<ResponsesButtonProps> = ({ length }) => {
  return (
    <label className="swap">
      <input type="checkbox" />
      <div className="swap-on btn btn-xs btn-ghost text-accent">
        {length > 0 ? `Responses (${length})` : "Responses"}
      </div>
      <div className="swap-off btn btn-xs btn-ghost gap-1">
        {length > 0 ? `Responses (${length})` : "Responses"}
      </div>
    </label>
  );
};

interface ResponsesButtonProps {
  length: number;
}

export default ResponsesButton;
