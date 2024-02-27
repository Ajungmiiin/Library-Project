import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RadioInput from '../ui/Input/RadioInput';

function BookForm({
  image,
  title,
  author,
  datetime,
  publisher,
  inputData,
  onSubmit,
  mode,
  memo,
}) {
  const [state, setState] = useState(inputData?.state ?? '읽을거에요');
  const navigate = useNavigate();

  const date = new Date(datetime).toLocaleDateString();
  const RadioGroup = [
    {
      value: '읽을거에요',
    },
    {
      value: '읽고있어요',
    },
    {
      value: '다읽었어요.',
    },
  ];

  function radioHandler(event) {
    setState(event.target.value);
  }

  function submitHandler(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const bookData = {
      image: image,
      title: title,
      author: author,
      date: date,
      publisher: publisher,
      ...data,
    };
    onSubmit(bookData);
  }

  return (
    <>
      <button
        onClick={() => {
          navigate('../');
        }}
        className="border px-3 py-1 text-sm bg-neutral-600 text-white"
      >
        닫기
      </button>
      <div className="mb-4">
        <img src={image} alt={title} className="m-auto mb-2 border" />
        <div className="text-center">
          <h3 className="mb-2">{title}</h3>
          <div className="text-sm text-gray-400">
            <span className="mr-2">{date}</span>
            <span>{publisher}</span>
          </div>
          <p>{author}</p>
        </div>
      </div>
      <form onSubmit={submitHandler}>
        <div className="flex justify-around mb-4">
          {RadioGroup.map((el) => (
            <RadioInput
              key={el.value}
              name="state"
              value={el.value}
              id={el.value}
              onChange={radioHandler}
              checked={state === el.value}
            >
              {el.value}
            </RadioInput>
          ))}
        </div>
        <div>
          <textarea
            className="w-full border resize-none outline-none p-2 text-sm"
            name="memo"
            id="memo"
            placeholder="메모 (최대 300자)"
            defaultValue={memo ? memo : ''}
            maxLength={300}
          />
        </div>
        <button className="w-full border py-2 text-sm bg-neutral-600 text-white">
          {mode}
        </button>
      </form>
    </>
  );
}

export default BookForm;
