const DashboardLayout: React.FC<{
  aside: React.ReactNode;
  children: React.ReactNode;
}> = ({ aside, children }) => {
  return (
    <div className="grid lg:grid-cols-5 flex-1">
      <div className="hidden lg:block">{aside}</div>
      <div className="col-span-3 lg:col-span-4 lg:border-l">
        <div className="h-full px-4 py-6 lg:px-8">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
