export const recursiveDivision = () => console.log("Change this");

// import { initializeMatrix } from "../../App";
// import { NodeType } from "../../Components/Node";

// const recursiveDivision = (matrix: NodeType[][]): NodeType[][] => {
//   const getRecursiveWalls = (height: number, width: number) => {
//     if (height < 2 || horizontal.length < 2) {
//       return;
//     }
//     let dir;
//     let num;
//     if (height.length > horizontal.length) {
//       dir = 0;
//       num = generateOddRandomNumber(height);
//     }
//     if (height.length <= horizontal.length) {
//       dir = 1;
//       num = generateOddRandomNumber(horizontal);
//     }

//     if (dir === 0) {
//       addWall(dir, num, vertical, horizontal, startNode, finishNode);
//       getRecursiveWalls(
//         vertical.slice(0, vertical.indexOf(num)),
//         horizontal,
//         grid,
//         startNode,
//         finishNode
//       );
//       getRecursiveWalls(
//         vertical.slice(vertical.indexOf(num) + 1),
//         horizontal,
//         grid,
//         startNode,
//         finishNode
//       );
//     } else {
//       addWall(dir, num, vertical, horizontal, startNode, finishNode);
//       getRecursiveWalls(
//         vertical,
//         horizontal.slice(0, horizontal.indexOf(num)),
//         grid,
//         startNode,
//         finishNode
//       );
//       getRecursiveWalls(
//         vertical,
//         horizontal.slice(horizontal.indexOf(num) + 1),
//         grid,
//         startNode,
//         finishNode
//       );
//     }
//   };

//   const dummyMatrix = initializeMatrix();
//   const width = matrix[0].length;
//   const height = matrix.length;

//   getRecursiveWalls(height, width);

//   return dummyMatrix;
// };

// export default recursiveDivision;

// // func to generate a random number for the generation of walls in tempWalls
// // within the range of tempWalls arr length
// const generateRandomNum = (maxVal: number): number => {
//   let randomNum = Math.floor(Math.random() * (maxVal / 2));

//   if (randomNum % 2 !== 0) {
//     if (randomNum === maxVal) {
//       randomNum -= 1;
//     } else {
//       randomNum += 1;
//     }
//   }
//   return randomNum;
// };

// const generateOddRandomNumber = (array: NodeType[]) => {
//   let max = array.length - 1;
//   let randomNum =
//     Math.floor(Math.random() * (max / 2)) +
//     Math.floor(Math.random() * (max / 2));
//   if (randomNum % 2 === 0) {
//     if (randomNum === max) {
//       randomNum -= 1;
//     } else {
//       randomNum += 1;
//     }
//   }
//   return array[randomNum];
// };

// function addWall(dir, num, vertical, horizontal, startNode, finishNode) {
//     let isStartFinish = false;
//     let tempWalls = [];
//     if (dir === 0) {
//       if (horizontal.length === 2) return;
//       for (let temp of horizontal) {
//         if (
//           (temp === startNode.row && num === startNode.col) ||
//           (temp === finishNode.row && num === finishNode.col)
//         ) {
//           isStartFinish = true;
//           continue;
//         }
//         tempWalls.push([temp, num]);
//       }
//     } else {
//       if (vertical.length === 2) return;
//       for (let temp of vertical) {
//         if (
//           (num === startNode.row && temp === startNode.col) ||
//           (num === finishNode.row && temp === finishNode.col)
//         ) {
//           isStartFinish = true;
//           continue;
//         }
//         tempWalls.push([num, temp]);
//       }
//     }
//     if (!isStartFinish) {
//       tempWalls.splice(generateRandomNumber(tempWalls.length), 1);
//     }
//     for (let wall of tempWalls) {
//       walls.push(wall);
//     }
//   }
