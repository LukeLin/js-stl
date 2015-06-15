var BinaryTree = require('../dist/Binary tree/BinaryTree').BinaryTree;

describe('BinaryTree spec', function(){

    var tree = [1, 2, 3, 4, 5, , 6, , , 7];
    var test = new BinaryTree();
    test.createBinaryTree(tree);

    it('createBinaryTree', function(){
        expect(test.data).toBe(1);
        expect(test.leftChild.data).toBe(2);
        expect(test.rightChild.data).toBe(3);
        expect(test.leftChild.leftChild.data).toBe(4);
        expect(test.leftChild.rightChild.data).toBe(5);
        expect(test.rightChild.leftChild).toBe(null);
        expect(test.rightChild.rightChild.data).toBe(6);
        expect(test.leftChild.leftChild.leftChild).toBe(null);
        expect(test.leftChild.leftChild.rightChild).toBe(null);
        expect(test.leftChild.rightChild.leftChild.data).toBe(7);
        expect(test.leftChild.rightChild.rightChild).toBe(null);
    });

    it('isSimilar', function(){
        var tree2 =  [1, 2, 3, 4, 5, , 6, , , 7];
        var test2 = new BinaryTree();
        test2.createBinaryTree(tree2);

        var tree3 = [1, 3, 5];
        var test3 = new BinaryTree();
        test3.createBinaryTree(tree3);

        expect(test.isSimilar(test2)).toBe(true);
        expect(test.isSimilar(test3)).toBe(false);
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
        expect(arr).toEqual([1, 3, 2, 5, 4]);
        console.log(arr);
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
        expect(arr).toEqual([1, 3, 2, 5, 4]);
        console.log(arr);
    });

    it('preOrderNonRecursive', function(){
        var arr = [];
        test.preOrderNonRecursive(function(data){
            arr.push(data);
        })
        expect(arr).toEqual([1, 2, 4, 5, 7, 3, 6 ]);
    });
    it('inOrderNonRecursive', function(){
        var arr = [];
        test.inOrderNonRecursive(function(data){
            arr.push(data);
        })
        expect(arr).toEqual([4, 2, 7, 5, 1, 3, 6]);
    });
    it('postOrderNonRecursive', function(){
        var arr = [];
        test.postOrderNonRecursive(function(data){
            arr.push(data);
        })
        expect(arr).toEqual([4, 7, 5, 2, 6, 3, 1]);
    });
    it('preOrderRecursive', function(){
        var arr = [];
        test.preOrderRecursive(function(data){
            arr.push(data);
        })
        expect(arr).toEqual([1, 2, 4, 5, 7, 3, 6 ]);
    });
    it('inOrderRecursive', function(){
        var arr = [];
        test.inOrderRecursive(function(data){
            arr.push(data);
        })
        expect(arr).toEqual([4, 2, 7, 5, 1, 3, 6]);
    });
    it('postOrderRecursive', function(){
        var arr = [];
        test.postOrderRecursive(function(data){
            arr.push(data);
        })
        expect(arr).toEqual([4, 7, 5, 2, 6, 3, 1]);
    });
    it('levelOrderTraverse', function(){
        var tree2 =  [1, 2, 3, 4, 5];
        var test2 = new BinaryTree();
        test2.createBinaryTree(tree2);

        var arr = [];
        test2.levelOrderTraverse(function(data){
            arr.push(data);
        });
        expect(arr).toEqual(tree2);
    });
    it('getPreSequence', function(){
        expect(test.getPreSequence(5)).toBe(7);
    });
    it('countLeaves', function(){
        expect(test.countLeaves()).toBe(3);
    });
    it('getSubDepth', function(){
        expect(test.getSubDepth(6)).toBe(1);
        expect(test.getSubDepth(2)).toBe(3);
    });
    it('getDepth', function(){
        expect(test.getDepth()).toBe(4);
        expect(test.leftChild.getDepth()).toBe(3);
    });
    it('delSubX', function(){
        var tree2 =  [1, 2, 3, 4, 5];
        var test2 = new BinaryTree();
        test2.createBinaryTree(tree2);
        expect(test2.getDepth()).toBe(3);
        test2.delSubX(2);
        expect(test2.getDepth()).toBe(2);
    });
    it('copy', function(){
        var test2 = test.copy();

        var arr = [];
        test2.preOrderNonRecursive(function(data){
            arr.push(data);
        })
        expect(arr).toEqual([1, 2, 4, 5, 7, 3, 6 ]);
    });
    it('findNearAncient', function(){
        var tree2 =  [1, 2, 3, 4, 5];
        var test2 = new BinaryTree();
        test2.createBinaryTree(tree2);

        var node1 = test2.leftChild.leftChild;
        var node2 = test2.leftChild.rightChild;
        expect(test2.findNearAncient(node1, node2)).toBe(test2.leftChild);

        node3 = test2.rightChild;
        expect(test2.findNearAncient(node1, node3)).toBe(test2);
    });
    it('lushDegree', function(){
        expect(test.lushDegree()).toBe(9);
    });
    it('descNum', function(){
        test.descNum();
        expect(test.descNum).toBe(6);
        expect(test.leftChild.descNum).toBe(3);
    });
    it('static isFullBinaryTree', function(){
        var newTree = test.copy();
        newTree.rightChild.leftChild = new BinaryTree(7);
        newTree.leftChild.rightChild.leftChild = null;
        expect(BinaryTree.isFullBinaryTree(test)).toBe(false);
        expect(BinaryTree.isFullBinaryTree(newTree)).toBe(true);
    });

});