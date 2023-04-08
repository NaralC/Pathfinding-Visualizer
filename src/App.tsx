import React, { useEffect, useState, useReducer } from "react";
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
import Footer from "./Components/Footer";
import { GiPathDistance, AiFillQuestionCircle } from "react-icons/all";
import Hero from "./Components/Hero";
import binaryTreeMaze from "./Algorithms/MazeGeneration/binaryTree";

type ACTIONTYPES =
  | { type: "pathfinding-BFS" }
  | { type: "pathfinding-DFS" }
  | { type: "algo-random" }
  | { type: "algo-binaryTree" }
  | { type: "algo-horiDiv" }
  | { type: "init-matrix" };
// | { type: "pathfinding-BFS"; payload: string }
// | { type: "pathfinding-DFS"; payload: string }
// | { type: "algo-random"; payload: string }
// | { type: "algo-binaryTree"; payload: string }
// | { type: "algo-horiDiv"; payload: string }
// | { type: "init-matrix"; payload: string };

const initialDataState: {
  nodeList: (NodeType | void)[][];
  pathfindingAlgo: string;
  mazeGenAlgo: string;
} = {
  nodeList: [[]],
  pathfindingAlgo: "BFS",
  mazeGenAlgo: "Random",
};

const dataReducer = (state: typeof initialDataState, action: ACTIONTYPES) => {
  switch (action.type) {
    case "pathfinding-BFS":
      return {
        ...state,
        pathfindingAlgo: "BFS",
      };

    case "pathfinding-DFS":
      return {
        ...state,
        pathfindingAlgo: "DFS",
      };

    case "algo-random":
      return {
        ...state,
        mazeGenAlgo: "Random",
      };

    case "algo-binaryTree":
      return {
        ...state,
        mazeGenAlgo: "Binary Tree",
      };

    case "algo-horiDiv":
      return {
        ...state,
        mazeGenAlgo: "Horizontal Division",
      };

    case "init-matrix":
      return {
        ...state,
        nodeList: initializeMatrix(),
      };

    default:
      throw new Error("Bad Action 🤓");
  }
};

const App: React.FC = () => {
  const [dataState, dispatchDataState] = useReducer(
    dataReducer,
    initialDataState
  );

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
  const [showHero, setShowHero] = useState<boolean>(false);

  const listOfAlgos: string[] = ["Breadth-First Search", "Depth-First Search"];
  const listOfMazes: string[] = [
    "Random",
    "Binary Tree",
    "Horizontal Division",
  ];

  useEffect(() => {
    setNodeList(initializeMatrix);
    // dispatchDataState({
    //   type: "init-matrix",
    // });

    return () => {
      clearInterval;
    };
  }, []);

  const startVisualization = (): void => {
    let data;

    switch (pathfindingAlgo) {
      case "Breadth-First Search":
        data = BFS(
          nodeList,
          nodeList[store.START_ROW][store.START_COL],
          nodeList[store.FINISH_ROW][store.FINISH_COL]
        );
        break;

      case "Depth-First Search":
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

      case "Binary Tree":
        setNodeList(binaryTreeMaze(nodeList));
        break;

      default:
        console.log("DEFAULTS TO BINARY TREE");
        setNodeList(randomMaze(nodeList));
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
    <>
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-center">
        <div
          className="tooltip tooltip-right sm:tooltip-left"
          data-tip="What's this project about?"
          onClick={() => setShowHero(true)}
        >
          <AiFillQuestionCircle className="text-xl transition-all delay-75 md:text-2xl lg:text-3xl hover:cursor-pointer hover:text-blue-500" />
        </div>
        <div className="p-5 text-2xl md:text-4xl lg:text-5xl font-JetbrainsMono">
          PATHFINDING VISUALIZER
        </div>
        <GiPathDistance className="text-3xl md:text-4xl lg:text-5xl" />
      </header>
      <nav className="flex flex-col w-full p-5 mx-auto text-xs bg-gray-200 rounded md:flex-row gap-7 md:justify-center md:w-fit sm:text-sm md:text-md lg:text-lg">
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
      </nav>
      <div className=""></div>
      <section className="mx-auto my-5">
        {showHero && (
          <div onClick={() => setShowHero(false)}>
            <Hero />
          </div>
        )}
        {showModal && <Modal />}
        {nodeList.map((row, rowIdx) => {
          return (
            <ol key={`${row}-${rowIdx}`} className="flex">
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
      </section>
      <div className="grow"></div>
      <footer className="font-JetbrainsMono">
        <Footer />
      </footer>
    </div>
    </>
  );
};

export default App;

// TODO
// - try useReducer
// - add dijkstar
// - add a*
// - add recursive div maze
// - dropdowns are confusing
// - actually use MobX
// - bug when dragging wall over start/end
// - remove moving start/end
