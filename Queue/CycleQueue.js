/**
 * Created by ldp on 2015/1/19.
 */

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