import { NodeType } from "../Components/Node";

// TODO: Implement shortest path by backtracking
// Make nodes point back to their previous one, allowing us to compute the shortest path
// by backtracking from the finish node.

export const BFS = (
  matrix: NodeType[][],
  startNode: NodeType,
  endNode: NodeType
): {
  visitPath: NodeType[];
  shortestPath: NodeType[];
} => {
  const getUnvisitedNeighbors = (node: NodeType): void => {
    if (node.isVisited) return;
    const { row, col } = node;

    if (row > 0) {
      if (!matrix[row - 1][col].isVisited) {
        queue.push(matrix[row - 1][col]);
        matrix[row - 1][col].previousNode = node;
      }
    }
    if (row < matrix.length - 1) {
      if (!matrix[row + 1][col].isVisited) {
        queue.push(matrix[row + 1][col]);
        matrix[row + 1][col].previousNode = node;
      }
    }
    if (col > 0) {
      if (!matrix[row][col - 1].isVisited) {
        queue.push(matrix[row][col - 1]);
        matrix[row][col - 1].previousNode = node;
      }
    }
    if (col < matrix[0].length - 1) {
      if (!matrix[row][col + 1].isVisited) {
        queue.push(matrix[row][col + 1]);
        matrix[row][col + 1].previousNode = node;
      }
    }

    node.isVisited = true;
    return;
  };

  const getShortestPath = (): NodeType[] => {
    const shortestPath: NodeType[] = [];
    let currentNode: NodeType | null = endNode;

    while (currentNode) {
      shortestPath.unshift(currentNode); // Adds current current node to the beginning of the array
      currentNode = currentNode.previousNode;
    }

    return shortestPath;
  };

  // Edge cases
  if (startNode === endNode || !matrix || !startNode || !endNode) {
    return { visitPath: [], shortestPath: [] };
  }

  const queue: NodeType[] = [startNode];
  const visitOrder: NodeType[] = [];

  while (queue.length) {
    const node = queue.shift(); // The only difference between BFS and DFS

    if (!node || node.isWall || node.isVisited) continue;
    if (node === endNode) [visitOrder, getShortestPath()];

    visitOrder.push(node);
    getUnvisitedNeighbors(node);
  }

  return { visitPath: visitOrder, shortestPath: getShortestPath() };
};
