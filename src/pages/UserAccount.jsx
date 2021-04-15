import { useState, useEffect } from "react";
import { LoginForm } from "../components/LoginForm";
import { SwitchForm } from "../components/SwitchForm";
import { RegisterForm } from "../components/RegisterForm";
import { useHistory } from "react-router-dom";

import url from "../variables.json";

import "../styles/Login.css";

const TOKEN_KEY = "token";

export const UserAccount = () => {
  const [page, setPage] = useState("login");

  const history = useHistory();
  const token = localStorage.getItem(TOKEN_KEY);

  useEffect(() => {
    if (token) {
      fetch(url.local + "verify", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((userData) => {
          history.push("/todo");
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem(TOKEN_KEY);
        });
    }
  });

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
        {page === "login" ? <LoginForm /> : <RegisterForm setPage={setPage} />}
      </div>
    </div>
  );
};
