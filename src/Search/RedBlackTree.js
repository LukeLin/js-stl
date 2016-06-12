/**
 * Red Black Tree
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

经过上面情况3、情况4、情况5等3种插入修复情况的操作示意图，读者自会发现，后面的情况4、情况5都是针对情况3插入节点4以后，进行的一系列插入修复情况操作，不过，指向当前节点N指针一直在变化。所以，你可以想当然的认为：整个下来，情况3、4、5就是一个完整的插入修复情况的操作流程


红黑树的删除

在删除节点后，原红黑树的性质可能被改变，如果删除的是红色节点，那么原红黑树的性质依旧保持，此时不用做修正操作，如果删除的节点是黑色节点，原红黑树的性质可能会被改变，我们要对其做修正操作。那么哪些树的性质会发生变化呢，如果删除节点不是树唯一节点，那么删除节点的那一个支的到各叶节点的黑色节点数会发生变化，此时性质5被破坏。如果被删节点的唯一非空子节点是红色，而被删节点的父节点也是红色，那么性质4被破坏。如果被删节点是根节点，而它的唯一非空子节点是红色，则删除后新根节点将变成红色，违背性质2。

上面的修复情况看起来有些复杂，下面我们用一个分析技巧：我们从被删节点后来顶替它的那个节点开始调整，并认为它有额外的一重黑色。这里额外一重黑色是什么意思呢，我们不是把红黑树的节点加上除红与黑的另一种颜色，这里只是一种假设，我们认为我们当前指向它，因此空有额外一种黑色，可以认为它的黑色是从它的父节点被删除后继承给它的，它现在可以容纳两种颜色，如果它原来是红色，那么现在是红+黑，如果原来是黑色，那么它现在的颜色是黑+黑。有了这重额外的黑色，原红黑树性质5就能保持不变。现在只要恢复其它性质就可以了，做法还是尽量向根移动和穷举所有可能性。

 如果是以下情况，恢复比较简单：
 a)当前节点是红+黑色
 解法，直接把当前节点染成黑色，结束此时红黑树性质全部恢复。
 b)当前节点是黑+黑且是根节点， 解法：什么都不做，结束。

 但如果是以下情况呢？：
 删除修复情况1：当前节点是黑+黑且兄弟节点为红色(此时父节点和兄弟节点的子节点分为黑)
 删除修复情况2：当前节点是黑加黑且兄弟是黑色且兄弟节点的两个子节点全为黑色
 删除修复情况3：当前节点颜色是黑+黑，兄弟节点是黑色，兄弟的左子是红色，右子是黑色
 删除修复情况4：当前节点颜色是黑-黑色，它的兄弟节点是黑色，但是兄弟节点的右子是红色，兄弟节点左子的颜色任意
 此时，我们需要调用RB-DELETE-FIXUP(T, x)，来恢复与保持红黑性质的工作。

 下面，咱们便来分别处理这4种删除修复情况。

 删除修复情况1：当前节点是黑+黑且兄弟节点为红色(此时父节点和兄弟节点的子节点分为黑)。
 解法：把父节点染成红色，把兄弟结点染成黑色，之后重新进入算法（我们只讨论当前节点是其父节点左孩子时的情况）。此变换后原红黑树性质5不变，而把问题转化为兄弟节点为黑色的情况(注：变化前，原本就未违反性质5，只是为了把问题转化为兄弟节点为黑色的情况)。

 删除修复情况2：当前节点是黑加黑且兄弟是黑色且兄弟节点的两个子节点全为黑色。
 解法：把当前节点和兄弟节点中抽取一重黑色追加到父节点上，把父节点当成新的当前节点，重新进入算法。（此变换后性质5不变）

 删除修复情况3：当前节点颜色是黑+黑，兄弟节点是黑色，兄弟的左子是红色，右子是黑色。
 解法：把兄弟结点染红，兄弟左子节点染黑，之后再在兄弟节点为支点解右旋，之后重新进入算法。此是把当前的情况转化为情况4，而性质5得以保持

 删除修复情况4：当前节点颜色是黑-黑色，它的兄弟节点是黑色，但是兄弟节点的右子是红色，兄弟节点左子的颜色任意。
 解法：把兄弟节点染成当前节点父节点的颜色，把当前节点父节点染成黑色，兄弟节点右子染成黑色，之后以当前节点的父节点为支点进行左旋，此时算法结束，红黑树所有性质调整正确


 最后值得一提的是上述删除修复的情况1~4都只是树的局部，并非树的整体全部，且删除修复情况3、4在经过上面的调整后，调整还没结束,还得继续调整直至重新恢复平衡
*/
import BSTNode from './BinarySortedTree';

const RED = 'red';
const BLACK = 'black';

class RedBlackNode extends BSTNode {
    constructor(data = null, ...rest){
        super(data, ...rest);

        this.leftChild = null;
        this.rightChild = null;
        this.parent = null;

        this.color = RED;
        this.data = data;
    }
}

class RedBlackLeaf {
    constructor(){
        this.color = BLACK;
        this.leftChild = this;
        this.rightChild = this;
    }
}

export default class RedBlackTree {
    constructor(){
        // 哨兵
        this.nil = new RedBlackLeaf();
        this.root = this.nil;
    }

    /**
     * 红黑树的递归查找算法
     * @param data
     */
    find(data){
        let z = this.root;
        let me = this;

        return (function find(z, data){
            if(z == me.nil || data === z.data) return z;

            if(data < z.data) return find(z.leftChild, data);
            else return find(z.rightChild, data);
        })(z, data);
    }

    /**
     * 红黑树的插入
     * @param {*} data
     */
    add(data){
        let z = new RedBlackNode(data);
        z.leftChild = this.nil;
        z.rightChild = this.nil;
        let y = this.nil;
        let x = this.root;

        // 找到要插入位置的结点y
        while(x != this.nil){
            y = x;

            if(z.data < x.data) x = x.leftChild;
            else x = x.rightChild;
        }

        z.parent = y;

        // 如果y不是根结点，根据大小插入到左或右子树
        if(y != this.nil) {
            if(z.data < y.data) y.leftChild = z;
            else y.rightChild = z;
        }
        // 否则插入到根结点
        else this.root = z == this.nil ? null : z;

        // 插入修复操作
        this._addFixup(z);
    }

    /**
     * 插入算法修复
     * @param {RedBlackNode} z 待插入的结点
     * @private
     */
    _addFixup(z){

        while(z != this.root && z.parent.color === RED){
            if(z.parent == z.parent.parent.leftChild)
                leftAddFixup(this, z);
            else
                rightAddFixup(this, z);
        }

        // 最后，把根结点涂为黑色，整棵红黑树便重新恢复了平衡
        this.root.color = BLACK;
    }

    /**
     * 红黑树的删除算法
     * @param {RedBlackNode} z 待删除结点
     */
    removeNode(z){
        let x, y;

        // 找到待删除结点的父结点或相邻待替换结点
        if(z.leftChild == this.nil || z.rightChild == this.nil)
            y = z;
        else
            y = this.successor(z);

        if(y.leftChild != this.nil) x = y.leftChild;
        else x = y.rightChild;

        x.parent = y.parent;

        // 删除操作
        if(y.parent == this.nil) this.root = x;
        else if(y == y.parent.leftChild) y.parent.leftChild = x;
        else y.parent.rightChild = x;

        if(y != z) z.data = y.data;

        // 删除修复
        if(y.color === BLACK) this._removeFixup(x);
    }

    // 算法导论上的删除结点
    removeNode2(z){
        let y = z;
        let originalYColor = y.color;
        let x;

        if(z.leftChild == this.nil) {
            x = z.rightChild;
            this._transplant(z, z.rightChild);
        } else if(z.rightChild == this.nil) {
            x = z.leftChild;
            this._transplant(z, z.leftChild);
        } else {
            y = this.min(z.rightChild);
            originalYColor = y.color;
            x = y.rightChild;

            if(y.parent == z) x.parent = y;
            else {
                this._transplant(y, y.rightChild);
                y.rightChild = z.rightChild;
                y.rightChild.parent = y;
            }

            this._transplant(z, y);
            y.leftChild = z.leftChild;
            y.leftChild.parent = y;
            y.color = z.color;
        }

        if(originalYColor === BLACK) this._removeFixup(x);
    }

    _transplant(u, v){
        if(u.parent == this.nil) this.root = v;
        else if(u == u.parent.leftChild) u.parent.leftChild = v;
        else u.parent.rightChild = v;

        v.parent = u.parent;
    }

    /**
     * 删除修复
     * @param {RedBlackNode} z
     * @private
     */
    _removeFixup(z){
        while(z !== this.root && z.color === BLACK){
            if(z == z.parent.leftChild)
                leftRemoveFixup(this, z);
            else
                rightRemoveFixup(this, z);
        }

        z.color = BLACK;
    }

    successor(z){
        if(z.rightChild != this.nil) return this.min(z.rightChild);

        let y = z.parent;

        while(y != this.nil && z == y.rightChild){
            z = y;
            y = y.parent;
        }

        return y;
    }

    min(z){
        while(z.leftChild != this.nil){
            z = z.leftChild;
        }

        return z;
    }

    /**
     * 根据key值删除结点
     * @param {*} key
     * @returns {*}
     */
    remove(key){
        let z = this.find(key);

        if(z == this.nil) return false;

        return this.removeNode(z);
    }
}

RedBlackTree.prototype._rotateLeft = rotate('left');
RedBlackTree.prototype._rotateRight = rotate('right');

function rotate(dir){
    let c1, c2;
    if( dir === 'left') {
        c1 = 'rightChild';
        c2 = 'leftChild';
    } else {
        c1 = 'leftChild';
        c2 = 'rightChild';
    }

    return function(x){
        let y = x[c1];
        x[c1] = y[c2];

        if(y[c2] != this.nil) y[c2].parent = x;
        y.parent = x.parent;

        if(x.parent == this.nil) this.root = y;
        else if(x == x.parent[c2]) x.parent[c2] = y;
        else x.parent[c1] = y;

        y[c2] = x;
        x.parent = y;
    };
}

function addFixup(dir){
    let c1, c2, rotate1, rotate2;
    if( dir === 'left') {
        c1 = 'rightChild';
        c2 = 'leftChild';
        rotate1 = '_rotateLeft';
        rotate2 = '_rotateRight';
    } else {
        c1 = 'leftChild';
        c2 = 'rightChild';
        rotate1 = '_rotateRight';
        rotate2 = '_rotateLeft';
    }

    return function(tree, z){
        // note: 注释以左边为情况

        // 叔结点
        let y = z.parent.parent[c1];

        // 插入修复情况1：如果当前结点的父结点是红色且祖父结点的另一个子结点（叔结点）是红色
        // 将当前节点的父节点和叔叔节点涂黑，祖父结点涂红，把当前结点指向祖父节点，从新的当前节点重新开始算法。
        if(y.color === RED) {
            z.parent.color = BLACK;
            y.color = BLACK;
            z.parent.parent.color = RED;
            z = z.parent.parent;
        } else {
            // 插入修复情况2：当前节点的父节点是红色,叔节点是黑色，当前节点是其父节点的右子
            // 解决对策是：当前节点的父节点做为新的当前节点，以新当前节点为支点左旋。
            // 从而插入修复情况2转换成了插入修复情况3。
            if(z === z.parent[c1]) {
                z = z.parent;
                tree[rotate1](z);
            }

            // 插入修复情况3：当前节点的父节点是红色,叔节点是黑色，当前节点是其父节点的左子
            // 解决对策是：父节点变为黑色，祖父节点变为红色，在祖父节点为支点右旋，
            z.parent.color = BLACK;
            z.parent.parent.color = RED;
            tree[rotate2](z.parent.parent);
        }
    };
}

let leftAddFixup = addFixup('left');
let rightAddFixup = addFixup('right');
let leftRemoveFixup = removeFixup('left');
let rightRemoveFixup = removeFixup('right');

function removeFixup(dir){
    let c1, c2, r1, r2;
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

    return function(tree, z){
        // note: 注释以左边为情况

        // 叔结点
        let w = z.parent[c1];

        // 删除修复情况1：当前节点是黑+黑且兄弟节点为红色(此时父节点和兄弟节点的子节点分为黑)。
        // 解法：把父节点染成红色，把兄弟结点染成黑色，之后重新进入算法
        if(w.color === RED){
            w.color = BLACK;
            z.parent.color = RED;
            tree[r1](z.parent);
            w = z.parent[c1];
        }

        // 删除修复情况2：当前节点是黑加黑且兄弟是黑色且兄弟节点的两个子节点全为黑色。
        // 解法：把当前节点和兄弟节点中抽取一重黑色追加到父节点上，把父节点当成新的当前节点，重新进入算法。
        if(w[c2].color === BLACK && w[c1].color === BLACK){
            w.color = RED;
            z = z.parent;
        } else {
            // 删除修复情况3：当前节点颜色是黑+黑，兄弟节点是黑色，兄弟的左子是红色，右子是黑色。
            // 解法：把兄弟结点染红，兄弟左子节点染黑，之后再在兄弟节点为支点解右旋，之后重新进入算法。
            if(w[c1].color === BLACK) {
                w[c2].color = BLACK;
                w.color = RED;
                tree[r2](w);
                w = z.parent[c1];
            }

            // 删除修复情况4：当前节点颜色是黑-黑色，它的兄弟节点是黑色，但是兄弟节点的右子是红色，兄弟节点左子的颜色任意。
            // 解法：把兄弟节点染成当前节点父节点的颜色，把当前节点父节点染成黑色，兄弟节点右子染成黑色，之后以当前节点的父节点为支点进行左旋，此时算法结束，红黑树所有性质调整正确
            w.color = z.parent.color;
            z.parent.color = BLACK;
            w[c1].color = BLACK;
            tree[r1](z.parent);
            z = tree.root;
        }
    };
}


let test = new RedBlackTree();
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
