import { ReactComponent as AddIcon } from "../images/add.svg";
import "../styles/Input.css";

export const NewInput = ({
  value,
  onChange,
  onAdd,
  placeholder = "Add todo item...",
}) => {
  return (
    <div className="containerInput">
      <input
        value={value}
        className="input"
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
      <AddIcon className="img" onClick={onAdd} />
    </div>
  );
};
