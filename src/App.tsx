import React, { useEffect, useState } from "react";
import Node, { NodeType } from "./Components/Node";
import { BFS } from "./Algorithms/BFS";
import { DFS } from "./Algorithms/DFS";
import Modal from "./Components/Modal";

// Hardcoded start and finish nodes
const START_ROW: number = 7;
const START_COL: number = 10;
const FINISH_ROW: number = 7;
const FINISH_COL: number = 40;

const App: React.FC = () => {
  const [nodeList, setNodeList] = useState<NodeType[][]>(initializeMatrix);
  const [mouseIsDown, toggleMouseIsDown] = useState<boolean>(false);
  const [showModal, setshowModal] = useState<boolean>(false);

  const startVisualization = (): void => {
    const { visitPath, shortestPath } = BFS(
      nodeList,
      nodeList[START_ROW][START_COL],
      nodeList[FINISH_ROW][FINISH_COL]
    );

    animatePath(visitPath, shortestPath);
  };

  const animatePath = (
    visitPath: NodeType[],
    shortestPath: NodeType[]
  ): void => {
    // Create a copy of nodeList that only keeps walls
    const nodeListWithWalls = [...nodeList];

    for (let row = 0; row < nodeListWithWalls.length; row++) {
      for (let col = 0; col < nodeListWithWalls[row].length; col++) {
        if (
          !nodeListWithWalls[row][col].isWall &&
          !nodeListWithWalls[row][col].isFinish
        ) {
          nodeListWithWalls[row][col].isVisited = false;
          continue;
        }
      }
    }

    // Reset nodeList to all default nodes
    setNodeList(initializeMatrix());

    // Animate the algorithm
    visitPath.forEach((node, idx) => {
      setTimeout(() => {
        const newMatrix = [...nodeListWithWalls];
        newMatrix[node.row][node.col].isVisited = true;
        setNodeList(newMatrix);
      }, 5 * idx);
    });

    // Animate the shortest path
    shortestPath.forEach((node, idx) => {
      setTimeout(() => {
        const newMatrix = [...nodeListWithWalls];
        newMatrix[node.row][node.col].isShortestPath = true;
        setNodeList(newMatrix);
      }, 20 * idx);
    });

    // TODO: Handle impossible cases
    if (!nodeList[FINISH_ROW][FINISH_COL].isVisited) {
      setshowModal(true);

      setTimeout(() => {
        setshowModal(false);
      }, 2000);
    }
  };

  // Handle wall toggle with mouse events
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

  const handleMouseUp = () => {
    toggleMouseIsDown(false);
  };

  // Only works if mouse is held down and being dragged
  const handleMouseEnter = (rowIdx: number, colIdx: number) => {
    if (mouseIsDown) {
      toggleWall(rowIdx, colIdx);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <button
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded m-4"
          onClick={() => startVisualization()}
        >
          Visualize!
        </button>
      </div>
      <div className="mx-28 my-24">
        {showModal && (
          <Modal
            header="Couldn't find the most optimal path"
            body="All paths leading to the finish are blocked!"
          />
        )}
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
                  isShortestPath={col.isShortestPath}
                  previousNode={col.previousNode}
                  onMouseDown={() => handleMouseDown(rowIdx, colIdx)}
                  onMouseUp={() => handleMouseUp()}
                  onMouseEnter={() => handleMouseEnter(rowIdx, colIdx)}
                ></Node>
              ))}
            </ol>
          );
        })}
      </div>
    </div>
  );
};

export default App;

// Initiliaze a 15 row by 50 col matrix
// Matrix size is hard coded here
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
        isShortestPath: false,
        previousNode: null,
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

// TODO: Navbar/Sidebar for picking algorithms and navigation
// TODO: Maze Generation (Binary Tree, Kruskal's, Prim's)
// TODO: More Pathfinding Algorithms (A*, Djikstra)
