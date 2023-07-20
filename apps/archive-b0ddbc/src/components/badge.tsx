import useMessage from "@/lib/hooks/useMessage";
import classNames from "@/lib/utils/classNames";

const Badge: React.FC<BadgeProps> = ({ badgeKey, className }) => {
  const { data } = useMessage();
  const count = data?.filter((m) => m.key === badgeKey).length;
  return count ? (
    <span
      className={classNames(className, "badge")}
      role="presentation"
      aria-label={`Here are ${count} new messages`}
    >
      {count}
    </span>
  ) : null;
};

interface BadgeProps {
  badgeKey: string;
  className?: string;
}

export default Badge;
