import React from "react";
import "./Node.css";

export type NodeType = {
  row: number;
  col: number;
  isStart: boolean;
  isFinish: boolean;
  isVisited: boolean;
  isWall: boolean;
  isShortestPath: boolean;
  previousNode: NodeType | null;
  onMouseDown: () => void;
  onMouseUp: () => void;
  onMouseEnter: () => void; // Dragging mouse over a node
};

const Node: React.FC<NodeType> = (props) => {
  const nodeState = (): string => {
    if (props.isStart) return "bg-green-400";
    if (props.isFinish) return "bg-red-400";
    if (props.isWall) return "node-wall";
    if (props.isShortestPath) return "shortest-path";
    if (props.isVisited) return "node-visited";

    return "bg-white";
  };
  return (
    <div
      onMouseDown={() => props.onMouseDown()}
      onMouseUp={() => props.onMouseUp()}
      onMouseEnter={() => props.onMouseEnter()}
      className={`node ${nodeState()}`}
    ></div>
  );
};

export default Node;
