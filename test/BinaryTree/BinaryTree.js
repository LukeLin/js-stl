import { BinaryTree } from '../../src/BinaryTree/BinaryTree.js';
import assert from 'assert';

describe('BinaryTree tests', function(){

    var tree = [1, 2, 3, 4, 5, , 6, , , 7];
    var test = new BinaryTree();
    test.createBinaryTree(tree);

    it('createBinaryTree', function(){
        assert.equal(test.data, 1);
        assert.equal(test.leftChild.data, 2);
        assert.equal(test.rightChild.data, 3);
        assert.equal(test.leftChild.leftChild.data, 4);
        assert.equal(test.leftChild.rightChild.data, 5);
        assert.equal(test.rightChild.leftChild, null);
        assert.equal(test.rightChild.rightChild.data, 6);
        assert.equal(test.leftChild.leftChild.leftChild, null);
        assert.equal(test.leftChild.leftChild.rightChild, null);
        assert.equal(test.leftChild.rightChild.leftChild.data, 7);
        assert.equal(test.leftChild.rightChild.rightChild, null);
    });

    it('isSimilar', function(){
        var tree2 =  [1, 2, 3, 4, 5, , 6, , , 7];
        var test2 = new BinaryTree();
        test2.createBinaryTree(tree2);

        var tree3 = [1, 3, 5];
        var test3 = new BinaryTree();
        test3.createBinaryTree(tree3);

        assert.equal(test.isSimilar(test2), true);
        assert.equal(test.isSimilar(test3), false);
    });
    it('revoluteBinaryTree', function(){
        var tree2 =  [1, 2, 3, 4, 5];
        var test2 = new BinaryTree();
        test2.createBinaryTree(tree2);

        test2.revoluteBinaryTree();
        var arr = [];
        test2.levelOrderTraverse(function(data){
            arr.push(data);
        });
        assert.deepEqual(arr, [1, 3, 2, 5, 4]);
    });

    it('revoluteNonRecursive', function(){
        var tree2 =  [1, 2, 3, 4, 5];
        var test2 = new BinaryTree();
        test2.createBinaryTree(tree2);

        test2.revoluteNonRecursive();
        var arr = [];
        test2.levelOrderTraverse(function(data){
            arr.push(data);
        });
        assert.deepEqual(arr, [1, 3, 2, 5, 4]);
    });

    it('preOrderNonRecursive', function(){
        var arr = [];
        test.preOrderNonRecursive(function(data){
            arr.push(data);
        })
        assert.deepEqual(arr, [1, 2, 4, 5, 7, 3, 6 ]);
    });
    it('inOrderNonRecursive', function(){
        var arr = [];
        test.inOrderNonRecursive(function(data){
            arr.push(data);
        })
        assert.deepEqual(arr, [4, 2, 7, 5, 1, 3, 6]);
    });
    it('postOrderNonRecursive', function(){
        var arr = [];
        test.postOrderNonRecursive(function(data){
            arr.push(data);
        })
        assert.deepEqual(arr, [4, 7, 5, 2, 6, 3, 1]);
    });
    it('preOrderRecursive', function(){
        var arr = [];
        test.preOrderRecursive(function(data){
            arr.push(data);
        })
        assert.deepEqual(arr, [1, 2, 4, 5, 7, 3, 6 ]);
    });
    it('inOrderRecursive', function(){
        var arr = [];
        test.inOrderRecursive(function(data){
            arr.push(data);
        })
        assert.deepEqual(arr, [4, 2, 7, 5, 1, 3, 6]);
    });
    it('postOrderRecursive', function(){
        var arr = [];
        test.postOrderRecursive(function(data){
            arr.push(data);
        })
        assert.deepEqual(arr, [4, 7, 5, 2, 6, 3, 1]);
    });
    it('levelOrderTraverse', function(){
        var tree2 =  [1, 2, 3, 4, 5];
        var test2 = new BinaryTree();
        test2.createBinaryTree(tree2);

        var arr = [];
        test2.levelOrderTraverse(function(data){
            arr.push(data);
        });
        assert.deepEqual(arr, tree2);
    });
    it('getPreSequence', function(){
        assert.equal(test.getPreSequence(5), 7);
    });
    it('countLeaves', function(){
        assert.equal(test.countLeaves(), 3);
    });
    it('getSubDepth', function(){
        assert.equal(test.getSubDepth(6), 1);
        assert.equal(test.getSubDepth(2), 3);
    });
    it('getDepth', function(){
        assert.equal(test.getDepth(), 4);
        assert.equal(test.leftChild.getDepth(), 3);
    });
    it('delSubX', function(){
        var tree2 =  [1, 2, 3, 4, 5];
        var test2 = new BinaryTree();
        test2.createBinaryTree(tree2);
        assert.equal(test2.getDepth(), 3);
        test2.delSubX(2);
        assert.equal(test2.getDepth(), 2);
    });
    it('copy', function(){
        var test2 = test.copy();

        var arr = [];
        test2.preOrderNonRecursive(function(data){
            arr.push(data);
        })
        assert.deepEqual(arr, [1, 2, 4, 5, 7, 3, 6 ]);
    });
    it('findNearAncient', function(){
        var tree2 =  [1, 2, 3, 4, 5];
        var test2 = new BinaryTree();
        test2.createBinaryTree(tree2);

        var node1 = test2.leftChild.leftChild;
        var node2 = test2.leftChild.rightChild;
        assert.equal(test2.findNearAncient(node1, node2), test2.leftChild);

        var node3 = test2.rightChild;
        assert.equal(test2.findNearAncient(node1, node3), test2);
    });
    it('lushDegree', function(){
        assert.equal(test.lushDegree(), 9);
    });
    it('descNum', function(){
        test.descNum();
        assert.equal(test.descNum, 6);
        assert.equal(test.leftChild.descNum, 3);
    });
    it('static isFullBinaryTree', function(){
        var newTree = test.copy();
        newTree.rightChild.leftChild = new BinaryTree(7);
        newTree.leftChild.rightChild.leftChild = null;
        assert.equal(BinaryTree.isFullBinaryTree(test), false);
        assert.equal(BinaryTree.isFullBinaryTree(newTree), true);
    });

});