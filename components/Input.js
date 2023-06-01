export default function Input({
  name,
  id,
  onChange,
  value,
  type,
  textArea,
  children,
}) {
  return (
    <div className="input-container">
      {!textArea ? (
        <input
          onChange={onChange}
          name={name}
          value={value}
          type={type ? type : "text"}
          id={id}
          placeholder=" "
        />
      ) : (
        <textarea
          onChange={onChange}
          name={name}
          value={value}
          type={type ? type : "text"}
          id={id}
          placeholder=" "
        ></textarea>
      )}
      <label htmlFor={id}>{children}</label>
    </div>
  );
}
