import { NodeType, Coordinates } from "../App";

type BFSType = {
  matrix: NodeType[][];
  startPos: Coordinates;
  endPos: Coordinates;
};

export const BFS = (props: BFSType): Array<NodeType> => {
  const appendNeighbors = (node: NodeType): void => {
    if (!node) return;

    // Prevent boundary break or going over the same cell
    if (
      props.matrix[node.row][node.col].isVisited ||
      node.row < 0 ||
      node.row >= props.matrix.length ||
      node.col < 0 ||
      node.col >= props.matrix[0].length
    ) {
      return;
    }
    // Mark current node as visited
    props.matrix[node.row][node.col].isVisited = true;
    visitOrder.push(props.matrix[node.row][node.col]);
    q.push(props.matrix[node.row][node.col]);
  };

  // TODO: Handle walls
  // Edge cases
  if (
    props.startPos === props.endPos ||
    !props.matrix ||
    !props.startPos ||
    !props.endPos
  )
    return [];

  const q: Array<Coordinates> = [props.startPos];
  const visitOrder: Array<NodeType> = []; // Will later be used to display the path

  while (q.length) {
    const node = q.shift();
    if (node) {
      if (node === props.endPos) {
        visitOrder.push(props.matrix[node.row][node.col]);
        return visitOrder;
      }

      appendNeighbors(props.matrix[node.row - 1][node.col]); // Up
      appendNeighbors(props.matrix[node.row + 1][node.col]); // Down
      appendNeighbors(props.matrix[node.row][node.col - 1]); // Left
      appendNeighbors(props.matrix[node.row][node.col + 1]); // Right
    }
  }
  // TODO: Handle impossible cases
  return visitOrder;
};
