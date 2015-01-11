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


*/
var BinaryTree = require('../Binary tree/BinaryTree').BinaryTree;

function RedBlackNode(data, leftChild, rightChild, color, p){
    BinaryTree.call(this, data, leftChild, rightChild);
    this.color = color || '';
    this.p = p || null;
}

RedBlackNode.prototype = {
    constructor: RedBlackNode,
    __proto__: BinaryTree
};