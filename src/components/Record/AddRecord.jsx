import { redirect, useSubmit } from 'react-router-dom';
import { getUserId } from '../../utils/auth';
import { addRecordData } from '../../utils/firebase';
import { queryClient } from '../../utils/http';
import BookRecordForm from '../Form/BookRecordForm';

function AddRecord() {
  const submit = useSubmit();

  const submitHandler = (formData) => {
    submit(formData, { method: 'POST' });
  };

  return <BookRecordForm onSubmit={submitHandler} />;
}

export default AddRecord;

export const action = async ({ request, params }) => {
  const userId = getUserId();
  const data = await request.formData();
  const recordData = Object.fromEntries(data);

  const info = {
    userId: userId,
    key: params.myBookId,
    data: recordData,
  };

  await addRecordData(info);

  await queryClient.invalidateQueries({
    queryKey: ['myBookList', userId, params.myBookId, 'record'],
  });
  return redirect('../');
};
