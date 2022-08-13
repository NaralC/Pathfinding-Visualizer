import React, { Dispatch, SetStateAction } from "react";

type DropdownProps = {
  changeAlgo: Dispatch<SetStateAction<string>>;
  currentAlgo: string;
  listOfAlgos: string[];
  startVisualization: () => void;
};

const Dropdown: React.FC<DropdownProps> = ({
  changeAlgo,
  listOfAlgos,
  currentAlgo,
  startVisualization,
}) => {
  return (
    <div className="flex flex-row py-2 px-4">
      <div className="dropdown dropdown-hover">
        <label tabIndex={0} className="btn m-1">
          Pick Your Algorithm!
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          {listOfAlgos.map((algo: string) => {
            return (
              <li>
                <a onClick={() => changeAlgo(algo)}>{algo}</a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );

  // return (
  //   <div>
  //     <div className="form-control">
  //       <div className="input-group">
  //         <select className="select select-bordered">
  //           <option disabled selected>
  //             Pick category
  //           </option>
  //           {listOfAlgos.map((algo: string) => {
  //             return (
  //               <option>
  //                 <div onClick={() => console.log(algo)}>{algo}</div>
  //               </option>
  //             );
  //           })}
  //         </select>
  //         <button className="btn">Go</button>
  //         <text>{currentAlgo}</text>
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default Dropdown;
