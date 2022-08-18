import { initializeMatrix } from "../../App";
import { NodeType } from "../../Components/Node";

const horizontalDivision = (matrix: NodeType[][]): NodeType[][] => {
  const addWall = (row: number): void => {
    let isStartOrFinish = false;
    let tempWalls: { col: number; row: number }[] = [];

    for (let col = 0; col < width; col++) {
      if (matrix[row][col].isStart || matrix[row][col].isFinish) {
        isStartOrFinish = true;
        continue;
      }
      tempWalls.push({ row, col });
    }

    if (!isStartOrFinish) {
      tempWalls.splice(Math.floor(Math.random() * tempWalls.length), 1);
    }

    tempWalls.forEach((wall) => {
      dummyMatrix[wall.row][wall.col].isWall = true;
    });
  };

  const dummyMatrix = initializeMatrix();
  const width = matrix[0].length;
  const height = matrix.length;

  if (width < 2 || height < 2) return dummyMatrix;

  const decision = Math.floor(Math.random() * 2);

  for (let row = 0; row < height; row++) {
    if (
      (decision === 0 && row % 2 !== 0) ||
      (decision === 1 && row % 2 === 0)
    ) {
      addWall(row);
    }
  }
  console.log(dummyMatrix);

  return dummyMatrix;
};

export default horizontalDivision;
