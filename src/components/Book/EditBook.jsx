import {
  redirect,
  useNavigate,
  useRouteLoaderData,
  useSubmit,
} from 'react-router-dom';

import { queryClient } from '../../utils/http';
import { updateBookData } from '../../utils/firebase';
import { getUserId } from '../../utils/auth';

import BookForm from '../Form/BookForm';
import Modal from '../ui/Modal';

function EditBook() {
  const navigate = useNavigate();
  const submit = useSubmit();
  const { bookData } = useRouteLoaderData('myBook');
  function submitHandler(formData) {
    submit(formData, { method: 'POST' });
  }

  return (
    <Modal onClose={() => navigate('..')}>
      <BookForm
        image={bookData.image}
        title={bookData.title}
        author={bookData.author}
        publisher={bookData.publisher}
        datetime={bookData.date}
        inputData={bookData}
        onSubmit={submitHandler}
        mode="수정하기"
        memo={bookData.memo}
      />
    </Modal>
  );
}

export default EditBook;

export async function action({ request, params }) {
  const userId = getUserId();
  const data = await request.formData();
  const updateData = Object.fromEntries(data);

  const info = {
    userId: userId,
    key: params.myBookId,
    data: updateData,
  };

  updateBookData(info);
  queryClient.invalidateQueries({
    queryKey: ['myBookList', userId, params.myBookId],
  });
  return redirect('../');
}
