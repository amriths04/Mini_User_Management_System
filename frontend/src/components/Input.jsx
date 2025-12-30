import "../css/Input.css";

export default function Input({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  error,
  touched,
  disabled = false,
}) {
  return (
    <div className="input-group">
      {label && <label htmlFor={name}>{label}</label>}

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        className={`input-field ${error && touched ? "input-error" : ""}`}
      />

      {error && touched && (
        <span className="input-error-text">{error}</span>
      )}
    </div>
  );
}
