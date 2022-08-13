import { initializeMatrix } from "../../App";
import { NodeType } from "../../Components/Node";

export const randomMaze = (matrix: NodeType[][]): NodeType[][] => {
  const dummyMatrix = initializeMatrix();

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[0].length; col++) {
      // Skip if it's the start node or the end node
      if (matrix[row][col].isStart || matrix[row][col].isFinish) continue;

      // The "random" part
      if (Math.random() < 0.25) {
        dummyMatrix[row][col].isWall = true;
      }
    }
  }

  return dummyMatrix;
};
