import { useEffect, useState } from "react";

import { NewInput } from "../components/Input";
import { ListItem } from "../components/ListItem";

import "../styles/Todo.css";

const generateId = () => Math.random().toString().slice(2);
const initialState = [];
const STORAGE_KEY = "localList";

export const Todo = () => {
  const [todo, setTodo] = useState("");
  const [listItems, setListItems] = useState(() => {
    const localState = localStorage.getItem(STORAGE_KEY);
    if (localState) {
      return JSON.parse(localState);
    }

    return initialState;
  });

  const handleAddItem = () => {
    setListItems([
      { id: generateId(), value: todo, enabled: true },
      ...listItems,
    ]);
    setTodo("");
  };

  const handleDisabled = (idx) => () => {
    setListItems([
      ...listItems.slice(0, idx),
      {
        ...listItems[idx],
        enabled: !listItems[idx].enabled,
      },
      ...listItems.slice(idx + 1, listItems.length),
    ]);
  };

  const handleDelete = (idx) => () => {
    setListItems([
      ...listItems.slice(0, idx),
      ...listItems.slice(idx + 1, listItems.length),
    ]);
  };

  const handleEdit = (idx, newText) => {
    setListItems([
      ...listItems.slice(0, idx),
      { ...listItems[idx], value: newText, enabled: listItems[idx].enabled },
      ...listItems.slice(idx + 1, listItems.length),
    ]);
  };

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(listItems));
  });

  return (
    <div className="todo">
      <div className="contentWrapper">
        <h1 className="title">ToDo List</h1>
        <NewInput value={todo} onChange={setTodo} onAdd={handleAddItem} />

        <div className="listWrapper">
          {listItems.map((item, idx) => {
            return (
              <ListItem
                key={item.id}
                idx={idx}
                className={
                  listItems[idx].enabled
                    ? "listItemEnabled"
                    : "listItemDisabled"
                }
                item={item}
                onItemChange={handleEdit}
                status={listItems[idx].enabled}
                handleDelete={handleDelete(idx)}
                handleDisabled={handleDisabled(idx)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
