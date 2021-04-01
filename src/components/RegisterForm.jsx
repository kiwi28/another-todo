export const RegisterForm = () => {
  return (
    <div className="formContainer">
      <form>
        <label>
          First Name
          <input name="fName" type="text" />
        </label>
        <label>
          Last Name
          <input name="lName" type="text" />
        </label>
        <label>
          E-mail
          <input name="email" type="email" />
        </label>
        <label>
          Password
          <input name="pass" type="pass" />
        </label>
        <label>
          Confirm Password
          <input name="pass" type="pass" />
        </label>
        <input name="submit" type="submit" value={"REGISTER"} />
      </form>
    </div>
  );
};
