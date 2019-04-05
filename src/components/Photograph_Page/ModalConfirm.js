import React from "react";
import fail from "../../img/fail_120.png";

const Modal = props => {
  return (
    <div className="modal-message ">
      <div className="modal-window anim">
        <div className="modal-title">
          <img src={fail} alt="img" className="failure-icon" />
          <h4>Uwaga</h4>
        </div>
        <div className="modal-description">
          {
            <p>
              Czy napewno usunąć klienta <span>{props.name}</span> ?
            </p>
          }
        </div>
        <div className="modal-button">
          <button className="btn-modal-hide failure" onClick={props.remove}>
            OK
          </button>
          <button className="btn-modal-hide success" onClick={props.cancel}>
            Anuluj
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
