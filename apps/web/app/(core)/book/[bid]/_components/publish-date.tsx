import { format } from "date-fns";
import { LuCalendar } from "react-icons/lu";

export const PublishDate: React.FC<
  { date: Date } & React.HTMLAttributes<HTMLElement>
> = ({ date, className, ...props }) => {
  return (
    <section className={className} {...props}>
      <header className="flex flex-row items-center justify-between space-y-0 py-4 pb-2 pl-0 pr-6">
        <h3 className=" text-sm font-medium leading-none tracking-tight">
          Publish Date
        </h3>
        <LuCalendar className="text-muted-foreground h-4 w-4" />
      </header>
      <main className="py-4 pl-0 pr-6 pt-0">
        <p className="text-xl font-bold">{format(date, "PPP")}</p>
      </main>
    </section>
  );
};
