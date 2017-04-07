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

import Heap from '../Heap';

/**
 * 用堆实现优先队列
 * 
 * @export
 * @class PriorityQueue
 */
export default class PriorityQueue {
    constructor() {
        this.heap = new Heap(function(a, b){
            return a.priority - b.priority;
        });
    }

    get size(){
        return this.heap.arr.length;
    }

    enQueue(value, priority = 0) {
        if(typeof value === 'undefined') throw new Error('argument required');

        // 将当前节点追加到堆尾
        this.heap.add({
            value,
            priority
        });
    }
    
    deQueue() {
        return this.heap.remove();
    }

    clear(){
        this.heap.clear();
    }
}
