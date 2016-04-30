// 有双亲指针域的二叉树结点类型
function PBTNode() {
    this.data = null;
    this.leftChild = null;
    this.rightChild = null;
    this.parent = null;
}
exports.PBTNode = PBTNode;
PBTNode.prototype = {
    constructor: PBTNode,
    inOrder_nonrecursive_nonstack: function (visit) {
        var p = this;
        while (p.leftChild) p = p.leftChild;

        while (p) {
            p.data && visit(p.data);

            if (p.rightChild) {
                p = p.rightChild;
                while (p.leftChild) p = p.leftChild;
            } else if (p.parent.leftChild == p) {
                p = p.parent;
            } else {
                p = p.parent;

                while (p.parent && p.parent.rightChild == p)
                    p = p.parent;

                p = p.parent;
            }
        }
    }
};