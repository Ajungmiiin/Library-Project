import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { searchBooks } from '../../utils/http';
import BookCard from '../ui/book/BookCard';
import BookInfo from '../Book/BookInfo';
import BookList from '../ui/book/BookList';

function SearchResults({ searchTerm }) {
  const { data, isPending } = useQuery({
    queryKey: ['searchBook', searchTerm],
    queryFn: ({ queryKey, signal }) => searchBooks(queryKey[1], signal),
  });

  let content;

  if (isPending) {
    content = <p className="text-center">불러오는 중...</p>;
  }

  if (data && data.length === 0) {
    content = <p className="text-center">검색된 결과가 없습니다.</p>;
  }

  if (data && data.length > 0) {
    content = (
      <BookList>
        {data.map((book) => (
          <BookCard
            id={book.isbn}
            key={book.isbn}
            style="bg-white md:bg-inherit"
          >
            <Link to={`/book/${book.isbn}`}>
              <BookInfo
                title={book.title}
                image={book.thumbnail}
                author={book.authors}
              />
            </Link>
          </BookCard>
        ))}
      </BookList>
    );
  }

  return (
    <article className="p-4 md:p-6 bg-gray-100 max-w-[1280px] m-auto">
      {content}
    </article>
  );
}

export default SearchResults;
