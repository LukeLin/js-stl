/**
 * 广义表
 *
 * 广义表是线性表的推广。广泛用于人工智能的表处理语言Lisp，把广义表作为基本的数据结构。
 * 广义表一般记作：
 *      LS = (a1, a2, ..., an)
 * LS是广义表的名称，n是它的长度，ai可以是单个元素，也可以是广义表，分别称为广义表LS的原子和子表。习惯上，用大写字母表示广义表的名称，小写字母表示原子。当广义表LS非空时，称第一个元素a1为LS的表头，称其余元素组成的表(a2, a3, ..., an)是LS的表尾。
 *
 * 下面列举一些广义表的例子：
 * 1.A = () ---- A是一个空表，它的长度为0。
 * 2.B = (e) ---- 列表B只有一个原子e，B的长度为1。
 * 3.C = (a, (b, c, d)) ---- 列表C的长度为2，两个元素分别为原子a和子表(b, c, d)。
 * 4.D = (A, B, C) ---- 列表D的长度为3,3个元素都是列表。显示，将子表的值代入后，则有D = ((), (e), (a, (b, c, d)))。
 * 5.E = (a, E) ---- 这是一个递归的表，它的长度为2.E相当于一个无限的列表E = (a, (a, (a, ...)))。
 *
 * 1）列表的元素可以是子表，而子表的元素还可以是子表。由此，列表是一个多层次的结构，可以用图形象地表示。
 * 2)列表可为其它列表所共享。列表A，B和C为D的子表，则在D中可以不必列出子表的值。
 * 3）列表可以是一个递归的表，即列表也可以是其本身的一个子表。例如列表E。
 *
 * 任何一个非空列表其表头可能是原子，也可能是列表，而其表尾必定为列表。
 *
 */

var ATOM = 0;
var LIST = 1;

// 广义表的头尾链表存储表示
function GLNode() {
    // 公共部分，用于区分原子结点和表结点
    this.tag = undefined;

    // atom是原子结点的值域
    this.atom = null;
    // ptr是表结点的指针域
    this.ptr = {
        // ptr.hp和ptr.tp分别指向表头和表尾
        hp: null,
        tp: null
    };
}

// 广义表的扩展线性链表存储表示
function GLNode2() {
    // 公共部分，用于区分原子结点和表结点
    this.tag = undefined;

    // 原子结点的值域
    this.atom = null;
    // 表结点的表头指针
    this.hp = null;

    // 相当于线性链表的next，指向下一个元素结点
    this.tp = null;
}


/*
广义表的递归算法

递归定义的归纳项描述了如何实现从当前状态到终结状态的转化。

由于递归函数的设计用的是归纳思维的方法，则在设计递归函数时，应注意：
（1）首先应书写函数的首部和规格说明，严格定义函数的功能和接口（递归调用的界面），对求精函数中所得的和原问题性质相同的字问题，只要接口一致，便可进行递归调用。
（2）对函数中的每一个递归调用都看成只是一个简单的操作，只要接口一致，必能实现规格说明中定义的功能，切忌想得太深太远。
 */

/*
求广义表的深度

广义表的深度定义为广义表中括弧的重数，是广义表的一种量度。
设非空广义表为:
        LS = (a1, a2, ..., an)

其中ai(i = 1, 2, ..., n)或为原子或为LS的子表，则求LS的深度可分解为n个子问题，每个子问题为求ai的深度，若ai是原子，则由定义其深度为零，若ai是广义表，则递归处理，而LS的深度为各ai(i = 1, 2, ..., n)的深度最大值加1.空表也是广义表，且深度为1.

广义表的深度DEPTH(LS)的递归定义为：
    基本项：    DEPTH(LS) = 1   当LS为空表时
                DEPTH(LS) = 0   当LS为原子时
    归纳项：    DEPTH(LS) = 1 + MAX{DEPTH(ai)}  1 <= i <= n
 */

// 采用头尾链表存储结构，求广义表的深度
GLNode.prototype.depth = function () {
    return getDepth(this);
};

function getDepth(gList) {
    if (!gList) return 1;
    else if (gList.tag === ATOM) return 0;

    var m = getDepth(gList.ptr.hp) + 1;
    var n = getDepth(gList.ptr.tp);

    return m > n ? m : n;
}

// 复制广义表
GLNode.prototype.copyList = function (gList) {
    gList.tag = this.tag;

    if (!this.tag) {
        gList.atom = this.atom;
    } else {
        if (this.ptr.hp) {
            gList.ptr.hp = new GLNode();
            this.copyList.call(this.ptr.hp, gList.ptr.hp);
        }
        if (this.ptr.tp) {
            gList.ptr.tp = new GLNode();
            this.copyList.call(this.ptr.tp, gList.ptr.tp);
        }
    }
};

// 采用头尾链表存储结构，由广义表的书写形式串创建广义表
GLNode.prototype.createGList = function (string) {
    string = string.trim();

//    if (string === '()') {
//        this.tag = LIST;
//        return;
//    }

    // 创建单原子广义表
    var q;
    if (string.length === 1) {
        this.tag = ATOM;
        this.atom = string;
    } else {
        this.tag = LIST;
        var p = this;

        // 脱外层括号
        var sub = string.substr(1, string.length - 2);

        do {
            var hsub;
            var n = sub.length;
            var i = 0;
            var k = 0;
            var ch;

            do {
                ch = sub[i++];
                if (ch == '(') ++k;
                else if (ch == ')') --k;
            } while (i < n && (ch != ',' || k != 0));

            if (i < n) {
                hsub = sub.substr(0, i - 1);
                sub = sub.substr(i, n - i);
            } else {
                hsub = sub;
                sub = '';
            }

            if(hsub === '()'){
                p.ptr.hp = null;
            } else {
                this.createGList.call((p.ptr.hp = new GLNode()), hsub);
            }

            q = p;

            if (sub) {
                p = new GLNode();
                p.tag = LIST;
                q.ptr.tp = p;
            }
        } while (sub);

        q.ptr.tp = null;
    }
};

var node = new GLNode();
node.createGList('((), (e), (a, (b, c, d)))');
console.log(node.depth());

GLNode.equal = function equal(gList1, gList2) {
    // 空表时相等的
    if (!gList1 && !gList2) return 1;
    if (!gList1.tag && !gList2.tag && gList1.atom === gList2.atom) return 1;

    if (gList1.tag && gList2.tag) {
        // 表头表尾都相等
        if (equal(gList1.ptr.hp, gList2.ptr.hp) && equal(gList1.ptr.tp, gList2.ptr.tp)) return 1;
    }

    return 0;
};

// 递归逆转广义表
GLNode.prototype.reverse = function reverse() {
    var ptr = [];
    // 当A不为原子且表尾非空时才需逆转
    if (this.tag && this.ptr.tp) {
        for (var i = 0, p = this; p; p = p.ptr.tp, i++) {
            // 逆转各子表
            if (p.ptr.hp) reverse.call(p.ptr.hp);

            ptr[i] = p.ptr.hp;
        }

        // 重新按逆序排列各子表的顺序
        for (p = this; p; p = p.ptr.tp) {
            p.ptr.hp = ptr[--i];
        }
    }
};

var global = Function('return this')();
GLNode.prototype.toString = function () {
    var str = '';
    if (this == global) str = '()';
    else if (!this.tag) str = this.atom;  // 原子
    else {
        str += '(';

        for (var p = this; p; p = p.ptr.tp) {
            str += this.toString.call(p.ptr.hp);
            if (p.ptr.tp) str += ', ';
        }
        str += ')';
    }

    return str;
};

console.log(node + '');
node.reverse();
console.log(node + '');

var node2 = new GLNode();
node.copyList(node2);
console.log(GLNode.equal(node, node2));

/*
m元多项式表示

如果用线性表来表示,则每个数据元素需要m+1个数据项，以存储一个系数和m个指数值，这将产生两个问题。
一是无论多项式中各项的变元数是多是少，若都按m个变元分配存储空间，则将造成浪费；反之，若按各项实际的变元数分配存储空间，就会造成结点的大小不匀，给操作带来不便。二是对m值不同的多项式，线性表中的结点大小也不同，这同样引起存储管理的不便。
故不适于用线性表表示。

例如三元多项式：
    P(x, y, z) = x(10)y(3)z(2) + 2x(6)y(3)z(2) + 3x(5)y(2)z(2) + x(4)y(4)z + 2yz + 15

如若改写为：
    P(x, y, z) = ((x(10) + 2x(6))y(3) + 3x(5)y(2))z(2) + ((x(4) + 6x(3))y(4) + 2y)z + 15

用广义表表示：
    P = z((A, 2), (B, 1), (15, 0))
    A = y((C, 3), (D, 2))
    B = y((E, 4), (F, 1))
    C = x((1, 10), (2, 6))
    D = x((3, 5))
    E = x((1, 4), (6, 3))
    F = x((2, 0))


 */

function MPNode() {
    // 区分原子结点和表结点
    this.tag = undefined;
    // 指数域
    this.exp = 0;

    // 系数域
    this.coef = 0;
    // 表结点的表头指针
    this.hp = null;

    // 相当于线性表的next，指向下一个元素结点
    this.tp = null;
}