import { NodeType } from "../App";

export const BFS = (props: {
  matrix: NodeType[][];
  startNode: NodeType;
  endNode: NodeType;
}): void => {
  const appendNeighbors = (node: NodeType | undefined): void => {
    if (!node) return;

    // Prevent boundary break or going over the same cell
    if ( seen.has(node) ||
      node.row < 0 ||
      node.row >= props.matrix.length ||
      node.col < 0 ||
      node.col >= props.matrix[0].length
    )
      return;

    q.push(node);
  };

  const q: Array<NodeType | undefined> = [props.startNode];
  const seen: Set<NodeType | undefined> = new Set<NodeType | undefined>;

  while (q.length > 0) {
    const node = q.shift();

    if (node) {
      if (node === props.endNode) {
        console.log("Found");
        return;
      }

      // Mark current node as visited
      node.isStart = true;
      seen.add(node);

      appendNeighbors({ ...node, row: node.row - 1 }); // Up
      appendNeighbors({ ...node, row: node.row + 1 }); // Down
      appendNeighbors({ ...node, row: node.col - 1 }); // Left
      appendNeighbors({ ...node, row: node.col + 1 }); // Right
    }
  }

  return;
};
