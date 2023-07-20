import { withDrawer } from "@/components/base/drawer";
import Header from "@/layouts/header";
import Footer from "@/layouts/footer";

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen min-w-full w-full selection:bg-secondary selection:text-secondary-content">
      {children}
    </div>
  );
};

const Main: React.FC<MainProps> = ({ children }) => {
  return (
    <main className="flex-1 max-w-screen-lg w-full mx-auto p-6 md:p-4">
      {children}
    </main>
  );
};

const Layout = Object.assign(Container, { Main, Header, Footer });

const ContainerWithDrawer = withDrawer(Container);

export const DefaultLayout: React.FC<MainProps> = ({ children }) => {
  return (
    <ContainerWithDrawer toggleId="mobile-menu">
      <Header />
      <Main>{children}</Main>
      <Footer time={2022} author="Zheng Junyi" />
    </ContainerWithDrawer>
  );
};

interface ContainerProps {
  children: React.ReactNode;
}

interface MainProps {
  children: React.ReactNode;
}

export default Layout;
