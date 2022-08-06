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
  const nodeState = (): string => {
    if (props.isStart) return "bg-green-400";
    if (props.isFinish) return "bg-red-400";
    if (props.isVisited) return "bg-blue-400";
    if (props.isWall) return "bg-gray-400";

    return "bg-gray-400";
  };

  return <div className={`node ${nodeState()}`}></div>;
};

export default Node;
