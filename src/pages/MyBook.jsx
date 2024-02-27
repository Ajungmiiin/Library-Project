import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import {
  Link,
  Outlet,
  redirect,
  useLoaderData,
  useNavigate,
  useParams,
} from 'react-router-dom';

import BookDetailInfo from '../components/Book/BookDetailInfo';
import Modal from '../components/ui/Modal';
import Section from '../components/ui/Layout/Section';

import { queryClient } from '../utils/http';
import { getBookData, getRecordData, removeBookData } from '../utils/firebase';
import { getUserId } from '../utils/auth';

function MyBook() {
  const ACTION_BUTTON_STYLE =
    'border py-2 px-4 rounded w-[30%] text-center hover:bg-neutral-600 hover:text-white transition';
  const RECORD_ACTION_BUTTOM_STYLE = 'text-xs px-1 py-1';

  const [onRemove, setOnRemove] = useState(false);
  const navigate = useNavigate();

  const { bookData, recordData } = useLoaderData();
  const { myBookId } = useParams();
  const userId = getUserId();

  const info = {
    userId,
    key: myBookId,
  };
  const { mutate } = useMutation({
    mutationFn: removeBookData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myBookList', userId] });
    },
  });

  const onRemoveHandler = () => {
    setOnRemove(true);
  };

  const stopRemoveHandler = () => {
    setOnRemove(false);
  };

  const removeHandler = () => {
    mutate(info);
    navigate('/');
  };

  return (
    <>
      <Outlet />
      {onRemove && (
        <Modal onClose={stopRemoveHandler}>
          <p className="mb-4">정말 삭제하시겠습니까 ?</p>
          <div className="flex justify-between">
            <button onClick={removeHandler} className="border  w-[40%] py-2">
              네
            </button>
            <button
              onClick={stopRemoveHandler}
              className="border  w-[40%] py-2"
            >
              아니요
            </button>
          </div>
        </Modal>
      )}
      {bookData && (
        <Section>
          <div className="mb-2 md:max-w-[600px] md:m-auto">
            <BookDetailInfo
              image={bookData.image}
              title={bookData.title}
              memo={bookData.memo}
              author={bookData.author}
              datetime={bookData.date}
              publisher={bookData.publisher}
              state={bookData.state}
            />
            <div className="flex justify-between items-center text-sm md:text-lg">
              <button onClick={onRemoveHandler} className={ACTION_BUTTON_STYLE}>
                삭제하기
              </button>{' '}
              <Link to="edit" className={ACTION_BUTTON_STYLE}>
                수정하기
              </Link>
              <Link to="addrecord" className={ACTION_BUTTON_STYLE}>
                기록하기
              </Link>
            </div>
          </div>
        </Section>
      )}
      {recordData && (
        <Section className="max-w-[600px] m-auto p-4 md:p-6  bg-gray-200">
          {recordData.length === 0 && (
            <p className="text-center font-bold">기록된 문장이 없습니다.</p>
          )}
          {recordData.length > 0 && (
            <ul>
              {recordData.map((data) => (
                <li
                  key={data.id}
                  className="p-2 md:p-4 my-3 bg-white rounded-xl"
                >
                  <p className="text-center font-bold text-sm md:text-lg border-b pb-1">
                    " {data.record} "
                  </p>
                  <div className="flex items-center justify-between p-1">
                    <div>
                      <Link
                        to={`${data.id}/edit`}
                        className={RECORD_ACTION_BUTTOM_STYLE + ' mr-1'}
                      >
                        수정하기
                      </Link>
                      <Link
                        to={`${data.id}/remove`}
                        className={RECORD_ACTION_BUTTOM_STYLE}
                      >
                        삭제하기
                      </Link>
                    </div>
                    <p className="font-bold text-sm md:text-base">
                      {data.page ? `${data.page} p.g` : ''}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Section>
      )}
    </>
  );
}

export default MyBook;

export async function loader({ params }) {
  const userId = getUserId();

  if (!userId) {
    return redirect('/');
  }

  const info = {
    userId: userId,
    key: params.myBookId,
  };

  const bookData = await queryClient.fetchQuery({
    queryKey: ['myBookList', userId, params.myBookId],
    queryFn: () => getBookData(info),
  });

  const recordData = await queryClient.fetchQuery({
    queryKey: ['myBookList', userId, params.myBookId, 'record'],
    queryFn: () => getRecordData(info),
    initialData: [],
  });

  return { bookData, recordData };
}
