import assert from 'assert';
import PriorityQueue from '../../src/Queue/PriorityQueue.js';
import { BinaryTree } from '../../src/BinaryTree/BinaryTree.js';

describe('PriorityQueue tests', function () {
    let test = new PriorityQueue();

    it('enQueue', function () {
        test.enQueue(8, 5);
        test.enQueue(7, 2);
        test.enQueue(6, 1);
        test.enQueue(5, 4);
        test.enQueue(4, 7);
        test.enQueue(3, 3);
        test.enQueue(2, 8);
        test.enQueue(1, 10);

        var tree = new BinaryTree();
        tree.createBinaryTree(test.heap.arr);

        tree.levelOrderTraverse((data) => {
            console.log(data);
        });
    });

    it('deQueue', function () {
        console.log(test.deQueue());
        console.log(test.deQueue());
        console.log(test.deQueue());
        console.log(test.deQueue());
        console.log(test.deQueue());
        console.log(test.deQueue());
        console.log(test.deQueue());
        console.log(test.deQueue());
        console.log(test.deQueue());
    });
});
