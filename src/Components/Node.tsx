import React from "react";
import "./Node.css";
import { NodeType } from "../App";

const Node = (props: NodeType) => {
  const nodeClassName = (): string => {
    if (!props.isStart && !props.isFinish) return "node";

    if (props.isStart) return "node-start";
    else return "node-finish";
  };

  return <div className={`${nodeClassName()}`}></div>;
};

export default Node;
