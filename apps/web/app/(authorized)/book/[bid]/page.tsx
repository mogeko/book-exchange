const BookPage: React.FC<{ params: { bid: string } }> = ({ params }) => {
  return (
    <div>
      <h1>Book {params.bid}</h1>
    </div>
  );
};

export default BookPage;
