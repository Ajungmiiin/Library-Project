import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getUserId } from '../../utils/auth';
import { removeRecordData } from '../../utils/firebase';
import { queryClient } from '../../utils/http';
import Modal from '../ui/Modal';

function RemoveRecordData() {
  const userId = getUserId();
  const { myBookId } = useParams();
  const { recordId } = useParams();
  const info = {
    userId,
    myBookId,
    recordId,
  };
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: removeRecordData,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['myBookList', userId, myBookId, 'record'],
      });
      navigate('../');
    },
  });

  const removeHandler = () => {
    mutate(info);
  };

  return (
    <Modal>
      <p>정말 삭제하시겠습니까 ?</p>
      <div className="flex justify-around mt-3">
        <button onClick={removeHandler} className="w-[40%] py-2 border">
          네
        </button>
        <Link to="../" className="block text-center border  w-[40%] py-2">
          아니요
        </Link>
      </div>
    </Modal>
  );
}

export default RemoveRecordData;
