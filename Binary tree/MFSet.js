// 树与等价问题
/*
在离散数学中，对等价关系和等价类的定义是：
如果集合S中德关系R是自反的，对称的和传递的，则称它为一个等价关系。

划分等价类需对集合进行的操作有3个：其一是构造只含单个成员的集合；其二是判定某个单元素所在子集；其三是归并两个互不相交的集合为一个集合。

 */
// MFSet的树的双亲表存储表示
function MFSet() {
    ParentTree.apply(this, arguments);
}
MFSet.prototype = {
    constructor: MFSet,
    __proto__: ParentTree.prototype,

    /**
     * 查找函数，确定S中x所属子集Si
     * @param {Number} i
     */
    find: function (i) {
        if (i < 0 || i > this.nodes.length - 1) return -1;
        // 找集合S中i所在子集的根
        for (var j = i; this.nodes[j].parent > 0; j = this.nodes[j].parent);

        return j;
    },
    /**
     * 归并操作，将si和sj中的一个并入另一个
     * @param {Number} i
     * @param {Number} j
     */
    merge: function (i, j) {
        if (i < 0 || i > this.nodes.length - 1 || j < 0 || j < this.nodes.length) return false;
        // this.nodes[i]和this.nodes[j]分别为S的互不相交的两个子集Si和Sj的根结点
        this.nodes[i].parent = j;
        return true;
    },
    //并集Si和Sj
    mix: function (i, j) {
        if (i < 0 || i > this.nodes.length - 1 || j < 0 || j > this.nodes.length - 1) return false;
        // Si所含成员数比Sj少
        if (this.nodes[i].parent > this.nodes[j].parent) {
            this.nodes[j].parent += this.nodes[i].parent;
            this.nodes[i].parent = j;
        } else {
            this.nodes[i].parent += this.nodes[j].parent;
            this.nodes[j].parent = i;
        }
    },
    // 压缩路径
    // 确定i所在子集，并将从i至根路径上所有结点都变成根的孩子结点
    fix: function (i) {
        if (i < 0 || i > this.nodes.length - 1) return false;

        for (var j = i; this.nodes[j].parent > 0; j = this.nodes[j].parent);

        for (var k = i, t = this.nodes[k].parent; k !== j; k = t) this.nodes[k].parent = j;
    }
};
