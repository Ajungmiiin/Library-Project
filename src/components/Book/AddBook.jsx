import {
  redirect,
  useLoaderData,
  useNavigate,
  useRouteLoaderData,
  useSubmit,
} from 'react-router-dom';
import { useState } from 'react';

import { queryClient, searchBook } from '../../utils/http';
import { addBookData, getBooksData } from '../../utils/firebase';
import { getUserId } from '../../utils/auth';

import BookForm from '../Form/BookForm';
import Modal from '../ui/Modal';
import CustomLink from '../ui/CustomLink';
import Text from '../ui/Information/Text';

function AddBook() {
  let content;
  const isLogin = useRouteLoaderData('root');
  const navigate = useNavigate();
  const [data, filterResult] = useLoaderData();
  const [filter, setFilter] = useState(filterResult);
  const submit = useSubmit();

  function submitHandler(formData) {
    submit(formData, { method: 'POST' });
  }

  if (isLogin && filter) {
    content = (
      <>
        <Text className="font-bold">
          서재에 이미 등록된 책 입니다. <br />
          그래도 등록하시겠습니까 ?
        </Text>
        <div className="flex justify-center gap-6 pt-4 text-sm font-bold">
          <button onClick={() => setFilter(false)} className="px-4 py-2 border">
            네
          </button>
          <button onClick={() => navigate('../')} className="px-4 py-2 border">
            아니요
          </button>
        </div>
      </>
    );
  }

  if (isLogin && !filter) {
    content = (
      <>
        <BookForm
          onSubmit={submitHandler}
          title={data.title}
          image={data.thumbnail}
          author={data.authors}
          datetime={data.datetime}
          publisher={data.publisher}
          mode="추가하기"
        />
      </>
    );
  }

  if (!isLogin) {
    content = (
      <>
        <p className="mb-4">로그인 후 이용하실 수 있습니다.</p>
        <CustomLink to={`/auth?mode=login`}>로그인 하러가기</CustomLink>
      </>
    );
  }
  return <Modal onClose={() => navigate('../')}>{content}</Modal>;
}

export default AddBook;

export async function loader({ params }) {
  const id = getUserId();
  const isbn = params.bookId.split('').slice(0, 10).join('');
  const bookData = await queryClient.fetchQuery({
    queryKey: ['book', isbn],
    queryFn: ({ queryKey }) => searchBook(queryKey[1]),
  });

  const myBookData = await queryClient.fetchQuery({
    queryKey: ['myBookList', id],
    queryFn: ({ queryKey }) => getBooksData(queryKey[1]),
  });

  const filterResult =
    myBookData.filter((book) => book.title === bookData.title).length > 0;

  return [bookData, filterResult];
}

export async function action({ request }) {
  const userId = getUserId();
  const data = await request.formData();
  const bookData = Object.fromEntries(data);

  const info = {
    userId: userId,
    data: bookData,
  };
  await addBookData(info);
  return redirect('/');
}
