import { NodeType } from "../Components/Node";

export const BFS = (
  matrix: NodeType[][],
  startNode: NodeType,
  endNode: NodeType
): NodeType[] => {
  const getUnvisitedNeighbors = (node: NodeType): void => {
    if (node.isVisited) return;
    const { row, col } = node;

    if (row > 0) {
      if (!matrix[row - 1][col].isVisited) {
        queue.push(matrix[row - 1][col]);
      }
    }
    if (row < matrix.length - 1) {
      if (!matrix[row + 1][col].isVisited) {
        queue.push(matrix[row + 1][col]);
      }
    }
    if (col > 0) {
      if (!matrix[row][col - 1].isVisited) {
        queue.push(matrix[row][col - 1]);
      }
    }
    if (col < matrix[0].length - 1) {
      if (!matrix[row][col + 1].isVisited) {
        queue.push(matrix[row][col + 1]);
      }
    }

    node.isVisited = true;
    return;
  };

  // Edge cases
  if (startNode === endNode || !matrix || !startNode || !endNode) return [];

  const queue: NodeType[] = [startNode];
  const visitOrder: NodeType[] = [];

  while (queue.length) {
    const node = queue.shift();

    if (!node || node.isWall || node.isVisited) continue;
    if (node === endNode) return visitOrder;

    visitOrder.push(node);
    getUnvisitedNeighbors(node);
  }

  return visitOrder;
};
