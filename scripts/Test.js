import Cell from "./Cell.js";
import Konane from "./Konane.js";
import Winner from "./Winner.js";

class Test {
    test1() {
        let k = new Konane(6, 6), w;
        w = k.move(new Cell(5, 3), new Cell(3, 3));
        console.assert(w === Winner.NONE);
        try {
            k.move(new Cell(5, 2), new Cell(5, 3));
            console.error("Wrong move.");
        } catch (ex) {
        }
        try {
            k.move(new Cell(0, 3), new Cell(4, 3));
            console.error("Wrong move.");
        } catch (ex) {
        }
        w = k.move(new Cell(4, 1), new Cell(4, 3));
        console.assert(w === Winner.NONE);
        w = k.move(new Cell(4, 4), new Cell(4, 2));
        console.assert(w === Winner.NONE);
        w = k.move(new Cell(5, 2), new Cell(3, 2));
        console.assert(w === Winner.NONE);
        w = k.move(new Cell(2, 2), new Cell(4, 2));
        console.assert(w === Winner.NONE);
        w = k.move(new Cell(3, 0), new Cell(3, 2));
        console.assert(w === Winner.NONE);
        w = k.move(new Cell(2, 0), new Cell(2, 2));
        console.assert(w === Winner.NONE);
        w = k.move(new Cell(2, 3), new Cell(2, 1));
        console.assert(w === Winner.NONE);
        w = k.move(new Cell(5, 5), new Cell(5, 3));
        console.assert(w === Winner.NONE);
        w = k.move(new Cell(0, 3), new Cell(4, 3));
        console.assert(w === Winner.NONE);
        w = k.move(new Cell(1, 5), new Cell(1, 3));
        console.assert(w === Winner.NONE);
        w = k.move(new Cell(5, 0), new Cell(5, 4));
        console.assert(w === Winner.NONE);
        w = k.move(new Cell(0, 0), new Cell(2, 0));
        console.assert(w === Winner.NONE);
        w = k.move(new Cell(0, 1), new Cell(0, 3));
        console.assert(w === Winner.NONE);
        w = k.move(new Cell(3, 5), new Cell(3, 1));
        console.assert(w === Winner.NONE);
        w = k.move(new Cell(2, 1), new Cell(0, 1));
        console.assert(w === Winner.NONE);
        w = k.move(new Cell(1, 3), new Cell(1, 1));
        console.assert(w === Winner.NONE);
        w = k.move(new Cell(0, 1), new Cell(4, 1));
        console.assert(w === Winner.NONE);
        w = k.move(new Cell(0, 4), new Cell(0, 2));
        console.assert(w === Winner.NONE);
        w = k.move(new Cell(2, 5), new Cell(2, 3));
        console.assert(w === Winner.PLAYER1);
    }
}
let t = new Test();
t.test1();