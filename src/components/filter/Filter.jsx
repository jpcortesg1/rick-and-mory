import Input from "../input/Input";
import "./filter.css";

export default function Filter(props) {
  const { handleChangeFilter, form, filter } = props;
  return (
    <form className="filter">
      {Object.keys(form).map((key, index) => (
        <Input
          key={index}
          information={{ ...form[key], value: filter[key] }}
          handleChangeFilter={handleChangeFilter}
        />
      ))}
    </form>
  );
}
