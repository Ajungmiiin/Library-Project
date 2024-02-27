function BookList({ children }) {
  return (
    <ul className="flex flex-col gap-2 md:flex-row md:flex-wrap ">
      {children}
    </ul>
  );
}

export default BookList;
