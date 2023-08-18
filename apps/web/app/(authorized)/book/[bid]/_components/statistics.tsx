import { LuStar } from "react-icons/lu";

export const Statistics: React.FC<{}> = () => {
  return (
    <div>
      {/* TODO: User ratings and various statistics */}
      <div className="inline-flex flex-row items-center gap-0.5">
        <LuStar className="h-4 w-4" />
        <LuStar className="h-4 w-4" />
        <LuStar className="h-4 w-4" />
        <LuStar className="h-4 w-4" />
        <LuStar className="h-4 w-4" />
      </div>
    </div>
  );
};
