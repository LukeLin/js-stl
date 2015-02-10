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


2.算法分析
具有n个待排序记录的归并次数是㏒2n，而一趟归并的时间复杂度为O(n)，则整个归并排序的时间复杂度无论是最好还是最坏情况均为O(n㏒2n)。在排序过程中，使用了辅助向量DR，大小与待排序记录空间相同，则空间复杂度为O(n)。归并排序是稳定的。

 */

/**
 * 将有序的sr[s1..e1]和sr[s2..e2]归并为有序的tr[s1..e2]
 * @param sr
 * @param s1
 * @param e1
 * @param s2
 * @param e2
 */
function merge(sr, s1, e1, s2, e2){
    var temp = [];
    var i = s1;
    var j = s2;
    var k = 0;

    while(i <= e1 && j <= e2){
        if(sr[i] < sr[j]) temp[k++] = sr[i++];
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
function mergeSortRecursive(sr, s, t){
    s = s != null ? s : 0;
    t = t != null ? t : sr.length - 1;

    if(s < t) {
        // 将sr[s..t]平分为sr[s..m]和sr[m+1..t]
        var m = ((s + t) / 2) | 0;
        // 递归地将sr[s..m]归并为有序的sr[s..m]
        mergeSortRecursive(sr, s, m);
        // 递归地将sr[m+1..t]归并为有序的sr[m+1..t]
        mergeSortRecursive(sr, m + 1, t);
        // 将sr[s..m]和sr[m+1..t]归并到sr[s..t];
        merge(sr, s, m, m + 1, t);
    }
}
exports.mergeSortRecursive = mergeSortRecursive;


console.log('\n\nmergeSortRecursive:');
var arr = [49, 38, 65, 97, 76, 13, 27, 49, 55, 4];
mergeSortRecursive(arr);
console.log(arr + '');


function mergeSortNonRecursive(sr){
    // l为一趟归并段的段长
    for(var l = 1, len = sr.length; l < len; l *= 2){
        // i为本趟的归并段序号
        for(var i = 0; (2 * i - l) * l < len; ++i){
            // 求出待归并的上下界
            var s1 = 2 * l * i;
            var e1 = s1 + l - 1;
            var s2 = e1 + 1;
            // e2可能超界
            var e2 = s2 + l - 1 > len - 1 ? len - 1 : s2 + l - 1;
            // 归并
            merge(sr, s1, e1, s2, e2);
        }
    }
}
exports.mergeSortNonRecursive = mergeSortNonRecursive;

console.log('\nmergeSortNonRecursive:');
var arr = [49, 38, 65, 97, 76, 13, 27, 49, 55, 4];
mergeSortNonRecursive(arr);
console.log(arr + '');