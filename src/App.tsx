import React, { useEffect } from "react";
import Node from "./Components/Node";

type Props = {};

const App = (props: Props) => {
  const nodeList: number[][] = [];

  // Initiliaze the nodes array with 15 rows and 50 cols
  useEffect(() => {
    for (let row = 0; row < 15; row++) {
      nodeList.push([]);
      for (let col = 0; col < 50; col++) {
        nodeList[row][col] = 0;
      }
    }
  }, []);

  console.log(nodeList);
  return (
    <>
      {nodeList.map((row, col) => (
        <Node key={`${row}-${col}`} />
      ))}
    </>
  );
};

export default App;
