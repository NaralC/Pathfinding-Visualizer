import React, { useEffect, useState } from "react";
import Node from "./Components/Node";

type Props = {};

const App: React.FC = (props: Props) => {
  // Initiliaze 15x50 matrix filled with 0s
  const nodeList: number[][] = Array(15)
    .fill(0)
    .map((row) => new Array(50).fill(0));

  console.log(nodeList);
  return (
    <div>
      {nodeList.map((row, rowIdx) => {
        return (
          <ol>
            {row.map((col, colIdx) => (
              <Node></Node>
            ))}
          </ol>
        );
      })}
    </div>
  );
};

export default App;
