const BookLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="container grid flex-1 lg:grid-cols-6">
      <div className="col-span-4 lg:col-start-2">{children}</div>
    </div>
  );
};

export default BookLayout;
