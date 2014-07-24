/**
 * 树的一些概念
 *
 * 树（Tree）是n（n>=0）个结点的有限集。在任意一棵非空树中：
 * （1）有且仅有一个特定的称为根（Root）的结点；
 * （2）当n>1时，其余结点可分为m(m>0)个互不相交的有限集T1,T2,T3,...Tm，其中每一个集合本身又是一棵树，并且称为根的子树（Subtree）。
 *
 * 例如，（a）是只有一个根结点的树；
 * （b）是有13个结点的树，其中A是根，其余结点分成3个互不相交的子集：T1={B,E,F,K,L},t2={D,H,I,J,M};T1,T2和T3都是根A的子树，且本身也是一棵树。
 *
 * 树的结点包含一个数据元素及若干指向其子树的分支。结点拥有的子树数称为结点的度（Degree）。例如，（b）中A的度为3，C的度为1，F的度为0.度为0的结点称为叶子（Leaf）或者终端结点。度不为0的结点称为非终端结点或分支结点。树的度是树内各结点的度的最大值。（b）的树的度为3.结点的子树的根称为该结点的孩子（Child）。相应的，该结点称为孩子的双亲（Parent）。同一个双亲的孩子之间互称兄弟（Sibling）。结点的祖先是从根到该结点所经分支上的所有结点。反之，以某结点为根的子树中的任一结点都称为该结点的子孙。
 * 结点的层次（Level）从根开始定义起，根为第一层，跟的孩子为第二层。若某结点在第l层，则其子树的根就在第l+1层。其双亲在同一层的结点互为堂兄弟。例如，结点G与E，F,H,I,J互为堂兄弟。树中结点的最大层次称为树的深度（Depth）或高度。（b）的树的深度为4。
 *
 * 如果将树中结点的各子树看成从左至右是有次序的（即不能交换），则称该树为有序树，否则称为无序树。在有序树中最左边的子树的根称为第一个孩子，最右边的称为最后一个孩子。
 * 森林（Forest）是m（m>=0）棵互不相交的树的集合。对树中每个结点而言，其子树的集合即为森林。
 *
 *
 */

/**
 * 二叉树（Binary Tree）是另一种树型结构，它的特点是每个结点至多只有两棵子树（即二叉树中不存在度大于2的结点），并且，二叉树的子树有左右之分（其次序不能任意颠倒。）
 *
 * 二叉树的性质
 * 1.在二叉树的第i层上至多有2的i-1次方个结点(i>=1)。
 * 2.深度为k的二叉树至多有2的k次方-1个结点，(k>=1)。
 * 3.对任何一棵二叉树T，如果其终端结点数为n0，度为2的结点数为n2，则n0 = n2 + 1;
 *      一棵深度为k且有2的k次方-1个结点的二叉树称为满二叉树。
 *      深度为k的，有n个结点的二叉树，当且仅当其每一个结点都与深度为k的满二叉树中编号从1至n的结点一一对应时，称之为完全二叉树。
 * 下面是完全二叉树的两个特性
 * 4.具有n个结点的完全二叉树的深度为Math.floor(log 2 n) + 1
 * 5.如果对一棵有n个结点的完全二叉树（其深度为Math.floor(log 2 n) + 1）的结点按层序编号（从第1层到第Math.floor(2 n) + 1，每层从左到右），则对任一结点（1<=i<=n）有：
 *     (1)如果i=1，则结点i、是二叉树的根，无双亲；如果i>1，则其双亲parent(i)是结点Math.floor(i/2)。
 *     (2)如果2i > n，则结点i无左孩子（结点i为叶子结点）；否则其左孩子LChild(i)是结点2i.
 *     (3)如果2i + 1 > n，则结点i无右孩子；否则其右孩子RChild(i)是结点2i + 1;
 */

/*
 二叉树的存储结构

 1.顺序存储结构
 用一组连续的存储单元依次自上而下，自左至右存储完全二叉树上的结点元素，即将二叉树上编号为i的结点元素存储在加上定义的一维数组中下标为i-1的分量中。“0”表示不存在此结点。这种顺序存储结构仅适用于完全二叉树。
 因为，在最坏情况下，一个深度为k且只有k个结点的单支树（树中不存在度为2的结点）却需要长度为2的n次方-1的一维数组。

 2.链式存储结构
 二叉树的结点由一个数据元素和分别指向其左右子树的两个分支构成，则表示二叉树的链表中的结点至少包含三个域：数据域和左右指针域。有时，为了便于找到结点的双亲，则还可在结点结构中增加一个指向其双亲结点的指针域。利用这两种结构所得的二叉树的存储结构分别称之为二叉链表和三叉链表。
 在含有n个结点的二叉链表中有n+1个空链域，我们可以利用这些空链域存储其他有用信息，从而得到另一种链式存储结构---线索链表。

 先（根）序遍历：根左右
 中（根）序遍历：左根右
 后（根）序遍历：左右根

 */


// 顺序存储结构
(function () {
    // 顺序存储结构的遍历
    var tree = [1, 2, 3, 4, 5, , 6, , , 7];

    console.log('preOrder:');
    void function preOrderTraverse(x, visit) {
        visit(tree[x]);
        if (tree[2 * x + 1]) preOrderTraverse(2 * x + 1, visit);
        if (tree[2 * x + 2]) preOrderTraverse(2 * x + 2, visit);
    }(0, function (value) {
        console.log(value);
    });

    console.log('inOrder:');
    void function inOrderTraverse(x, visit) {
        if (tree[2 * x + 1]) inOrderTraverse(2 * x + 1, visit);
        visit(tree[x]);
        if (tree[2 * x + 2]) inOrderTraverse(2 * x + 2, visit);
    }(0, function (value) {
        console.log(value);
    });

    console.log('postOrder:');
    void function postOrderTraverse(x, visit) {
        if (tree[2 * x + 1]) postOrderTraverse(2 * x + 1, visit);
        if (tree[2 * x + 2]) postOrderTraverse(2 * x + 2, visit);
        visit(tree[x]);
    }(0, function (value) {
        console.log(value);
    });
}());

var Stack = require('../Stack/stack');
var Queue = require('../Queue/Queue').Queue;

// 链式存储结构
function BinaryTree(data, leftChild, rightChild) {
    this.data = data || null;
    // 左右孩子结点
    this.leftChild = leftChild || null;
    this.rightChild = rightChild || null;
}
exports.BinaryTree = BinaryTree;
BinaryTree.prototype = {
    constructor: BinaryTree,
    // 判断两棵树是否相似
    isSimilar: function isSimilar(tree) {
        return tree &&
            this.leftChild && isSimilar.call(this.leftChild, tree.leftChild) &&
            this.rightChild && isSimilar.call(this.rightChild, tree.rightChild);
    },
    createBinaryTree: function (tree) {
        void function preOrderTraverse(node, x, visit) {
            visit(node, tree[x]);

            if (tree[2 * x + 1]) preOrderTraverse(node.leftChild = new BinaryTree(), 2 * x + 1, visit);
            if (tree[2 * x + 2]) preOrderTraverse(node.rightChild = new BinaryTree(), 2 * x + 2, visit);
        }(this, 0, function (node, value) {
            node.data = value;
        });
    },

    // 线序遍历二叉树的非递归算法
    preOrder_stack: function (visit) {
        var stack = new Stack();
        stack.push(this);

        while (stack.top) {
            var p;
            // 向左走到尽头
            while ((p = stack.peek())) {
                p.data && visit(p.data);
                stack.push(p.leftChild);
            }

            stack.pop();

            if (stack.top) {
                p = stack.pop();
                stack.push(p.rightChild);
            }
        }
    },
    preOrder_stack2: function (visit) {
        var stack = new Stack();
        var p = this;

        while (p || stack.top) {
            if (p) {
                stack.push(p);
                p.data && visit(p.data);
                p = p.leftChild;
            } else {
                p = stack.pop();
                p = p.rightChild;
            }
        }
    },
    inOrder_stack1: function (visit) {
        var stack = new Stack();
        stack.push(this);

        while (stack.top) {
            var p;
            // 向左走到尽头
            while ((p = stack.peek())) {
                stack.push(p.leftChild);
            }

            stack.pop();

            if (stack.top) {
                p = stack.pop();
                p.data && visit(p.data);
                stack.push(p.rightChild);
            }
        }
    },
    inOrder_stack2: function (visit) {
        var stack = new Stack();
        var p = this;

        while (p || stack.top) {
            if (p) {
                stack.push(p);
                p = p.leftChild;
            } else {
                p = stack.pop();
                p.data && visit(p.data);
                p = p.rightChild;
            }
        }
    },
    // 为了区分两次过栈的不同处理方式，在堆栈中增加一个mark域，
    // mark=0表示刚刚访问此结点，mark=1表示左子树处理结束返回，
    // mark=2表示右子树处理结束返回。每次根据栈顶的mark域决定做何动作
    postOrder_stack: function (visit) {
        var stack = new Stack();
        stack.push([this, 0]);

        while (stack.top) {
            var a = stack.pop();
            var node = a[0];

            switch (a[1]) {
                case 0:
                    stack.push([node, 1]);  // 修改mark域
                    if (node.leftChild) stack.push([node.leftChild, 0]);  // 访问左子树
                    break;
                case 1:
                    stack.push([node, 2]);
                    if (node.rightChild) stack.push([node.rightChild, 0]);
                    break;
                case 2:
                    node.data && visit(node.data);
                    break;
                default:
                    break;
            }
        }
    },

    preOrderTraverse: function preOrderTraverse(visit) {
        visit(this.data);
        if (this.leftChild) preOrderTraverse.call(this.leftChild, visit);
        if (this.rightChild) preOrderTraverse.call(this.rightChild, visit);
    },
    inPrderTraverse: function inPrderTraverse(visit) {
        if (this.leftChild) inPrderTraverse.call(this.leftChild, visit);
        visit(this.data);
        if (this.rightChild) inPrderTraverse.call(this.rightChild, visit);
    },
    postOrderTraverse: function postOrderTraverse(visit) {
        if (this.leftChild) postOrderTraverse.call(this.leftChild, visit);
        if (this.rightChild) postOrderTraverse.call(this.rightChild, visit);
        visit(this.data);
    },

    levelOrderTraverse: function (visit) {
        var queue = new Queue();
        queue.enQueue(this);

        while (queue.rear) {
            var p = queue.deQueue();
            p.data && visit(p.data);
            p.leftChild && queue.enQueue(p.leftChild);
            p.rightChild && queue.enQueue(p.rightChild);
        }
    },
    // 求先序序列为k的结点的值
    getPreSequence: function (k) {
        var count = 0;

        void function recurse(node) {
            if (node) {
                if (++count === k) {
                    console.log('Value is: ' + node.data);
                } else {
                    recurse(node.leftChild);
                    recurse(node.rightChild);
                }
            }
        }(this);
    },
    // 求二叉树中叶子结点的数目
    countLeaves: function () {
        return function recurse(node) {
            if (!node) return 0;
            else if (!node.leftChild && !node.rightChild) return 1;
            else return recurse(node.leftChild) + recurse(node.rightChild);
        }(this);
    },
    // 交换所有结点的左右子树
    revoluteBinaryTree: function revoluteBinaryTree() {
        var temp = this.leftChild;
        this.leftChild = this.rightChild;
        this.rightChild = temp;

        if (this.leftChild) revoluteBinaryTree.call(this.leftChild);
        if (this.rightChild) revoluteBinaryTree.call(this.rightChild);
    },
    // 求二叉树中以值为x的结点为根的子树深度
    getSubDepth: function getSubDepth(x) {
        if (this.data === x) {
            console.log('subDepth: ' + this.getDepth());
        } else {
            if (this.leftChild) getSubDepth.call(this.leftChild, x);
            if (this.rightChild) getSubDepth.call(this.rightChild, x);
        }
    },
    getDepth: function getDepth() {
        if (this === global) return 0;
        else {
            var m = getDepth.call(this.leftChild);
            var n = getDepth.call(this.rightChild);
            return (m > n ? m : n) + 1;
        }
    },
    // 删除所有以元素x为根的子树
    delSubX: function delSubX(x) {
        if (this.data === x) {
            this.leftChild = null;
            this.rightChild = null;
        } else {
            if (this.leftChild) delSubX.call(this.leftChild);
            if (this.rightChild) delSubX.call(this.rightChild);
        }
    },
    // 非递归复制二叉树
    copyBinaryTree_stack: function () {
        // 用来存放本体结点的栈
        var stack1 = new Stack();
        // 用来存放新二叉树结点的栈
        var stack2 = new Stack();
        stack1.push(this);
        var newTree = new BinaryTree();
        var q = newTree;
        stack2.push(newTree);
        var p;

        while (stack1.top) {
            // 向左走到尽头
            while ((p = stack1.peek())) {
                if (p.leftChild) q.leftChild = new BinaryTree();
                q = q.leftChild;
                stack1.push(p.leftChild);
                stack2.push(q);
            }

            p = stack1.pop();
            q = stack2.pop();

            if (stack1.top) {
                p = stack1.pop();
                q = stack2.pop();
                if (p.rightChild) q.rightChild = new BinaryTree();
                q.data = p.data;
                q = q.rightChild;
                stack1.push(p.rightChild);  // 向右一步
                stack2.push(q);
            }
        }

        return newTree;
    },
    // 求二叉树中结点p和q的最近祖先
    findNearAncient: function (pNode, qNode) {
        var pathP = [];
        var pathQ = [];
        findPath(this, pNode, pathP, 0);
        findPath(this, qNode, pathQ, 0);

        for (var i = 0; pathP[i] == pathQ[i] && pathP[i]; i++);
        return pathP[--i];
    },
    toString: function () {
    },
    // 求一棵二叉树的繁茂度
    lushDegree: function () {
        var countArr = [];
        var queue = new Queue();
        queue.enQueue({
            node: this,
            layer: 0
        });
        // 利用层序遍历来统计各层的结点数
        var r;
        while (queue.rear) {
            r = queue.deQueue();
            countArr[r.layer] = (countArr[r.layer] || 0) + 1;

            if (r.node.leftChild)
                queue.enQueue({
                    node: r.node.leftChild,
                    layer: r.layer + 1
                });
            if (r.node.rightChild)
                queue.enQueue({
                    node: r.node.rightChild,
                    layer: r.layer + 1
                });
        }

        // 最后一个队列元素所在层就是树的高度
        var height = r.layer;
        for (var max = countArr[0], i = 1; countArr[i]; i++)
            // 求层最大结点数
            if (countArr[i] > max) max = countArr[i];

        return height * max;
    },
    // 求深度等于书的高度减一的最靠左的结点
    printPath_maxDepthS1: function () {
        var maxh = this.getDepth();
        var path = [];

        if (maxh < 2) return false;
        find_h(this, 1);

        function find_h(tree, h) {
            path[h] = tree;

            if (h == maxh - 1) {
                var s = ' ';
                for (var i = 1; path[i]; i++) s += path[i].data + (path[i + 1] ? ' -> ' : '');
                console.log(s);
                return;
            } else {
                if (tree.leftChild) find_h(tree.leftChild, h + 1);
                if (tree.rightChild) find_h(tree.rightChild, h + 1);
            }

            path[h] = null;
        }
    },
    // 求树结点的子孙总数填入descNum域中，并返回
    descNum: function () {
        return  function recurse(node) {
            var d;
            if (!node) return -1;
            else d = recurse(node.leftChild) + recurse(node.rightChild) + 2;

            node.descNum = d;

            return d;
        }(this);
    }
};

// 判断二叉树是否完全二叉树
BinaryTree.isFullBinaryTree = function (tree) {
    var queue = new Queue();
    var flag = 0;
    queue.enQueue(tree);

    while (queue.rear) {
        var p = queue.deQueue();

        if (!p) flag = 1;
        else if (flag) return false;
        else {
            queue.enQueue(p.leftChild);
            queue.enQueue(p.rightChild);
        }
    }

    return true;
};

// 求从tree到node结点路径的递归算法
function findPath(tree, node, path, i) {
    var found = false;

    void function recurse(tree, i) {
        if (tree == node) {
            found = true;
            return;
        }

        path[i] = tree;
        if (tree.leftChild) recurse(tree.leftChild, i + 1);
        if (tree.rightChild && !found) recurse(tree.rightChild, i + 1);
        if (!found) path[i] = null;
    }(tree, i);
}

var global = Function('return this;')();

void function test() {
    var tree = [1, 2, 3, 4, 5, , 6, , , 7];
    var test = new BinaryTree;
    test.createBinaryTree(tree);
    test.preOrderTraverse(function (value) {
        console.log('preOrder: ' + value);
    });
    test.inPrderTraverse(function (value) {
        console.log('inOrder: ' + value);
    });
    test.postOrderTraverse(function (value) {
        console.log('postOrder: ' + value);
    });
    test.preOrder_stack(function (data) {
        console.log('preOrderNonRecusive: ' + data);
    });
    test.preOrder_stack2(function (data) {
        console.log('preOrder_stack2: ' + data);
    });
    test.inOrder_stack1(function (value) {
        console.log('inOrder_stack1: ' + value);
    });
    test.inOrder_stack2(function (value) {
        console.log('inOrder_stack2: ' + value);
    });
    test.postOrder_stack(function (value) {
        console.log('postOrder_stack: ' + value);
    });
    test.getPreSequence(5);
    console.log(test.countLeaves());
    test.getSubDepth(6);    // 1
    test.getSubDepth(2);    // 3
    test.levelOrderTraverse(function (value) {
        console.log('levelOrderTraverse: ' + value);
    });

    var newTree = test.copyBinaryTree_stack();

    var node1 = test.leftChild.leftChild;   // 4
    var node2 = test.leftChild.rightChild.leftChild;    // 7
    var ancient = test.findNearAncient(node1, node2);
    console.log(ancient);

    console.log('expect false: ' + BinaryTree.isFullBinaryTree(test));
    newTree.rightChild.leftChild = new BinaryTree(7);
    newTree.leftChild.rightChild.leftChild = null;
    console.log('expect true: ' + BinaryTree.isFullBinaryTree(newTree));
    console.log('lush degree: ' + test.lushDegree());

    test.printPath_maxDepthS1();
    console.log(test.descNum());
}();


// 有mark域和双亲指针域的二叉树结点类型
function EBTNode() {
    this.data = null;
    this.leftChild = null;
    this.rightChild = null;
    this.parent = null;
    this.mark = 0;
}
exports.EBTNode = EBTNode;
EBTNode.prototype = {
    constructor: EBTNode,
    postOrder_nonrecursive_nonstack: function (visit) {
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
};

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

function BinaryThreadTree_inOrder(data, leftChild, rightChild) {
    this.data = data;
    this.leftChild = leftChild || null;
    this.rightChild = rightChild || null;
    // 左右标记
    this.leftTag = this.rightTag = undefined;
}
BinaryThreadTree_inOrder.prototype = {
    constructor: BinaryThreadTree_inOrder,
    inOrderTraverse_thread: function (visit) {
        var p = this.leftChild;

        while (p != this) {
            while (p.leftTag === LINK) p = p.leftChild;

            if (visit(p.data) === false) return;

            while (p.rightTag == THREAD && p.rightChild != this) {
                p = p.rightChild;
                visit(p.data);
            }
            p = p.rightChild;
        }
    },
    inOrderThreading: function () {
        return inOrderThreading(this);
    },
    // 在当前结点插入子树x，p代表当前结点
    insertSubTree: function (xTree) {
        var s, q;
        // x作为p的左子树
        if (this.leftTag === THREAD) {
            s = this.leftChild; // s为p的前驱
            this.leftTag = LINK;
            this.leftChild = xTree;
            q = xTree;

            while (q.leftChild && q.leftTag === LINK) q = q.leftChild;
            // 找到子树中的最左结点，并修改其前驱指向s
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

            while (q.leftChild && q.leftTag === LINK) q = q.leftChild;
            // 找到子树中的最左结点，并修改其前驱指向p
            q.leftChild = this;
            xTree.rightTag = THREAD;
            // x的后继指向p的后继
            xTree.rightChild = s;
        }
        // x作为p的左子树，p的左子树作为x的右子树
        else {
            s = this.leftChild;
            var t = s;

            while (t.leftChild && t.leftTag === LINK) t = t.leftChild;
            // 找到p的左子树的最左结点t和前驱u
            var u = t.leftChild;
            this.leftChild = xTree;
            xTree.rightTag = LINK;
            // x作为p的左子树，p的左子树作为x的右子树
            xTree.rightChild = s;
            t.leftChild = xTree;
            q = xTree;

            while (q.leftChild && q.leftTag === LINK) q = q.leftChild;
            // 找到子树中的最左结点，并修改其前驱指向u
            q.leftChild = u;
        }
    }
};

// 二叉树中序线索化
function inOrderThreading(tree) {
    var threadTree = new BinaryThreadTree();
    threadTree.leftTag = LINK;
    threadTree.rightTag = THREAD;
    // 右指针回指
    threadTree.rightChild = threadTree;

    var pre;
    // 若二叉树为空，左指针回指
    if (!tree) threadTree.leftChild = threadTree;
    else {
        threadTree.leftChild = tree;
        pre = threadTree;
        inThreading(tree);  // 中序遍历进行中序线索化
        // 最后一个结点线索化
        pre.rightChild = threadTree;
        pre.rightTag = THREAD;
        threadTree.rightChild = pre;
    }

    return threadTree;

    function inThreading(p) {
        if (!p) return;

        inThreading(p.leftChild);   // 左子树线索化
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
        inThreading(p.rightChild);  // 右子树线索化
    }
}

// 在先序后继线索二叉树中查找结点p的先序后继
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
            if (q.leftChild) q = q.leftChild;
            else q = q.rightChild;
        }

        return q;
    }
}

/**
 * 树的3种常用链表结构
 */

    // 1.双亲表示法
    // 优点：parent(tree, x)操作可以在常量时间内实现
    // 缺点：求结点的孩子时需要遍历整个结构
function ParentTree() {
    this.nodes = [];
}
ParentTree.prototype = {
    constructor: ParentTree,
    getDepth: function () {
        var maxDepth = 0;

        for (var i = 0; i < this.nodes.length; i++) {
            var dep = 0;
            for (var j = i; j >= 0; j = this.nodes[i].parent) dep++;
            if (dep > maxDepth) maxDepth = dep;
        }

        return maxDepth;
    }
};
function ParentTreeNode(data, parent) {
    // type: ParentTree
    this.data = data || null;
    // 双亲位置域 {Number}
    this.parent = parent || 0;
}
var pt = new ParentTree();
pt.nodes.push(new ParentTreeNode('R', -1));
pt.nodes.push(new ParentTreeNode('A', 0));
pt.nodes.push(new ParentTreeNode('B', 0));
pt.nodes.push(new ParentTreeNode('C', 0));
pt.nodes.push(new ParentTreeNode('D', 1));
pt.nodes.push(new ParentTreeNode('E', 1));
pt.nodes.push(new ParentTreeNode('F', 3));
pt.nodes.push(new ParentTreeNode('G', 6));
pt.nodes.push(new ParentTreeNode('H', 6));
pt.nodes.push(new ParentTreeNode('I', 6));


// 孩子表示法

function ChildTree() {
    this.nodes = [];
}
ChildTree.prototype = {
    constructor: ChildTree,
    getDepth: function () {
        var self = this;
        return function subDepth(rootIndex) {
            if (!self.nodes[rootIndex]) return 1;

            for (var sd = 1, p = self.nodes[rootIndex]; p; p = p.next) {
                var d = subDepth(p.child);
                if (d > sd) sd = d;
            }

            return sd + 1;
        }(this.data[0]);
    }
};
/**
 *
 * @param {*} data
 * @param {ChildTreeNode} firstChild 孩子链表头指针
 * @constructor
 */
function ChildTreeBox(data, firstChild) {
    this.data = data;
    this.firstChild = firstChild;
}
/**
 * 孩子结点
 *
 * @param {Number} child
 * @param {ChildTreeNode} next
 * @constructor
 */
function ChildTreeNode(child, next) {
    this.child = child;
    this.next = next;
}

/*
孩子表示法便于涉及孩子的操作的实现，但不适用于parent操作。
我们可以把双亲表示法和孩子表示法结合起来。
 */


// 孩子兄弟表示法(二叉树表示法)
// 可增设一个parent域实现parent操作
function ChildSiblingTree(data) {
    this.data = data || null;
    this.firstChild = null;
    this.nextSibling = null;
}
ChildSiblingTree.prototype = {
    // 输出孩子兄弟链表表示的树的各边
    print: function print() {
        for (var child = this.firstChild; child; child = child.nextSibling) {
            console.log('%c %c', this.data, child.data);
            print.call(child);
        }
    },
    // 求孩子兄弟链表表示的树的叶子数目
    leafCount: function leafCount() {
        if (!this.firstChild) return 1;
        else {
            var count = 0;
            for (var child = this.firstChild; child; child = child.nextSibling) {
                count += leafCount.call(child);
            }
            return count;
        }
    },
    // 求树的度
    getDegree: function getDegree() {
        if (!this.firstChild) return 0;
        else {
            var degree = 0;
            for (var p = this.firstChild; p; p = p.nextSibling) degree++;

            for (p = this.firstChild; p; p = p.nextSibling) {
                var d = getDegree.call(p);
                if (d > degree) degree = d;
            }

            return degree;
        }
    },
    getDepth: function getDepth() {
        if (this === global) return 0;
        else {
            for (var maxd = 0, p = this.firstChild; p; p = p.nextSibling) {
                var d = getDepth.call(p);
                if (d > maxd) maxd = d;
            }

            return maxd + 1;
        }
    }
};


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


/**
 * 赫夫曼（Huffman）树，又称最优树，是一类带权路径长度最短的树，有着广泛应用。
 *
 * 从树中一个结点到另一个结点之间的分支构成这两个结点之间的路径，路径上的分支数目称作路径长度。
 * 树的路径长度是从树根到每一个结点的路径之和。
 * 结点的带权路径长度为从该结点到树根之间的路径长度与结点上权的乘积。树的带权路径长度为树中所有叶子结点的带权路径长度之和。
 *
 * 构造赫夫曼树的步骤：
 * （1）根据给定的n个权值{w1,w2,...wn}构成n棵二叉树的集合F = {T1,T2,...Tn}，其中每棵二叉树Ti中只有一个带权为wi的根结点，其左右子树均空。
 * （2）在F中选取两棵根结点的权值最小的树作为左右子树构造一棵新的二叉树，且置新的二叉树的根结点的权值为其左右子树上根结点的权值之和。
 * （3）在F中删除这两棵树，同时将新得到的二叉树加入F中。
 * （4）重复（2）和（3），直到F只含一棵树为止。这棵树便是赫夫曼树。
 */
/*
赫夫曼编码
http://zh.wikipedia.org/wiki/%E9%9C%8D%E5%A4%AB%E6%9B%BC%E7%BC%96%E7%A0%81

假设电报需传送的电文为“A B A C C D A”，它只有4种字符只需两个字符串便可分辨。假设A,B,C,D的编码分别为00,01,10和11，则上述7个字符的电文便为“00010010101100”，对方接收时，可按二位一分进行译码。
在传送电文时，希望总长尽可能地短。如果对每个字符设计长度不等的编码，且让电文中出现次数较多的字符采用尽可能短的编码，则传送电文的总长便可减少。
如果涉及A,B,C,D的编码分别为0,00,1和01，则上述7个字符的电文可转换成总长为9的字符串“000011010”。但是，这样的电文无法翻译，因为可有多种译法。
因此，若要设计长短不等的编码，则必须是任意个字符的编码都不是另一个字符编码的前缀，这种编码称作前缀编码。
可利用二叉树来设计二进制的前缀编码。假设有一棵二叉树，其4个叶子结点分别表示A,B,C,D这4个字符，且约定左分支表示字符“0”，右分支表示字符“1”，则可以从根结点到叶子结点的路径上分支字符组成的字符串作为该叶子结点字符的编码。所得二进制前缀编码分别为0,10,110,111.
设计电文总长最短的二进制前缀编码即以n种字符出现的频率作权。
 */

// 赫夫曼树和赫夫曼编码的存储结构
function HuffmanNode(weight, parent, leftChild, rightChild) {
    this.weight = weight || 0;
    this.parent = parent || 0;
    this.leftChild = leftChild || 0;
    this.rightChild = rightChild || 0;
}
function huffManCoding(weights) {
    var n = weights.length;
    if (n < 1) return;

    var huffmanTree = buildHuffmanTree(weights, n);

    // 从叶子到根逆向求每个字符的赫夫曼编码
    var hc = calcHuffmanCode(huffmanTree, n);

    return [huffmanTree, hc];
}

function huffManCoding2(weights) {
    var n = weights.length;
    if (n < 1) return;

    var huffmanTree = buildHuffmanTree(weights, n);

    // 从叶子到根逆向求每个字符的赫夫曼编码
    var hc = calcHuffmanCode2(huffmanTree, n);

    return [huffmanTree, hc];
}

function calcHuffmanCode(huffmanTree, n) {
    // 从叶子到根逆向求每个字符的赫夫曼编码
    var hc = [];
    var cd = [];
    for (var i = 0; i < n; i++) {
        var start = n - 1;
        for (var c = i, f = huffmanTree[i].parent; f != 0; c = f, f = huffmanTree[f].parent) {
            if (huffmanTree[f].leftChild == c) cd[--start] = '0';
            else cd[--start] = '1';
        }

        hc[i] = strCopy(cd, start);
    }

    return hc;
}

// 无栈非递归遍历赫夫曼树
// todo 该算法有问题
function calcHuffmanCode2(huffmanTree, n) {
    var p = 2 * n - 2;
    var hc = [];
    var cd = [];
    var cdLen = 0;

    // 遍历赫夫曼树时用作结点状态标识
    for (var i = 0; i <= p; i++) huffmanTree[i].weight = 0;

    while (p) {
        // 向左
        if (huffmanTree[p].weight == 0) {
            huffmanTree[p].weight = 1;
            if (huffmanTree[p].leftChild != 0) {
                p = huffmanTree[p].leftChild;
                cd[cdLen++] = '0';
            }
            // 登记叶子结点的字符的编码
            else if (huffmanTree[p].rightChild == 0) {
                hc[p - 1] = cd.join('');
            }
        }
        // 向右
        else if (huffmanTree[p].weight == 1) {
            huffmanTree[p].weight = 2;
            if (huffmanTree[p].rightChild != 0) {
                p = huffmanTree[p].rightChild;
                cd[cdLen++] = '1';
            }
        }
        // huffmanTree[p].weight == 2，退回
        // 退到父节点，编码长度减一
        else {
            huffmanTree[p].weight = 0;
            p = huffmanTree[p].parent;
            --cdLen;
        }
    }

    return hc;
}

function buildHuffmanTree(weights, n) {
    n = n || weights.length;
    var m = 2 * n - 1;
    var huffmanTree = [];

    for (var i = 0; i < n; i++)
        huffmanTree[i] = new HuffmanNode(weights[i], 0, 0, 0);
    for (; i < m; i++)
        huffmanTree[i] = new HuffmanNode(0, 0, 0, 0);

    for (i = n; i < m; i++) {
        // 在HT[1..i-1]选择parent为0且weight最小的两个结点，返回其序号为[s1, s2]
        var ret = select(huffmanTree, i);
        var s1 = ret[0];
        var s2 = ret[1];
        huffmanTree[s1].parent = i;
        huffmanTree[s2].parent = i;
        huffmanTree[i].leftChild = s1;
        huffmanTree[i].rightChild = s2;
        huffmanTree[i].weight = huffmanTree[s1].weight + huffmanTree[s2].weight;
    }

    return huffmanTree;
}

function strCopy(str, start) {
    var s = '';
    for (; str[start]; start++) {
        s += str[start];
    }
    return s;
}

function select(huffmanTree, len) {
    var ret = [];
    for (var i = 0; i < len; i++) {
        var node = huffmanTree[i];
        if (node.parent !== 0) continue;

        if (ret.length < 2) {
            ret.push(i);
        } else {
            var index = huffmanTree[ret[0]].weight > huffmanTree[ret[1]].weight
                ? 0 : 1;

            if (node.weight < huffmanTree[ret[index]].weight)
                ret[index] = i;
        }
    }

    if (ret[0] > ret[1]) {
        var temp = ret[0];
        ret[0] = ret[1];
        ret[1] = temp;
    }

    return ret;
}

console.log('-------huffman coding 1:------');
console.log(huffManCoding([5, 29, 7, 8, 14, 23, 3, 11]));

console.log('\n-------huffman coding 2:------');
console.log(huffManCoding2([5, 29, 7, 8, 14, 23, 3, 11]));

/*
回溯法与树的遍历

在程序设计中，有相当一类求一组解，或求全部解或求最优解的问题，例如八皇后问题等，不是根据某种确定的计算法则，而是利用试探和回溯（backtracking）的搜索技术求解。回溯法也是设计递归过程的一种重要方法，它的求解过程实质上是一个选序遍历一棵“状态树”的过程，只是这棵树不是遍历前预先建立的，而是隐含在遍历过程中。

求含n个元素的集合的幂集。
集合A的幂集是由集合A的所有子集所组成的集合。如：A = {1,2,3}，则A的幂集p(A) = {{1,2,3}, {1,2}, {1,3}, {1}, {2,3}, {2}, {2}, 空集}
求幂集p(A)的元素的过程可看成是依次对集合A中元素进行“取”或“舍”的过程，并且可用一棵二叉树来表示过程中幂集元素的状态变化状况。
树中根结点表示幂集元素的初始状态（为空集）；
叶子结点表示它的终结状态；
而第i(i=2,3,...,n-1)层的分支结点，则表示已对集合A中前i-1个元素进行了取/舍处理的当前状态（左分支表示“取”，右分支表示“舍”）。
 */

// 求含集合aList的幂集
// 进入函数时已对A中前i-1个元素做了取舍处理
function getPowerSet(i, aList) {
    var bList = [];

    void function recurse(i, aList) {
        if (i > aList.length - 1) console.log('set: ' + bList);
        else {
            var x = aList[i];
            bList.push(x);
            recurse(i + 1, aList);
            bList.pop();
            recurse(i + 1, aList);
        }
    }(i, aList);

    return bList;
}

console.log('getPowerSet:');
var list = [1, 2, 3];
console.log('list: ' + getPowerSet(0, list));


// 求n皇后问题的所有合法布局
function Queen(n) {
    var board = [];

    this.init = function(){
        for(var i = 0; i < n; i++){
            board[i] = [];
            for(var j = 0; j < n; j++){
                board[i][j] = 0;
            }
        }
    };

    this.init();

    this.printCurrentLayout = function () {
        console.log(board);
    };

    this.addPoint = function (i, j) {
        console.log(i);
        if(board[i][j] === 0){
            board[i][j] = 1;
            return true;
        } else {
            console.log('already occupated!');
            return false;
        }
    };

    this.isCurrentLayoutLegal = function (i, j) {
        return checkHorizontal(i, j) && checkVertical(i, j) && checkLeftTop2RightBottom(i, j) && checkRightTop2LeftBottom(i, j);
    };

    function checkHorizontal(x, y){
        for(var i = 0; i < y; i++){
            if(board[x][i] === 1) return false;
        }
        for(i = y + 1; i < n; i++){
            if(board[x][i] === 1) return false;
        }
        return true;
    }

    function checkVertical(x, y){
        for(var i = 0; i < x; i++){
            if(board[i][y] === 1) return false;
        }
        for(i = x + 1; i < n; i++){
            if(board[i][y] === 1) return false;
        }
        return true;
    }

    function checkLeftTop2RightBottom(x, y){
        for(var i = 1; x - i >= 0 && y - i >= 0; i++){
            if(board[x - i][y - i] === 1) return false;
        }
        for(i = 1; x + i < n && y + i < n; i++){
            if(board[x + i][y + i] === 1) return false;
        }
        return true;
    }

    function checkRightTop2LeftBottom(x, y){
        for(var i = 1; x - i >= 0 && y + i < n; i++){
            if(board[x - i][y + i] === 1) return false;
        }
        for(i = 1; x + i < n && y - i >= 0; i++){
            if(board[x + i][y - i] === 1) return false;
        }
        return true;
    }

    this.removePoint = function (i, j) {
        if(board[i][j] === 1){
            board[i][j] = 0;
        }
    };

    var me = this;
    this.trial = function trial(i) {
        i = i || 0;
        if (i > n - 1) {
            me.printCurrentLayout();
        } else {
            for (var j = 0; j < n; j++) {
                if(me.addPoint(i, j)){
                    if (me.isCurrentLayoutLegal(i, j)) trial(i + 1);
                    me.removePoint(i, j);
                }
            }
        }
    };
}

var test = new Queen(4);
test.trial();

/*
含有n个结点的不相似的二叉树有1/(n+1)*C(n)(2n)棵
 */
