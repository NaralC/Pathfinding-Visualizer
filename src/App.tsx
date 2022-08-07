import React, { useState } from "react";
import Node, { NodeType } from "./Components/Node";
import { BFS } from "./Algorithms/BFS";
import { DFS } from "./Algorithms/DFS";

// Hardcoded start and finish nodes
const START_ROW: number = 7;
const START_COL: number = 10;
const FINISH_ROW: number = 7;
const FINISH_COL: number = 40;

const App: React.FC = () => {
  // Initiliaze a 15 row by 50 col matrix
  const [nodeList, setNodeList] = useState<NodeType[][]>(initializeMatrix);
  const [mouseIsDown, toggleMouseIsDown] = useState<boolean>(false);

  const startVisualization = (): void => {
    console.log(nodeList);
    const visitPath: NodeType[] = BFS(
      nodeList,
      nodeList[START_ROW][START_COL],
      nodeList[FINISH_ROW][FINISH_COL]
    );
    animatePath(visitPath);
  };

  // Reset the entire matrix clean -> Animate the visited path
  const animatePath = (visitPath: NodeType[]): void => {
    const emptyNodeList: NodeType[][] = initializeMatrix();
    setNodeList(emptyNodeList);

    visitPath.forEach((node, idx) => {
      setTimeout(() => {
        const newMatrix = [...emptyNodeList];
        newMatrix[node.row][node.col].isVisited = true;
        setNodeList(newMatrix);
      }, 5 * idx);
    });
  };

  // TODO: Handle wall toggle with mouse events
  // Walls show up before visualization, but disappears after it starts
  const toggleWall = (rowIdx: number, colIdx: number) => {
    const newMatrix = [...nodeList];
    const node = newMatrix[rowIdx][colIdx];
    const newNode = { ...node, isWall: !node.isWall };
    newMatrix[rowIdx][colIdx] = newNode;
    setNodeList(newMatrix);
  };

  const handleMouseDown = (rowIdx: number, colIdx: number) => {
    toggleMouseIsDown(true);
    toggleWall(rowIdx, colIdx);
  };

  const handleMouseUp = (rowIdx: number, colIdx: number) => {
    toggleMouseIsDown(false);
  };

  // Only works if mouse is down and being dragged
  const handleMouseEnter = (rowIdx: number, colIdx: number) => {
    if (mouseIsDown) {
      toggleWall(rowIdx, colIdx);
    }
  };

  return (
    <>
      <div className="bg-slate-500 flex items-center justify-center">
        <button className="bg-slate-400" onClick={() => startVisualization()}>
          Visualize!
        </button>
      </div>
      <div className="mx-28 my-24">
        {nodeList.map((row, rowIdx) => {
          return (
            <ol key={`${row}-${rowIdx}`}>
              {row.map((col, colIdx) => (
                <Node
                  key={`${rowIdx}-${colIdx}`}
                  row={rowIdx}
                  col={colIdx}
                  isStart={col.isStart}
                  isFinish={col.isFinish}
                  isVisited={col.isVisited}
                  isWall={col.isWall}
                  onMouseDown={() => handleMouseDown(rowIdx, colIdx)}
                  onMouseUp={() => handleMouseUp(rowIdx, colIdx)}
                  onMouseEnter={() => handleMouseEnter(rowIdx, colIdx)}
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
        isStart: START_ROW === rowIdx && START_COL === colIdx,
        isFinish: FINISH_ROW === rowIdx && FINISH_COL === colIdx,
        isVisited: false,
        isWall: false,
        onMouseDown: () => {},
        onMouseUp: () => {},
        onMouseEnter: () => {},
      };

      currentRow.push(currentNode);
    }
    nodeList.push(currentRow);
  }

  return nodeList;
};
