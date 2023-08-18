import { SiteFooter } from "@/app/_components/site-footer";
import { SiteHeader } from "@/app/_components/site-header";
import { AsideMenu } from "@/app/(core)/_components/aside-menu";

const DashboardLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <SiteHeader />
      <div className="grid flex-1 lg:grid-cols-5">
        <div className="hidden lg:block">
          <AsideMenu />
        </div>
        <div className="col-span-3 lg:col-span-4 lg:border-l">
          <div className="h-full px-4 py-6 lg:px-8">{children}</div>
        </div>
      </div>
      <SiteFooter />
    </>
  );
};

export default DashboardLayout;
