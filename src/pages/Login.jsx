import { useState } from "react";
import { LoginForm } from "../components/LoginForm";
import { SwitchForm } from "../components/SwitchForm";
import { RegisterForm } from "../components/RegisterForm";

import "../styles/Login.css";
export const Login = () => {
  const [page, setPage] = useState("login");

  const switchPage = (page) => () => {
    setPage(page);
  };

  return (
    <div className="loginPage">
      <div className="contentWrapper">
        <SwitchForm
          switchLogin={switchPage("login")}
          switchRegister={switchPage("register")}
        />
        {page === "login" ? <LoginForm /> : <RegisterForm />}
      </div>
    </div>
  );
};
