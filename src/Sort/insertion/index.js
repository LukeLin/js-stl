/**
 * Created by Luke on 2015/2/2.
 */

import StaticLinkedList from '../../List/StaticLinkedList';
var defaultCompare = require('../defaultComparision');

/*
 插入排序

 采用的是以 “玩桥牌者”的方法为基础的。即在考察记录Ri之前，设以前的所有记录R1, R2 ,…., Ri-1已排好序，然后将Ri插入到已排好序的诸记录的适当位置

 最基本的插入排序是直接插入排序(Straight Insertion Sort) 。


 直接插入排序

 1  排序思想
 将待排序的记录Ri，插入到已排好序的记录表R1, R2 ,…., Ri-1中，得到一个新的、记录数增加1的有序表。 直到所有的记录都插入完为止。
 设待排序的记录顺序存放在数组R[1…n]中，在排序的某一时刻，将记录序列分成两部分：
 ◆ R[1…i-1]：已排好序的有序部分；
 ◆ R[i…n]：未排好序的无序部分。
 显然，在刚开始排序时，R[1]是已经排好序的。

 2.算法实现

 3.算法分析
 ⑴ 最好情况：若待排序记录按关键字从小到大排列(正序)，算法中的内循环无须执行，则一趟排序时：关键字比较次数1次，记录移动次数2次(R[i]→R[0], R[0]→R[j+1])。
 则整个排序的关键字比较次数和记录移动次数分别是：
 比较次数：n - 1          移动次数： 2 * (n - 1)

 ⑵ 最坏情况：若待排序记录按关键字从大到小排列(逆序)，则一趟排序时：算法中的内循环体执行i-1，关键字比较次数i次，记录移动次数i+1。
 则就整个排序而言：
 比较次数： (n - 1) * (n + 1) / 2     移动次数: (n - 1) * (n + 4) / 2

 一般地，认为待排序的记录可能出现的各种排列的概率相同，则取以上两种情况的平均值，作为排序的关键字比较次数和记录移动次数，约为n2/4，则复杂度为O(n2) 。


 */

function straightInsertSort(sqList, comp) {
    if (comp == null) comp = defaultCompare;
    for (var i = 1, len = sqList.length; i < len; ++i) {
        // 设置哨兵, 当设置sqList[-1] = sqList[i]时，经测试效率更慢
        // 因为js里面的变量作用域在函数内的
        var temp = sqList[i];
        // 查找插入位置，并将记录后移
        for(var j = i - 1; j >= 0 && comp(temp, sqList[j]) < 0; --j)
            sqList[j + 1] = sqList[j];

        // 插入到正确位置
        sqList[j + 1] = temp;
    }
}
exports.straightInsertSort = straightInsertSort;

var a = [7, 4, -2, 19, 13, 6];
straightInsertSort(a);
console.log(a + '');


/*
 其它插入排序

 1  折半插入排序
 当将待排序的记录R[i] 插入到已排好序的记录子表R[1…i-1]中时，由于R1, R2 ,…, Ri-1已排好序，则查找插入位置可以用“折半查找”实现，则直接插入排序就变成为折半插入排序。

 从时间上比较，折半插入排序仅仅减少了关键字的比较次数，却没有减少记录的移动次数，故时间复杂度仍然为O(n2) 。


 */

function binaryInsertSort(sqList, comp) {
    if (comp == null) comp = defaultCompare;
    for (var i = 1, len = sqList.length; i < len; ++i) {
        var temp = sqList[i];
        var low = 0;
        var high = i - 1;

        while (low <= high) {
            var mid = (low + high) >> 1;

            if (comp(temp, sqList[mid]) < 0) high = mid - 1;
            else low = mid + 1;
        }

        for (var j = i - 1; j >= high + 1; --j) {
            sqList[j + 1] = sqList[j];
        }

        sqList[high + 1] = temp;
    }
}
exports.binaryInsertSort = binaryInsertSort;

var b = [30, 13, 70, 85, 39, 42, 6, 20];
binaryInsertSort(b);
console.log(b + '');


/*
 2-路插入排序

 是对折半插入排序的改进，以减少排序过程中移动记录的次数。附加n个记录的辅助空间，方法是：
 ①  另设一个数组d，L[1]赋给d[1]，将d[1]看成是排好序的序列中中间位置的记录；
 ②  分别将L[ ]中的第i个记录依次插入到d[1]之前或之后的有序序列中，具体方法：
 ◆  L[i].key<d[1].key： L[i]插入到d[1]之前的有序表中；
 ◆ L[i].key≥d[1].key： L[i]插入到d[1]之后的有序表中；
 关键点：实现时将向量d看成是循环向量，并设两个指针first和final分别指示排序过程中得到的有序序列中的第一个和最后一个记录。

 在2-路插入排序中，移动记录的次数约为n2/8 。但当L[1]是待排序记录中关键字最大或最小的记录时，2-路插入排序就完全失去了优越性。
 */

function path2InsertSort(sqList, comp) {
    if (comp == null) comp = defaultCompare;
    var d = [sqList[0]];
    // first、final分别指示d中排好序的记录的第1个和最后1个记录的位置。
    var first = 0;
    var final = 0;

    for (var i = 1, len = sqList.length; i < len; ++i) {
        var item = sqList[i];

        // 待插入记录小于d中最小值，插入到d[first]之前（不需移动d数组的元素）。
        if (comp(item, d[first]) < 0) {
            first = (first - 1) % len;
            d[first] = item;
        }
        // 待插入记录大于d中最小值，插入到d[final]之后（不需移动d数组的元素）。
        else if (comp(item, d[final]) > 0) {
            d[++final] = item;
        }
        // 待插入记录大于d中最小值，小于d中最大值，插入到d的中间（需要移动d数组的元素）。
        else {
            // 移动d尾部元素以便按序插入记录。
            var j = final++;
            while (comp(item, d[j]) < 0) {
                d[(j + 1) % len] = d[j];
                j = (j - 1) % len;
            }
            d[(j + 1) % len] = item;
        }
    }

    // 循环把d赋给sqList
    for (i = 0; i < len; ++i) {
        sqList[i] = d[(i + first) % len];
    }
}
exports.path2InsertSort = path2InsertSort;

var c = [49, 38, 65, 13, 97, 27, 76, 5, 100, 78, 15, 15, 20];
path2InsertSort(c);
console.log(c + '');


/*
表插入排序

前面的插入排序不可避免地要移动记录，若不移动记录就需要改变数据结构。
初始化：下标值为0的分量作为表头结点，关键字取为最大值，各分量的指针值为空；
①  将静态链表中数组下标值为1的分量(结点)与表头结点构成一个循环链表；
② i=2 ，将分量R[i]按关键字递减插入到循环链表；
③  增加i ，重复②，直到全部分量插入到循环链表。

和直接插入排序相比，不同的是修改2n次指针值以代替移动记录，而关键字的比较次数相同，故时间复杂度为O(n2)。

表插入排序得到一个有序链表，对其可以方便地进行顺序查找，但不能实现随机查找。为了能实现有序表的折半查找根据需要，可以对记录进行重排.

重排记录的做法是：顺序扫描有序链表，将链表中第i个结点移动至数组的第i个分量中。

例子中，链表中第一个结点，即关键字最小的结点是数组中下标为6的分量，其中记录应移至数组的第一个分量，则将list[1]和list[6]互换，并为了不中断静态链表中的链，即在继续顺链表扫描时仍能找到互换之前在list[1]中的结点，令互换之后的list[1]中的游标改为6

推广至一般情况，若第i个最小关键字的结点是数组中下标为p且p > i的分量，则互换list[i]和list[p]，且令list[i]中的游标改为p；
由于此时数组中所有小于i的分量中已是到位记录，则当p<i时，应顺链继续查找直到p>=i为止。
 */


// 表插入排序
function staticLinkedListInsertSort(sllist, comp) {
    if (comp == null) comp = defaultCompare;
    // 构成循环链表
    sllist[0].cur = 1;
    sllist[1].cur = 0;

    var p, q;
    for (var i = 2, len = sllist.length; i <= len; ++i) {
        p = 0;
        var x = sllist[i].data;

        while (sllist[p].cur && comp(sllist[sllist[p].cur].data, x) < 0)
            p = sllist[p].cur;

        // 当遇到大于当前关键字的下标时，插入到其前驱和后继的中间
        q = sllist[p].cur;
        sllist[p].cur = i;
        sllist[i].cur = q;
    }
}
exports.staticLinkedListInsertSort = staticLinkedListInsertSort;

// 重排静态链表，静态链表下标已排好序
function arrange(sllist) {
    var p = sllist[0].cur;

    for (var i = 1, len = sllist.length; i < len; ++i) {
        // 第i个记录在list中的当前位置应不小于i
        // 找到第i个记录，并用p指示其在list中当前位置
        while (p < i) p = sllist[p].cur;
        // q指向尚未调整的表尾
        var q = sllist[p].cur;

        if (p !== i) {
            // 交换记录，使第i个记录到位
            var temp = sllist[p];
            sllist[p] = sllist[i];
            sllist[i] = temp;
            // 指向被移走的记录，使得以后可有while循环找到
            sllist[i].cur = p;
        }

        // p指向尚未调整的表尾
        p = q;
    }
}


var arr = [49, 38, 65, 97, 76, 13, 27, 52];
var d = new StaticLinkedList();
d.create(arr);
staticLinkedListInsertSort(d);
console.log(d);
arrange(d);
console.log(d);


/*
希尔排序

希尔排序(Shell Sort，又称缩小增量法)是一种分组插入排序方法。

1  排序思想
①   先取一个正整数d1(d1<n)作为第一个增量，将全部n个记录分成d1组，把所有相隔d1的记录放在一组中，即对于每个k(k=1, 2,  … d1)，R[k], R[d1+k], R[2d1+k] , …分在同一组中，在各组内进行直接插入排序。这样一次分组和排序过程称为一趟希尔排序；
②   取新的增量d2<d1，重复①的分组和排序操作；直至所取的增量di=1为止，即所有记录放进一个组中排序为止。

2  排序示例
设有10个待排序的记录，关键字分别为9, 13, 8, 2, 5, 13, 7, 1, 15, 11，增量序列是5, 3, 1，希尔排序的过程:
初始关键字序列:    9     13     8      2      5      13      7      1      15      11
第一趟排序后:      9     7      1      2      5      13      13     8      15      11
第二趟排序后:      2     5      1      9      7      13      11     8      15      13
第三趟排序后:      1     2      5      7      8      9      11     13      13      15


希尔排序的分析比较复杂，涉及一些数学上的问题，其时间是所取的“增量”序列的函数。

希尔排序特点
子序列的构成不是简单的“逐段分割”，而是将相隔某个增量的记录组成一个子序列。
希尔排序可提高排序速度，原因是：
◆ 分组后n值减小，n²更小，而T(n)=O(n²),所以T(n)从总体上看是减小了；
◆ 关键字较小的记录跳跃式前移，在进行最后一趟增量为1的插入排序时，序列已基本有序。

增量序列取法
◆ 无除1以外的公因子；
◆ 最后一个增量值必须为1。

相关资料： http://wenku.baidu.com/link?url=q7kzOxXqc0BLaGUVDY43FQOh2aX1UqBHkkYd3VMwJhJo6rv4SiU686RW3kQCSqGEKytl12S8fBOpwhq-runhX_pbZcg6BeD-miYMPgDhXxK
 */

function shellInsert(sqList, dk, comp) {
    for (var i = dk, len = sqList.length; i < len; ++i) {
        var temp = sqList[i];
        if (comp(temp, sqList[i - dk]) < 0) {
            for (var j = i - dk; j >= 0 && comp(temp, sqList[j]) < 0; j -= dk)
                sqList[j + dk] = sqList[j];

            sqList[j + dk] = temp;
        }
    }
}

function shellSort(sqList, comp) {
    if (comp == null) comp = defaultCompare;
    var delta = createDelta(sqList.length);
    //console.log(delta);
    for (var k = 0, t = delta.length; k < t; ++k) {
        shellInsert(sqList, delta[k], comp);
    }
}
exports.shellSort = shellSort;

function createDelta(n) {
    var arr = [];
    var t = (Math.log(n - 1) / Math.log(2)) | 0;  // Math.log(n - 1) / Math.log(2), Math.log(n + 1) / Math.log(2)
    for(var k = 0; k <= t; ++k)
        arr[k] = Math.pow(2, t - k) + 1;    // Math.pow(2, t - i + 1) - 1, Math.pow(2, t - i) + 1

    arr[arr.length] = 1;

    return arr;
}


console.log('\n\nShell Sort:');
var arr = [49, 38, 65, 97, 76, 13, 27, 49, 55, 4];
shellSort(arr);
console.log(arr + '');