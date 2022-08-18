import React, { Dispatch, SetStateAction } from "react";

type DropdownProps = {
  displayText: string;
  changeSelected: Dispatch<SetStateAction<string>>;
  listOfItems: string[];
};

const Dropdown: React.FC<DropdownProps> = ({
  displayText,
  changeSelected,
  listOfItems,
}) => {
  return (
    <div className="flex flex-row py-2 px-4">
      <div className="dropdown dropdown-hover">
        <label tabIndex={0} className="btn m-1">
          {displayText}
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          {listOfItems.map((item: string) => {
            return (
              <li>
                <a onClick={() => changeSelected(item)}>{item}</a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
