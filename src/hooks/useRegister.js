import { useState } from "react";
import url from "../variables.json";

export const useRegister = (setPage) => {
  const [inputController, setInputController] = useState({
    email: "",
    lastName: "",
    firstName: "",
    password: "",
    cPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState();

  const handleOnChange = (field) => (event) => {
    setInputController({
      ...inputController,
      [field]: event.target.value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (inputController.password !== inputController.cPassword) return;

    await fetch(url.local + "register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputController),
    })
      .then((data) => data.json())
      .then((res) => {
        if (res.error) {
          setErrorMessage(res.error);
          return;
        }
        localStorage.setItem("userData", JSON.stringify(res));
        setPage("login");
      })
      .catch((err) => console.log(err));
  };

  return {
    inputController,
    handleOnChange,
    handleOnSubmit,
    errorMessage,
  };
};
