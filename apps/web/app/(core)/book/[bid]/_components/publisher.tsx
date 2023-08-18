import { LuComponent } from "react-icons/lu";

import type { Publisher as PublisherType } from "@/lib/database";

export const Publisher: React.FC<
  { publisher: PublisherType | null } & React.HTMLAttributes<HTMLElement>
> = ({ publisher, className, ...props }) => {
  return (
    <section className={className} {...props}>
      <header className="flex flex-row items-center justify-between space-y-0 px-6 py-4 pb-1">
        <h3 className=" text-sm font-medium leading-none tracking-tight">
          Publisher
        </h3>
        <LuComponent className="text-muted-foreground h-4 w-4" />
      </header>
      <main className="px-6 py-4 pt-0">
        <p className="text-xl font-bold">{publisher?.name ?? "Unknown"}</p>
      </main>
    </section>
  );
};
