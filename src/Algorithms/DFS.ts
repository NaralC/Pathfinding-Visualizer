import { NodeType } from "../App";

type DFSType = {
  matrix: NodeType[][];
  startNode: NodeType;
  endNode: NodeType;
};

export const BFS = (props: DFSType): Array<NodeType | undefined> => {
  const goToNeighbor = (node: NodeType): void => {
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

    node.isVisited = true;
    visitOrder.push(node);

    goToNeighbor({ ...node, row: node.row - 1 }); // Up
    goToNeighbor({ ...node, row: node.row + 1 }); // Down
    goToNeighbor({ ...node, row: node.col - 1 }); // Left
    goToNeighbor({ ...node, row: node.col + 1 }); // Right
    return;
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

  const visitOrder: Array<NodeType | undefined> = []; // Will later be used to display the path

  goToNeighbor(props.startNode);

  // TODO: Handle impossible cases
  return [];
};
