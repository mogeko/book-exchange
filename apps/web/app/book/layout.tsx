const BookLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="container grid lg:grid-cols-6 flex-1">
      <div className="col-span-4 lg:col-start-2">{children}</div>
    </div>
  );
};

export default BookLayout;
