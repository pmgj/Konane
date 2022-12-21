import Cell from "./Cell.js";
import Konane from "./Konane.js";

class Test {
    test1() {
        let k = new Konane(6, 6);
        console.table(k.getBoard());
        k.move(new Cell(5, 3), new Cell(3, 3));
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
        k.move(new Cell(4, 1), new Cell(4, 3));
        k.move(new Cell(4, 4), new Cell(4, 2));
        k.move(new Cell(5, 2), new Cell(3, 2));
        k.move(new Cell(2, 2), new Cell(4, 2));
        k.move(new Cell(3, 0), new Cell(3, 2));
        k.move(new Cell(2, 0), new Cell(2, 2));
        k.move(new Cell(2, 3), new Cell(2, 1));
        k.move(new Cell(5, 5), new Cell(5, 3));
        console.table(k.getBoard());
        k.move(new Cell(0, 3), new Cell(4, 3));
        console.table(k.getBoard());
    }
}
let t = new Test();
t.test1();