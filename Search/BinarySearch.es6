/*
 折半查找(Binary Search)

 折半查找又称为二分查找，是一种效率较高的查找方法。
 前提条件：查找表中的所有记录是按关键字有序(升序或降序) 。
 查找过程中，先确定待查找记录在表中的范围，然后逐步缩小范围(每次将待查记录所在区间缩小一半)，直到找到或找不到记录为止。

 1  查找思想
 用Low、High和Mid表示待查找区间的下界、上界和中间位置指针，初值为Low=0，High=n - 1。
 ⑴  取中间位置Mid：Mid=Math.floor((Low+High)/2)；
 ⑵  比较中间位置记录的关键字与给定的K值：
 ①  相等： 查找成功；
 ②  大于：待查记录在区间的前半段，修改上界指针： High=Mid-1，转⑴ ；
 ③  小于：待查记录在区间的后半段，修改下界指针：Low=Mid+1，转⑴ ；
 直到越界(Low>High)，查找失败。

 2  算法分析
 ①  查找时每经过一次比较，查找范围就缩小一半，该过程可用一棵二叉树表示：
 ◆ 根结点就是第一次进行比较的中间位置的记录；
 ◆ 排在中间位置前面的作为左子树的结点；
 ◆ 排在中间位置后面的作为右子树的结点；
 对各子树来说都是相同的。这样所得到的二叉树称为判定树(Decision Tree)。
 ②  将二叉判定树的第Math.floor(Math.log(2, n))+1层上的结点补齐就成为一棵满二叉树，深度不变，h= Math.floor(Math.log(2, n + 1)) 。
 ③  由满二叉树性质知，第i 层上的结点数为Math.pow(2, i-1)(i<=h) ，设表中每个记录的查找概率相等，即Pi=1/n，查找成功时的平均查找长度ASL：
 (n+1)/n*Math.log(2,n+1)-1
 当n很大 (n>50)时， ASL≈ Math.log(2,n+1)-1。


 时间复杂度O(logn)
 */

// 非递归式
function binarySearch(sTable, key) {
    let low = 0;
    let high = sTable.length - 1;

    while(low <= high){
        let  mid = (low + high) >> 1;
        let elem = sTable[mid];

        if(elem === key) return mid;
        else if(elem < key) low = mid + 1;
        else high = mid - 1;
    }

    return -1;
}

console.log('binarySearch: ');
console.log(binarySearch([1, 2, 3, 4, 5], 1));  // 0

// 递归式
function binarySearchRecursive(sTable, key, low = 0, high = sTable.length - 1) {
    if(low > high) return -1;

    let mid = (low + high) >> 1;
    let elem = sTable[mid];

    if(elem === key) return mid;
    else if(elem < key) return binarySearchRecursive(sTable, mid + 1, high);
    else return binarySearchRecursive(sTable, low, mid - 1);
}

console.log('binarySearchRecursive: ');
console.log(binarySearchRecursive([1, 2, 3, 4, 5], 1)); // 0
console.log(binarySearchRecursive([1, 2, 3, 4, 5], 6)); // -1
