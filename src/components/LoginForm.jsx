import { useState } from "react";

export const LoginForm = ({ createFormDate }) => {
  const [inputController, setInputController] = useState({
    email: "",
    password: "",
  });

  return (
    <div className="formContainer">
      <form>
        <label>
          E-mail
          <input name="email" type="email" placeholder="example@example.com" />
        </label>
        <label>
          Password
          <input name="pass" type="pass" placeholder="********" />
        </label>
        <input name="submit" type="submit" value={"LOG IN"} />
      </form>
    </div>
  );
};
