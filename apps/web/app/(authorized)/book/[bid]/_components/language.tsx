import { LuGlobe } from "react-icons/lu";

export const Language: React.FC<
  { lang: string } & React.HTMLAttributes<HTMLElement>
> = ({ lang, className, ...props }) => {
  return (
    <section className={className} {...props}>
      <header className="flex flex-row items-center justify-between space-y-0 px-6 py-4 pb-2">
        <h3 className=" text-sm font-medium leading-none tracking-tight">
          Publish Date
        </h3>
        <LuGlobe className="text-muted-foreground h-4 w-4" />
      </header>
      <main className="px-6 py-4 pt-0">
        <p className="text-xl font-bold">{lang}</p>
      </main>
    </section>
  );
};
