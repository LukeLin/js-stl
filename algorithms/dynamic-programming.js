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


(function () {
    console.log('ackermann:');

    function ackermann1(m, n) {
        if (m === 0) return n + 1;
        if (n === 0) return ackermann1(m - 1, 1);
        else return ackermann1(m - 1, ackermann1(m, n - 1));
    }

    console.log(ackermann1(3, 2));

    // 备忘录算法
    function ackermann2(m, n) {
        var cache = [];
        for (var i = 0; i <= m; ++i) cache[i] = [];

        return function ack(m, n) {
            if (cache[m][n]) return cache[m][n];
            if (m === 0) return (cache[0][n] = n + 1);
            if (n === 0) return (cache[m][0] = ack(m - 1, 1));
            return (cache[m][n] = ack(m - 1, ack(m, n - 1)));
        }(m, n);
    }

    console.log(ackermann2(3, 2));


    // 非递归
    function ackm_nonRecursive(m, n) {
        var top = 1;
        var cache = [];
        for (var i = 0; i <= m; ++i) cache[i] = [];
        cache[1][1] = m;
        cache[1][2] = n;

        while (top) {
            m = cache[top][1];
            n = cache[top][2];
            --top;
            if (top === 0 && m === 0) return n + 1;
            if (m === 0) cache[top][2] = n + 1;
            else if (n === 0) {
                ++top;
                cache[top] = cache[top] || [];
                cache[top][1] = m - 1;
                cache[top][2] = 1;
            } else {
                ++top;
                cache[top] = cache[top] || [];
                cache[top][1] = m - 1;
                ++top;
                cache[top] = cache[top] || [];
                cache[top][1] = m;
                cache[top][2] = n - 1;
            }
        }

        return cache[0][1];
    }

    console.log(ackm_nonRecursive(3, 2));

    function ack4(m, n) {
        for (var i = m; i > 0; --i) {
            if (n === 0) n = 1;
            else n = ack4(i, n - 1);
        }
        return n + 1;
    }

    console.log(ack4(3, 2));

    // 自底向上的动态规划算法
    function ack5(m, n) {
        if (m === 0) return n + 1;
        var val = [];
        var ind = [];
        var i = 1;
        for (; i <= m; ++i) {
            val[i] = -1;
            ind[i] = -2;
        }
        val[0] = 1;
        ind[0] = 0;

        while (ind[m] < n) {
            ++val[0];
            ++ind[0];
            for (i = 0; i < m; ++i) {
                if (ind[i] === 1 && ind[i + 1] < 0) {
                    val[i + 1] = val[0];
                    ind[i + 1] = 0;
                }
                if (val[i + 1] === ind[i]) {
                    val[i + 1] = val[0];
                    ++ind[i + 1];
                }
            }
        }

        return val[m];
    }

    console.log(ack5(3, 2));
})();

// 最长公共子序列
/*
 https://zh.wikipedia.org/wiki/%E6%9C%80%E9%95%BF%E5%85%AC%E5%85%B1%E5%AD%90%E5%BA%8F%E5%88%97

 http://blog.csdn.net/v_JULY_v/article/details/6110269

 用c[i][j]记录序列Xi和Yj的最长公共子序列的长度。
 递归关系：
 0                                       (i = 0, j = 0)
 c[i][j] =  c[i - 1][j - 1] + 1                     (i,j > 0; xi = yj)
 max(c[i][j - 1], c[i - 1][j])           (i,j>0;xi != yj)
 */

function LCSLength(x, y) {
    var m = x.length;
    var n = y.length;
    // c[i][j]存储xi和yj的最长公共子序列的长度
    var b = [];
    // b[i][j]记录c[i
    // ][j]的值是由哪一个子问题的解得到的
    var c = [];
    var i, j;

    for (i = -1; i < m; ++i) {
        c[i] = [];
        b[i] = [];
        c[i][-1] = 0;
    }
    for (i = -1; i < n; ++i) c[-1][i] = 0;

    for (i = 0; i < m; ++i) {
        for (j = 0; j < n; ++j) {
            if (x[i] === y[j]) {
                c[i][j] = c[i - 1][j - 1] + 1;
                b[i][j] = 1;
            } else if (c[i - 1][j] >= c[i][j - 1]) {
                c[i][j] = c[i - 1][j];
                b[i][j] = 2;
            } else {
                c[i][j] = c[i][j - 1];
                b[i][j] = 3;
            }
        }
    }

    console.log(c);

    printLCS(m - 1, n - 1, x, b);
}

function printLCS(i, j, x, b) {
    if (i === -1 || j === -1) return;
    if (b[i][j] === 1) {
        printLCS(i - 1, j - 1, x, b);
        console.log(x[i]);
    } else if (b[i][j] === 2) {
        printLCS(i - 1, j, x, b);
    } else {
        printLCS(i, j - 1, x, b);
    }
}

console.log('\n最长公共子序列：');
LCSLength('ABCBDAB', 'BDCABA');


(function () {
    console.log('最大子段和:');

    // 最大子段和，时间复杂度O(n^3)
    function maxSubSum(arr, n) {
        var sum = 0;
        var besti, bestj;

        for (var i = 0; i < n; ++i) {
            for (var j = i; j < n; ++j) {
                var thisSum = 0;
                for (var k = i; k <= j; ++k) thisSum += arr[k];
                if (sum < thisSum) {
                    sum = thisSum;
                    besti = i;
                    bestj = j;
                }
            }
        }

        return sum;
    }

    console.log(maxSubSum([-2, 11, -4, 13, -5, -2], 4));

    // 时间复杂度O(n^2)
    function maxSubSum2(arr, n) {
        var sum = 0;
        var besti, bestj;

        for (var i = 0; i < n; ++i) {
            var thisSum = 0;
            for (var j = i; j < n; ++j) {
                thisSum += arr[j];
                if (thisSum > sum) {
                    sum = thisSum;
                    besti = i;
                    bestj = j;
                }
            }
        }

        return sum;
    }

    console.log(maxSubSum2([-2, 11, -4, 13, -5, -2], 4));

    // 分支算法，时间复杂度O(nlogn)
    function maxSubSum3(arr, n) {
        return function maxSubSum(arr, left, right) {
            var sum = 0;
            if (left === right) sum = arr[left] > 0 ? arr[left] : 0;
            else {
                var center = Math.floor((left + right) / 2);
                var leftSum = maxSubSum(arr, left, center);
                var rightSum = maxSubSum(arr, center + 1, right);

                var s1 = 0;
                var lefts = 0;
                for (var i = center; i >= left; --i) {
                    lefts += arr[i];
                    if (lefts > s1) s1 = lefts;
                }

                var s2 = 0;
                var rights = 0;
                for (var i = center + 1; i <= right; ++i) {
                    rights += arr[i];
                    if (rights > s2) s2 = rights;
                }

                sum = s1 + s2;
                if (sum < leftSum) sum = leftSum;
                if (sum < rightSum) sum = rightSum;
            }

            return sum;
        }(arr, 0, n - 1);
    }

    console.log(maxSubSum3([-2, 11, -4, 13, -5, -2], 4));

    // 动态规划算法，时间复杂度O(n)
    function maxSubSum4(arr, n) {
        var sum = 0;
        var b = 0;
        for (var i = 0; i < n; ++i) {
            if (b > 0) b += arr[i];
            else b = arr[i];
            if (b > sum) sum = b;
        }

        return sum;
    }

    console.log(maxSubSum4([-2, 11, -4, 13, -5, -2], 4));
})();


/*
 独立任务最优调度问题

 时间复杂度 O(m^2 * n^3)

 给定的2台处理机A和B处理n个作业，找出一个最优调度方案，使2台处理器处理完这n个作业的时间最短。
 */
function taskScheduling(n, tasks1, tasks2) {
    var m = Math.max.apply(null, tasks1.concat(tasks2));
    var mn = m * n;
    var p = [];

    for (var i = 0; i <= mn; ++i) {
        p[i] = [];
        for (var j = 0; j <= mn; ++j) {
            p[i][j] = [];
        }
    }

    for (var i = 0; i <= mn; ++i) {
        for (var j = 0; j <= mn; ++j) {
            p[i][j][0] = true;
            for (var k = 1; k <= n; ++k) p[i][j][k] = false;
        }
    }

    // 设布尔值p(i,j,k)表示前k个作业可以在处理机A用时不超过i时间且在处理机B用时不超过j时间内完成
    for (var k = 1; k <= n; ++k) {
        for (var i = 0; i <= mn; ++i) {
            for (var j = 0; j <= mn; ++j) {
                if (i >= tasks1[k - 1]) p[i][j][k] = p[i - tasks1[k - 1]][j][k - 1];
                if (j >= tasks2[k - 1]) p[i][j][k] = p[i][j][k] || p[i][j - tasks2[k - 1]][k - 1];
            }
        }
    }

    var opt = mn;
    for (var i = 0; i <= mn; ++i) {
        for (var j = 0; j <= mn; ++j) {
            if (p[i][j][n]) {
                var tmp = i > j ? i : j;
                if (tmp < opt) opt = tmp;
            }
        }
    }

    return opt;
}
console.log('taskScheduling: ' + taskScheduling
    (6, [2, 5, 7, 10, 5, 2], [3, 8, 4, 11, 3, 4]));

(function () {
    /*
     电路布线

     http://blog.csdn.net/liufeng_king/article/details/8671407
     */
    // todo
    function maximumDisjointSubsets(arr) {
        var size = [];
        var n = arr.length - 1;
        for (var j = 0; j < arr[1]; ++j) {
            size[1] = [];
            size[1][j] = 0;
        }
        for (var j = arr[1]; j <= n; ++j) size[1][j] = 1;

        for (var i = 2; i < n; ++i) {
            size[i] = [];
            for (var j = 0; j < arr[i]; ++j) size[i][j] = size[i - 1][j] || 0;
            for (var j = arr[i]; j <= n; ++j)
                size[i][j] = Math.max(size[i - 1][j], size[i - 1][arr[i] - 1] + 1) || 0;
        }
        size[n] = [];
        size[n][n] = Math.max(size[n - 1][n], size[n - 1][arr[n] - 1] + 1) || 0;

        console.log('电路布线最大不相交连线数目为：' + size[n][n]);

        var net = traceBack(arr, size);
        console.log(net);

        console.log('最大不相交连线分别为：');
        for (var i = net.length - 1; i >= 0; --i) {
            console.log('(' + net[i] + ', ' + arr[net[i]] + ')');
        }
    }

    function traceBack(arr, size) {
        var n = arr.length - 1;
        var j = n;
        var net = [];
        for (var i = n; i > 1; --i) {
            if (size[i][j] !== size[i - 1][j]) {
                net[net.length] = i;
                j = arr[i] - 1;
            }
        }
        if (j >= arr[1]) net[net.length] = 1;
        return net;
    }

    var c = [0, 8, 7, 4, 2, 5, 1, 9, 3, 10, 6];
    console.log('maximumDisjointSubsets: ');
    maximumDisjointSubsets(c);

})();


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