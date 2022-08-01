import { MessageContext } from "@/providers/msgProvider";
import { useContext } from "react";

const Badge: React.FC<BadgeProps> = ({ badgeKey, className }) => {
  const msg = useContext(MessageContext);
  const count = msg.filter((m) => m.key === badgeKey).length;
  return count ? <span className={`badge ${className}`}>{count}</span> : null;
};

interface BadgeProps {
  badgeKey: string;
  className?: string;
}

export default Badge;
