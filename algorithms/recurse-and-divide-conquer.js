/**
 * Created by Luke on 2015/2/26.
 */

// Recurse

// 全排列问题full permutation
function perm(list, k, m){
    var i;
    if(k === m) {
        var s = '';
        for(i = 0; i <= m; ++i)
            s += ' ' + list[i];
        console.log(s);
    } else {
        for(i = k; i <= m; ++i){
            swap(list, k, i);
            perm(list, k + 1, m);
            swap(list, k, i);
        }
    }
}

function swap(list, i, j){
    var temp = list[i];
    list[i] = list[j];
    list[j] = temp;
}

var arr = [1, 2, 3];
perm(arr, 0, arr.length - 1);


/**
 * 整数划分问题
 * 在正整数n的所有不同的划分中，求最大加数不大于m的划分次数
 * @param n
 * @param m
 * @returns {Number}
 */
function intDivide(n, m){
    if(n === 0 || m === 0) return 0;
    if(n === 1 || m === 1) return 1;
    if(n < m) return intDivide(n, n);
    if(n === m) return intDivide(n, n - 1) + 1;
    return intDivide(n, m - 1) + intDivide(n - m, m);
}
console.log(intDivide(6, 6));



// Divide and conquer

// the same as the randomizedPartition of quickSort
function randomizedPartition(sqList, low, high){
    var temp;
    var i = low;
    var j = high + 1;
    var rand = Math.random() * (j - i) | 0 + i;

    temp = sqList[low];
    sqList[low] = sqList[rand];
    sqList[rand] = temp;

    var x = sqList[low];

    while(1){
        while(sqList[++i] < x && i < high);
        while(sqList[--j] > x);
        if(i >= j) break;
        temp = sqList[i];
        sqList[i] = sqList[j];
        sqList[j] = temp;
    }

    sqList[low] = sqList[j];
    sqList[j] = x;

    return j;
}

// 线性时间内找到数组第k小的元素
function randomizedSelect(arr, low, high, k){
    if(low === high) return arr[low];
    console.log(low, high);

    var i = randomizedPartition(arr, low, high);
    var j = i - low + 1;

    if(k <= j) return randomizedSelect(arr, low, i, k);
    else return randomizedSelect(arr, i + 1, high, k - j);
}

var arr = [9, 8, 5, 2, 3, 6, 1, 7, 4];
console.log(randomizedSelect(arr, 0, arr.length - 1, 5));
console.log(arr + '');


// 循环日程赛问题
/**
 * 对n = 2的k次方个运动员进行循环日程赛
 * 1），每个选手要与其他n - 各选手比赛
 * 2），每个选手一天只能赛一场
 * 3），比赛一共进行n - 1天
 * @param k
 */
function cyclicSchedulingGameTable(k){
    var table = [];
    var n = 1;

    for(var i = 0; i < k; ++i) n *= 2;
    for(i = 0; i < n; ++i) table[i] = [];
    for(i = 0; i < n; ++i) table[0][i] = i + 1;

    var m = 1;
    for(var s = 0; s < k; ++s){
        n /= 2;
        for(var t = 1; t <= n; ++t)
            for(i = m ; i < 2 * m; ++i)
                for(var j = m; j < 2 * m; ++j) {
                    var p = j + (t - 1) * m * 2;
                    table[i][p] = table[i - m][p - m];
                    table[i][p - m] = table[i - m][p];
                }
        m *= 2;
    }

    return table;
}
var table = cyclicSchedulingGameTable(3);
console.log(table);


/*
设a[0..n-1]是已排好序的数组，请改写二分搜索算法，使得当搜索元素x不在数组中时，返回小于x的最大元素位置i和大于x的最小元素位置j。当搜索元素在数组中时，i和j相同，均为x在数组中的位置。
 */

function specifiedBinarySearch(arr, x){
    var low = 0;
    var high = arr.length - 1;

    while(low <= high){
        var middle = (low + high) >> 1;

        if(arr[middle] === x) return middle;
        else if(arr[middle] > x) high = middle - 1;
        else low = middle + 1;
    }

    return [high, low];
}

var arr = [1,  3,  5,  7,  9, 10];
console.log(specifiedBinarySearch(arr, 6));
console.log(specifiedBinarySearch(arr, 5));

