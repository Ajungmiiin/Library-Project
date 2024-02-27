function RadioInput({ children, name, value, id, checked, onChange }) {
  return (
    <span>
      <input
        type="radio"
        name={name}
        value={value}
        id={id}
        checked={checked}
        onChange={onChange}
        className="hidden peer"
      />
      <label
        htmlFor={id}
        className="border p-2 peer-checked:bg-neutral-600 peer-checked:text-white transition text-sm"
      >
        {children}
      </label>
    </span>
  );
}

export default RadioInput;
