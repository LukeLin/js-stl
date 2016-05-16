// 有mark域和双亲指针域的二叉树结点类型
export default class EBTNode {
    constructor(){
        this.data = null;
        this.leftChild = null;
        this.rightChild = null;
        this.parent = null;
        this.mark = 0;
    }

    postOrder_nonrecursive_nonstack(visit) {
    var p = this;
    while (p) {
        switch (p.mark) {
            case 0:
                p.mark = 1;
                if (p.leftChild) p = p.leftChild;
                break;
            case 1:
                p.mark = 2;
                if (p.rightChild) p = p.rightChild;
                break;
            case 2:
                p.data && visit(p.data);
                p.mark = 0; // 恢复mark域
                p = p.parent;   // 返回双亲结点
        }
    }
}
}
