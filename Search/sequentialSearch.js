/*
 静态查找

 线性表是查找表最简单的一种组织方式

 顺序查找(Sequential Search)
 1  查找思想
 从表的一端开始逐个将记录的关键字和给定K值进行比较，若某个记录的关键字和给定K值相等，查找成功；否则，若扫描完整个表，仍然没有找到相应的记录，则查找失败。

 2   算法分析
 不失一般性，设查找每个记录成功的概率相等，即Pi=1/n；查找第i个元素成功的比较次数Ci=n-i+1 ；
 ◆ 查找成功时的平均查找长度ASL：(n+1)/2
 ◆  包含查找不成功时：查找失败的比较次数为n+1，若成功与不成功的概率相等，对每个记录的查找概率为Pi=1/(2n)，则平均查找长度ASL：3(n+1)/4
 */

function sequentialSearch(sTable, key) {
    for (var i = sTable.length - 1; i >= 0 && sTable[i] !== key; --i);
    return i;
}

console.log(sequentialSearch([1, 2, 3, 4, 5], 6));  // -1
