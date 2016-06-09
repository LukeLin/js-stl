/**
 * Created by ldp on 2015/2/7.
 */
import LinkedList from '../../List/LinkedList';
import Queue from '../../Queue/Queue';
var defaultCompare = require('../defaultComparision');

/*
 归并排序

 归并(Merging) ：是指将两个或两个以上的有序序列合并成一个有序序列。若采用线性表(无论是那种存储结构)易于实现，其时间复杂度为O(m+n) 。
 归并思想实例：两堆扑克牌，都已从小到大排好序，要将两堆合并为一堆且要求从小到大排序。
 ◆  将两堆最上面的抽出(设为C1，C2)比较大小，将小者置于一边作为新的一堆(不妨设C1<C2)；再从第一堆中抽出一张继续与C2进行比较，将较小的放置在新堆的最下面；
 ◆ 重复上述过程，直到某一堆已抽完，然后将剩下一堆中的所有牌转移到新堆中。

 1   排序思想
 ①  初始时，将每个记录看成一个单独的有序序列，则n个待排序记录就是n个长度为1的有序子序列；
 ②  对所有有序子序列进行两两归并，得到n/2个长度为2或1的有序子序列——一趟归并；
 ③  重复② ，直到得到长度为n的有序序列为止。

 上述排序过程中，子序列总是两两归并，称为2-路归并排序。其核心是如何将相邻的两个子序列归并成一个子序列。设相邻的两个子序列分别为：
 {R[k], R[k+1], …, R[m]}和{R[m+1], R[m+2],…, R[h]}，将它们归并为一个有序的子序列：
 {DR[l], DR[l+1], …, DR[m], DR[m+1], …, DR[h] }

 例：设有9个待排序的记录，关键字分别为23, 38, 22, 45, 23, 67, 31, 15, 41，归并排序的过程。
 初始关键字: [23]   [38]   [22]   [45]   [23]   [67]   [31]   [15]   [41]
              |      |      |      |      |      |      |      |
              --------      --------      --------      --------
 一趟归并后: [23    38]    [22     45]    [23     67]    [15     31]   [41]
                 |              |             |              |
                 ---------------               ---------------
 二趟归并后: [22     23      38     45]    [15     23     31     67]    [41]
                        |                              |
                        --------------------------------
 三趟归并后: [15     22      23     23     31     38     45     67]    [41]
                                       |                                |
                                       ----------------------------------
 四趟归并后: [15     22      23     23     31     38     41     45     67


 2  一趟归并排序
 一趟归并排序都是从前到后，依次将相邻的两个有序子序列归并为一个，且除最后一个子序列外，其余每个子序列的长度都相同。设这些子序列的长度为d，则一趟归并排序的过程是：
 从j=0开始，依次将相邻的两个有序子序列
 R[j…j+d-1]和R[j+d…j+2d-1]进行归并；每次归并两个子序列后，j后移动2d个位置，即
 j=j+2d；若剩下的元素不足两个子序列时，分以下两种情况处理：
 ①  剩下的元素个数>d：再调用一次上述过程，将一个长度为d的子序列和不足d的子序列进行归并；
 ②  剩下的元素个数≤d：将剩下的元素依次复制到归并后的序列中。


 3.算法分析
具有n个待排序记录的归并次数是㏒2n，而一趟归并的时间复杂度为O(n)，则整个归并排序的时间复杂度无论是最好还是最坏情况均为O(n㏒2n)。在排序过程中，使用了辅助向量DR，大小与待排序记录空间相同，则空间复杂度为O(n)。归并排序是稳定的。

 */

var nCount = 0;
var nonRecursiveCount = 0;
var recursiveCount = 0;

/**
 * 将有序的sr[s1..e1]和sr[s2..e2]归并为有序的tr[s1..e2]
 * @param sr
 * @param s1
 * @param e1
 * @param e2
 */
function merge(sr, s1, e1, e2, comp){
    var temp = [];
    var i = s1;
    var j = e1 + 1;
    var k = 0;

    while(i <= e1 && j <= e2){
        if(comp(sr[i], sr[j]) < 0) temp[k++] = sr[i++];
        else temp[k++] = sr[j++];
    }
    while(i <= e1) temp[k++] = sr[i++];
    while(j <= e2) temp[k++] = sr[j++];

    // 复制回去
    for(i = s1, k = 0; i <= e2; ++i, ++k) sr[i] = temp[k];
}

/**
 * 2-路归并排序递归算法
 * @param {Array} sr
 * @param {Number} s
 * @param {Number} t
 */
function mergeSortRecursive(sr, s, t, comp){
    if (comp == null) comp = defaultCompare;
    if(s == null) s = 0;
    if(t == null) t = sr.length - 1;

    if(s >= t) return;

    // 将sr[s..t]平分为sr[s..m]和sr[m+1..t]
    var m = (s + t) >> 1;
    // 递归地将sr[s..m]归并为有序的sr[s..m]
    mergeSortRecursive(sr, s, m, comp);
    // 递归地将sr[m+1..t]归并为有序的sr[m+1..t]
    mergeSortRecursive(sr, m + 1, t, comp);
    // 将sr[s..m]和sr[m+1..t]归并到sr[s..t];
    merge(sr, s, m, t, comp);
}
exports.mergeSortRecursive = mergeSortRecursive;


console.log('\n\nmergeSortRecursive:');
var arr = [49, 38, 65, 97, 76, 13, 27, 49, 55, 4];
mergeSortRecursive(arr);
console.log(arr + '');



function mergeSortNonRecursive(sr, comp){
    if (comp == null) comp = defaultCompare;
    var j, k;
    for(var d = 1, n = sr.length - 1; d < n; d *= 2) {
        // 一趟归并排序算法
        j = 0;

        // 子序列两两归并
        while((k = (j + 2 * d - 1)) < n){
            merge(sr, j,  j + d - 1, k, comp);
            j = k + 1;
        }

        // 剩余元素个数超过一个子序列长度
        if(j + d - 1 < n) merge(sr, j, j + d - 1, n, comp);
        // 剩余子序列复制
        else merge(sr, j, n, n, comp);
    }
}
exports.mergeSortNonRecursive = mergeSortNonRecursive;

console.log('\nmergeSortNonRecursive:');
var arr = [49, 38, 65, 97, 76, 13, 27, 49, 55, 4];
mergeSortNonRecursive(arr);
console.log(arr + '');


// 自然合并排序
// http://www.cnblogs.com/liushang0419/archive/2011/09/19/2181476.html
// http://www.cnblogs.com/lanke/archive/2013/01/15/2860487.html
/*
自然归并是归并排序的一个变形，效率更高一些，可以在归并排序非递归实现的基础上进行修改.对于已经一个已经给定数组a,通常存在多个长度大于1的已经自然排好的子数组段,因此用一次对数组a的线性扫描就可以找出所有这些排好序的子数组段,然后再对这些子数组段俩俩合并.
 */


// 扫描得到子串的函数
function pass(sqList, rec, comp){
    var num = 0;
    rec[num++] = 0;

    for(var i = 1, len = sqList.length; i < len; ++i){
        if(comp(sqList[i], sqList[i + 1]) > 0) rec[num++] = i + 1;
    }
    rec[num++] = len;

    return num;
}

function natureMergeSort(sqList, comp){
    if (comp == null) comp = defaultCompare;
    var rec = [];

    //num=2说明已经排好序了
    //每循环一次，进行一次pass()操作
    for(var num = pass(sqList, rec, comp); num !== 2; num = pass(sqList, rec, comp)){
        for(var i = 0; i + 2 < num; i += 2) {
            merge(sqList, rec[i], rec[i + 1] - 1, rec[i + 2] - 1, comp);
        }
    }
}

exports.natureMergeSort = natureMergeSort;

console.log('\nnatureMergeSort:');
var arr = [49, 38, 65, 97, 76, 13, 27, 49, 55, 4];
natureMergeSort(arr);
console.log(arr + '');


console.log(recursiveCount);
console.log(nonRecursiveCount);
console.log(nCount);

// 双向自然合并排序算法
/*
双向自然合并排序是根据欲排序数据局部不是升序就是降序的自然有序特点,先线性扫描出自然有序的子数组段,再进行合并排序.扫描时的有序数段长度越长,段数越少,对应合并树的层数就会越少,算法的效率越高.
 */
var naturalMergeSort = (function(){
    return naturalMergeSort;

    function naturalMergeSort(a, comp){
        if (comp == null) comp = defaultCompare;
        var b = [];
        var n = a.length;
        while(!mergeRuns(a, b, n, comp));
    }

    function mergeRuns(a, b, n, comp){
        var i = 0;
        var k = 0;
        var asc = true;
        var x;

        while(i < n){
            k = i;
            // 找到最后一个递增序列元素
            do x = a[i++]; while(i < n && comp(x, a[i]) <= 0);
            // 找到最后一个递减序列元素
            while(i < n && comp(x, a[i]) >= 0) x = a[i++];
            // 归并递增序列和递减序列，结果可能递增或递减
            merge(a, b, k, i - 1, asc, comp);
            asc = !asc;
        }

        // 当k等于0时代表a已经排好序了
        return k === 0;
    }

    function merge(a, b, low, high, asc, comp){
        var k = asc ? low : high;
        var c = asc ? 1 : -1;
        var i = low;
        var j = high;

        while(i <= j){
            if(comp(a[i], a[j]) <= 0) b[k] = a[i++];
            else b[k] = a[j--];
            k += c;
        }
        for(i = k = low, j = high; i <= j; ++i, ++k) a[i] = b[k];
    }
})();

exports.naturalMergeSort = naturalMergeSort;

console.log('\nnaturalMergeSort:');
var arr = [49, 38, 65, 97, 76, 13, 27, 49, 55, 4];
naturalMergeSort(arr);
console.log(arr + '');


// 链表存储结构的自然合并排序
var linkedListNaturalMergeSort = (function(){
    return mergeSort;

    function mergeSort(linkedlist, needReplace, comp){
        if (comp == null) comp = defaultCompare;
        if(!linkedlist) return linkedlist;

        var queue = new Queue();
        var list = linkedlist.head;

        if(!list || !list.next) return linkedlist;

        needReplace = needReplace == null ? true : needReplace;
        var u = list;
        var t = list;
        var v;
        // 将递增的结点放入到队列中（会被切断）
        for(; t; t = u){
            while(u && u.next && comp(u.data, u.next.data) <= 0)
                u = u.next;
            v = u;
            u = u.next;
            v.next = null;
            queue.enQueue(t);
        }

        t = queue.deQueue();
        // 合并结点
        while(queue.size){
            queue.enQueue(t);
            var a = queue.deQueue();
            var b = queue.deQueue();
            t = merge(a, b, comp);
        }

        if(needReplace) linkedlist.head = t;

        return t;
    }

    function merge(a, b, comp){
        var c = new LinkedList();
        var head = {data: null, next: null};
        c.head = head;
        c = c.head;

        while(a && b){
            if(comp(a.data, b.data) < 0) {
                c.next = a;
                c = a;
                a = a.next;
            } else {
                c.next = b;
                c = b;
                b = b.next;
            }
        }

        c.next = a ? a : b;

        return head.next;
    }
})();
exports.linkedListNaturalMergeSort = linkedListNaturalMergeSort;

var arr = [49, 38, 65, 97, 76, 13, 27, 49, 55, 4];
var linkedList = new LinkedList(arr);
linkedListNaturalMergeSort(linkedList);
console.log(linkedList + '');