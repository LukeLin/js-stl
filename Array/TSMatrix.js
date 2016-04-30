/**
 * 系数矩阵的三元组顺序表存储表示
 */

class Triple {
    constructor(i, j, elem) {
        // 该非零元的行下标和列下标
        this.i = i || 0;
        this.j = j || 0;
        this.e = elem || null;
    }
}

class TSMatrix {
    constructor(mu, nu) {
        // 非零元三元组表
        this.data = [];
        // 矩阵的行数，列数
        this.mu = mu || 0;
        this.nu = nu || 0;
    }
    addTriple (triple) {
        if (triple instanceof Triple) {
            if(triple.i >= this.mu)
                this.mu = triple.i + 1;
            if(triple.j >= this.nu)
                this.nu = triple.j + 1;

            this.data.push(triple);
            return true;
        }
        return false;
    }
    // 采用三元组表存储表示，求稀疏矩阵的转置矩阵t
    // 按照b.data中三元组的次序依次在a.data中找到相应的三元组进行转置
    transposeSMatrix () {
        let t = new TSMatrix();
        t.mu = this.nu;
        t.nu = this.mu;

        if (this.data.length) {
            let q = 0;
            for (let col = 0; col < this.nu; col++) {
                for (let p = 0; p < this.data.length; p++) {
                    if (this.data[p].j === col)
                        t.data[q++] = new Triple(this.data[p].j, this.data[p].i, this.data[p].e);
                }
            }
        }

        return t;
    }
    // 采用三元组表存储表示，求稀疏矩阵的转置矩阵t
    /*
     按照a.data中三元组的次序进行转置，并将转置后的三元组置入b中恰当的位置。
     如果能预先确定矩阵M中每一列（即T中每一行）的第一个非零元在b.data中应有的位置，
     那么在对a.data中的三元组依次做转置时，便可直接放到b.data中恰当的位置上去。
     为了其额定这些位置，在转置前，应先求得M的每一列中非零元的个数，进而求得每一列的第一个非零元在b.data中应有的位置。
     在此，需要设num和cpot两个变量。num[col]表示矩阵M中第col列中非零元的个数，
     cpot[col]指示M中第col列的第一个非零元在b.data中的恰当位置。显然有：
     cpot[0] = 1;
     cpot[col] = cpot[col - 1] + num[col - 1]    2 <= col <= a.nu
     */
    fastTransposeSMatrix(){
        let t = new TSMatrix();
        t.mu = this.nu;
        t.nu = this.mu;

        if(this.data.length){
            let num = [];
            for(let col = 0; col < this.nu; col++)
                num[col] = 0;
            for(let i = 0; i < this.data.length; i++)
                ++num[this.data[i].j];  // 求矩阵中每一列含非零元个数
            // 求第col列中第一个非零元在b.data中的序号
            let cpot = [0];
            for(let col = 1; col < this.nu; col++)
                // 上一列之前的序号+上一列的非零元个数 = 该列的序号
                cpot[col] = cpot[col - 1] + num[col - 1];
            for(let p = 0; p < this.data.length; p++){
                let col = this.data[p].j;
                let q = cpot[col];
                t.data[q] = new Triple(this.data[p].j, this.data[p].i, this.data[p].e);
                // 给该列的序号+1，用作相同列数的情况
                ++cpot[col];
            }
        }

        return t;
    }
}

let a1 = new Triple(1, 2, 12);
let a2 = new Triple(1, 3, 9);
let a3 = new Triple(3, 1, -3);
let a4 = new Triple(3, 6, 14);
let a5 = new Triple(4, 3, 24);
let a6 = new Triple(5, 2, 18);
let a7 = new Triple(6, 1, 15);
let a8 = new Triple(6, 4, -7);

let matrix = new TSMatrix();
matrix.addTriple(a1);
matrix.addTriple(a2);
matrix.addTriple(a3);
matrix.addTriple(a4);
matrix.addTriple(a5);
matrix.addTriple(a6);
matrix.addTriple(a7);
matrix.addTriple(a8);

console.log(matrix.transposeSMatrix());
console.log(matrix.fastTransposeSMatrix());

/*
 三元组顺序表又称有序的双下标法，它的特点是，非零元在表中按行序有序存储，因此便于进行依行顺序处理的矩阵运算。
 然而，若需按行号存取某一行的非零元，则从头开始进行查找。
 */

/**
 * 行逻辑链接的顺序表
 *
 * 为了便于随机存取任意一行的非零元，则需知道每一行的第一个非零元在三元组表中的位置。
 * 为此可将快速转置矩阵的算法中创建的，指示“行”信息的辅助数组cpot固定在稀疏矩阵的存储结构中。
 * 称这种“带行链接信息”的三元组表为行逻辑链接的顺序表
 */
class RLSMatrix extends TSMatrix {
    constructor(){
        super(...arguments);
        this.rpos = [0];
    }
    /**
     * 求矩阵乘积Q = M * N，采用行逻辑链接存储表示
     * @param nMatrix
     * @returns {RLSMatrix}
     */
    multSMatrix(nMatrix){
        if(this.nu !== nMatrix.mu) throw Error('nu is not equivalent to mu');

        // 初始化Q
        let qMatrix = new RLSMatrix(this.mu, nMatrix.nu);
        // Q是非零矩阵
        if(this.data.length * nMatrix.data.length !== 0){
            // 处理M的每一行
            for(let arow = 0; arow < this.mu; arow++){
                // 当前行各元素累加器清零
                let ctemp = [];
                qMatrix.rpos[arow] = qMatrix.data.length + 1;
                let tp, ccol;

                if(arow < this.mu)
                    tp = this.rpos[arow + 1];
                else
                    tp = this.data.length + 1;

                //对当前行中每一个非零元找到对应元在N中的行号
                for(let p = this.rpos[arow]; p < tp; p++){
                    let brow = this.data[p].j;
                    let t;
                    if(brow < nMatrix.mu)
                        t = nMatrix.rpos[brow + 1];
                    else
                        t = nMatrix.data.length + 1;

                    for(let q = nMatrix.rpos[brow]; q < t; q++){
                        // 乘积元素在Q中的序号
                        ccol = nMatrix.data[q].j;
                        ctemp[ccol] = (ctemp[ccol] || 0) + this.data[p].e * nMatrix.data[q].e;
                    }
                }

                // 压缩存储该行非零元
                for(ccol = 1; ccol < qMatrix.nu; ccol++){
                    if(ctemp[ccol]){
                        if(++qMatrix.data.length > RLSMatrix.MAXSIZE) throw Error('overflow');
                        qMatrix.data[qMatrix.data.length - 1] = new Triple(arow, ccol, ctemp[ccol]);
                    }
                }
            }
        }

        return qMatrix;
    }

    _calcPos (){
        let num = [];
        for(let col = 0; col < this.nu; col++)
            num[col] = 0;
        for(let i = 0; i < this.data.length; i++)
            ++num[this.data[i].j];  // 求矩阵中每一列含非零元个数
        // 求第col列中第一个非零元在b.data中的序号
        for(let col = 1; col < this.nu; col++)
            // 上一列之前的序号+上一列的非零元个数 = 该列的序号
            this.rpos[col] = this.rpos[col - 1] + num[col - 1];
    }
}
RLSMatrix.MAXSIZE = 100;


let b1 = new Triple(1, 1, 3);
let b2 = new Triple(1, 3, 5);
let b3 = new Triple(2, 2, -1);
let b4 = new Triple(3, 1, 2);

let t1 = new RLSMatrix();
t1.addTriple(b1);
t1.addTriple(b2);
t1.addTriple(b3);
t1.addTriple(b4);
t1._calcPos();

let c1 = new Triple(1, 2, 2);
let c2 = new Triple(2, 1, 1);
let c3 = new Triple(3, 1, -2);
let c4 = new Triple(3, 2, 4);

let t2 = new RLSMatrix();
t2.addTriple(c1);
t2.addTriple(c2);
t2.addTriple(c3);
t2.addTriple(c4);
t2._calcPos();

t1.multSMatrix(t2);