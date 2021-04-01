export const LoginForm = () => {
  return (
    <div className="formContainer">
      <form>
        <label>
          E-mail
          <input name="email" type="email" />
        </label>
        <label>
          Password
          <input name="pass" type="pass" />
        </label>
        <input name="submit" type="submit" value={"LOG IN"} />
      </form>
    </div>
  );
};
