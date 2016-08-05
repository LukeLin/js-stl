'use strict';

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
        if (i > aList.length - 1) console.log('set: ' + bList);else {
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
/*
同理，我们可以用回溯法解决八皇后问题。
首先，我们把问题简化为四皇后问题。
在求解过程，棋盘的状态变化就像一棵四叉树，树上每个结点表示一个局部布局或一个完整布局。根结点表示棋盘的初始状态：棋盘上无任何棋子。每个（皇后）棋子都有4个可选择的位置，但在任何时刻，棋盘的合法布局都必须满足任何两个棋子都不占据棋盘上同一行，或者同一列，或者同一对角线。
求所有合法布局的过程即为上述约束条件下先根遍历状态树的过程。

遍历中访问结点的操作为，判别棋盘上是否已得到一个完整的布局（即棋盘上是否已有4个棋子）。
    若是，则输出该布局；
    否则依次先根遍历满足约束条件的各棵子树，即首先判断该子树根的布局是否合法；
        若合法，则先根遍历该子树；
        否则剪去该子树分支。
 */
function Queen(n) {
    var board = [];
    var count = 0;

    this.init = function () {
        for (var i = 0; i < n; i++) {
            board[i] = [];
            for (var j = 0; j < n; j++) {
                board[i][j] = 0;
            }
        }
    };

    this.init();

    this.getSolutionsCount = function () {
        return count;
    };

    this.printCurrentLayout = function () {
        ++count;
        console.log(board);
    };

    this.addPoint = function (i, j) {
        if (board[i][j] === 0) {
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

    function checkHorizontal(x, y) {
        for (var i = 0; i < y; i++) {
            if (board[x][i] === 1) return false;
        }
        for (i = y + 1; i < n; i++) {
            if (board[x][i] === 1) return false;
        }
        return true;
    }

    function checkVertical(x, y) {
        for (var i = 0; i < x; i++) {
            if (board[i][y] === 1) return false;
        }
        for (i = x + 1; i < n; i++) {
            if (board[i][y] === 1) return false;
        }
        return true;
    }

    function checkLeftTop2RightBottom(x, y) {
        for (var i = 1; x - i >= 0 && y - i >= 0; i++) {
            if (board[x - i][y - i] === 1) return false;
        }
        for (i = 1; x + i < n && y + i < n; i++) {
            if (board[x + i][y + i] === 1) return false;
        }
        return true;
    }

    function checkRightTop2LeftBottom(x, y) {
        for (var i = 1; x - i >= 0 && y + i < n; i++) {
            if (board[x - i][y + i] === 1) return false;
        }
        for (i = 1; x + i < n && y - i >= 0; i++) {
            if (board[x + i][y - i] === 1) return false;
        }
        return true;
    }

    this.removePoint = function (i, j) {
        if (board[i][j] === 1) {
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
                if (me.addPoint(i, j)) {
                    if (me.isCurrentLayoutLegal(i, j)) trial(i + 1);
                    me.removePoint(i, j);
                }
            }
        }
    };
}

exports.Queen = Queen;

var test = new Queen(8);
test.trial();
console.log('getSolutionsCount: ' + test.getSolutionsCount());

/*
含有n个结点的不相似的二叉树有1/(n+1)*C(n)(2n)棵
 */

// n个阶梯，每次只能走一步或两步，求共有多少种走法走完
function getStepPowerSet(n) {
    var count = 0;

    void function recurse(i) {
        if (i >= n) {
            ++count;
        } else {
            recurse(i + 1);
            if (i + 2 <= n) recurse(i + 2);
        }
    }(0);

    return count;
}

console.log(getStepPowerSet(4)); // 5