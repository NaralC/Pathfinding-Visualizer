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
    <div className="">
      <div className="dropdown dropdown-hover drop">
        <label tabIndex={0} className="button btn-secondary">
          {displayText}
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 md:text-xs lg:text-sm 2xl:text-lg shadow bg-white rounded-box w-52"
        >
          {listOfItems.map((item: string) => {
            return (
              <li key={item} className="">
                <div onClick={() => changeSelected(item)}>{item}</div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
