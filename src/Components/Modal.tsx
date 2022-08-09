import React from "react";

type ModalProps = {
  header: string;
  body: string;
};

const Modal: React.FC<ModalProps> = ({ body, header }) => {
  return (
    <div>
      <a href="#my-modal-2" className="btn">
        Try Modal
      </a>
      <div className="modal" id="my-modal-2">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{header}</h3>
          <p className="py-4">{body}</p>
          <div className="modal-action">
            <a href="#" className="btn">
              Close Notification
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
