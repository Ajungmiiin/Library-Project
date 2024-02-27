import { useState } from 'react';

const useInput = (initialValue, validationFn) => {
  const [enteredValue, setEnteredValue] = useState(initialValue);

  const [didEdit, setDidEdit] = useState(false);

  const hasError = didEdit && !validationFn(enteredValue);

  const handleInputChange = (e) => {
    setEnteredValue(e.target.value);
    setDidEdit(false);
  };

  const handleInputBlur = () => {
    setDidEdit(true);
  };

  return { value: enteredValue, hasError, handleInputChange, handleInputBlur };
};

export default useInput;
