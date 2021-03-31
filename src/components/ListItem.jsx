import { useState } from "react";

import { Modal } from "./Modal";
import { Buton } from "./Buton";
import { NewInput } from "./Input";
import { ReactComponent as EditIcon } from "../images/edit.svg";
import { ReactComponent as DeleteIcon } from "../images/delete.svg";

import "../styles/ListItem.css";

export const ListItem = ({
  idx,
  item,
  status,
  className,
  onItemChange,
  handleDelete,
  handleDisabled,
}) => {
  const [editedTodo, setEditedTodo] = useState("");
  const [isInEdit, setIsInEdit] = useState(false);
  const [isShown, setIsShown] = useState(false);

  const toggleEdit = () => {
    setIsInEdit((s) => !s);
    setEditedTodo(item.value);
  };

  const handleClickDelete = () => {
    setIsShown((s) => !s);
  };

  return (
    <div className="containerLine">
      {isInEdit ? (
        <NewInput
          value={editedTodo}
          onChange={setEditedTodo}
          onAdd={() => {
            onItemChange(idx, editedTodo);
            setIsInEdit(false);
          }}
        />
      ) : (
        <>
          <div onClick={handleDisabled} className={className}>
            {item.value}
          </div>
          {status && (
            <>
              <Buton onClick={toggleEdit}>
                <EditIcon className="actionIcon edit" />
              </Buton>

              <Buton
                onClick={() => {
                  handleClickDelete();
                }}
              >
                <DeleteIcon className="actionIcon delete" />
              </Buton>
            </>
          )}
        </>
      )}
      {isShown && (
        <Modal
          accept={handleDelete}
          question={"Credeti in iisus din nazaret?"}
          decline={handleClickDelete}
        />
      )}
    </div>
  );
};
