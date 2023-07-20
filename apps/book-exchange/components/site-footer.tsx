import { siteConfig } from "@/config/site";

export const SiteFooter: React.FC = () => {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-center gap-4 md:h-24 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Copyright © 2023, All right reserved {siteConfig.author}.
        </p>
      </div>
    </footer>
  );
};
