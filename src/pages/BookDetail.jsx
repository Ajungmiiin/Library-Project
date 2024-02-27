import { useQuery } from '@tanstack/react-query';
import { Link, Outlet, useParams } from 'react-router-dom';
import BookDetailInfo from '../components/Book/BookDetailInfo';
import CustomLink from '../components/ui/CustomLink';
import Section from '../components/ui/Layout/Section';
import { searchBook } from '../utils/http';

function BookDetailPage() {
  const { bookId } = useParams();

  const isbn = bookId.split('').slice(0, 10).join('');

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['book', isbn],
    queryFn: ({ signal, queryKey }) => searchBook(queryKey[1], signal),
  });

  let content;

  if (data) {
    content = (
      <>
        <Section>
          <BookDetailInfo
            image={data.thumbnail}
            title={data.title}
            author={data.authors}
            description={data.contents}
            datetime={data.datetime}
            publisher={data.publisher}
          />
          <CustomLink to="add">내 서재에 추가하기</CustomLink>
        </Section>
      </>
    );
  }

  return (
    <>
      <Outlet />
      {isPending && <p className="text-center">불러오는 중 ...</p>}
      {isError && <p className="text-center">{error.message}</p>}
      {!isPending && content}
    </>
  );
}
export default BookDetailPage;
