import React, { Dispatch, SetStateAction } from "react";

type DropdownProps = {
  changeAlgo: Dispatch<SetStateAction<string>>;
  currentAlgo: string;
  listOfAlgos: string[];
};

const Dropdown: React.FC<DropdownProps> = ({
  changeAlgo,
  listOfAlgos,
  currentAlgo,
}) => {
  return (
    <div>
      <div className="dropdown dropdown-hover">
        <label className="btn m-1">Pick Your Algorithm!</label>
        <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
          {/* {listOfAlgos.map((algo: string) => {
            <li>
              <a>{algo}</a>
            </li>;
          })} */}
        </ul>
      </div>
      <p>Current Pathfinding Algorithm: {currentAlgo}</p>
    </div>
  );
};

export default Dropdown;
