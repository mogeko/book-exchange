import Skeleton from "@/components/base/skeleton";
import useTags from "@/lib/hooks/useTags";
import Box from "@/layouts/boxes";
import Link from "next/link";

const TagsCotroller: React.FC = () => {
  const { data, isLoading } = useTags();

  return (
    <Box title="Tags">
      {isLoading ? (
        <TagSkeleton />
      ) : (
        Object.entries(data!).map((items, i) => (
          <Box.SubBox key={i} title={items[0]}>
            <div className="flex flex-wrap gap-2">
              {items[1]?.map((item, j) => (
                <TagItem
                  name={item.replace("-", " ")}
                  href={`/tags/${item}`}
                  key={j}
                />
              ))}
            </div>
          </Box.SubBox>
        ))
      )}
    </Box>
  );
};

const TagItem: React.FC<TagProps> = ({ size, name, href }) => {
  return (
    <Link href={href!}>
      <a className={`btn btn-${size ?? "xs"} normal-case`} aria-label="tag">
        {name}
      </a>
    </Link>
  );
};

const TagSkeleton: React.FC = () => (
  <>
    {Array.from({ length: 4 }, (_, i) => (
      <Skeleton key={i} className="flex flex-col my-2 gap-2 mt-8">
        <Skeleton.Circle className="w-36 h-4" />
        <Skeleton.Line className="w-48 h-4" count={3} />
      </Skeleton>
    ))}
  </>
);

type TagProps = {
  name: string;
  size?: "xs" | "sm" | "md" | "lg";
} & Omit<Parameters<typeof Link>[0], "children">;

export default TagsCotroller;
