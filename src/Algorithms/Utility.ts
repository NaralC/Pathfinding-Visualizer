import { NodeType } from "../store";
import store from "../store";

export const initializeMatrix = (): NodeType[][] => {
  const nodeList: NodeType[][] = [];

  for (let rowIdx = 0; rowIdx < store.MATRIX_ROWS; rowIdx++) {
    const currentRow: NodeType[] = [];

    for (let colIdx = 0; colIdx < store.MATRIX_COLS; colIdx++) {
      const currentNode: NodeType = {
        row: rowIdx,
        col: colIdx,
        isStart: store.START_ROW === rowIdx && store.START_COL === colIdx,
        isFinish: store.FINISH_ROW === rowIdx && store.FINISH_COL === colIdx,
        isVisited: false,
        isWall: false,
        isShortestPath: false,
        previousNode: null,
        onMouseDown: () => {},
        onMouseUp: () => {},
        onMouseEnter: () => {},
      };

      currentRow.push(currentNode);
    }
    nodeList.push(currentRow);
  }

  return nodeList;
};
