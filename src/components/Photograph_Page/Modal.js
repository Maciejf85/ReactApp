import React from "react";
import fail from "../../img/fail_120.png";
import success from "../../img/success.png";

const Modal = props => {
  const { name, result } = props;
  return (
    <div className="modal-message">
      <div className="modal-window anim">
        <div className="modal-title">
          {result && <img src={success} alt="img" className="success-icon" />}
          {!result && <img src={fail} alt="img" className="failure-icon" />}
          <h4>{result ? "Sukces !" : "Błąd !"}</h4>
        </div>
        <div className="modal-description">
          {result && (
            <p>
              Klient <span>{name}</span> dodany poprawnie !
            </p>
          )}
          {!result && <p>Nie udało się dodać klienta !</p>}
        </div>
        <div className="modal-button">
          <button
            className={`btn-modal-hide ${result ? "success" : "failure"} `}
            onClick={props.hide}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
