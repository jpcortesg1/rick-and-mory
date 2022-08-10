import "./input.css";

export default function Input({ information, handleChangeFilter }) {
  const { label, placeholder, type, name, value, options } = information;
  if (type === "select") {
    return (
      <div className="selectInput">
        <label className="label">{label}</label>
        <select
          className="select"
          name={name}
          onChange={handleChangeFilter}
          value={value}
        >
          {options &&
            Object.keys(options).map((option, index) => (
              <option key={index} value={options[option]}>
                {option}
              </option>
            ))}
        </select>
      </div>
    );
  }
  return (
    <label className="label">
      {label}
      <input
        placeholder={placeholder}
        type={type}
        className="input"
        name={name}
        value={value}
        onChange={handleChangeFilter}
        autoComplete="off"
      />
    </label>
  );
}
