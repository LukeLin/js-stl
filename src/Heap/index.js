/**
 * 堆
 * 
 * @export
 * @class Heap
 */
export default class Heap {
    constructor(compare = defaultCompre) {
        this.arr = [];
        this.compare = compare;
    }

    add(elem) {
        this.arr.push(elem);

        if (this.arr.length === 1) return;

        this._upHeapAdjust((this.arr.length >> 1) - 1);
    }

    remove() {
        if (!this.arr.length) return;

        let heap = this.arr;
        // 出队列操作，弹出数据头元素
        let data = heap[0];
        // 用尾元素填充头元素
        heap[0] = heap[heap.length - 1];
        // 删除尾节点
        heap.pop();

        //然后从根节点下滤堆
        if (heap.length > 1)
            this._downHeapAdjust(0);

        return data;
    }

    clear() {
        this.arr.length = 0;
    }

    // 对堆进行上滤操作，使得满足堆性质
    _upHeapAdjust(parent) {
        let heap = this.arr;
        let len = heap.length;

        while (parent >= 0) {
            let leftChild = 2 * parent + 1;
            let rightChild = leftChild + 1;
            let max = leftChild;

            if (rightChild < len) {
                max = this.compare(heap[leftChild], heap[rightChild]) < 0
                    ? rightChild : leftChild;
            }

            // 如果parent节点小于它的某个子节点的话，此时筛选操作
            if (this.compare(heap[parent], heap[max]) < 0) {
                let temp = heap[parent];
                heap[parent] = heap[max];
                heap[max] = temp;

                // 继续进行更上一层的过滤
                parent = Math.ceil(parent / 2) - 1;
            } else break;
        }
    }

    // 对堆进行下滤操作，使得满足堆性质
    _downHeapAdjust(parent) {
        let heap = this.arr;
        let len = heap.length;

        while (2 * parent + 1 < len) {
            let leftChild = 2 * parent + 1;
            let rightChild = leftChild + 1;
            let max = leftChild;

            if (rightChild < len) {
                max = this.compare(heap[leftChild], heap[rightChild]) < 0
                    ? rightChild : leftChild;
            }

            if (this.compare(heap[parent], heap[max]) < 0) {
                let temp = heap[parent];
                heap[parent] = heap[max];
                heap[max] = temp;

                parent = max;
            } else break;
        }
    }
};

function defaultCompre(a, b) {
    return a - b;
}


var arr = [1, 0, 5, 4, 3];
var heap = new Heap();
for (let ele of arr) {
    heap.add(ele);
}
console.log(`heap: ${heap.arr.join(',')}`);
for (let ele of arr) {
    heap.remove();
    console.log(`heap: ${heap.arr.join(',')}`);
}

