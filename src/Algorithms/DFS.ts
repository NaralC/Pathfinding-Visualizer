import { NodeType } from "../Components/Node";

export const DFS = (
  matrix: NodeType[][],
  startNode: NodeType,
  endNode: NodeType
): { visitPath: NodeType[]; shortestPath: NodeType[] } => {
  const getUnvisitedNeighbors = (node: NodeType): void => {
    if (node.isVisited) return;
    const { row, col } = node;

    if (row > 0) {
      if (!matrix[row - 1][col].isVisited) {
        matrix[row - 1][col].previousNode = node;
        stack.push(matrix[row - 1][col]);
      }
    }
    if (row < matrix.length - 1) {
      if (!matrix[row + 1][col].isVisited) {
        matrix[row + 1][col].previousNode = node;
        stack.push(matrix[row + 1][col]);
      }
    }
    if (col > 0) {
      if (!matrix[row][col - 1].isVisited) {
        matrix[row][col - 1].previousNode = node;
        stack.push(matrix[row][col - 1]);
      }
    }
    if (col < matrix[0].length - 1) {
      if (!matrix[row][col + 1].isVisited) {
        matrix[row][col + 1].previousNode = node;
        stack.push(matrix[row][col + 1]);
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

  const stack: NodeType[] = [startNode];
  const visitOrder: NodeType[] = [];

  while (stack.length) {
    const node = stack.pop(); // The only difference between BFS and DFS

    if (!node || node.isWall || node.isVisited) continue;
    if (node === endNode)
      return { visitPath: visitOrder, shortestPath: getShortestPath() };

    visitOrder.push(node);
    getUnvisitedNeighbors(node);
  }

  return { visitPath: visitOrder, shortestPath: getShortestPath() };
};
