import { useState } from "react";
import { useHistory } from "react-router-dom";

export function useLogin() {
  const [inputController, setInputController] = useState({
    email: "george.popa@gmail.com",
    password: "kiwi123",
  });
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const handleOnChange = (field) => (event) => {
    setInputController({ ...inputController, [field]: event.target.value });
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    fetch("http://kiwinet.go.ro:6969/auth", {
      // fetch("http://localhost:4001/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputController),
    })
      .then((data) => data.json())
      .then((res) => {
        localStorage.setItem("token", res.accessToken);
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
  };
}
