/**
 * Created by Luke on 2015/3/17.
 */

/*
 动态规划法

 动态规划（英语：Dynamic programming，简称DP）是一种在数学、计算机科学和经济学中使用的，通过把原问题分解为相对简单的子问题的方式求解复杂问题的方法。

 动态规划常常适用于有重叠子问题[1]和最优子结构性质的问题，动态规划方法所耗时间往往远少于朴素解法。

 动态规划背后的基本思想非常简单。大致上，若要解一个给定问题，我们需要解其不同部分（即子问题），再合并子问题的解以得出原问题的解。

 通常许多子问题非常相似，为此动态规划法试图仅仅解决每个子问题一次，从而减少计算量：一旦某个给定子问题的解已经算出，则将其记忆化存储，以便下次需要同一个子问题解之时直接查表。这种做法在重复子问题的数目关于输入的规模呈指数增长时特别有用。

 概述
 动态规划在查找有很多重叠子问题的情况的最优解时有效。它将问题重新组合成子问题。为了避免多次解决这些子问题，它们的结果都逐渐被计算并被保存，从简单的问题直到整个问题都被解决。因此，动态规划保存递归时的结果，因而不会在解决同样的问题时花费时间。

 动态规划只能应用于有最优子结构的问题。最优子结构的意思是局部最优解能决定全局最优解（对有些问题这个要求并不能完全满足，故有时需要引入一定的近似）。简单地说，问题能够分解成子问题来解决。

 适用情况
 最优子结构性质。如果问题的最优解所包含的子问题的解也是最优的，我们就称该问题具有最优子结构性质（即满足最优化原理）。最优子结构性质为动态规划算法解决问题提供了重要线索。
 无后效性。即子问题的解一旦确定，就不再改变，不受在这之后、包含它的更大的问题的求解决策影响。
 子问题重叠性质。子问题重叠性质是指在用递归算法自顶向下对问题进行求解时，每次产生的子问题并不总是新问题，有些子问题会被重复计算多次。动态规划算法正是利用了这种子问题的重叠性质，对每一个子问题只计算一次，然后将其计算结果保存在一个表格中，当再次需要计算已经计算过的子问题时，只是在表格中简单地查看一下结果，从而获得较高的效率。
 */

(function () {
    // 从n个物件里取出m个的组合数（0 <= m <= n）

    // 分治法 时间复杂度为O(C(n, m))
    /*
     递归式：
     C(n, m) = C(n - 1, m) + C(n - 1, m - 1)
     */
    function divide_comb(n, m) {
        if (m === 0 || n === m) return 1;
        else return divide_comb(n - 1, m) + divide_comb(n - 1, m - 1);
    }

    console.log(divide_comb(11, 5));    // 462

    // 动态规划优化1  时间复杂度O(n*m) 空间复杂度O(n*m)
    function dynamic_comb(n, m) {
        var c = [];
        for (var i = 0; i <= n; ++i) {
            c[i] = [];
            c[i][0] = 1;
        }
        for (var j = 1; j <= m; ++j)
            c[0][j] = 0;
        for (i = 1; i <= n; ++i) {
            for (j = 1; j <= m; ++j) {
                c[i][j] = c[i - 1][j - 1] + c[i - 1][j];
            }
        }

        return c[n][m];
    }

    console.log(dynamic_comb(11, 5));    // 462


    // 动态规划优化1  时间复杂度O(n*m) 空间复杂度O(m)
    function dynamic_comb2(n, m) {
        if (m === 0) return 1;

        var c = [0];
        if (m > 0) {
            for (var i = 1; i <= n; ++i) c[i] = 0;
            for (i = 1; i <= n; ++i) {
                for (var j = m + 1; j > 1; --j) {
                    c[j] += c[j - 1];
                }
                ++c[i];
            }
        }

        return c[m + 1];
    }

    console.log(dynamic_comb2(11, 5));    // 462

})();

(function () {
    // 最长单调递增子序列

    // 时间复杂度O(n^2)算法
    function LISdyna(arr) {
        var n = arr.length;
        var b = [];
        b[0] = 0;
        for (var i = 1; i < n; ++i) {
            var k = 0;
            for (var j = 0; j < i; ++j) {
                if (arr[j] <= arr[i] && k < b[j])
                    k = b[j];
                else k = 0;
            }
            b[i] = k + 1;
        }

        for (i = 0, j = 0; i < n; ++i) {
            if (b[i] > j) j = b[i];
        }

        return j;
    }

    console.log('最长单调递增子序列1:');
    console.log(LISdyna([3, 2, 4, 1, 2, 7, 8, 9, 10]));


    // O(nlogn)时间复杂度
    // 一个长度为i的候选子序列的最后一个元素至少与一个长度为i-1的候选子序列的最后一个元素一样大。
    // 通过只想输入序列中的元素的指针来维持候选子序列
    // http://www.cppblog.com/mysileng/archive/2012/11/30/195841.html
    function LISdyna2(arr) {
        var b = [];
        b[1] = arr[0];
        var k = 1;

        for (var i = 1; i < arr.length; ++i) {
            if (arr[i] >= b[k]) b[++k] = arr[i];
            else b[binary(i, k)] = arr[i];
        }
        return k;

        // 二分搜索：在b[1..k]中找到下标j,使得b[j - 1] <= a[i] < b[j]
        // 时间复杂度为O(logk)
        function binary(i, k) {
            if (arr[i] < b[1]) return 1;
            var j = k;
            for (var h = 1; h !== j - 1;) {
                if (b[k = Math.floor((h + j) / 2)] <= arr[i]) h = k;
                else j = k;
            }

            return j;
        }
    }

    console.log('最长单调递增子序列2:');
    console.log(LISdyna2([3, 2, 4, 1, 2, 7, 8, 9, 10]));
})();

/*
 n个单词，长度为l1（字母）、l2、l3…，打印在宽度为m（字母）的纸上，要求除最后一行外每行最后余下的空格数的立方和最小。用动态规划算法实现
 */
function printNeatly(words, maxCharsPerLine){
    var n = words.length;
    // 安排单词1..j时的最小费用
    var c = [0];
    // 记录换行的单词位置
    var p = [];

    for(var j = 1; j < n; ++j){
        var i = j;
        // 将单词i..j安排在一行中时，保存行尾的多余空格数，可能为负值
        var extras = maxCharsPerLine - words[i].length;

        while(extras >= 0){
            // 表示将单词i..j打印在一行上的费用
            var lc = j === n - 1 ? 0 : Math.pow(extras, 3);

            if(c[j] > c[i - 1] + lc) {
                c[j] = c[i - 1] + lc;
                p[j] = i - 1;
            }

            --i;
            extras = extras - words[i].length - 1;
        }
    }

    return p;
}

var fs = require('fs');
fs.readFile('./for-examples/printNeatly', { encoding: 'utf-8' }, function(err, data){
    if(err) throw err;

    console.log(data);
    var arr = data.split(/\s+/g);
    console.log(arr);
    console.log(printNeatly(arr, 80));
});

// unoptimized version
// 两矩阵相乘
function matrixMultiply(a, b) {
    var c = [];
    var ra = a[0].length;
    var ca = a.length;
    var rb = b[0].length;
    var cb = b.length;

    if (ca !== rb) throw new Error('matrix can\'t be multiplied!');

    for (var i = 0; i < ra; ++i) {
        if (!c[i]) c[i] = [];
        for (var j = 0; j < cb; ++j) {
            var sum = a[i][0] * b[0][j];

            for (var k = 1; k < ca; ++k)
                sum += a[i][k] * b[k][j];

            c[i][j] = sum;
        }
    }

    return c;
}


var m1 = [
    [0, 0, 0, 0],
    [0, 3, 0, 5],
    [0, 0, -1, 0],
    [0, 2, 0, 0]
];
var m2 = [
    [0, 0, 0, 0],
    [0, 0, 2, 0],
    [0, 1, 0, 0],
    [0, -2, 4, 0]
];
console.log(matrixMultiply(m2, m1));

/*
 [ [ 0, 0, 0, 0 ],
 [ 0, 0, -2, 0 ],
 [ 0, 3, 0, 5 ],
 [ 0, -6, -4, -10 ] ]
 */