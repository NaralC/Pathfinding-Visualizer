import React from "react";

type ModalProps = {
  header: string;
  body: string;
};

const Modal: React.FC<ModalProps> = ({ body, header }) => {
  return (
    <div>
      <div className="modal modal-open modal-middle" id="my-modal-2">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{header}</h3>
          <p className="py-4">{body}</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
