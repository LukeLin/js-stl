/*
 平衡二叉树(AVL)

 BST是一种查找效率比较高的组织形式，但其平均查找长度受树的形态影响较大，形态比较均匀时查找效率很好，形态明显偏向某一方向时其效率就大大降低。因此，希望有更好的二叉排序树，其形态总是均衡的，查找时能得到最好的效率，这就是平衡二叉排序树。

 平衡二叉排序树(Balanced Binary Tree或Height-Balanced Tree)是在1962年由Adelson-Velskii和Landis提出的，又称AVL树。

 平衡二叉树的定义
 平衡二叉树或者是空树，或者是满足下列性质的二叉树。
 ⑴：左子树和右子树深度之差的绝对值不大于1；
 ⑵：左子树和右子树也都是平衡二叉树。

 平衡因子(Balance Factor) ：二叉树上结点的左子树的深度减去其右子树深度称为该结点的平衡因子。

 因此，平衡二叉树上每个结点的平衡因子只可能是-1、0和1，否则，只要有一个结点的平衡因子的绝对值大于1， 该二叉树就不是平衡二叉树。
 如果一棵二叉树既是二叉排序树又是平衡二叉树，称为平衡二叉排序树(Balanced Binary Sort Tree) 。

 在平衡二叉排序树上执行查找的过程与二叉排序树上的查找过程完全一样，则在AVL树上执行查找时，和给定的K值比较的次数不超过树的深度。
 在平衡二叉排序树上进行查找的平均查找长度和㏒2n是一个数量级的，平均时间复杂度为O(㏒2n)。


 平衡化旋转

 一般的二叉排序树是不平衡的，若能通过某种方法使其既保持有序性，又具有平衡性，就找到了构造平衡二叉排序树的方法，该方法称为平衡化旋转。
 在对AVL树进行插入或删除一个结点后，通常会影响到从根结点到插入(或删除)结点的路径上的某些结点，这些结点的子树可能发生变化。以插入结点为例，影响有以下几种可能性
 ◆  以某些结点为根的子树的深度发生了变化；
 ◆ 某些结点的平衡因子发生了变化；
 ◆ 某些结点失去平衡。
 沿着插入结点上行到根结点就能找到某些结点，这些结点的平衡因子和子树深度都会发生变化，这样的结点称为失衡结点。

 1   LL型平衡化旋转

 ⑴ 失衡原因
 在结点a的左孩子的左子树上进行插入，插入使结点a失去平衡。a插入前的平衡因子是1，插入后的平衡因子是2。设b是a的左孩子，b在插入前的平衡因子只能是0，插入后的平衡因子是1(否则b就是失衡结点)。
 ⑵ 平衡化旋转方法
 通过顺时针旋转操作实现，用b取代a的位置，a成为b的右子树的根结点，b原来的右子树作为a的左子树。
 ⑶ 插入后各结点的平衡因子分析
 ① 旋转前的平衡因子
 设插入后b的左子树的深度为HbL，则其右子树的深度为HbL-1； a的左子树的深度为HbL+1。
 a的平衡因子为2，则a的右子树的深度为：
 HaR=HbL+1-2=HbL-1。

 ② 旋转后的平衡因子
 a的右子树没有变，而左子树是b的右子树，则平衡因子是：HaL- HaR=(HbL-1)-(HbL-1)=0
 即a是平衡的，以a为根的子树的深度是HbL。
 b的左子树没有变化，右子树是以a为根的子树，则平衡因子是： HbL-HbL=0
 即b也是平衡的，以b为根的子树的深度是HbL+1，与插入前a的子树的深度相同，则该子树的上层各结点的平衡因子没有变化，即整棵树旋转后是平衡的。


 2   LR型平衡化旋转

 ⑴ 失衡原因
 在结点a的左孩子的右子树上进行插入，插入使结点a失去平衡。a插入前的平衡因子是1，插入后a的平衡因子是2。设b是a的左孩子，c为b的右孩子， b在插入前的平衡因子只能是0，插入后的平衡因子是-1；c在插入前的平衡因子只能是0，否则，c就是失衡结点。

 ⑵ 插入后结点c的平衡因子的变化分析
 ①   插入后c的平衡因子是1：即在c的左子树上插入。设c的左子树的深度为HcL，则右子树的深度为HcL-1；b插入后的平衡因子是-1，则b的左子树的深度为HcL，以b为根的子树的深度是HcL+2。因插入后a的平衡因子是2 ，则a的右子树的深度是HcL。
 ② 插入后c的平衡因子是0：c本身是插入结点。设c的左子树的深度为HcL，则右子树的深度也是HcL；因b插入后的平衡因子是-1，则b的左子树的深度为HcL，以b为根的子树的深度是HcL+2；插入后a的平衡因子是2 ，则a的右子树的深度是HcL。
 ③ 插入后c的平衡因子是-1：即在c的右子树上插入。设c的左子树的深度为HcL，则右子树的深度为HcL+1 ，以c为根的子树的深度是HcL+2；因b插入后的平衡因子是-1，则b的左子树的深度为HcL+1，以b为根的子树的深度是HcL+3；则a的右子树的深度是HcL+1。

 ⑶ 平衡化旋转方法
 先以b进行一次逆时针旋转(将以b为根的子树旋转为以c为根)，再以a进行一次顺时针旋转。将整棵子树旋转为以c为根，b是c的左子树，a是c的右子树；c的右子树移到a的左子树位置， c的左子树移到b的右子树位置。

 ⑷ 旋转后各结点(a,b,c)平衡因子分析
 ① 旋转前 (插入后)c的平衡因子是1：
 a的左子树深度为HcL-1 ，其右子树没有变化，深度是HcL，则a的平衡因子是-1；b的左子树没有变化，深度为HcL，右子树是c旋转前的左子树，深度为HcL，则b的平衡因子是0； c的左、右子树分别是以b和a为根的子树，则c的平衡因子是0 。
 ② 旋转前 (插入后)c的平衡因子是0：
 旋转后a，b，c的平衡因子都是0 。
 ③  旋转前 (插入后)c的平衡因子是-1：
 旋转后a，b，c的平衡因子分别是0，-1，0 。
 综上所述，即整棵树旋转后是平衡的。


 3   RL型平衡化旋转

 ⑴ 失衡原因
 在结点a的右孩子的左子树上进行插入，插入使结点a失去平衡，与LR型正好对称。对于结点a，插入前的平衡因子是-1，插入后a的平衡因子是-2。设b是a的右孩子，c为b的左孩子， b在插入前的平衡因子只能是0，插入后的平衡因子是1；同样，c在插入前的平衡因子只能是0，否则，c就是失衡结点。

 ⑵ 插入后结点c的平衡因子的变化分析
 ①   插入后c的平衡因子是1：在c的左子树上插入。设c的左子树的深度为HcL，则右子树的深度为HcL-1。因b插入后的平衡因子是1，则其右子树的深度为HcL，以b为根的子树的深度是HcL+2；因插入后a的平衡因子是-2 ，则a的左子树的深度是HcL。
 ② 插入后c的平衡因子是0：c本身是插入结点。设c的左子树的深度为HcL，则右子树的深度也是HcL；因b插入后的平衡因子是1，则b的右子树的深度为HcL，以b为根的子树的深度是HcL+2；因插入后a的平衡因子是-2 ，则a的左子树的深度是HcL。
 ③  插入后c的平衡因子是-1：在c的右子树上插入。设c的左子树的深度为HcL，则右子树的深度为HcL+1 ，以c为根的子树的深度是HcL+2；因b插入后的平衡因子是1，则b的右子树的深度为HcL+1，以b为根的子树的深度是HcL+3；则a的右子树的深度是HcL+1。

 ⑶ 平衡化旋转方法
 先以b进行一次顺时针旋转，再以a进行一次逆时针旋转。即将整棵子树(以a为根)旋转为以c为根，a是c的左子树，b是c的右子树；c的右子树移到b的左子树位置，c的左子树移到a的右子树位置。

 ⑷ 旋转后各结点(a,b,c)的平衡因子分析
 ① 旋转前 (插入后)c的平衡因子是1：
 a的左子树没有变化，深度是HcL，右子树是c旋转前的左子树，深度为HcL，则a的平衡因子是0；b的右子树没有变化，深度为HcL，左子树是c旋转前的右子树，深度为HcL-1 ，则b的平衡因子是-1； c的左、右子树分别是以a 和b为根的子树，则c的平衡因子是0 。
 ② 旋转前 (插入后)c的平衡因子是0：
 旋转后a，b，c的平衡因子都是0 。
 ③  旋转前 (插入后)c的平衡因子是-1：
 旋转后a，b，c的平衡因子分别是1，0，0 。

 综上所述，即整棵树旋转后是平衡的。


 4  RR型平衡化旋转

 ⑴ 失衡原因
 在结点a的右孩子的右子树上进行插入，插入使结点a失去平衡。要进行一次逆时针旋转，和LL型平衡化旋转正好对称。

 ⑵ 平衡化旋转方法
 设b是a的右孩子，通过逆时针旋转实现。用b取代a的位置，a作为b的左子树的根结点，b原来的左子树作为a的右子树。



 对于上述四种平衡化旋转，其正确性容易由“遍历所得中序序列不变”来证明。并且，无论是哪种情况，平衡化旋转处理完成后，形成的新子树仍然是平衡二叉排序树，且其深度和插入前以a为根结点的平衡二叉排序树的深度相同。所以，在平衡二叉排序树上因插入结点而失衡，仅需对失衡子树做平衡化旋转处理。



 平衡二叉排序树的插入

 平衡二叉排序树的插入操作实际上是在二叉排序插入的基础上完成以下工作：
 ⑴：判别插入结点后的二叉排序树是否产生不平衡?
 ⑵：找出失去平衡的最小子树；
 ⑶：判断旋转类型，然后做相应调整。
 失衡的最小子树的根结点a在插入前的平衡因子不为0，且是离插入结点最近的平衡因子不为0的结点。
 若a失衡，从a到插入点的路径上的所有结点的平衡因子都会发生变化，在该路径上还有一个结点的平衡因子不为0且该结点插入后没有失衡，其平衡因子只能是由1到0或由-1到0，以该结点为根的子树深度不变。该结点的所有祖先结点的平衡因子也不变，更不会失衡。

 1 算法思想(插入结点的步骤)
 ①：按照二叉排序树的定义，将结点s插入；
 ②：在查找结点s的插入位置的过程中，记录离结点s最近且平衡因子不为0的结点a，若该结点不存在，则结点a指向根结点；
 ③： 修改结点a到结点s路径上所有结点的；
 ④：判断是否产生不平衡，若不平衡，则确定旋转类型并做相应调整。

 */

var LH = 1;     // 左高
var EH = 0;     // 等高
var RH = -1;    // 右高

var BinaryTree = require('../Binary tree/BinaryTree').BinaryTree;


/**
 * AVL树，平衡二叉排序树
 * @param {*} data
 * @param {AVLNode} leftChild
 * @param {AVLNode} rightChild
 * @param {Number} balanceFactor 平衡因子
 * @constructor
 */
function AVLNode(data, leftChild, rightChild, balanceFactor) {
    BinaryTree.call(this, data, leftChild, rightChild);
    this.balanceFactor = balanceFactor || EH;
}
exports.AVLNode = AVLNode;
AVLNode.cmp = function(a, b){
    if(a > b) return 1;
    else if(a < b) return -1;
    else return 0;
};
AVLNode.prototype = {
    constructor: AVLNode,

    __proto__: BinaryTree.prototype,

    /**
     *
     * 在结点a的左孩子的左子树上进行插入
     *          a                           b
     *        /   \                       /   \
     *       b    aR       --->          bL    a
     *     /  \                          |    /  \
     *    bL   bR                        x   bR  aR
     *    |
     *    x
     * @returns {AVLNode|*}
     */
    rotate_LL: rotate('leftChild'),

    /**
     * 在结点a的右孩子的右子树上进行插入
     *        a                                   b
     *       / \                                 /  \
     *     aL   b                               a    bR
     *         /  \           ---->            / \   |
     *        bL  bR                          aL bL  x
     *             |
     *             x
     *
     * @returns {AVLNode|*}
     */
    rotate_RR: rotate('rightChild'),

    /**
     *  在结点a的左孩子的右子树上进行插入
     *         a                            c
     *       /   \                        /   \
     *      b    aR                      b     a
     *    /  \                         /  \   /  \
     *   bL   c           ---->       bL  cL cR  aR
     *       / \                           |  |
     *      cL cR                          x  x
     *      |   |
     *      x   x
     *
     * @returns {BSTNode|*}
     */
    rotate_LR: function () {
        var b = this.leftChild;
        var c = b.rightChild;
        this.leftChild = c.rightChild;
        b.rightChild = c.leftChild;
        c.leftChild = b;
        c.rightChild = this;

        if (c.balanceFactor === LH) {
            this.balanceFactor = RH;
            b.balanceFactor = EH;
        } else if (c.balanceFactor === EH) {
            this.balanceFactor = b.balanceFactor = EH;
        } else {
            this.balanceFactor = EH;
            b.balanceFactor = LH;
        }

        c.balanceFactor = EH;

        return c;
    },

    /**
     * 在结点a的右孩子的左子树上进行插入
     *        a                                     c
     *      /   \                                 /   \
     *     aL    b                               a     b
     *          / \                             / \   / \
     *         c   bR          ---->           aL cL cR bR
     *        / \                                 |  |
     *       cL cR                                x  x
     *       |  |
     *       x  x
     *
     * @returns {BSTNode|*}
     */
    rotate_RL: function () {
        var b = this.rightChild;
        var c = b.leftChild;
        this.rightChild = c.leftChild;
        b.leftChild = c.rightChild;
        c.rightChild = b;
        c.leftChild = this;

        if (c.balanceFactor === LH) {
            this.balanceFactor = EH;
            b.balanceFactor = RH;
        } else if (c.balanceFactor === EH) {
            this.balanceFactor = b.balanceFactor = EH;
        } else {
            this.balanceFactor = LH;
            b.balanceFactor = EH;
        }

        c.balanceFactor = EH;

        return c;
    },

    /*
     另一种平衡二叉树的插入方法
     分左平衡旋转和右平衡旋转，左平衡包括LL, LR，右平衡包括RL, RR
     */

    /**
     * 左平衡处理
     * @returns {AVLNode} 返回新的根结点
     */
    leftBalance : function (isDelete) {
        var c = this.leftChild;
        var p;

        // 检查左子树的平衡度
        switch (c.balanceFactor) {
            case EH:
                if(isDelete) {
                    this.balanceFactor = LH;
                    c.balanceFactor = RH;
                    p = this.rotate_LL();
                }
                break;
            // 如果新结点插入到左孩子的左子树上，要做单右旋处理
            case LH:
                this.balanceFactor = c.balanceFactor = EH;
                p = this.rotate_LL();
                break;
            // 如果新结点插入到左孩子的右子树上，要做双旋处理
            case RH:
                var b = c.rightChild;
                // 修改当前结点和左孩子的平衡因子
                switch (b.balanceFactor) {
                    case LH:
                        this.balanceFactor = RH;
                        c.balanceFactor = EH;
                        break;
                    case EH:
                        this.balanceFactor = c.balanceFactor = EH;
                        break;
                    case RH:
                        this.balanceFactor = EH;
                        c.balanceFactor = LH;
                        break;
                    default:
                        break;
                }

                b.balanceFactor = EH;
                // 对当前结点的左子树做左旋平衡处理
                this.leftChild = this.leftChild.rotate_RR();
                // 对当前结点做右旋平衡处理
                p = this.rotate_LL();
                break;
            default:
                break;
        }

        return p;
    },

    /**
     * 右平衡处理
     * @returns {AVLNode} 返回新的根结点
     */
    rightBalance: function (isDelete) {
        var c = this.rightChild;
        var p;

        switch (c.balanceFactor) {
            case EH:
                if(isDelete) {
                    this.balanceFactor = RH;
                    c.balanceFactor = LH;
                    p = this.rotate_RR();
                }
                break;
            case RH:
                this.balanceFactor = c.balanceFactor = EH;
                p = this.rotate_RR();
                break;
            case LH:
                var b = c.leftChild;
                switch (b.balanceFactor) {
                    case LH:
                        this.balanceFactor = EH;
                        c.balanceFactor = RH;
                        break;
                    case EH:
                        this.balanceFactor = c.balanceFactor = EH;
                        break;
                    case RH:
                        this.balanceFactor = LH;
                        c.balanceFactor = EH;
                        break;
                    default:
                        break;
                }

                b.balanceFactor = EH;
                this.rightChild = this.rightChild.rotate_LL();
                p = this.rotate_RR();
                break;
            default:
                break;
        }

        return p;
    },

    search: function search_nonRecurse(key) {
        if (this.data == null) return null;

        var p = this;
        var cmp;
        while (p && (cmp = AVLNode.cmp(key, p.data) !== 0)) {
            if (cmp < 0) p = p.leftChild;
            else p = p.rightChild;
        }

        if (!p || AVLNode.cmp(key, p.data) !== 0) return null;
        else return p;
    },

    insert_nonRecursive: function (elem) {
        if (this.data == null) {
            this.data = elem;
            this.leftChild = this.rightChild = null;
            this.balanceFactor = EH;
            return;
        }

        var s = new AVLNode(elem, null, null, EH);
        // a指向离s最近且平衡因子不为0的结点
        var a = this;
        var p = this;
        // f指向a的父结点
        var f = null;
        // q指向p的父结点
        var q = null;

        // 找插入位置q结点
        while (p) {
            var cmp = AVLNode.cmp(s.data, p.data);
            // 结点已存在
            if (cmp === 0) return;

            if (p.balanceFactor !== EH) {
                a = p;
                f = q;
            }
            q = p;

            if (cmp < 0) p = p.leftChild;
            else p = p.rightChild;
        }

        // s插入到q结点的左或右子树
        if (AVLNode.cmp(s.data, q.data) < 0) q.leftChild = s;
        else q.rightChild = s;

        p = a;

        // 改变最近且平衡因子不为0的结点到插入结点的路径所有结点平衡因子
        // 插入到左子树，平衡因子加1，右子树平衡因子减1
        while (p != s) {
            if (AVLNode.cmp(s.data, p.data) < 0) {
                ++p.balanceFactor;
                p = p.leftChild;
            } else {
                --p.balanceFactor;
                p = p.rightChild;
            }
        }

        // 未失平衡，不做调整
        if (a.balanceFactor > -2 && a.balanceFactor < 2) return;

        // 根据情况做旋转平衡
        var b;
        if (a.balanceFactor === 2) {
            b = a.leftChild;
            if (b.balanceFactor === LH) p = a.rotate_LL(true);
            else p = a.rotate_LR();
        } else {
            b = a.rightChild;
            if (b.balanceFactor === LH) p = a.rotate_RL();
            else p = a.rotate_RR(true);
        }

        // p为根结点
        // 深度拷贝，预防循环引用
        p = p.copy(function (target, source) {
            target.balanceFactor = source.balanceFactor;
        });
        if (!f) {
            this.data = p.data;
            this.leftChild = p.leftChild;
            this.rightChild = p.rightChild;
            this.balanceFactor = p.balanceFactor;
        } else if (f.leftChild == a) f.leftChild = p;
        else f.rightChild = p;
    },

    /**
     * AVL树的递归插入算法
     * @param {*} elem 待插入的关键字
     * @returns {{success: boolean, taller: boolean}} success表示是否插入成功，taller表示树是否有长高
     */
    insert: function (elem) {
        var taller = true;
        var success = false;

        // 插入的新结点， 树长高
        if (this.data == null) {
            this.data = elem;
            this.balanceFactor = EH;
            success = true;
        } else {
            var ret, p;
            var cmp = AVLNode.cmp(elem, this.data);
            // 树中已存在相同关键字的结点，退出
            if (cmp === 0) {
                taller = false;
                success = false;
            }
            // 左子树中进行搜索
            else if (cmp < 0) {
                this.leftChild = this.leftChild || new AVLNode();
                ret = this.leftChild.insert(elem);
                taller = ret.taller;
                success = ret.success;

                // 已插入到左子树中且左子树长高了
                if (success && taller) {
                    // 检查当前结点的平衡度
                    switch (this.balanceFactor) {
                        // 如果左子树比右子树高，需要做左平衡处理
                        case LH:
                            p = this.leftBalance();
                            taller = false;
                            break;
                        // 如果等高， 左子树的增高使得树也增高了
                        case EH:
                            this.balanceFactor = LH;
                            taller = true;
                            break;
                        // 如果右子树比左子树高，现在就等高了
                        case RH:
                            this.balanceFactor = EH;
                            taller = false;
                            break;
                        default:
                            break;
                    }
                }
            }
            // 右子树中进行搜索
            else {
                this.rightChild = this.rightChild || new AVLNode();
                ret = this.rightChild.insert(elem);
                taller = ret.taller;
                success = ret.success;

                // 已插入到右子树中且右子树长高了
                if (success && taller) {
                    // 检查当前结点的平衡度
                    switch (this.balanceFactor) {
                        // 如果原本左子树比右子树高，现在就等高了
                        case LH:
                            this.balanceFactor = EH;
                            taller = false;
                            break;
                        // 如果原本等高，现在就是右子树高了
                        case EH:
                            this.balanceFactor = RH;
                            taller = true;
                            break;
                        // 如果右子树高，现因右子树又高了，做右平衡处理
                        case RH:
                            p = this.rightBalance();
                            taller = false;
                            break;
                        default:
                            break;
                    }
                }
            }

            // 如果做了平衡处理，则深度拷贝
            if (p) {
                p = p.copy(function (target, source) {
                    target.balanceFactor = source.balanceFactor;
                });
                copyAVLNode(this, p);
            }
        }

        return {
            success: success,
            taller: taller
        };
    },

    /**
     * 在avl树中删除关键字
     * @param elem
     * @param parent
     * @returns {{success: boolean, unbalanced: boolean}}
     */
    'delete': function(elem, parent){
        var unbalanced = false;
        var success = false;
        var ret;
        var data = null;

        // 只有根结点
        if(this.data == null)
            return {
                success: success,
                unbalanced: unbalanced
            };

        var p;
        var cmp = AVLNode.cmp(elem, this.data);
        // 找到当前结点
        if(cmp === 0) {
            unbalanced = true;
            success = true;
            data = this.data;

            // 如果没有左右子树，则删除当前结点
            if(!this.rightChild && !this.leftChild){
                if(parent) {
                    var pos = parent.leftChild == this ? 'leftChild' : 'rightChild';
                    parent[pos] = null;
                }
                // 根结点的情况
                else this.data = null;
            }
            // 有右没左，直接替换
            else if(this.rightChild && !this.leftChild){
                copyAVLNode(this, this.rightChild);
            }
            // 有左没右，也直接替换
            else if(this.leftChild && !this.rightChild){
                copyAVLNode(this, this.leftChild);
            }
            // 既有左子树又有右子树
            else {
                // 在右子树的左子树中找到相邻仅小于elem的结点，然后交换值
                p = this.rightChild;
                while (p.leftChild) p = p.leftChild;
                var temp = p.data;
                p.data = this.data;
                this.data = temp;

                // 从右子树递归删除
                ret = this.rightChild['delete'](elem, this);
                unbalanced = ret.unbalanced;

                // 返回的结果产生不平衡，即右子树变矮了，根据情况作调整
                if(unbalanced) {
                    switch(this.balanceFactor){
                        // 如果原来等高，现在左子树高了
                        case EH:
                            this.balanceFactor = LH;
                            unbalanced = false;
                            break;
                        // 如果原来右子树高，现在等高了
                        case RH:
                            this.balanceFactor = EH;
                            break;
                        // 如果原来左子树高，需要做做平衡处理
                        case LH:
                            p = this.leftBalance(true).copy(function (target, source) {
                                target.balanceFactor = source.balanceFactor;
                            });
                            copyAVLNode(this, p);
                            break;
                        default:
                            break;
                    }
                }
            }
        }
        // 在右子树中查找
        else if(cmp > 0){
            // 没找到
            if(!this.rightChild) {
                success = false;
            }
            // 继续递归查找
            else {
                ret = this.rightChild['delete'](elem, this);
                success = ret.success;
                unbalanced = ret.unbalanced;
                data = ret.data;

                // 如果产生不平衡，即在右子树中被删除了
                if(success && unbalanced) {
                    switch(this.balanceFactor){
                        // 如果原来等高，现在左子树高了
                        case EH:
                            this.balanceFactor = LH;
                            unbalanced = false;
                            break;
                        // 如果原来右子树高，现在等高了
                        case RH:
                            this.balanceFactor = EH;
                            break;
                        // 如果原来左子树高，需要做左平衡处理
                        case LH:
                            p = this.leftBalance(true).copy(function (target, source) {
                                target.balanceFactor = source.balanceFactor;
                            });
                            copyAVLNode(this, p);
                            break;
                        default:
                            break;
                    }
                }
            }
        }
        // 在左子树中查找
        else {
            if(!this.leftChild) {
                success = false;
            } else {
                ret = this.leftChild['delete'](elem, this);
                success = ret.success;
                unbalanced = ret.unbalanced;
                data = ret.data;

                if(success && unbalanced){
                    switch(this.balanceFactor){
                        case EH:
                            this.balanceFactor = RH;
                            unbalanced = false;
                            break;
                        case LH:
                            this.balanceFactor = EH;
                            break;
                        case RH:
                            p = this.rightBalance(true);
                            p = p.copy(function (target, source) {
                                target.balanceFactor = source.balanceFactor;
                            });
                            copyAVLNode(this, p);
                            break;
                        default:
                            break;
                    }
                }
            }
        }

        return {
            success: success,
            unbalanced: unbalanced,
            data: data
        };
    }
};

function rotate(to) {
    var ato = to === 'leftChild' ? 'rightChild' : 'leftChild';

    return function(changeBF){
        var b = this[to];
        this[to] = b[ato];
        b[ato] = this;
        if(changeBF) this.balanceFactor = b.balanceFactor = EH;

        return b;
    };
}

function copyAVLNode(target, source){
    for(var prop in source){
        if(!source.hasOwnProperty(prop)) continue;
        target[prop] = source[prop];
    }
}



console.log('\nAVL tree insert1: ');
var test = new AVLNode();
test.insert(3);
test.insert(14);
test.insert(25);
test.insert(81);
test.insert(44);
test.inOrderTraverse(function (data) {
    console.log(data);
});

console.log('search: ');
console.log(test.search(44));

/*
      14
    /    \
  3       44
         /   \
       25     81
 */




console.log('\nAVL tree insert2: ');
var test = new AVLNode();
test.insert_nonRecursive(3);
test.insert_nonRecursive(14);
test.insert_nonRecursive(25);
test.insert_nonRecursive(81);
test.insert_nonRecursive(44);
test.inOrderTraverse(function (data) {
    console.log(data);
});

/*
      14
    /    \
  3       44
         /   \
       25     81
 */


// took me a day to find bug, but failed.. f**k!
console.log('delete 2:');

test.delete(25);
test.delete(14);
test.delete(81);
test.delete(44);
test.delete(3);


var str = 'ckbfjlaegmdh';

test = new AVLNode();
for(var i = 0; i < str.length; ++i){
    test.insert(str[i]);
}

var test2 = new AVLNode();
for(var i = 0; i < str.length; ++i){
    test2.insert_nonRecursive(str[i]);
}

test.delete('a');
test.delete('j');
test.delete('b');
test.delete('b');
test.delete('l');
test.delete('f');
test.delete('d');
test.delete('k');
test.delete('g');
test.delete('m');
test.delete('c');
test.delete('e');
test.delete('h');


test2.delete('a');
test2.delete('j');
test2.delete('b');
test2.delete('b');
test2.delete('l');
test2.delete('f');
test2.delete('d');
test2.delete('k');
test2.delete('g');
test2.delete('m');
test2.delete('c');
test2.delete('e');
test2.delete('h');
