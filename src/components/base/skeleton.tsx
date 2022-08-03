import classNames from "@/lib/utils/classNames";

const Pulse: React.FC<PulseProps> = ({ children, className }) => (
  <div className={classNames(className, "animate-pulse")}>{children}</div>
);

const Line: React.FC<SkeletonProps> = ({ className }) => (
  <div className={classNames(className, "h-2 bg-slate-700 rounded")} />
);

const Square: React.FC<SkeletonProps> = ({ className }) => (
  <div className={classNames(className, "bg-slate-700 rounded")} />
);

const Circle: React.FC<SkeletonProps> = ({ className }) => (
  <div className={classNames(className, "bg-slate-700 rounded-full")} />
);

const Skeleton = { Pulse, Line, Square, Circle };

interface SkeletonProps {
  className?: string;
}

type PulseProps = {
  children: React.ReactNode;
} & SkeletonProps;

export default Skeleton;
