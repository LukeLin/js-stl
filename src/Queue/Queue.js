/**
 * 队列Queue
 *
 * 队列是一种先进先出（first in first out, FIFO）的线性表。它只允许在表的一端进行插入，而在另一端删除元素。
 * 允许插入的一端叫队尾（rear），允许删除的一端叫队头（front）。
 */

// 链队列
export default class Queue {
    constructor() {
        this.rear = this.front = null;
        this.size = 0;
    }

    isEmpty() {
        return this.rear === null;
    }

    clear() {
        this.rear = this.front = null;
        this.size = 0;
    }

    getHead() {
        return this.front ? this.front.data : null;
    }

    enQueue(elem) {
        if (this.front === null) {
            this.rear = this.front = { data: elem, next: null };
        } else {
            let p = { data: elem, next: null };
            this.rear.next = p;
            this.rear = p;
        }
        this.size++;
    }

    deQueue() {
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

    forEach(iterator) {
        if (typeof iterator !== 'function')
            throw new Error('iterator should be function');

        let current = this.front;
        while (current) {
            if (iterator(current.data)) break;
            current = current.next;
        }
    }

    *[Symbol.iterator]() {
        let current = this.front;
        while (current) {
            yield current.data;
            current = current.next;
        }
    }

    peekAt(index = 0) {
        if (index < this.size) {
            let current = this.front;
            for (let i = 0; i < index; i++) {
                current = current.next;
            }
            return current.data;
        }

        return -1;
    }
    
    toString() {
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
