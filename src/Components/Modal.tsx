import React from "react";
import { TbError404Off } from "react-icons/tb";

const Modal: React.FC = () => {
  return (
    <div>
      <div className="modal modal-open modal-middle backdrop-blur-sm">
        <div className="modal-box text-center items-center flex flex-col">
          <TbError404Off className="text-5xl my-3"/>
          <h3 className="font-bold text-xl">
            Couldn't find the most optimal path
          </h3>
          <p className="py-4 text-lg">
            All paths leading to the finish are blocked!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
