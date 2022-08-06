import { NodeType } from "../Components/Node";

export const DFS = (
  matrix: NodeType[][],
  startNode: NodeType,
  endNode: NodeType
): NodeType[] => {
  // Edge cases
  if (startNode === endNode || !matrix || !startNode || !endNode) return [];

  const visitOrder: NodeType[] = [];

  return [];
};
