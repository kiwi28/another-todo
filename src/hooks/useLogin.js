import { useState } from "react";
import { useHistory } from "react-router-dom";

import url from "../variables.json";

const TOKEN_KEY = "token";
const USER_DATA_KEY = "userData";

export function useLogin() {
  const [inputController, setInputController] = useState({
    email: "george.popa@gmail.com",
    password: "kiwi123",
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const history = useHistory();

  const handleOnChange = (field) => (event) => {
    setInputController({ ...inputController, [field]: event.target.value });
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    fetch(url.local + "auth", {
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
          setLoading(false);
          return;
        }
        localStorage.setItem(TOKEN_KEY, res.accessToken);
        localStorage.setItem(USER_DATA_KEY, JSON.stringify(res.userData));
        setLoading(false);
        history.push("/todo");
      })
      .catch((err) => console.log(err));
  };

  return {
    inputController,
    handleOnChange,
    handleOnSubmit,
    loading,
    errorMessage,
  };
}
