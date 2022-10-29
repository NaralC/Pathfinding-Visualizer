import React, { useEffect, useState } from "react";
import Node from "./Components/Node";
import BFS from "./Algorithms/Pathfinding/BFS";
import DFS from "./Algorithms/Pathfinding/DFS";
import randomMaze from "./Algorithms/MazeGeneration/randomMaze";
import horizontalDivision from "./Algorithms/MazeGeneration/horizontalDivision";
import verticalDivision from "./Algorithms/MazeGeneration/verticalDivision";
import Modal from "./Components/Modal";
import Dropdown from "./Components/Dropdown";
import Button from "./Components/Button";
import { NodeType } from "./store";
import store from "./store";
import { initializeMatrix } from "./Algorithms/Utility";

const App: React.FC = () => {
  // Lists of data
  const [nodeList, setNodeList] = useState<NodeType[][]>([[]]);
  const [pathfindingAlgo, setPathfindingAlgo] = useState<string>("BFS");
  const [mazeGenAlgo, setMazeGenAlgo] = useState<string>("Random");

  // Mouse events
  const [mouseIsDown, toggleMouseIsDown] = useState<boolean>(false);
  const [isHoldingStartOrEnd, setIsHoldingStartOrEnd] = useState<string | null>(
    null
  );

  // Board states
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [showModal, setshowModal] = useState<boolean>(false);
  const [needToClearBoard, setNeedToClearBoard] = useState<boolean>(false);
  const [canVisualize, setCanVisualize] = useState<boolean>(true);

  const listOfAlgos: string[] = ["BFS", "DFS"];
  const listOfMazes: string[] = [
    "Random",
    "Horizontal Division",
    "Vertical Division",
  ];

  useEffect(() => {
    setNodeList(initializeMatrix);
  }, [])
  

  const startVisualization = (): void => {
    let data;

    switch (pathfindingAlgo) {
      case "BFS":
        data = BFS(
          nodeList,
          nodeList[store.START_ROW][store.START_COL],
          nodeList[store.FINISH_ROW][store.FINISH_COL]
        );
        break;

      case "DFS":
        data = DFS(
          nodeList,
          nodeList[store.START_ROW][store.START_COL],
          nodeList[store.FINISH_ROW][store.FINISH_COL]
        );
        break;

      default:
        data = BFS(
          nodeList,
          nodeList[store.START_ROW][store.START_COL],
          nodeList[store.FINISH_ROW][store.FINISH_COL]
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

    // Set needToClearBoard to true to clear the board after the animation
    setNeedToClearBoard(true);

    // Set canVisualize to false to prevent the user from clicking the visualize button again
    setCanVisualize(false);

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
        setTimeout(() => {
          const newMatrix = [...nodeListWithWalls];
          newMatrix[node.row][node.col].isShortestPath = true;
          setNodeList(newMatrix);

          // Allow interaction with the grid again when visualization finishes
          if (idx === shortestPath.length - 1) {
            setIsAnimating(false);
          }
        }, 25 * idx);
      });

      // Shows error modal in case the end node can't be reached
      if (!nodeList[store.FINISH_ROW][store.FINISH_COL].isVisited) {
        setshowModal(true);

        setTimeout(() => {
          setshowModal(false);
        }, 2000);
      }
    };

    const animateVisitPath = (): void => {
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

    // Animate all visited nodes, followed by the shortest path
    animateVisitPath();
  };

  const toggleWall = (rowIdx: number, colIdx: number): void => {
    if (isAnimating) return;

    const newMatrix = [...nodeList];
    const node = newMatrix[rowIdx][colIdx];
    const newNode = { ...node, isWall: !node.isWall };
    newMatrix[rowIdx][colIdx] = newNode;
    setNodeList(newMatrix);
  };

  const handleMouseDown = (rowIdx: number, colIdx: number): void => {
    if (isAnimating) return;

    toggleMouseIsDown(true);

    if (nodeList[rowIdx][colIdx].isStart) {
      setIsHoldingStartOrEnd("start");
      return;
    } else if (nodeList[rowIdx][colIdx].isFinish) {
      setIsHoldingStartOrEnd("finish");
      return;
    }

    toggleWall(rowIdx, colIdx);
    setNeedToClearBoard(true);
  };

  const handleMouseUp = (rowIdx: number, colIdx: number): void => {
    if (isAnimating) return;

    if (isHoldingStartOrEnd) {
      const tempNodeList = [...nodeList];

      // Get rid of the start/end node
      if (isHoldingStartOrEnd === "start") {
        tempNodeList[store.START_ROW][store.START_COL].isStart = false;
        store.START_ROW = rowIdx;
        store.START_COL = colIdx;
        tempNodeList[store.START_ROW][store.START_COL].isStart = true;
      } else if (isHoldingStartOrEnd === "finish") {
        tempNodeList[store.FINISH_ROW][store.FINISH_COL].isFinish = false;
        store.FINISH_ROW = rowIdx;
        store.FINISH_COL = colIdx;
        tempNodeList[store.FINISH_ROW][store.FINISH_COL].isFinish = true;
      }

      setNodeList(tempNodeList);
      setIsHoldingStartOrEnd(null);
    }

    toggleMouseIsDown(false);
  };

  // Only works if mouse is held down and being dragged
  const handleMouseEnter = (rowIdx: number, colIdx: number): void => {
    if (isAnimating) return;

    if (mouseIsDown && !isHoldingStartOrEnd) {
      toggleWall(rowIdx, colIdx);
      setNeedToClearBoard(true);
    }
  };

  const handleMazeGeneration = (): void => {
    console.log(mazeGenAlgo);

    switch (mazeGenAlgo) {
      case "Random":
        setNodeList(randomMaze(nodeList));
        break;

      case "Horizontal Division":
        setNodeList(horizontalDivision(nodeList));
        break;

      case "Vertical Division":
        setNodeList(verticalDivision(nodeList));
        break;

      default:
        setNodeList(randomMaze(nodeList));
        console.log("DEFAULTS TO RANDOM GENERATION");
        break;
    }

    setNeedToClearBoard(true);
    setCanVisualize(true);
  };

  const handleClearBoard = (): void => {
    setNodeList(initializeMatrix());
    setNeedToClearBoard(false);
    setCanVisualize(true);
  };

  return (
    <div className="flex flex-col h-screen w-screen">
      <div className="flex justify-center text-3xl md:text-4xl lg:text-5xl font-JetbrainsMono p-5">
        PATHFINDING VISUALIZER
      </div>
      <div className="flex flex-row justify-around rounded m-3 p-3 bg-gray-200">
        <Dropdown
          displayText="Pick an Algorithm!"
          handleClick={setPathfindingAlgo}
          listOfItems={listOfAlgos}
        />
        <Dropdown
          displayText="Pick a Maze Generator!"
          handleClick={setMazeGenAlgo}
          listOfItems={listOfMazes}
        />
        <Button
          text="Visualize!"
          isClickable={!isAnimating && canVisualize}
          extraClassName="btn-disabled loading"
          handleClick={startVisualization}
        />
        <Button
          text="Generate Maze!"
          isClickable={!isAnimating}
          extraClassName="btn-disabled"
          handleClick={handleMazeGeneration}
        />
        <Button
          text="Clear Board!"
          isClickable={!isAnimating && needToClearBoard}
          extraClassName="btn-disabled"
          handleClick={handleClearBoard}
        />
      </div>
      <div className="bg-gray-200 container mx-auto">
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
                  onMouseUp={() => handleMouseUp(rowIdx, colIdx)}
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


// TODO: Functionalities
// More Maze Generation Algorithms (Binary Tree, Kruskal's, Prim's, Recursive Division)
// More Pathfinding Algorithms (A*, Djikstra)
// Let user pick matrix size

// TODO: Improvements
// Let user pick start and end nodes (still buggy)
// Wall animation is slightly off when visualization starts
