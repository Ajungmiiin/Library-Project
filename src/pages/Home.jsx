import { useQuery } from '@tanstack/react-query';
import { Link, useRouteLoaderData } from 'react-router-dom';

// utils
import { getUserId } from '../utils/auth';
import { getBooksData } from '../utils/firebase';

// components
import BookInfo from '../components//book/BookInfo';
import Section from '../components/ui/Layout/Section';
import Text from '../components/ui/Information/Text';
import BookCard from '../components/ui/book/BookCard';
import BookList from '../components/ui/book/BookList';

function Home() {
  const isLogin = useRouteLoaderData('root');
  const userId = getUserId();

  let content;

  const { data } = useQuery({
    queryKey: ['myBookList', userId],
    queryFn: ({ queryKey }) => getBooksData(queryKey[1]),
    enabled: isLogin,
    initialData: [],
  });

  // 데이터가 비어있다면
  if (data.length === 0)
    content = (
      <>
        <Text className="mb-2 font-bold">
          아직 서재에 들어있는 책이 없습니다.
        </Text>
        <Link className="block text-center text-sm text-gray-400" to="/search">
          어떤 책이 있는지 구경해보세요 !
        </Link>
      </>
    );

  // 데이터가 있다면
  if (data.length > 0) {
    content = (
      <>
        <BookList>
          {data.map((book) => (
            <BookCard key={book.id} id={book.id}>
              <Link to={`my/${book.id}`} className="block w-full md:m-auto">
                <BookInfo
                  state={book.state}
                  image={book.image}
                  title={book.title}
                  author={book.author}
                />
              </Link>
            </BookCard>
          ))}
        </BookList>
      </>
    );
  }

  return (
    <>
      <Section>
        <h2 className="text-lg mb-4 font-bold md:text-2xl">내 서재</h2>
        {!isLogin && (
          <div className="border rounded-lg border-neutral-400 p-4 md:p-8 md:text-xl md:font-bold">
            <Text>로그인 후 이용하실 수 있습니다.</Text>
            <Link
              to="/auth?mode=login"
              className="block w-[120px] m-auto p-1 text-center text-sm text-gray-400 md:text-lg md:w-[180px]"
            >
              로그인 하러가기
            </Link>
          </div>
        )}
        {isLogin && content}
      </Section>
    </>
  );
}

export default Home;
