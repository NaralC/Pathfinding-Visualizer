import { makeAutoObservable } from "mobx";

export type NodeType = {
  row: number;
  col: number;
  isStart: boolean;
  isFinish: boolean;
  isVisited: boolean;
  isWall: boolean;
  isShortestPath: boolean;
  previousNode: NodeType | null;
  onMouseDown: () => void;
  onMouseUp: () => void;
  onMouseEnter: () => void; // Dragging mouse over a node
};

class Store {
  // Data
  nodeList: NodeType[][] = [];
  pathfindingAlgo: string = "BFS";
  mazeGenAlgo: string = "Random";

  // Board states
  isAnimating: boolean = false;
  showModal: boolean = false;
  needToClearBoard: boolean = false;
  canVisualize: boolean = false;

  // Hardcoded start, end, and matrix size
  START_ROW: number = 7;
  START_COL: number = 10;
  FINISH_ROW: number = 7;
  FINISH_COL: number = 40;
  MATRIX_ROWS: number = 19;
  MATRIX_COLS: number = 49;

  constructor() {
    makeAutoObservable(this);
  }

  //   addToDo() {
  //     this.todos = addTodo(this.todos, this.newTodo);
  //     this.newTodo = "";
  //   }
}

const store = new Store();
export default store;
