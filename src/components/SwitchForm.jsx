import "../styles/SwitchForm.css";

export const SwitchForm = ({ switchLogin, switchRegister }) => {
  return (
    <div className="topButtonsContainer">
      <button className="pageButton" onClick={switchLogin}>
        Login
      </button>
      <button className="pageButton" onClick={switchRegister}>
        Register
      </button>
    </div>
  );
};
