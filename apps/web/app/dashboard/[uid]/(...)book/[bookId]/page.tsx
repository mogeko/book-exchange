const BookPage: React.FC<{ params: { bookId: string } }> = ({ params }) => {
  return (
    <div>
      <h1>Book {params.bookId}</h1>
    </div>
  );
};

export default BookPage;
