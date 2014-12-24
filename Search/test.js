/**
 * @Author Luke
 * @Title AVL树
 * @Date 2014/12/24.
 */

/**
 * @Author Luke
 * @Title AVL树
 * @Date 2014/12/24.
 */

var AVLNode = (function(){

    var LH = 1;     // 左高
    var EH = 0;     // 等高
    var RH = -1;    // 右高

    /**
     * AVL树，平衡二叉排序树
     * @param {*} data
     * @param {AVLNode} leftChild
     * @param {AVLNode} rightChild
     * @param {Number} balanceFactor 平衡因子
     * @constructor
     */
    function AVLNode(data, leftChild, rightChild, balanceFactor) {
        this.data = data || null;
        // 左右孩子结点
        this.leftChild = leftChild || null;
        this.rightChild = rightChild || null;
        this.balanceFactor = balanceFactor || EH;
    }
    AVLNode.cmp = function(a, b){
        if(a > b) return 1;
        else if(a < b) return -1;
        else return 0;
    };
    AVLNode.prototype = {
        constructor: AVLNode,

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
         * 左平衡处理
         * @returns {AVLNode} 返回新的根结点
         */
        leftBalance : function () {
            var c = this.leftChild;
            var p;

            // 检查左子树的平衡度
            switch (c.balanceFactor) {
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
        rightBalance: function () {
            var c = this.rightChild;
            var p;

            switch (c.balanceFactor) {
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
                                p = this.leftBalance().copy(function (target, source) {
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
                                p = this.leftBalance().copy(function (target, source) {
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
                                p = this.rightBalance();
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
                unbalanced: unbalanced
            };
        },

        copy: function (cb) {
            cb = cb || function(){};
            // 用来存放本体结点的栈
            var stack1 = [];
            // 用来存放新二叉树结点的栈
            var stack2 = [];
            stack1.push(this);
            var Cstr = this.constructor;
            var newTree = new Cstr();
            var q = newTree;
            stack2.push(newTree);
            var p;

            while (stack1.length) {
                // 向左走到尽头
                while ((p = stack1[stack1.length - 1])) {
                    if (p.leftChild) q.leftChild = new Cstr();
                    q = q.leftChild;
                    stack1.push(p.leftChild);
                    stack2.push(q);
                }

                p = stack1.pop();
                q = stack2.pop();

                if (stack1.length) {
                    p = stack1.pop();
                    q = stack2.pop();
                    if (p.rightChild) q.rightChild = new Cstr();
                    q.data = p.data;
                    cb(q, p);
                    q = q.rightChild;
                    stack1.push(p.rightChild);  // 向右一步
                    stack2.push(q);
                }
            }

            return newTree;
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

    return AVLNode;

}());