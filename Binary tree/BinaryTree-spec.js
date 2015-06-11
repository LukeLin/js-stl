var BinaryTree = require('../dist/Binary tree/BinaryTree').BinaryTree;

describe('BinaryTree spec', function(){

    var tree = [1, 2, 3, 4, 5, , 6, , , 7];
    var test = new BinaryTree();

    it('createBinaryTree', function(){
        test.createBinaryTree(tree);
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
    it('isSimilar', function(){

    });
    it('isSimilar', function(){

    });
    it('isSimilar', function(){

    });
    it('isSimilar', function(){

    });
    it('isSimilar', function(){

    });
    it('isSimilar', function(){

    });
    it('isSimilar', function(){

    });
    it('isSimilar', function(){

    });
    it('isSimilar', function(){

    });
    it('isSimilar', function(){

    });
    it('isSimilar', function(){

    });
    it('isSimilar', function(){

    });
    it('isSimilar', function(){

    });
    it('isSimilar', function(){

    });
    it('isSimilar', function(){

    });
    it('isSimilar', function(){

    });
    it('isSimilar', function(){

    });
    it('isSimilar', function(){

    });

});