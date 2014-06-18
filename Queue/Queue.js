/**
 * 队列Queue
 *
 * 队列是一种先进先出（first in first out, FIFO）的线性表。它只允许在表的一端进行插入，而在另一端删除元素。
 * 允许插入的一端叫队尾（rear），允许删除的一端叫队头（front）。
 */

    // 链队列
function Queue() {
    this.rear = this.front = null;
    this.size = 0;
}
exports.Queue = Queue;
Queue.prototype = {
    isEmpty: function(){
        return this.rear === null;
    },
    clear: function () {
        this.rear = this.front = null;
        this.size = 0;
    },
    getHead: function () {
        return this.front ? this.front.data : null;
    },
    enQueue: function (elem) {
        if (this.front === null) {
            this.rear = this.front = {data: elem, next: null};
        } else {
            var p = {data: elem, next: null};
            this.rear.next = p;
            this.rear = p;
        }
        this.size++;
    },
    deQueue: function () {
        if (this.front) {
            var elem = this.front.data;
            this.front = this.front.next;
            if (this.front === null) {
                this.rear = null;
            }
            this.size--;
            return elem;
        } else {
            return null;
        }
    },
    queueTraverse: function (iterator) {
        var current = this.front;
        while (current) {
            if (iterator(current.data)) break;
            current = current.next;
        }
    },
    peekAt: function (index) {
        index = index || 0;

        if (index < this.size) {
            var current = this.front;
            for (var i = 0; i < index; i++) {
                current = current.next;
            }
            return current.data;
        }

        return null;
    },
    toString: function () {
        if (this.front === null) {
            return null;
        }

        var arr = [];
        var current = this.front;

        for (var i = 0, len = this.size; i < len; i++) {
            arr[i] = current.data;
            current = current.next;
        }

        return arr;
    }
};

var queue = new Queue();
queue.enQueue(1);
queue.deQueue();
queue.enQueue(2);
queue.enQueue(3);
console.log(queue.peekAt(0));
console.log(queue.peekAt(1));
console.log(queue.peekAt(2));
console.log(queue.peekAt(3));
console.log(queue.toString().join());


// 循环队列
function CycleQueue() {
    this.base = {};
    this.front = this.rear = 0;
    this.MAXQSIZE = 100;
}
exports.CycleQueue = CycleQueue;
CycleQueue.prototype = {
    enQueue: function (data) {
        if ((this.rear + 1) % this.MAXQSIZE === 0) throw new Error('cycleQueue is already full!');

        this.base[this.rear] = data;
        this.rear = (this.rear + 1) % this.MAXQSIZE;
    },
    deQueue: function () {
        if (this.front === this.rear) throw new Error('cycleQueue is already empty');

        var elem = this.base[this.front];
        this.front = (this.front + 1) % this.MAXQSIZE;

        return elem;
    },
    clear: function () {
        this.base = {};
        this.front = this.rear = 0;
    },
    size: function () {
        return (this.rear - this.front + this.MAXQSIZE) % this.MAXQSIZE;
    },
    peekAt: function (index) {
        index = (index || 0 + this.MAXQSIZE) % this.MAXQSIZE;

        return this.base[index + this.front] || null;
    },
    getHead: function () {
        var elem = this.base[this.front];
        return elem ? elem : null;
    },
    queueTraverse: function (iterator) {
        for (var i = this.front, len = this.rear = this.front; i < len; i++) {
            if (iterator(this.base[i], i)) break;
        }
    },
    toString: function () {
        var base = [].slice.call(this.base);

        return base.slice(this.front, this.rear - this.front);
    }
};

var queue = new CycleQueue();
queue.enQueue(1);
queue.deQueue();
queue.enQueue(2);
queue.enQueue(3);
console.log(queue.peekAt(0));
console.log(queue.peekAt(1));
console.log(queue.peekAt(2));
