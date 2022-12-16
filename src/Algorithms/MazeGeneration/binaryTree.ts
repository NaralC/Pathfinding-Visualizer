import { initializeMatrix } from "../Utility";
import { NodeType } from "../../Components/Node";
import store from "../../store";

const binaryTreeMaze = (matrix: NodeType[][]): NodeType[][] => {
  const dummyMatrix = initializeMatrix();

  for (let row = 0; row < matrix.length; row += 1) {
    for (let col = 0; col < matrix[0].length; col += 1) {
      if (row % 2 === 0 || col % 2 === 0) {
        // Skip if it's the start node or the end node
        if (matrix[row][col].isStart || matrix[row][col].isFinish) {
          continue;
        }

        // The "binary tree" part
        dummyMatrix[row][col].isWall = true;
      }
    }
  }
  
  for (let row = 1; row < store.MATRIX_ROWS; row += 2) {
    for (let col = 1; col < store.MATRIX_COLS; col += 2) {
      if (row === store.MATRIX_ROWS - 2 && col === store.MATRIX_COLS - 2) {
        continue;
      } else if (row === store.MATRIX_ROWS - 2) {
        dummyMatrix[row][col + 1].isWall = false;
      } else if (col === store.MATRIX_COLS - 2) {
        dummyMatrix[row + 1][col].isWall = false;
      } else {
        if (Math.random() < 0.5) {
          dummyMatrix[row][col + 1].isWall = false;
        } else {
          dummyMatrix[row + 1][col].isWall = false;
        }
      }
    }
  }

  return dummyMatrix;
};

export default binaryTreeMaze;
