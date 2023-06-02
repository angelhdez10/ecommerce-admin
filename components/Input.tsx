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
          onChange={(ev) => onChange(ev)}
          name={name}
          value={value}
          type={type ? type : "text"}
          id={id}
          placeholder=" "
        />
      ) : (
        <textarea
          onChange={(ev) => onChange(ev)}
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
