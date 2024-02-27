function BookInfo({ image, title, author, memo, state }) {
  return (
    <div className="flex items-center md:block">
      <img
        src={image}
        alt={title}
        className="border w-[80px] md:w-[120px] md:m-auto md:mb-2"
      />
      <div className="w-full pl-6 md:text-center md:p-0 ">
        {state && (
          <p className="text-[12px] font-bold mb-4 text-gray-400">{state}</p>
        )}
        <h3 className="mb-2 font-bold text-black">{title}</h3>
        <p className="text-gray-600 text-sm">{author}</p>
        {memo && <p>{memo}</p>}
      </div>
    </div>
  );
}

export default BookInfo;
