import {
  redirect,
  useParams,
  useRouteLoaderData,
  useSubmit,
} from 'react-router-dom';
import { getUserId } from '../../utils/auth';
import { updateRecordData } from '../../utils/firebase';
import { queryClient } from '../../utils/http';
import BookRecordForm from '../Form/BookRecordForm';

function EditRecord() {
  const submit = useSubmit();
  const { recordData } = useRouteLoaderData('myBook');
  const { recordId } = useParams();

  const [data] = recordData.filter((data) => data.id === recordId);

  const submitHandler = (recordData) => {
    submit(recordData, { method: 'POST' });
  };

  return <BookRecordForm recordData={data} onSubmit={submitHandler} />;
}

export default EditRecord;

export async function action({ request, params }) {
  const userId = getUserId();
  const data = await request.formData();
  const updateData = Object.fromEntries(data);

  const info = {
    userId: userId,
    myBookId: params.myBookId,
    recordId: params.recordId,
    data: updateData,
  };

  updateRecordData(info);
  queryClient.invalidateQueries({
    queryKey: ['myBookList', userId, params.myBookId, 'record'],
  });
  return redirect('../');
}
