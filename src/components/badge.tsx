import useMessage from "@/lib/hooks/useMessage";

const Badge: React.FC<BadgeProps> = ({ badgeKey, className }) => {
  const { data } = useMessage();
  const count = data?.filter((m) => m.key === badgeKey).length;
  return count ? <span className={`badge ${className}`}>{count}</span> : null;
};

interface BadgeProps {
  badgeKey: string;
  className?: string;
}

export default Badge;
