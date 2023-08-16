const LoginLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="container relative grid h-[800px] flex-1 flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      {children}
    </div>
  );
};

export default LoginLayout;
