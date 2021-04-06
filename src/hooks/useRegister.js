import { useState } from "react";

export const useRegister = () => {
  const [inputController, setInputController] = useState({
    email: "",
    lastName: "",
    firstName: "",
    password: "",
    cPassword: "",
  });

  const handleOnChange = (field) => (event) => {
    setInputController({
      ...inputController,
      [field]: event.target.value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (inputController.password !== inputController.cPassword) return;

    await fetch("http://kiwinet.go.ro:6969/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputController),
    })
      .then((data) => data.json())
      .then((res) => {
        console.log(res);
        localStorage.setItem("userData", JSON.stringify(res));
      })
      .catch((err) => console.log(err));
  };

  return {
    inputController,
    handleOnChange,
    handleOnSubmit,
  };
};
