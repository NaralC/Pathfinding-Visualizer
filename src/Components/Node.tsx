import React from "react";
import "./Node.css";

export type NodeType = {
  row: number;
  col: number;
  isStart: boolean;
  isFinish: boolean;
  isVisited: boolean;
  isWall: boolean;
};

const Node: React.FC<NodeType> = (props) => {
  return (
    <div
      className={`node ${
        props.isStart
          ? "bg-green-500"
          : props.isFinish
          ? "bg-red-500"
          : props.isVisited
          ? "bg-blue-500"
          : props.isWall
          ? "bg-gray-400"
          : "bg-gray-400"
      }`}
    ></div>
  );
};

// Unused for now, could replace tertiary operator later
const nodeState = (props: NodeType): string => {
  if (props.isStart) return "bg-green-400";
  if (props.isFinish) return "bg-red-400";
  if (props.isVisited) return "bg-blue-400";
  if (props.isWall) return "bg-gray-400";

  return "bg-gray-400";
};

export default Node;
