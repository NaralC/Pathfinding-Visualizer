import React from "react";
import "./Node.css";

export type NodeType = {
  row: number;
  col: number;
  isStart: boolean;
  isFinish: boolean;
  isVisited: boolean;
  isWall: boolean;
  onMouseDown: () => void;
  onMouseUp: () => void;
  onMouseEnter: () => void; // Dragging mouse over a node
};

const Node: React.FC<NodeType> = (props) => {
  const nodeState = (): string => {
    if (props.isStart) return "bg-green-400";
    if (props.isFinish) return "bg-red-400";
    if (props.isWall) return "bg-black";
    if (props.isVisited) return "bg-blue-400";

    return "bg-gray-400";
  };
  return (
    <div
      onMouseDown={() => props.onMouseDown()}
      onMouseUp={() => props.onMouseUp()}
      onMouseEnter={() => props.onMouseEnter()}
      className={`node ${nodeState()} duration-500 ease-in-out delay-25`}
    ></div>
  );
};

export default Node;
