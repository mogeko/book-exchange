import classNames from "@/lib/utils/classNames";

const Pulse: React.FC<PulseProps> = ({ children, className }) => (
  <div className={classNames("animate-pulse", className)}>{children}</div>
);

const Square: React.FC<SkeletonProps> = ({ className, count = 1 }) => {
  const squareClassName = classNames(
    "bg-slate-700 mb-2 rounded",
    className ?? "w-full h-4"
  );

  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className={squareClassName} />
      ))}
    </>
  );
};

const Circle: React.FC<SkeletonProps> = ({ className, count = 1 }) => {
  const circleClassName = classNames(
    "bg-slate-700 mb-2 aspect-square rounded-full",
    className ?? "w-full"
  );

  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className={circleClassName} />
      ))}
    </>
  );
};

const Skeleton = Object.assign(Pulse, { Line: Square, Square, Circle });

interface SkeletonProps {
  className?: string;
  count?: number;
}

interface PulseProps {
  children: React.ReactNode;
  className?: string;
}

export default Skeleton;
