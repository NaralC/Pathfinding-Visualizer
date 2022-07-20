import React from "react";
import "./Node.css";
import { NodeType } from "../App";

const Node: React.FC<NodeType> = ({
  row,
  col,
  isStart,
  isFinish,
  isVisited,
}) => {
  const nodeClassName = (): string => {
    if (!isStart && !isFinish) return "node";

    if (isStart) return "node-start";
    else return "node-finish";
  };

  return <div className={`${nodeClassName()}`}></div>;
};

export default Node;
