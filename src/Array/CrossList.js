/**
 * 十字链表
 *
 * 当矩阵的非零个数和位置在操作过程中变化大时，就不宜采用顺序存储结构来表示三元组的线性表。例如，在作“将矩阵B加到矩阵A上”的操作时，由于非零元的插入或删除将会引起A.data中元素的移动。为此，对这种类型的矩阵，采用链式存储结构表示三元组的线性表更为恰当。
 *
 * 在链表中，每个非零元可用一个含5个域的结点表示，其中i，j和e这3个域分别表示该非零元所在的行，列和非零元的值，向右域right用以链接同一行中下一个非零元，向下域down用以链接同一列中下一个非零元。同一行的非零元通过right域链接成一个线性表，同一列中的非零元通常down域链接成一个线性链表，每一个非零元既是某个行链表中的一个结点，又是某个列链表中的一个结点，整个矩阵构成了一个十字交叉的链表。
 *
 * 可用两个分别存储行链表的头指针和列链表的头指针的一维数组来表示。
 */

// 稀疏矩阵的十字链表存储表示
class OLNode {
    constructor(i = 0, j = 0, e) {
        // 该非零元的行和列下标
        this.i = i;
        this.j = j;
        this.e = e;
        // 该非零元所在行表和列表的后继链域
        this.right = null;  // type: OLNode
        this.down = null;   // type: OLNode
    }
}

export default class CrossList {
    constructor() {
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
    createSMatrix(m, n, t, list) {
        this.mu = m;
        this.nu = n;
        this.tu = t;

        for (let row = 0; row < list.length; row++) {
            let p = new OLNode(...list[row]);
            let [i, j] = list[row];
            let q;

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
    }

    // 矩阵相加
    addMatrix(crossList) {
        let hl = [];
        //hl初始化
        for (let j = 0; j <= this.nu; j++)
            hl[j] = this.chead[j];

        for (let i = 0; i <= this.mu; i++) {
            //pa和pb指向每一行的第一个非0元结点，直至最后一行
            let pa = this.rhead[i];
            let pb = crossList.rhead[i];
            let pre = null;

            //处理B的一行，直至本行中无非0元素的结点
            while (pb) {
                let p, q;
                // 新插入一个结点到pa的左侧
                if (!pa || pa.j > pb.j) {
                    p = new OLNode(pb.i, pb.j, pb.e);

                    //行表的指针变化
                    if (!pre) this.rhead[p.i] = p;
                    else pre.right = p;

                    p.right = pa;
                    pre = p;

                    //列表的指针变化
                    if (hl[p.j]) {
                        // 从hl[p.j]开始找到新结点在同一列中的前驱结点，并让hl[p.j]指向它
                        for (q = hl[p.j]; q && q.i < p.i;q = q.down)
                            hl[p.j] = q;
                    }

                    //在列表中插入新结点，根据行数判断插入前面还是后面
                    if (!this.chead[p.j] || this.chead[p.j].i > p.i) {
                        p.down = this.chead[p.j];
                        this.chead[p.j] = p;
                    } else {
                        p.down = hl[p.j].down;
                        hl[p.j].down = p;
                    }

                    hl[p.j] = p;
                    pb = pb.right;
                } else if (pa.j < pb.j) {
                    pre = pa;
                    pa = pa.right;
                } else {
                    //当pa.j === pb.j时，将B中当前结点的值加到A中当前结点上
                    pa.e += pb.e;

                    //当pa.e === 0时，删除该结点
                    if (pa.e === 0) {
                        // 若无前驱结点，将第一个非0元结点置为当前结点的后继结点，
                        // 否则前驱结点的后继结点为当前结点的后继结点
                        if (!pre) this.rhead[pa.i] = pa.right;
                        else pre.right = pa.right;

                        p = pa;
                        pa = pa.right;

                        //列表的指针变化
                        if (hl[p.j]) {
                            //从hl[p.j]开始找到新结点在同一列中的前驱结点，并让hl[p.j]指向它
                            for (q = hl[p.j]; q && q.i < p.i; q = q.down)
                                hl[p.j] = q;
                        }

                        if (this.chead[p.j] == p)
                            this.chead[p.j] = hl[p.j] = p.down;
                        else
                            hl[p.j].down = p.down;
                    }

                    pb = pb.right;
                }
            }
        }
    }
}



let lists = [
    [1, 4, 5],
    [2, 2, -1],
    [1, 1, 3],
    [3, 1, 2]
];
let a = new CrossList();
a.createSMatrix(4, 4, 4, lists);
console.log(a);

let lists2 = [
    [1, 4, -5],
    [2, 3, 1],
    [1, 1, 3],
    [3, 2, 2]
];
let b = new CrossList();
b.createSMatrix(4, 4, 4, lists2);
console.log(b);

a.addMatrix(b);
console.log(a);
