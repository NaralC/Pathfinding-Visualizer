import React, { Dispatch, SetStateAction } from "react";
import "./Button.css";

type DropdownProps = {
  displayText: string;
  handleClick: Dispatch<SetStateAction<string>>;
  listOfItems: string[];
};

const Dropdown: React.FC<DropdownProps> = ({
  displayText,
  handleClick,
  listOfItems,
}) => {
  return (
      <div className="dropdown dropdown-hover dropdown-bottom">
        <label tabIndex={0} className="button btn-secondary">
          {displayText}
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 md:text-xs lg:text-sm 2xl:text-lg shadow bg-white rounded-box font-JetbrainsMono"
        >
          {listOfItems.map((item: string) => {
            return (
              <li key={item} className="items-center overflow-hidden">
                <div className="w-full text-center" onClick={() => handleClick(item)}>
                  {item}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
  );
};

export default Dropdown;
