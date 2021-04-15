import { useRegister } from "../hooks/useRegister";

export const RegisterForm = ({ setPage }) => {
  const {
    inputController,
    handleOnChange,
    handleOnSubmit,
    errorMessage,
  } = useRegister(setPage);

  const isValid = inputController.cPassword === inputController.password;
  return (
    <form className="formContainer" onSubmit={handleOnSubmit}>
      <label>
        First Name
        <input
          name="fName"
          onChange={handleOnChange("firstName")}
          value={inputController.firstName}
          type="text"
        />
      </label>
      <label>
        Last Name
        <input
          name="lName"
          onChange={handleOnChange("lastName")}
          value={inputController.lastName}
          type="text"
        />
      </label>
      <label>
        E-mail
        <input
          name="email"
          onChange={handleOnChange("email")}
          value={inputController.email}
          type="email"
        />
      </label>
      <label>
        Password
        <input
          name="pass"
          onChange={handleOnChange("password")}
          value={inputController.password}
          type="password"
        />
      </label>
      <label>
        Confirm Password
        <input
          name="pass"
          style={isValid ? null : { border: "2px solid red" }}
          onChange={handleOnChange("cPassword")}
          value={inputController.cPassword}
          type="password"
        />
        {errorMessage && <span className="errorSpan">{errorMessage}</span>}
        {!isValid && <span className="errorSpan">Passwords do not match</span>}
      </label>
      <input name="submit" type="submit" value={"REGISTER"} />
    </form>
  );
};
