import { makeAutoObservable } from "mobx";
import { NodeType } from "./Components/Node";

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
