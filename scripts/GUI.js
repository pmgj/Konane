import Konane from "./Konane.js";
import CellState from "./CellState.js";
import Cell from "./Cell.js";

class GUI {
    constructor() {
        this.game = null;
        this.origin = null;
    }
    init() {
        let iSize = document.getElementById("size");
        let iStart = document.getElementById("start");
        iSize.onchange = this.init.bind(this);
        iStart.onclick = this.init.bind(this);
        let size = iSize.valueAsNumber;
        this.game = new Konane(size, size);
        let board = this.game.getBoard();
        this.printBoard(board);
        this.changeMessage();
    }
    printBoard(board) {
        let tbody = document.querySelector("tbody");
        tbody.innerHTML = "";
        for (let i = 0; i < board.length; i++) {
            let tr = document.createElement("tr");
            tbody.appendChild(tr);
            for (let j = 0; j < board[i].length; j++) {
                let td = document.createElement("td");
                if (board[i][j] !== CellState.EMPTY) {
                    let img = document.createElement("img");
                    img.src = `../images/${board[i][j]}.svg`;
                    img.ondragstart = this.drag.bind(this);
                    td.appendChild(img);
                }
                td.onclick = this.play.bind(this);
                td.ondragover = this.allowDrop.bind(this);
                td.ondrop = this.drop.bind(this);
                tr.appendChild(td);
            }
        }
    }
    changeMessage(m) {
        let objs = { PLAYER2: "Red's win!", PLAYER1: "Blue's win!" };
        if (objs[m]) {
            this.setMessage(`Game Over! ${objs[m]}`);
        } else {
            let msgs = { PLAYER1: "Blue's turn.", PLAYER2: "Red's turn." };
            this.setMessage(msgs[this.game.getTurn()]);
        }
    }
    setMessage(message) {
        let msg = document.getElementById("message");
        msg.textContent = message;
    }
    play(evt) {
        let td = evt.currentTarget;
        if (this.origin) {
            this.innerPlay(this.origin, td, true);
        } else {
            this.origin = td;
        }
    }
    drag(evt) {
        let img = evt.currentTarget;
        this.origin = img.parentNode;
    }
    allowDrop(evt) {
        evt.preventDefault();
    }
    drop(evt) {
        let td = evt.currentTarget;
        evt.preventDefault();
        this.innerPlay(this.origin, td, false);
    }
    computePath(beginCell, endCell) {
        let { x: or, y: oc } = beginCell;
        let { x: dr, y: dc } = endCell;
        let path = [];
        if (or === dr) {
            if (dc > oc) {
                for (let i = oc; i <= dc; i += 2) {
                    path.push(new Cell(or, i));
                }
            } else {
                for (let i = oc; i >= dc; i -= 2) {
                    path.push(new Cell(or, i));
                }
            }
        } else {
            if(dr > or) {
                for (let i = or; i <= dr; i += 2) {
                    path.push(new Cell(i, oc));
                }
            } else {
                for (let i = or; i >= dr; i -= 2) {
                    path.push(new Cell(i, oc));
                }
            }
        }
        return path;
    }
    async innerPlay(beginTD, endTD, animation) {
        let beginCell = this.coordinates(beginTD);
        let endCell = this.coordinates(endTD);
        try {
            let mr = this.game.move(beginCell, endCell);
            let positions = this.computePath(beginCell, endCell);
            const time = 1000;
            for (let i = 1; i < positions.length; i++) {
                let { x: or, y: oc } = positions[i - 1];
                let endTD = this.getTableData(positions[i]);
                await new Promise(resolve => {
                    let image = document.querySelector(`tr:nth-child(${or + 1}) td:nth-child(${oc + 1}) img`);
                    let removePiece = ({ x: or, y: oc }, { x: dr, y: dc }) => {
                        let img = document.querySelector(`tr:nth-child(${(or + dr) / 2 + 1}) td:nth-child(${(oc + dc) / 2 + 1}) img`);
                        let anim = img.animate([{ opacity: 1 }, { opacity: 0 }], time);
                        anim.onfinish = () => {
                            img.parentNode.innerHTML = "";
                            resolve(true);
                        };
                    }
                    let animatePiece = (startPosition, endPosition) => {
                        let piece = this.getTableData(startPosition).firstChild;
                        let { x: a, y: b } = startPosition;
                        let { x: c, y: d } = endPosition;
                        let td = document.querySelector("td");
                        let size = td.offsetWidth;
                        let anim = piece.animate([{ top: 0, left: 0 }, { top: `${(c - a) * size}px`, left: `${(d - b) * size}px` }], time);
                        removePiece(startPosition, endPosition);
                        anim.onfinish = () => endTD.appendChild(piece);
                    };
                    if (animation) {
                        animatePiece(positions[i - 1], positions[i]);
                    } else {
                        removePiece(positions[i - 1], positions[i]);
                        endTD.appendChild(image);
                    }
                });
            }
            this.changeMessage(mr);
        } catch (ex) {
            this.setMessage(ex.message);
        }
        this.origin = null;
    }
    coordinates(cell) {
        return new Cell(cell.parentNode.rowIndex, cell.cellIndex);
    }
    getTableData({ x, y }) {
        let table = document.querySelector("table");
        return table.rows[x].cells[y];
    }
}
let gui = new GUI();
gui.init();