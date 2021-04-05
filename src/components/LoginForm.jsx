import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

export const LoginForm = ({ createFormDate }) => {
  const { inputController, handleOnChange, handleOnSubmit } = useLogin();

  return (
    <form className="formContainer" onSubmit={handleOnSubmit}>
      <label>
        E-mail
        <input
          name="email"
          value={inputController.email}
          type="email"
          placeholder="example@example.com"
          onChange={handleOnChange("email")}
        />
      </label>
      <label>
        Password
        <input
          name="pass"
          value={inputController.password}
          onChange={handleOnChange("password")}
          type="password"
          placeholder="********"
        />
      </label>
      <input name="submit" type="submit" value={"LOG IN"} />
    </form>
  );
};
