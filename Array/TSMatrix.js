/**
 * 系数矩阵的三元组顺序表存储表示
 */


function Triple(i, j, elem) {
    // 该非零元的行下标和列下标
    this.i = i || 0;
    this.j = j || 0;
    this.e = elem || null;
}

function TSMatrix(mu, nu) {
    // 非零元三元组表
    this.data = [];
    // 矩阵的行数，列数
    this.mu = mu || 0;
    this.nu = nu || 0;
}
TSMatrix.prototype = {
    constructor: TSMatrix,
    addTriple: function (triple) {
        if (triple instanceof Triple) {
            if(triple.i >= this.mu){
                this.mu = triple.i + 1;
            }
            if(triple.j >= this.nu){
                this.nu = triple.j + 1;
            }
            this.data.push(triple);
            return true;
        }
        return false;
    },
    // 采用三元组表存储表示，求稀疏矩阵的转置矩阵t
    // 按照b.data中三元组的次序依次在a.data中找到相应的三元组进行转置
    transposeSMatrix: function () {
        var t = new TSMatrix();
        t.mu = this.nu;
        t.nu = this.mu;

        if (this.data.length) {
            var q = 0;
            for (var col = 0; col < this.nu; col++) {
                for (var p = 0; p < this.data.length; p++) {
                    if (this.data[p].j === col) {
                        t.data[q] = new Triple(this.data[p].j, this.data[p].i, this.data[p].e);
                        ++q;
                    }
                }
            }
        }

        return t;
    },
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
    fastTransposeSMatrix: function(){
        var t = new TSMatrix();
        t.mu = this.nu;
        t.nu = this.mu;

        if(this.data.length){
            var num = [];
            for(var col = 0; col < this.nu; col++)
                num[col] = 0;
            for(var i = 0; i < this.data.length; i++)
                ++num[this.data[i].j];  // 求矩阵中每一列含非零元个数
            // 求第col列中第一个非零元在b.data中的序号
            var cpot = [0];
            for(col = 1; col < this.nu; col++)
                cpot[col] = cpot[col - 1] + num[col - 1];
            for(var p = 0; p < this.data.length; p++){
                col = this.data[p].j;
                var q = cpot[col];
                t.data[q] = new Triple(this.data[p].j, this.data[p].i, this.data[p].e);
                ++cpot[col];
            }
        }

        return t;
    }
};

var a1 = new Triple(1, 2, 12);
var a2 = new Triple(1, 3, 9);
var a3 = new Triple(3, 1, -3);
var a4 = new Triple(3, 6, 14);
var a5 = new Triple(4, 3, 24);
var a6 = new Triple(5, 2, 18);
var a7 = new Triple(6, 1, 15);
var a8 = new Triple(6, 4, -7);

var matrix = new TSMatrix();
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