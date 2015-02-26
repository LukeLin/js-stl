/**
 * Created by Luke on 2015/2/26.
 */

/*
优先队列(priority queue)

普通的队列是一种先进先出的数据结构，元素在队列尾追加，而从队列头删除。在优先队列中，元素被赋予优先级。当访问元素时，具有最高优先级的元素最先删除。优先队列具有最高级先出 （largest-in，first-out）的行为特征。

优先队列是0个或多个元素的集合,每个元素都有一个优先权或值,对优先队列执行的操作有1) 查找;2) 插入一个新元素;3) 删除.在最小优先队列(min priorityq u e u e)中,查找操作用来搜索优先权最小的元素,删除操作用来删除该元素;对于最大优先队列(max priority queue),查找操作用来搜索优先权最大的元素,删除操作用来删除该元素.优先权队列中的元素可以有相同的优先权,查找与删除操作可根据任意优先权进行.


入队操作
①：完全二叉树的构建操作是“从上到下，从左到右”的形式，所以入队的节点是放在数组的最后，也就是树中叶子层的有序最右边空位。
②：当节点插入到最后时，有可能破坏了堆的性质，此时我们要进行“上滤操作”，当然时间复杂度为O(lgN)。

出队操作
出队操作时，我们采取的方案是：弹出堆顶元素，然后将叶子层中的最右子节点赋给堆顶，同样这时也会可能存在破坏堆的性质，最后我们要被迫进行下滤操作。
 */

// 用堆实现优先队列
function PriorityQueue(){
    this.heap = [];
}
PriorityQueue.prototype = {
    constructor: PriorityQueue,
    // todo bug exists
    enQueue: function(value, priority){
        // 将当前节点追加到堆尾
        this.heap.push({
            value: value,
            priority: priority
        });

        // 如果只有一个节点，则不需要进行筛选操作
        if(this.heap.length === 1) return;

        // 获取最后一个非叶子节点，并进行堆调整
        upHeapAdjust(this.heap, (this.heap.length >> 1) - 1);
    },
    deQueue: function(){
        if(!this.heap.length) return null;

        var heap = this.heap;
        // 出队列操作，弹出数据头元素
        var data = heap[0];
        // 用尾元素填充头元素
        heap[0] = heap[heap.length - 1];
        // 删除尾节点
        heap.pop();

        //然后从根节点下滤堆
        downHeapAdjust(heap, 0);

        return data;
    }
};

// 对堆进行上滤操作，使得满足堆性质
function upHeapAdjust(heap, parent){
    var len = heap.length;

    while(parent >= 0){
        var leftChild = 2 * parent + 1;
        var rightChild = leftChild + 1;
        var max = leftChild;

        if(rightChild < len) {
            max = heap[leftChild].priority < heap[rightChild].priority
                ? rightChild : leftChild;
        }

        // 如果parent节点小于它的某个子节点的话，此时筛选操作
        if(heap[parent].priority < heap[max].priority) {
            var temp = heap[parent];
            heap[parent] = heap[max];
            heap[max] = temp;

            // 继续进行更上一层的过滤
            parent = Math.ceil(parent / 2) - 1;
        } else break;
    }
}

// 对堆进行下滤操作，使得满足堆性质
function downHeapAdjust(heap, parent){
    var len = heap.length;

    while(2 * parent + 1 < len){
        var leftChild = 2 * parent + 1;
        var rightChild = leftChild + 1;
        var max = leftChild;

        if(rightChild < len) {
            max = heap[leftChild].priority < heap[rightChild].priority
                ? rightChild : leftChild;
        }

        if(heap[parent].priority < heap[max].priority) {
            var temp = heap[parent];
            heap[parent] = heap[max];
            heap[max] = temp;

            parent = max;
        } else break;
    }
}

var test = new PriorityQueue();
test.enQueue(8, 5);
test.enQueue(7, 2);
test.enQueue(6, 1);
test.enQueue(5, 4);
test.enQueue(4, 7);
test.enQueue(3, 3);
test.enQueue(2, 8);
test.enQueue(1, 10);
console.log(test.deQueue());
console.log(test.deQueue());
console.log(test.deQueue());
console.log(test.deQueue());
console.log(test.deQueue());
console.log(test.deQueue());
console.log(test.deQueue());
console.log(test.deQueue());
console.log(test.deQueue());