import { initializeMatrix } from "../../App";
import { NodeType } from "../../Components/Node";

const horizontalDivision = (matrix: NodeType[][]): NodeType[][] => {
  const addWall = (col: number): void => {
    let isStartOrFinish = false;
    let tempWalls: { idx: number; row: number }[] = [];

    for (let row = 0; row < height; row++) {
      if (matrix[row][col].isStart || matrix[row][col].isFinish) {
        isStartOrFinish = true;
        continue;
      }
      tempWalls.push({ idx: col, row });
    }

    if (!isStartOrFinish) {
      tempWalls.splice(Math.floor(Math.random() * tempWalls.length), 1);
    }

    tempWalls.forEach((walls) => {
      dummyMatrix[walls.row][walls.idx].isWall = true;
    });
  };

  const dummyMatrix = initializeMatrix();
  const width = matrix[0].length;
  const height = matrix.length;

  if (width < 2 || height < 2) return dummyMatrix;

  const decision = Math.floor(Math.random() * 2);

  for (let col = 0; col < width; col++) {
    if (
      (decision === 0 && col % 2 !== 0) ||
      (decision === 1 && col % 2 === 0)
    ) {
      addWall(col);
    }
  }

  return dummyMatrix;
};

export default horizontalDivision;
