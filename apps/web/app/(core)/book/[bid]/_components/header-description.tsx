import { LineClamp3 } from "@/components/line-clamp";

export const Description: React.FC<{
  context: string | null;
}> = ({ context }) => {
  if (!context) return;
  return (
    <div className="flex flex-col gap-2">
      <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
        Description
      </h3>
      <LineClamp3 className="text-muted-foreground">{context}</LineClamp3>
    </div>
  );
};
