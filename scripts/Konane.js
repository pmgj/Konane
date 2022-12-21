import CellState from "./CellState.js";
import Player from "./Player.js";
import Cell from "./Cell.js";

export default class Konane {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.board = this.startBoard();
        this.turn = Player.PLAYER1;
    }
    startBoard() {
        let matrix = Array(this.rows).fill().map(() => Array(this.cols).fill(CellState.EMPTY));
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j += 2) {
                if (i % 2 === 0) {
                    matrix[i][j] = CellState.PLAYER1;
                    matrix[i][j + 1] = CellState.PLAYER2;
                } else {
                    matrix[i][j] = CellState.PLAYER2;
                    matrix[i][j + 1] = CellState.PLAYER1;
                }
            }
        }
        matrix[Math.floor(this.rows / 2)][Math.floor(this.rows / 2)] = CellState.EMPTY;
        matrix[Math.floor(this.rows / 2)][Math.floor(this.rows / 2) - 1] = CellState.EMPTY;
        return matrix;
    }
    move(beginCell, endCell) {
        if (!beginCell || !endCell) {
            throw new Error("Origin or destination is undefined.");
        }
        if (beginCell.equals(endCell)) {
            throw new Error("Origin and destination must be different.");
        }
        let { x: or, y: oc } = beginCell;
        let piece = this.turn === Player.PLAYER1 ? CellState.PLAYER1 : CellState.PLAYER2;
        if (this.board[or][oc] !== piece) {
            throw new Error("Origin is not of the current player.");
        }
        if (!this.onBoard(beginCell) || !this.onBoard(endCell)) {
            throw new Error("Origin or destination is not on board.");
        }
        let { x: dr, y: dc } = endCell;
        if (this.board[dr][dc] !== CellState.EMPTY) {
            throw new Error("Destination is not empty.");
        }
        let rowDiff = Math.abs(or - dr), colDiff = Math.abs(oc - dc);
        if (colDiff % 2 !== 0 || rowDiff % 2 !== 0) {
            throw new Error("Destination is incorrect.");
        }
        if (colDiff !== 0 && colDiff % 2 === 0 && rowDiff !== 0 && rowDiff % 2 === 0) {
            throw new Error("Destination must be orthogonal to the origin.");
        }
        let startValue, endValue, opponent = this.turn === Player.PLAYER1 ? CellState.PLAYER2 : CellState.PLAYER1;
        if (or === dr) {
            startValue = dc > oc ? oc + 1 : dc + 1;
            endValue = dc > oc ? dc : oc;
            for (let i = startValue; i < endValue; i += 2) {
                if (this.board[or][i] !== opponent) {
                    throw new Error("Incorrect move.");
                }
            }
            for (let i = startValue + 1; i < endValue; i += 2) {
                if (this.board[or][i] !== CellState.EMPTY) {
                    throw new Error("Incorrect move.");
                }
            }
            for (let i = startValue; i < endValue; i += 2) {
                this.board[or][i] = CellState.EMPTY;
            }
        } else {
            startValue = dr > or ? or + 1 : dr + 1;
            endValue = dr > or ? dr : or;
            for (let i = startValue; i < endValue; i += 2) {
                if (this.board[i][oc] !== opponent) {
                    throw new Error("Incorrect move.");
                }
            }
            for (let i = startValue + 1; i < endValue; i += 2) {
                if (this.board[i][oc] !== CellState.EMPTY) {
                    throw new Error("Incorrect move.");
                }
            }
            for (let i = startValue; i < endValue; i += 2) {
                this.board[i][oc] = CellState.EMPTY;
            }
        }
        this.board[dr][dc] = this.board[or][oc];
        this.board[or][oc] = CellState.EMPTY;
        this.turn = this.turn === Player.PLAYER1 ? Player.PLAYER2 : Player.PLAYER1;
    }
    getBoard() {
        return this.board;
    }
    getTurn() {
        return this.turn;
    }
    onBoard({ x, y }) {
        let inLimit = (value, limit) => value >= 0 && value < limit;
        return inLimit(x, this.rows) && inLimit(y, this.cols);
    }
}