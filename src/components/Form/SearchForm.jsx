import { forwardRef } from 'react';

function SearchForm({ submitHandler }, ref) {
  return (
    <form
      onSubmit={submitHandler}
      className="p-4 text-center relative md:max-w-[1080px] md:m-auto"
    >
      <input
        type="text"
        className="border p-3 text-sm w-full "
        placeholder="검색어를 입력하세요."
        ref={ref}
      />
      <button
        type="submit"
        className="border absolute right-[25px] top-[50%] translate-y-[-50%] px-4 py-1"
      >
        검색
      </button>
    </form>
  );
}
export default forwardRef(SearchForm);
