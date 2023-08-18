import { cn } from "@/lib/utils";

export const BookDetails: React.FC<
  {
    book: any;
  } & React.HTMLAttributes<HTMLElement>
> = ({ className, ...props }) => {
  return <aside className={cn("pt-[3.25rem]", className)} {...props}></aside>;
};
