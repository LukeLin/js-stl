/**
 * Created by ldp on 2015/1/19.
 */

/**
 * 循环队列
 * 
 * 用处：约瑟夫环
 * 优点：为充分利用向量空间，克服"假溢出"现象的方法是：将向量空间想象为一个首尾相接的圆环，并称这种向量为循环向量。存储在其中的队列称为循环队列（Circular Queue）。
 * 
 * @export
 * @class CycleQueue
 */
export default class CycleQueue {
    constructor(maxsize = 100){
        this.base = {};
        this.front = this.rear = 0;
        this.MAXQSIZE = maxsize;
    }

    enQueue(data) {
        if ((this.rear + 1) % this.MAXQSIZE === 0) throw new Error('cycleQueue is already full!');

        this.base[this.rear] = data;
        this.rear = (this.rear + 1) % this.MAXQSIZE;
    }
    deQueue() {
        if (this.front === this.rear) throw new Error('cycleQueue is already empty');

        let elem = this.base[this.front];
        this.front = (this.front + 1) % this.MAXQSIZE;

        return elem;
    }
    clear() {
        this.base = {};
        this.front = this.rear = 0;
    }
    get size() {
        return (this.rear - this.front + this.MAXQSIZE) % this.MAXQSIZE;
    }
    peekAt(index = 0) {
        index = (index + this.MAXQSIZE) % this.MAXQSIZE;

        return this.base[index + this.front] || null;
    }
    getHead() {
        let elem = this.base[this.front];
        return elem ? elem : null;
    }
    queueTraverse(iterator) {
        for (let i = this.front, len = this.rear = this.front; i < len; i++) {
            if (iterator(this.base[i], i)) break;
        }
    }
    toString() {
        let base = [].slice.call(this.base);

        return base.slice(this.front, this.rear - this.front);
    }
}
