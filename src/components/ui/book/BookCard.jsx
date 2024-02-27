function BookCard({ children, id, style }) {
  return (
    <li
      key={id}
      className={`border px-4 py-2 md:w-[30%] md:m-auto md:border-none ${
        style ? style : ''
      }`}
    >
      {children}
    </li>
  );
}

export default BookCard;
