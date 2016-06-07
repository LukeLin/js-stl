/*
 静态次优查找树

 适合各记录的查找概率不等的情况

 查找效率最高即平均查找长度最小，我们可以给出有序表在非等概率情况下应遵循的两个原则：
 1、最先访问的结点应是访问概率最大的结点；
 2、每次访问应使结点两边尚未访问的结点的被访概率之和尽可能相等。


 这两个原则可用一句话来表示，即判定树为带权内路径长度之和最小的二叉树，亦即：PH = ∑wihi  最小，其中 n 为有序表长度，hi 为第 i 个结点在判定树上的层次数，wi = cpi，c 为某个常数，pi 为第 i 个结点的查找概率。


 这样的树称为静态最优查找树（static optimal search tree），构造这样一棵树的时间代价太大，亦即时间复杂度很大，因此我们通常是构造次优查找树（nearly optimal search tree），构造它的时间代价远远低于构造最优查找树，但查找性能只比最优查找树差1%~2%，很少差3%以上。

 次优查找树的构造：

 设有序表每个记录的权值为 wl,wl+1,…,wh，第一个应访问的结点号为 i ，则有：
 Δpi =   ∑wj - ∑wj   最小，即 Δpi = Min {Δpj }
 再分别对 {rl,rl+1,…,ri-1} 和 {ri+1,ri+2,…,rh} 分别构造次优查找树
 */
var BinaryTree = require('../BinaryTree/BinaryTree').BinaryTree;

/**
 * 由有序表sTable[low..high]及其累计权值表weights递归构造次优查找树
 * @param {BinaryTree} tree
 * @param {Array} sTable
 * @param {Array} sWeights
 * @param {Number} low
 * @param {Number} high
 */
function secondOptimal(tree, sTable, sWeights, low, high) {
    var i = low;
    var min = Math.abs(sWeights[high] - sWeights[low]);
    var dw = sWeights[high] + (sWeights[low - 1] || 0);

    // 选择最小的△Pi值
    for (var j = low + 1; j <= high; ++j) {
        var t = Math.abs(dw - sWeights[j] - sWeights[j - 1]);
        if (t < min) {
            i = j;
            min = t;
        }
    }

    // 调整树根权，选择邻近权值较大的关键字
    var a = 0, b, c = 0;
    if (i - 1 >= low)  b = sWeights[i] - sWeights[i - 1];
    if (i - 2 >= low) a = sWeights[i - 1] - sWeights[i - 2];
    if (i + 1 < high) c = sWeights[i + 1] - sWeights[i];
    if (typeof b === 'number') {
        if (a > c && a > b) --i;
        else if (a < c && c > b)  ++i;
    }

    tree.data = sTable[i];
    //左子树
    if (i === low) tree.leftChild = null;
    else {
        tree.leftChild = new BinaryTree();
        secondOptimal(tree.leftChild, sTable, sWeights, low, i - 1);
    }
    // 右子树
    if (i === high) tree.rightChild = null;
    else {
        tree.rightChild = new BinaryTree();
        secondOptimal(tree.rightChild, sTable, sWeights, i + 1, high);
    }
}

var tree = new BinaryTree();
secondOptimal(tree, ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'], [1, 2, 4, 9, 12, 16, 20, 23, 28], 0, 8);
console.log(tree);


/**
 * 由有序表构造一棵次优查找树
 * @param {Object} obj 有序表，数据元素含有权域weight
 */
function createSOSTree(obj) {
    var tree;
    if (obj.elems.length === 0) tree = null;
    else {
        // 求累计权值表
        var sw = findSW(obj.weights);
        tree = new BinaryTree();
        secondOptimal(tree, obj.elems, sw, 0, obj.elems.length - 1);
    }

    return tree;
}

function findSW(sTable) {
    var sw = [sTable[0]];

    for (var i = 1; i < sTable.length; ++i) {
        sw[i] = sw[i - 1] + sTable[i];
    }

    return sw;
}

var sosTree = createSOSTree({
    elems: ['A', 'B', 'C', 'D', 'E'],
    weights: [1, 30, 2, 29, 3]
});
sosTree.inOrderRecursive(function (value) {
    console.log('inOrder: ' + value);
});
