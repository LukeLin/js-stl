/*
 Fibonacci查找

 Fibonacci查找方法是根据Fibonacci数列的特点对查找表进行分割。Fibonacci数列的定义是：
 F(0)=0，F(1)=1，F(j)=F(j-1)+F(j-2) 。

 1  查找思想
 设查找表中的记录数比某个Fibonacci数小1，即设n=F(j)-1。用Low、High和Mid表示待查找区间的下界、上界和分割位置，初值为Low=0，High=n - 1。
 ⑴   取分割位置Mid：Mid=F(j-1) ；
 ⑵   比较分割位置记录的关键字与给定的K值：
 ① 相等： 查找成功；
 ②  大于：待查记录在区间的前半段(区间长度为F(j-1)-1)，修改上界指针： High=Mid-1，转⑴ ；
 ③  小于：待查记录在区间的后半段(区间长度为F(j-2)-1)，修改下界指针：Low=Mid+1，转⑴ ；直到越界(Low>High)，查找失败。

 2  算法实现
 在算法实现时，为了避免频繁计算Fibonacci数，可用两个变量f1和f2保存当前相邻的两个Fibonacci数，这样在以后的计算中可以依次递推计算出。

 由算法知，Fibonacci查找在最坏情况下性能比折半查找差，但平均搜索次数少于折半查找，而且折半查找要求记录按关键字有序；Fibonacci查找的优点是分割时只需进行加、减运算。

 */

function fib(n) {
    if (n === 0) return 0;
    if (n === 1) return 1;
    var f;
    var f0 = 0;
    var f1 = 1;
    for (var i = 2; i <= n; ++i) {
        f = f0 + f1;
        f0 = f1;
        f1 = f;
    }
    return f;
}

/**
 * 在有序表ST中用Fibonacci方法查找关键字为key的记录
 * @param sTable
 * @param key
 * @param n
 */
function fibonacciSearch(sTable, key, n) {
    n = n || sTable.length;
    var low = 0;
    var high = n - 1;
    var f1 = fib(n);
    var f2 = fib(n - 1);

    while (low <= high) {
        var mid = low + f1 - 1;
        if (sTable[mid] === key) return mid;
        else if (key < sTable[mid]) {
            high = mid - 1;
            f2 = f1 - f2;
            f1 = f1 - f2;
        } else {
            low = mid + 1;
            f1 = f1 - f2;
            f2 = f2 - f1;
        }
    }
    return -1;
}

console.log('fibonacciSearch: ');
console.log(fibonacciSearch([1, 2, 3, 4, 5], 5)); // 4
console.log(fibonacciSearch([1, 2, 3, 4, 5], 6)); // -1
