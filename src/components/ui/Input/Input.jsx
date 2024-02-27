const Input = (props) => {
  return (
    <>
      {props.label && (
        <label className={props.labelStyle} htmlFor={props.input.id}>
          {props.label}
        </label>
      )}
      <input {...props.input} />
    </>
  );
};

export default Input;
