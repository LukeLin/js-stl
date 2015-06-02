/**
 * 队列Queue
 *
 * 队列是一种先进先出（first in first out, FIFO）的线性表。它只允许在表的一端进行插入，而在另一端删除元素。
 * 允许插入的一端叫队尾（rear），允许删除的一端叫队头（front）。
 */

// 链队列
export class Queue {
    constructor() {
        this.rear = this.front = null;
        this.size = 0;
    }
    isEmpty(){
        return this.rear === null;
    }
    clear () {
        this.rear = this.front = null;
        this.size = 0;
    }
    getHead () {
        return this.front ? this.front.data : null;
    }
    enQueue (elem) {
        if (this.front === null) {
            this.rear = this.front = {data: elem, next: null};
        } else {
            let p = {data: elem, next: null};
            this.rear.next = p;
            this.rear = p;
        }
        this.size++;
    }
    deQueue () {
        if (this.front) {
            let elem = this.front.data;
            this.front = this.front.next;
            if (this.front === null) {
                this.rear = null;
            }
            this.size--;
            return elem;
        } else {
            return null;
        }
    }
    queueTraverse (iterator) {
        let current = this.front;
        while (current) {
            if (iterator(current.data)) break;
            current = current.next;
        }
    }
    peekAt (index = 0) {
        if (index < this.size) {
            let current = this.front;
            for (let i = 0; i < index; i++) {
                current = current.next;
            }
            return current.data;
        }

        return null;
    }
    toString () {
        if (this.front === null) {
            return null;
        }

        let arr = [];
        let current = this.front;

        for (let i = 0, len = this.size; i < len; i++) {
            arr[i] = current.data;
            current = current.next;
        }

        return arr;
    }
}

let queue = new Queue();
queue.enQueue(1);
queue.deQueue();
queue.enQueue(2);
queue.enQueue(3);
console.log(queue.peekAt(0));
console.log(queue.peekAt(1));
console.log(queue.peekAt(2));
console.log(queue.peekAt(3));
console.log(queue.toString().join());



// 类似广度优先遍历
function repaintColor(matrix, i, j, color){
    let old = matrix[i][j];
    let queue = new Queue();
    let m = matrix.length - 1;
    let n = matrix[0].length - 1;

    queue.enQueue({x: i, y: j});

    while(queue.rear){
        let a = queue.deQueue();
        let x = a.x;
        let y = a.y;

        if(x >= 1) setColor(x - 1, y);
        if(y >= 1) setColor(x, y - 1);
        if(x < m) setColor(x + 1, y);
        if(y < n) setColor(x, y + 1);
    }

    function setColor(x, y){
        if(matrix[x][y] === old) {
            matrix[x][y] = color;
            queue.enQueue({x: x, y: y});
        }
    }
}

let matrix = [];

for(let i = 0; i < 8; i++){
    matrix[i] = [];
    for(let j = 0; j < 8; j++){
        matrix[i][j] = 0;
    }
}

repaintColor(matrix, 4, 5, 1);
console.log(matrix);

