import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { NewInput } from "../components/Input";
import { ListItem } from "../components/ListItem";

import url from "../variables.json";

import "../styles/Todo.css";

const TOKEN_KEY = "token";

export const Todo = () => {
  const [todo, setTodo] = useState("");
  const [errorState, setErrorState] = useState(false);

  const [listItems, setListItems] = useState([]);

  const history = useHistory();
  const token = localStorage.getItem(TOKEN_KEY);

  const getListings = () => {
    fetch(url.local + "getUserItems", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((reps) => reps.json())
      .then((list) => {
        setListItems(list.data.userItems);
      });
  };

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
        .then((response) => {
          if (response.error) {
            localStorage.removeItem(TOKEN_KEY);
            history.push("/account");
          }
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem(TOKEN_KEY);
          history.push("/account");
        });
    } else {
      history.push("/account");
    }
  }, []);

  useEffect(() => {
    getListings();
  }, []);

  const handleAddItem = async () => {
    if (!todo) return;
    await fetch(url.local + "createListItem", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        todo: {
          text: todo,
          status: true,
        },
      }),
    });
    setTodo("");
    getListings();
  };

  const handleDisabled = (id, currentStatus) => async () => {
    fetch(url.local + "editListItem", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        edit: {
          id,
          newData: {
            status: !currentStatus,
          },
        },
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((edited) => {
        getListings();
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id, text) => () => {
    console.log(id, text);
    fetch(url.local + "deleteListItems", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        itemsArray: [id],
      }),
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((deleted) => {
        console.log(deleted);
        getListings();
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = (id) => (newText) => {
    if (!newText) {
      setErrorState("List item cannot be empty");
      setTimeout(() => {
        setErrorState(false);
      }, 3000);
      return;
    }
    fetch(url.local + "editListItem", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        edit: {
          id,
          newData: {
            text: newText,
          },
        },
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((edited) => {
        getListings();
      })
      .catch((err) => console.log(err));
  };

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_KEY);
    history.push("/account");
  };

  return (
    <div className="todo">
      <button className="logoutBtn" onClick={handleLogout}>
        Logout
      </button>
      <div className="contentWrapper">
        <h1 className="title">ToDo List</h1>
        <NewInput value={todo} onChange={setTodo} onAdd={handleAddItem} />
        <div className="listWrapper">
          {listItems.map((item, idx) => {
            return (
              <ListItem
                idx={idx}
                item={item}
                key={item._id}
                id={item._id}
                className={
                  listItems[idx].status ? "listItemEnabled" : "listItemDisabled"
                }
                onItemChange={handleEdit(item._id)}
                status={listItems[idx].status}
                handleDelete={handleDelete(item._id, item.text)}
                handleDisabled={handleDisabled(item._id, listItems[idx].status)}
                throwError={errorState}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
