import React, { useEffect, useState } from "react";
import Node, { NodeType } from "./Components/Node";
import { BFS } from "./Algorithms/Pathfinding/BFS";
import { DFS } from "./Algorithms/Pathfinding/DFS";
import { randomMaze } from "./Algorithms/MazeGeneration/randomMaze";
import Modal from "./Components/Modal";
import Dropdown from "./Components/Dropdown";
import Button from "./Components/Button";

// Hardcoded start and finish nodes
const START_ROW: number = 7;
const START_COL: number = 10;
const FINISH_ROW: number = 7;
const FINISH_COL: number = 40;
const MATRIX_ROWS: number = 15;
const MATRIX_COLS: number = 50;

const App: React.FC = () => {
  const [nodeList, setNodeList] = useState<NodeType[][]>(initializeMatrix);
  const [mouseIsDown, toggleMouseIsDown] = useState<boolean>(false);
  const [showModal, setshowModal] = useState<boolean>(false);
  const [pathfindingAlgo, setPathfindingAlgo] = useState<string>("BFS");
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const listOfAlgos = ["BFS", "DFS"];

  const startVisualization = (): void => {
    let data;

    switch (pathfindingAlgo) {
      case "BFS":
        data = BFS(
          nodeList,
          nodeList[START_ROW][START_COL],
          nodeList[FINISH_ROW][FINISH_COL]
        );
        break;

      case "DFS":
        data = DFS(
          nodeList,
          nodeList[START_ROW][START_COL],
          nodeList[FINISH_ROW][FINISH_COL]
        );
        break;

      default:
        data = BFS(
          nodeList,
          nodeList[START_ROW][START_COL],
          nodeList[FINISH_ROW][FINISH_COL]
        );
        console.log("DEFAULTS TO BFS");
    }

    animatePath(data.visitPath, data.shortestPath);
  };

  const animatePath = (
    visitPath: NodeType[],
    shortestPath: NodeType[]
  ): void => {
    // Set isAnimating to true to prevent interaction with the grid
    setIsAnimating(true);

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

    const animateShortestPath = (): void => {
      shortestPath.forEach((node, idx) => {
        // Allow interaction with the grid again
        if (idx === shortestPath.length - 1) {
          setIsAnimating(false);
        }

        setTimeout(() => {
          const newMatrix = [...nodeListWithWalls];
          newMatrix[node.row][node.col].isShortestPath = true;
          setNodeList(newMatrix);
        }, 25 * idx);
      });

      // Shows error modal in case the end node can't be reached
      if (!nodeList[FINISH_ROW][FINISH_COL].isVisited) {
        setshowModal(true);

        setTimeout(() => {
          setshowModal(false);
        }, 2000);
      }
    };

    // Animate the algorithm
    visitPath.forEach((node, idx) => {
      // Animate the shortest path when the main path is done
      if (idx === visitPath.length - 1) {
        console.log("found");

        setTimeout(() => {
          animateShortestPath();
        }, 5 * idx);
      }

      setTimeout(() => {
        const newMatrix = [...nodeListWithWalls];
        newMatrix[node.row][node.col].isVisited = true;
        setNodeList(newMatrix);
      }, 5 * idx);
    });
  };

  const toggleWall = (rowIdx: number, colIdx: number) => {
    if (isAnimating) return;

    const newMatrix = [...nodeList];
    const node = newMatrix[rowIdx][colIdx];
    const newNode = { ...node, isWall: !node.isWall };
    newMatrix[rowIdx][colIdx] = newNode;
    setNodeList(newMatrix);
  };

  const handleMouseDown = (rowIdx: number, colIdx: number) => {
    if (isAnimating) return;

    toggleMouseIsDown(true);
    toggleWall(rowIdx, colIdx);
  };

  const handleMouseUp = () => {
    if (isAnimating) return;

    toggleMouseIsDown(false);
  };

  // Only works if mouse is held down and being dragged
  const handleMouseEnter = (rowIdx: number, colIdx: number) => {
    if (isAnimating) return;

    if (mouseIsDown) {
      toggleWall(rowIdx, colIdx);
    }
  };

  const handleMazeGeneration = () => {
    setNodeList(randomMaze(nodeList));
  };

  return (
    <div className="flex flex-col">
      <div className="navbar bg-base-100 justify-center">
        <div className="m-5 bg-slate-400">
          <Dropdown
            changeAlgo={setPathfindingAlgo}
            currentAlgo={pathfindingAlgo}
            listOfAlgos={listOfAlgos}
            startVisualization={startVisualization}
          />
          <Button
            text="Visualize!"
            isAnimating={isAnimating}
            extraClassName="btn-disabled loading"
            handleClick={() => startVisualization()}
          />
          <Button
            text="Generate Maze!"
            isAnimating={isAnimating}
            extraClassName="btn-disabled"
            handleClick={() => handleMazeGeneration()}
          />
          <Button
            text="Clear Board!"
            isAnimating={isAnimating}
            extraClassName="btn-disabled"
            handleClick={() => setNodeList(initializeMatrix())}
          />
        </div>
      </div>
      <div>
        {showModal && (
          <Modal
            header="Couldn't find the most optimal path"
            body="All paths leading to the finish are blocked!"
          />
        )}
        {nodeList.map((row, rowIdx) => {
          return (
            <ol
              key={`${row}-${rowIdx}`}
              className="flex justify-center align-middle"
            >
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

// Initiliaze the matrix
export const initializeMatrix = (): NodeType[][] => {
  const nodeList: NodeType[][] = [];

  for (let rowIdx = 0; rowIdx < MATRIX_ROWS; rowIdx++) {
    const currentRow: NodeType[] = [];

    for (let colIdx = 0; colIdx < MATRIX_COLS; colIdx++) {
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

// TODO: Maze Generation (Binary Tree, Kruskal's, Prim's)
// TODO: Change start/end node
// TODO: More Pathfinding Algorithms (A*, Djikstra)
// TODO: Add a reset button
