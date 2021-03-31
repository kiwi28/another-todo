import "../styles/Modal.css";

export const Modal = ({ accept, decline, question }) => {
  return (
    <div className="modalWrapper">
      <div className="modal">
        <div className="modalContent">
          <h2>{question}</h2>
          <div>
            <button onClick={accept} className="button green">
              Yes
            </button>
            <button onClick={decline} className="button red">
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
