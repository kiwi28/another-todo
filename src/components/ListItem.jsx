import { useState } from "react";

import { Modal } from "./Modal";
import { Buton } from "./Buton";
import { NewInput } from "./Input";
import { ReactComponent as EditIcon } from "../images/edit.svg";
import { ReactComponent as DeleteIcon } from "../images/delete.svg";

import "../styles/ListItem.css";

export const ListItem = ({
  id,
  idx,
  item,
  status,
  className,
  throwError,
  handleDelete,
  onItemChange,
  handleDisabled,
}) => {
  const [editedTodo, setEditedTodo] = useState("");
  const [isInEdit, setIsInEdit] = useState(false);
  const [isShown, setIsShown] = useState(false);

  const toggleEdit = () => {
    setIsInEdit((s) => !s);
    setEditedTodo(item.text);
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
            onItemChange(editedTodo);
            setIsInEdit(false);
          }}
        />
      ) : (
        <>
          {throwError && (
            <span className="label">List item cannot be empty!</span>
          )}
          <div onClick={handleDisabled} className={className}>
            {item.text}
          </div>
          {status && (
            <>
              <Buton onClick={toggleEdit} className="actionButton edit">
                <EditIcon className="actionIcon" />
              </Buton>

              <Buton
                onClick={() => {
                  handleClickDelete();
                }}
                className="actionButton delete"
              >
                <DeleteIcon className="actionIcon" />
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
