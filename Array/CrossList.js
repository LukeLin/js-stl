/**
 * 十字链表
 *
 * 当矩阵的非零个数和位置在操作过程中变化大时，就不宜采用顺序存储结构来表示三元组的线性表。例如，在作“将矩阵B加到矩阵A上”的操作时，由于非零元的插入或删除将会引起A.data中元素的移动。为此，对这种类型的矩阵，采用链式存储结构表示三元组的线性表更为恰当。
 *
 * 在链表中，每个非陵园可用一个含5个域的结点表示，其中i，j和e这3个域分别表示该非零元所在的行，列和非零元的值，向右域right用以链接同一行中下一个非零元，向下域down用以链接同一列中下一个非零元。同一行的非零元通过right域链接成一个线性表，同一列中的非零元通常down域链接成一个线性链表，每一个非零元既是某个行链表中的一个结点，又是某个列链表中的一个结点，整个矩阵构成了一个十字交叉的链表。
 *
 * 可用两个分别存储行链表的头指针和列链表的头指针的一维数组来表示。
 */

    // 稀疏矩阵的十字链表存储表示

function OLNode(i, j, e) {
    // 该非零元的行和列下标
    this.i = i || 0;
    this.j = j || 0;
    this.e = e;
    // 该非零元所在行表和列表的后继链域
    this.right = null;  // type: OLNode
    this.down = null;   // type: OLNode
}

function CrossList() {
    // 行和列链表头指针向量基址由CreateSMatrix分配
    this.rhead = [];
    this.chead = [];
    // 稀疏矩阵的行数，列数
    this.mu = 0;
    this.nu = 0;
    this.tu = 0;
}
/**
 * 矩阵初始化
 * @param m
 * @param n
 * @param t
 * @param {Array} list 二维数组，每行的元素分别是[i, j, e]
 */
CrossList.prototype.createSMatrix = function (m, n, t, list) {
    this.mu = m;
    this.nu = n;
    this.tu = t;

    for (var row = 0; row < list.length; row++) {
        var p = {};
        OLNode.apply(p, list[row]);
        var i = list[row][0];
        var j = list[row][1];
        var q;

        if (this.rhead[i] == null || this.rhead[i].j > j) {
            p.right = this.rhead[i];
            this.rhead[i] = p;
        } else {
            // 查询在行表中的插入位置
            for (q = this.rhead[i]; q.right && q.right.j < j; q = q.right);
            p.right = q.right;
            q.right = p;
        }

        if (this.chead[j] == null || this.chead[j].i > i) {
            p.down = this.chead[j];
            this.chead[j] = p;
        } else {
            for (q = this.chead[j]; q.down && q.down.i < i; q = q.down);
            p.down = q.down;
            q.down = p;
        }
    }
};

CrossList.prototype.addMatrix = function (crossList) {
    var hl = [];
    for(var j = 0; j <= this.nu; j++)
        hl[j] = this.chead[j];

    for(var i = 0; i <= this.mu; i++){
        var pa = this.rhead[i];
        var pb = crossList.rhead[i];
        var pre = null;

        while(pb){
            var p;
            // 新插入一个结点
            if(pa == null || pa.j > pb.j){
                p = new OLNode(i, pb.j, pb.e);

                if(!pre) this.rhead[i] = p;
                else pre.right = p;

                p.right = pa;
                pre = p;

                if(!this.chead[p.j]){
                    this.chead[p.j] = p;
                    p.down = null;
                } else {
                    while(hl[p.j].down){
                        hl[p.j] = hl[p.j].down;
                    }
                    p.down = hl[p.j].down;
                    hl[p.j].down = p;
                }

                hl[p.j] = p;
            } else if(pa.j < pb.j){
                pre = pa;
                pa = pa.right;
            } else if(pa.e + pb.e){
                pa.e += pb.e;
                pre = pa;
                pa = pa.right;
                pb = pb.right;
            } else {
                if(!pre) this.rhead[i] = pa.right;
                else pre.right = pa.right;

                p = pa;
                pa = pa.right;

                if(this.chead[p.j] == p){
                    this.chead[p.j] = hl[p.j] = p.down;
                } else {
                    hl[p.j].down = p.down;
                }
            }
        }
    }
//
//    // TODO bug exists
//    while (i < crossList.rhead.length) {
//        if(pb){
//            var p;
//            // pa == null或A的这一行中非零元素已处理完
//            if (pa == null || pa.j > pb.j) {
//                // 行表中的指针变化
//                p = pb;
//                if (pre === null) this.rhead[p.i] = p;
//                else pre.right = p;
//
//                p.right = pa;
//                pre = p;
//
//                // 列表中的指针变化
//                if (this.chead[p.j] == null || this.chead[p.j].i > p.i) {
//                    p.down = this.chead[p.j];
//                    this.chead[p.j].down = p;
//                } else {
//                    p.down = hl[p.j].down;
//                    hl[p.j].down = p;
//                }
//                hl[p.j] = p;
//            } else if (pa.j < pb.j) {
//                // 令pa指向本行下一个非零元结点
//                pre = pa;
//                pa = pa.right;
//            } else if (pa.j === pb.j) {
//                // 将B中当前结点的值加到A中当前结点上
//                pa.e += pb.e;
//                if (pa.e === 0) {
//                    // 删除A中该结点
//                    if (pre === null) this.rhead[pa.i] = pa.right;
//                    else pre.right = pa.right;
//
//                    p = pa;
//                    pa = pa.right;
//
//                    // 为了改变列表中的指针，需要先找到用一列的前驱结点，
//                    // 且让hl[pa.j]指向该结点，然后修改相应指针
//                    if (this.chead[p.j] == p) this.chead[p.j] = hl[p.j] = p.down;
//                    else hl[p.j].down = p.down;
//                }
//            }
//        }
//
//        // 若本行不是最后一行，则令pa和pb指向下一行的第一个非零元结点
//        i++;
//        pa = this.rhead[i];
//        pb = crossList.rhead[i];
//    }
};

var lists = [
    [1, 4, 5],
    [2, 2, -1],
    [1, 1, 3],
    [3, 1, 2]
];
var a = new CrossList();
a.createSMatrix(4, 4, 4, lists);
console.log(a);

var lists2 = [
    [1, 4, -5],
    [2, 3, 1],
    [1, 1, 3],
    [3, 2, 2]
];
var b = new CrossList();
b.createSMatrix(4, 4, 4, lists2);
console.log(b);

a.addMatrix(b);
console.log(a);