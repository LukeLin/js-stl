/**
 * Red Black Tree todo
 * Created by Luke on 2014/12/30.
 */
/*
 http://blog.csdn.net/v_july_v/article/details/6105630

 红黑树，一种二叉查找树，但在每个结点上增加一个存储位表示结点的颜色，可以是Red或Black。
 通过对任何一条从根到叶子的路径上各个结点着色方式的限制，红黑树确保没有一条路径会比其他路径长出俩倍，因而是接近平衡的。

 红黑树虽然本质上是一棵二叉查找树，但它在二叉查找树的基础上增加了着色和相关的性质使得红黑树相对平衡，从而保证了红黑树的查找、插入、删除的时间复杂度最坏为O(log n)。

 红黑树的5个性质：
 1.每个结点要么是红的要么是黑的。
 2.根结点是黑的。
 3.每个叶结点（叶结点即指树尾端NIL指针或NULL结点）都是黑的。
 4.如果一个结点是红的，那么它的两个儿子都是黑的。
 5.对于任意结点而言，其到叶结点树尾端NIL指针的每条路径都包含相同数目的黑结点。

 正是红黑树的这5条性质，使一棵n个结点的红黑树始终保持了logn的高度，从而也就解释了上面所说的“红黑树的查找、插入、删除的时间复杂度最坏为O(log n)”这一结论成立的原因。


 树的旋转

当在对红黑树进行插入和删除等操作时，对树做了修改可能会破坏红黑树的性质。为了继续保持红黑树的性质，可以通过对结点进行重新着色，以及对树进行相关的旋转操作，即通过修改树中某些结点的颜色及指针结构，来达到对红黑树进行插入或删除结点等操作后继续保持它的性质或平衡的目的。

树的旋转分为左旋和右旋

树在经过左旋右旋之后，树的搜索性质保持不变，但树的红黑性质则被破坏了，所以，红黑树插入和删除数据后，需要利用旋转与颜色重涂来重新恢复树的红黑性质。


红黑树的插入

如果插入的是根结点，由于原树是空树，此情况只会违反性质2，因此直接把此结点涂为黑色；如果插入的结点的父结点是黑色，由于此不会违反性质2和性质4，红黑树没有被破坏，所以此时什么也不做。
	但当遇到下述3种情况时又该如何调整呢？
● 插入修复情况1：如果当前结点的父结点是红色且祖父结点的另一个子结点（叔结点）是红色
此时父结点的父结点一定存在，否则插入前就已不是红黑树。与此同时，又分为父结点是祖父结点的左孩子还是右孩子，根据对称性，我们只要解开一个方向就可以了。这里只考虑父结点为祖父左孩子的情况
对此，我们的解决策略是：将当前节点的父节点和叔叔节点涂黑，祖父结点涂红，把当前结点指向祖父节点，从新的当前节点重新开始算法。
于是，插入修复情况1转换成了插入修复情况2

● 插入修复情况2：当前节点的父节点是红色,叔节点是黑色，当前节点是其父节点的右子
此时，解决对策是：当前节点的父节点做为新的当前节点，以新当前节点为支点左旋。
从而插入修复情况2转换成了插入修复情况3。

● 插入修复情况3：当前节点的父节点是红色,叔节点是黑色，当前节点是其父节点的左子
解决对策是：父节点变为黑色，祖父节点变为红色，在祖父节点为支点右旋，
最后，把根结点涂为黑色，整棵红黑树便重新恢复了平衡。


红黑树的删除

在删除节点后，原红黑树的性质可能被改变，如果删除的是红色节点，那么原红黑树的性质依旧保持，此时不用做修正操作，如果删除的节点是黑色节点，原红黑树的性质可能会被改变，我们要对其做修正操作。那么哪些树的性质会发生变化呢，如果删除节点不是树唯一节点，那么删除节点的那一个支的到各叶节点的黑色节点数会发生变化，此时性质5被破坏。如果被删节点的唯一非空子节点是红色，而被删节点的父节点也是红色，那么性质4被破坏。如果被删节点是根节点，而它的唯一非空子节点是红色，则删除后新根节点将变成红色，违背性质2。


*/
var BinaryTree = require('../Binary tree/BinaryTree').BinaryTree;

var RED = 0;
var BLACK = 1;

function RedBlackNode(data, leftChild, rightChild, color, parent){
    BinaryTree.call(this, data, leftChild, rightChild);
    this.color = color || RED;
    this.parent = parent || null;
    this.root = null;
}

RedBlackNode.prototype = {
    constructor: RedBlackNode,
    __proto__: BinaryTree,

    _rotateLeft: rotate('left'),
    _rotateRight: rotate('right'),

    add: function(data){
        var z = new RedBlackNode(data);
        var y = null;
        var x = this.root;

        while(x){
            y = x;

            if(z.data < x.data) x = x.leftChild;
            else x = x.rightChild;
        }

        z.parent = y;

        if(y) {
            if(z.data < y.data) y.leftChild = z;
            else y.rightChild = z;
        } else this.root = z;

        this._addFixup(z);
    },

    _addFixup: function(z){
        while(z != this.root && z.parent.color === RED){
            if(z.parent == z.parent.parent.leftChild)
                leftAddFixup(this, z);
            else
                rightAddFixup(this, z);
        }

        this.root.color = BLACK;
    },

    removeNode: function(z){
        var x, y;

        if(z.leftChild == null || z.rightChild == null)
            y = z;
        else
            y = this.successor(z);

        if(y.leftChild) x = y.leftChild;
        else x = y.rightChild;

        x.parent = y.parent;

        if(y.parent == null) this.root = x;
        else if(y == y.parent.leftChild) y.parent.left = x;
        else y.parent.rightChild = x;

        if(y != z) z.data = y.data;
        if(y.color === BLACK) this._removeFixup(x);
    },

    _removeFixup: function(z){
        var w;

        while(z !== this.root && z.color === BLACK){
            if(z == z.parent.left)
                leftRemoveFixup(z);
            else
                rightRemoveFixup(z);
        }

        z.color = BLACK;
    },

    successor: function(z){
        if(z.rightChild) return this.min(z.rightChild);

        var y = z.parent;

        while(y && z == y.rightChild){
            z = y;
            y = y.parent;
        }

        return y;
    },

    min: function(z){
        while(z.leftChild){
            z = z.leftChild;
        }

        return z;
    },

    remove: function(key){
        var z = this.search(key);

        if(z == null) return false;

        return this.removeNode(z);
    }


};

function rotate(dir){
    var c1, c2;
    if( dir === 'left') {
        c1 = 'rightChild';
        c2 = 'leftChild';
    } else {
        c1 = 'leftChild';
        c2 = 'rightChild';
    }

    return function(x){
        var y = x[c1];
        x[c1] = y[c2];

        if(y[c2]) y[c2].parent = x;
        y.parent = x.parent;

        if(!x.parent) this.root = y;
        else if(x == x.parent[c2]) x.parent[c2] = y;
        else x.parent[c1] = y;

        y[c2] = x;
        x.parent = y;
    };
}

function addFixup(dir){
    var c1, c2;
    if( dir === 'left') {
        c1 = 'rightChild';
        c2 = 'leftChild';
    } else {
        c1 = 'leftChild';
        c2 = 'rightChild';
    }

    return function(tree, z){
        var y = z.parent.parent[c1];

        if(y.color === RED) {
            z.parent.color = BLACK;
            y.color = BLACK;
            z.parent.parent.color = RED;
            z = z.parent.parent;
        } else {
            if(z === z.parent[c1]) {
                z = z.parent;
                tree._rotateLeft(z);
            }

            z.parent.color = BLACK;
            z.parent.parent.color = RED;
            tree._rotateRight(z.parent.parent);
        }
    };
}

var leftAddFixup = addFixup('left');
var rightAddFixup = addFixup('right');
var leftRemoveFixup = removeFixup('left');
var rightRemoveFixup = removeFixup('right');

function removeFixup(dir){
    var c1, c2, r1, r2;
    if(dir === 'left') {
        c1 = 'rightChild';
        c2 = 'leftChild';
        r1 = '_rotateLeft';
        r2 = '_rotateRight';
    } else {
        c1 = 'leftChild';
        c2 = 'rightChild';
        r1 = '_rotateRight';
        r2 = '_rotateLeft';
    }

    return function(z){
        var w = z.parent[c1];

        if(w.color === RED){
            w.color = BLACK;
            z.parent.color = RED;
            this[r1](z.parent);
            w = z.parent[c1];
        }

        if(w[c2].color === BLACK && w[c1].color == BLACK){
            w.color = RED;
            z = z.parent;
        } else {
            if(w[c1].color = BLACK) {
                w[c2].color = BLACK;
                w.color = RED;
                this[r2](w);
                w = z.parent[c1];
            }

            w.color = z.parent.color;
            z.parent.color = BLACK;
            w[c1].color = BLACK;
            this[r1](z.parent);
            z = this.root;
        }
    };
}


var test = new RedBlackNode();
test.add(13);
test.add(8);
test.add(17);
test.add(1);
test.add(6);
test.add(11);
test.add(15);
test.add(22);
test.add(25);
test.add(27);

test.remove(13);
test.remove(8);
test.remove(17);
test.remove(1);
test.remove(6);
test.remove(11);
test.remove(15);
test.remove(22);
test.remove(25);
test.remove(27);