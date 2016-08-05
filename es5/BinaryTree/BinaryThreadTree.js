"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 线索二叉树
 *
 * 二叉树的结点中的中序序列a+b*c-d-e/f中'c'的前驱是'*'，后继是'-'.
 * 利用空链域来存放结点的前驱和后继的信息。
 * 当以二叉树链表作为存储结构时，只能找到结点的左右孩子信息，而不能直接得到结点在任一序列中的前驱和后继信息，这种信息只有在便利的动态过程中才能得到。
 * 1.若结点有左子树，则其leftChild域指示其左孩子，否则令leftChild域指示其前驱。
 * 2.若结点有右子树，则其rightChild域指示其右孩子，否则令其rightChild域指示其后继。
 * 为了避免混淆，尚需改变结点结构，增加两个标志域（leftTag, rightTag），其中：
 *           -- 0 leftChild域指示结点的左孩子
 * leftTag --
 *           -- 1 rightChild域指示结点的前驱
 *
 *            -- 0 rightChild域指示结点的右孩子
 * rightTag --
 *            -- 1 rightChild域指示结点的后继
 *
 * 以这种结点结构构成的二叉链表作为二叉树的存储结构，叫做线索链表，其中指向结点前驱和后继的指针，叫做线索。
 * 加上线索的二叉树称之为线索二叉树（Threaded Binary Tree）。
 * 对二叉树以某种次序遍历使其变为线索二叉树的过程叫做线索化。
 *
 * 在中序线索树中，树中所有叶子结点的右链是线索，则右链域直接指示了结点的后继，如结点b的后继为结点*。
 * 树中所有非终端结点的右链均为指针，则无法由此得到后继的信息。
 * 根据中序遍历的规律可知，结点的后继应是遍历其右子树时访问的第一个结点，即右子树中最左下的结点。
 * 例如，在找结点*的后继时，首先沿右指针找到其右子树的根结点-，然后顺其左指针往下直至其左标志为1的结点，即为结点*的后继，即结点c。
 * 反之，在中序线索树中找结点前驱的规律是：
 * 若其左标志为1，则左链为线索，指示其前驱，否则遍历左子树时最后访问的一个结点（左子树中最右下的结点）为其前驱。
 *
 * 在后序线索树中找结点后继可分三种情况：
 * 1）若结点x是二叉树的根，则其后继为空；
 * 2）若结点x是其双亲的右孩子或是其双亲的左孩子且其双亲没有右子树，则其后继即为双亲结点；
 * 3）若结点x是其双亲的左孩子，且其双亲有右子树，则其后继为双亲的右子树上按后续为双亲的右子树上按后序遍历列出的第一个结点；
 *
 * 若在某程序中所用二叉树需经常遍历或查找结点在遍历所得线性序列中的前驱和后继，则应采用线索链表作存储结构。
 */
var LINK = 0;
var THREAD = 1;

var BinaryThreadTree_inOrder = function () {
    (0, _createClass3.default)(BinaryThreadTree_inOrder, null, [{
        key: "inOrderThreading",

        // 二叉树中序线索化
        value: function inOrderThreading(tree) {
            var threadTree = new this.constructor();
            threadTree.leftTag = LINK;
            threadTree.rightTag = THREAD;
            // 右指针回指
            threadTree.rightChild = threadTree;

            var pre;
            // 若二叉树为空，左指针回指
            if (!tree) threadTree.leftChild = threadTree;else {
                threadTree.leftChild = tree;
                pre = threadTree;
                inThreading(tree); // 中序遍历进行中序线索化
                // 最后一个结点线索化
                pre.rightChild = threadTree;
                pre.rightTag = THREAD;
                threadTree.rightChild = pre;
            }

            return threadTree;

            function inThreading(p) {
                if (!p) return;

                inThreading(p.leftChild); // 左子树线索化
                // 前驱线索
                if (!p.leftChild) {
                    p.leftTag = THREAD;
                    p.leftChild = pre;
                }
                // 后继线索
                if (!pre.rightChild) {
                    pre.rightTag = THREAD;
                    pre.rightChild = p;
                }
                pre = p;
                inThreading(p.rightChild); // 右子树线索化
            }
        }
    }]);

    function BinaryThreadTree_inOrder(data) {
        var leftChild = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
        var rightChild = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
        (0, _classCallCheck3.default)(this, BinaryThreadTree_inOrder);

        this.data = data;
        this.leftChild = leftChild;
        this.rightChild = rightChild;
        // 左右标记
        this.leftTag = this.rightTag = undefined;
    }

    (0, _createClass3.default)(BinaryThreadTree_inOrder, [{
        key: "inOrderTraverse_thread",
        value: function inOrderTraverse_thread(visit) {
            var p = this.leftChild;

            while (p != this) {
                while (p.leftTag === LINK) {
                    p = p.leftChild;
                }if (visit(p.data) === false) return;

                while (p.rightTag == THREAD && p.rightChild != this) {
                    p = p.rightChild;
                    visit(p.data);
                }
                p = p.rightChild;
            }
        }
    }, {
        key: "inOrderThreading",
        value: function inOrderThreading() {
            return this.constructor.inOrderThreading(this);
        }
        // 在当前结点插入子树x，p代表当前结点

    }, {
        key: "insertSubTree",
        value: function insertSubTree(xTree) {
            var s, q;
            // x作为p的左子树
            if (this.leftTag === THREAD) {
                s = this.leftChild; // s为p的前驱
                this.leftTag = LINK;
                this.leftChild = xTree;
                q = xTree;

                while (q.leftChild && q.leftTag === LINK) {
                    q = q.leftChild;
                } // 找到子树中的最左结点，并修改其前驱指向s
                q.leftChild = s;
                xTree.rightTag = THREAD;
                // x的后继指向p
                xTree.rightChild = this;
            }
            // x作为p的右子树
            else if (this.rightTag === THREAD) {
                    // s为p的后继
                    s = this.rightChild;
                    this.rightTag = LINK;
                    this.rightChild = xTree;
                    q = xTree;

                    while (q.leftChild && q.leftTag === LINK) {
                        q = q.leftChild;
                    } // 找到子树中的最左结点，并修改其前驱指向p
                    q.leftChild = this;
                    xTree.rightTag = THREAD;
                    // x的后继指向p的后继
                    xTree.rightChild = s;
                }
                // x作为p的左子树，p的左子树作为x的右子树
                else {
                        s = this.leftChild;
                        var t = s;

                        while (t.leftChild && t.leftTag === LINK) {
                            t = t.leftChild;
                        } // 找到p的左子树的最左结点t和前驱u
                        var u = t.leftChild;
                        this.leftChild = xTree;
                        xTree.rightTag = LINK;
                        // x作为p的左子树，p的左子树作为x的右子树
                        xTree.rightChild = s;
                        t.leftChild = xTree;
                        q = xTree;

                        while (q.leftChild && q.leftTag === LINK) {
                            q = q.leftChild;
                        } // 找到子树中的最左结点，并修改其前驱指向u
                        q.leftChild = u;
                    }
        }
    }]);
    return BinaryThreadTree_inOrder;
}();

// 在先序后继线索二叉树中查找结点p的先序后继


exports.default = BinaryThreadTree_inOrder;
function preOrder_next(p) {
    return p.leftChild ? p.leftChild : p.rightChild;
}

function postOrder_next(node) {
    // p有后继线索
    if (node.rightTag === THREAD) return node.rightChild;
    // p是根结点
    else if (!node.parent) return null;
        // p是右孩子
        else if (node == node.parent.rightChild) return node.parent;
            // p是左孩子且其双亲没有右孩子
            else if (node == node.parent.leftChild && node.parent.rightTag === THREAD) return node.parent;
                // p是左孩子且双亲有右孩子
                else {
                        var q = node.parent.rightChild;
                        // 从p的双亲的右孩子向下走到底
                        while (q.leftChild || q.rightTag === LINK) {
                            if (q.leftChild) q = q.leftChild;else q = q.rightChild;
                        }

                        return q;
                    }
}