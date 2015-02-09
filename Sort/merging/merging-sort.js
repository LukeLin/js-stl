/**
 * Created by ldp on 2015/2/7.
 */

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

 */

/**
 * 将有序的sr[i..m]和sr[m + 1..n]归并为有序的tr[i..n]
 * @param {Array} sr
 * @param {Array} tr
 * @param {Number} i
 * @param {Number} m
 * @param {Number} n
 */
function merge(sr, tr, i, m, n){
    for(var j = m + 1, k = i; i <= m && j <= n; ++k){
        if(sr[i] < sr[j]) tr[k] = sr[i++];
        else tr[k] = sr[j++];
    }

    while(i <= m) tr[k++] = sr[i++];
    while(j <= n) tr[k++] = sr[j++];
}

/**
 * 2-路归并排序递归算法
 * @param {Array} sr
 * @param {Array} tr1
 * @param {Number} s
 * @param {Number} t
 */
function mergeSortRecursive(sr, tr1, s, t){
    tr1 = tr1 || sr;
    s = s != null ? s : 0;
    t = t != null ? t : sr.length;

    if(s === t) tr1[s] = sr[s];
    else {
        // 将sr[s..t]平分为sr[s..m]和sr[m+1..t]
        var m = Math.floor((s + t) / 2);
        var tr2 = [];
        // 递归地将sr[s..m]归并为有序的sr[s..m]
        mergeSortRecursive(sr, tr2, s, m);
        // 递归地将sr[m+1..t]归并为有序的sr[m+1..t]
        mergeSortRecursive(sr, tr2, m + 1, t);
        // 将sr[s..m]和sr[m+1..t]归并到sr[s..t];
        merge(tr2, tr1, s, m, t);
    }
}

// todo bug exists
console.log('\n\nmergeSortRecursive:');
var arr = [49, 38, 65, 97, 76, 13, 27, 49, 55, 04];
mergeSortRecursive(arr);
console.log(arr + '');