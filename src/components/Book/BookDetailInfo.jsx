function BookDetailInfo({
  image,
  title,
  memo,
  author,
  description,
  datetime,
  publisher,
  state,
}) {
  const date = new Date(datetime).toDateString('ko-KR');

  return (
    <div className="text-center">
      <div className="mb-4">
        <img src={image} alt={title} className="m-auto" />
      </div>
      <div className="mb-4">
        <h3 className="text-lg md:text-2xl font-semibold mb-2">{title}</h3>
        <div className="text-center text-sm md:text-lg text-gray-400">
          <span>{publisher}</span>
          <span className="pl-2">{date}</span>
        </div>
        <p className="pb-2 border-b text-sm md:text-lg">{author}</p>
        {state && (
          <p className="text-sm md:text-lg pt-2 pb-2 font-bold border-b ">
            {state}
          </p>
        )}
        <p className="text-sm md:text-lg leading-6 pt-2 pb-2 border-b break-words">
          {memo && memo}
          {description && description}
          {!description && !memo && '기록된 내용이 없습니다.'}
        </p>
      </div>
    </div>
  );
}

export default BookDetailInfo;
