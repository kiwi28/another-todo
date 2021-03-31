import "../styles/Buton.css";

export const Buton = ({ onClick, children }) => {
  return (
    <button className="actionButton" onClick={onClick}>
      {children}
    </button>
  );
};
