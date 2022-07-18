import { NodeType } from "../App";

type BFSType = {
  matrix: NodeType[][];
  startNode: NodeType;
  endNode: NodeType;
};

export const BFS = (props: BFSType): Array<NodeType | undefined> => {
  const appendNeighbors = (node: NodeType | undefined): void => {
    if (!node) return;

    // Prevent boundary break or going over the same cell
    if (
      node.isVisited ||
      node.row < 0 ||
      node.row >= props.matrix.length ||
      node.col < 0 ||
      node.col >= props.matrix[0].length
    )
      return;

    q.push(node);
  };

  // TODO: Handle walls
  // Edge cases
  if (
    props.startNode === props.endNode ||
    !props.matrix ||
    !props.startNode ||
    !props.endNode
  )
    return [];

  const q: Array<NodeType | undefined> = [props.startNode];
  const visitOrder: Array<NodeType | undefined> = []; // Will later be used to display the path

  while (q.length) {
    const node = q.shift();

    if (node) {
      if (node === props.endNode) {
        return visitOrder;
      }

      // Mark current node as visited
      node.isVisited = true;
      visitOrder.push(node);

      appendNeighbors({ ...node, row: node.row - 1 }); // Up
      appendNeighbors({ ...node, row: node.row + 1 }); // Down
      appendNeighbors({ ...node, row: node.col - 1 }); // Left
      appendNeighbors({ ...node, row: node.col + 1 }); // Right
    }
  }
  // TODO: Handle impossible cases
  return [];
};
