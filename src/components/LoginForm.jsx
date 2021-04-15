import { useLogin } from "../hooks/useLogin";

export const LoginForm = () => {
  const {
    inputController,
    handleOnChange,
    handleOnSubmit,
    loading,
    errorMessage,
  } = useLogin();

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
      {errorMessage && <span className="errorSpan">{errorMessage}</span>}
      <input name="submit" type="submit" value={"LOG IN"} />
      {loading ? <h3>Loading . . .</h3> : null}
    </form>
  );
};
