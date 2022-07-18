import React, { useEffect, useState } from "react";
import Node from "./Components/Node";
import { BFS } from "./Algorithms/BFS";

export type NodeType = {
  row: number;
  col: number;
  isStart: boolean;
  isFinish: boolean;
  isVisited: boolean;
};

const App: React.FC = () => {
  // Initiliaze a 15 row by 50 col matrix
  const nodeList: NodeType[][] = initializeMatrix();

  // TODO: Return nodes in their visit order
  const startVisualization = () => {
    const visitPath: Array<NodeType | undefined> = BFS({
      matrix: nodeList,
      startNode: nodeList[7][10],
      endNode: nodeList[7][40],
    });

    console.log(visitPath);

    // animatePath(visitPath);
  };

  // TODO: Animate the visit path
  const animatePath = (props: Array<NodeType | undefined>) => {};

  return (
    <>
      <div className="bg-slate-500 flex items-center justify-center">
        <button className="bg-slate-400" onClick={() => startVisualization}>
          Visualize!
        </button>
      </div>
      <div className="mx-28 my-24">
        {nodeList.map((row, rowIdx) => {
          return (
            <ol>
              {row.map((col, colIdx) => (
                <Node
                  key={`${rowIdx}-${colIdx}`}
                  row={rowIdx}
                  col={colIdx}
                  isStart={col.isStart}
                  isFinish={col.isFinish}
                  isVisited={col.isVisited}
                ></Node>
              ))}
            </ol>
          );
        })}
      </div>
    </>
  );
};

export default App;

const initializeMatrix = (): NodeType[][] => {
  const nodeList: NodeType[][] = [];

  for (let rowIdx = 0; rowIdx < 15; rowIdx++) {
    const currentRow: NodeType[] = [];

    for (let colIdx = 0; colIdx < 50; colIdx++) {
      const currentNode: NodeType = {
        row: rowIdx,
        col: colIdx,
        isStart: rowIdx === 7 && colIdx === 10,
        isFinish: rowIdx === 7 && colIdx === 40,
        isVisited: false,
      };

      currentRow.push(currentNode);
    }
    nodeList.push(currentRow);
  }

  return nodeList;
};
