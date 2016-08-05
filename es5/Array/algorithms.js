'use strict';

/*
 O(1)空间子数组换位算法

 设a[0..n-1]是一个n个元素的数组，k(1<=k<=n-1)是一个非负整数。使设计一个算法将子数组a[0..k-1]与a[k..n-1]换位。要求算法在最坏情况下耗时O(n)，且只用到O(1)的辅助空间。
 */

// Solution 1：
// 算法1： 循环换位算法

// 向前循环换位
function forward(a, k) {
    var n = a.length;

    for (var i = 0; i < k; ++i) {
        var temp = a[0];
        for (var j = 1; j < n; ++j) {
            a[j - 1] = a[j];
        }a[n - 1] = temp;
    }
}

// 向后循环换位
function backward(a, k) {
    var n = a.length;

    for (var i = k; i < n; ++i) {
        var temp = a[n - 1];
        for (var j = n - 1; j > 0; --j) {
            a[j] = a[j - 1];
        }a[0] = temp;
    }
}

// 选择较小的数组块进行循环
function arrExchange(a, k) {
    var n = a.length;
    if (k > n - k) backward(a, k);else forward(a, k);
}

var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
arrExchange(arr, 4);
console.log(arr + '');

/*
 最坏情况下，算法1所需的元素移动次数为min(k, n - k) * (n + 1)。算法只用到O(1)的辅助空间。当k = n / 2时，计算时间非线性。
 */

// Solution 2:
// 算法二： 次反转算法

// 将数组a[i..j]反转
function reverse(a, i, j) {
    while (i < j) {
        var _ref = [a[j], a[i]];
        a[i] = _ref[0];
        a[j] = _ref[1];

        ++i;
        --j;
    }
}

/*
 设a[0..k-1]为U，a[k..n-1]为V，换位算法要求将UV变换为VU。三次反转算法先将U反转为U'，再将V反转为V'，最后将U'V'反转为VU。
 */
function arrExchange2(a, k) {
    var n = a.length;
    reverse(a, 0, k - 1);
    reverse(a, k, n - 1);
    reverse(a, 0, n - 1);
}

var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
arrExchange2(arr, 4);
console.log(arr + '');

/*
 三次反转算法用了Math.floor(k / 2) + Math.floor((n - k) / 2) + Math.floor( n / 2) <= n次数组单元交换运算，每个数组单元交换运算需要三次元素移动。因此最坏情况下，三次反转算法用了3n次元素移动。算法显然只用到O(1)的辅助空间。
 */

// Solution 3:
// 算法3： 排列循环算法

/*
 循环置换分解定理： 对于给定数组a[0..n-1]向后循环换位n-k位运算，可分解为恰好gcd(k,n-k)个循环置换，且0,...,gcd(k, n - k) - 1中每个数恰属于下一个循环置换，其中gcd
 (x, y)表示整数x和y的最大公因数。
 */

function arrExchange3(array, k) {
    var n = array.length;
    var p = void 0;
    // 求n和k的最大公约数
    for (var i = 1; i <= k; ++i) {
        if (n % i === 0 && k % i === 0) p = i;
    }for (var _i = 0; _i < p; ++_i) {
        var j = _i;
        var l = (_i + k) % n;
        var temp = array[_i];

        while (l !== _i) {
            array[j] = array[l];
            // 循环右移一步
            j = l;
            l = (j + k) % n;
        }

        array[j] = temp;
    }

    return array;
}

var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
arrExchange3(arr, 4);
console.log(arr + '');

/*
 上述算法总共移动元素n + gcd(k , n - k)次，算法显然只用到O(1)的辅助空间。
 */