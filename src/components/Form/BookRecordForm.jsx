import { useNavigate } from 'react-router-dom';
import Input from '../ui/Input/Input';
import Modal from '../ui/Modal';

function BookRecordForm({ recordData, onSubmit }) {
  const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const recordData = Object.fromEntries(formData);
    onSubmit(recordData);
  };

  return (
    <Modal onClose={() => navigate('../')}>
      <button
        className="px-3 py-1 border bg-neutral-600 text-white mb-2 text-sm "
        onClick={() => {
          navigate('../');
        }}
      >
        닫기
      </button>
      <form onSubmit={submitHandler}>
        <p className="text-center mb-2 font-bold">
          기억에 남는 문장을 기록해보세요.
        </p>
        <Input
          input={{
            type: 'number',
            name: 'page',
            id: 'page',
            placeholder: '페이지',
            className: 'border p-1 mb-2 text-sm',
            min: '0',
            defaultValue: recordData ? recordData.page : '',
          }}
        />
        <textarea
          name="record"
          id="record"
          className="resize-none border outline-none w-full p-2 text-sm"
          placeholder="기억에 남는 문장을 기록해보세요."
          required
          defaultValue={recordData ? recordData.record : ''}
        ></textarea>
        <button className="border px-2 py-1 float-right text-sm ">
          저장하기
        </button>
      </form>
    </Modal>
  );
}

export default BookRecordForm;
