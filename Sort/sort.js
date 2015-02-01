/**
 * Created by luke on 2015/1/25.
 */

/*
 内部排序

 在信息处理过程中，最基本的操作是查找。从查找来说，效率最高的是折半查找，折半查找的前提是所有的数据元素(记录)是按关键字有序的。需要将一个无序的数据文件转变为一个有序的数据文件。
 将任一文件中的记录通过某种方法整理成为按(记录)关键字有序排列的处理过程称为排序。
 排序是数据处理中一种最常用的操作。


 排序的基本概念

 ⑴  排序(Sorting)
 排序是将一批(组)任意次序的记录重新排列成按关键字有序的记录序列的过程，其定义为：
 给定一组记录序列：{R1 , R2 ,…, Rn}，其相应的关键字序列是{K1 , K2 ,…, Kn} 。确定1, 2, … n的一个排列p1 , p2 ,…, pn，使其相应的关键字满足如下非递减(或非递增)关系： Kp1<=Kp2 <=…<=Kpn的序列{Kp1 ,Kp2 , …,Kpn} ，这种操作称为排序。
 关键字Ki可以是记录Ri的主关键字，也可以是次关键字或若干数据项的组合。
 ◆  Ki是主关键字：排序后得到的结果是唯一的；
 ◆  Ki是次关键字：排序后得到的结果是不唯一的。

 ⑵  排序的稳定性
 若记录序列中有两个或两个以上关键字相等的记录： Ki =Kj(i≠j，i, j=1, 2, … n)，且在排序前Ri先于Rj(i<j)，排序后的记录序列仍然是Ri先于Rj，称排序方法是稳定的，否则是不稳定的。

 排序算法有许多，但就全面性能而言，还没有一种公认为最好的。每种算法都有其优点和缺点，分别适合不同的数据量和硬件配置。
 评价排序算法的标准有：执行时间和所需的辅助空间，其次是算法的稳定性。
 若排序算法所需的辅助空间不依赖问题的规模n，即空间复杂度是O(1) ，则称排序方法是就地排序，否则是非就地排序。

 ⑶ 排序的分类
 待排序的记录数量不同，排序过程中涉及的存储器的不同，有不同的排序分类。
 ①  待排序的记录数不太多：所有的记录都能存放在内存中进行排序，称为内部排序；
 ②  待排序的记录数太多：所有的记录不可能存放在内存中， 排序过程中必须在内、外存之间进行数据交换，这样的排序称为外部排序。

 ⑷ 内部排序的基本操作
 对内部排序地而言，其基本操作有两种：
 ◆  比较两个关键字的大小；
 ◆ 存储位置的移动：从一个位置移到另一个位置。

 第一种操作是必不可少的；而第二种操作却不是必须的，取决于记录的存储方式，具体情况是：
 ① 记录存储在一组连续地址的存储空间：记录之间的逻辑顺序关系是通过其物理存储位置的相邻来体现，记录的移动是必不可少的；
 ②  记录采用链式存储方式：记录之间的逻辑顺序关系是通过结点中的指针来体现，排序过程仅需修改结点的指针，而不需要移动记录；
 ③  记录存储在一组连续地址的存储空间：构造另一个辅助表来保存各个记录的存放地址(指针) ：排序过程不需要移动记录，而仅需修改辅助表中的指针，排序后视具体情况决定是否调整记录的存储位置。

 ①比较适合记录数较少的情况；而②、③则适合记录数较多的情况。
 为讨论方便，假设待排序的记录是以①的情况存储，且设排序是按升序排列的；关键字是一些可直接用比较运算符进行比较的类型。
 */

var StaticLinkedList = require('../linkedList/StaticLinkedList');
var Stack = require('../Stack/stack');

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

function straightInsertSort(sqList) {
    for (var i = 1, len = sqList.length; i < len; ++i) {
        // 设置哨兵, 当设置sqList[-1] = sqList[i]时，经测试效率更慢
        // 因为js里面的变量作用域在函数内的
        var temp = sqList[i];
        // 查找插入位置，并将记录后移
        for(var j = i - 1; j >= 0 && temp < sqList[j]; --j)
            sqList[j + 1] = sqList[j];

        // 插入到正确位置
        sqList[j + 1] = temp;
    }
}

var a = [7, 4, -2, 19, 13, 6];
straightInsertSort(a);
console.log(a + '');


/*
 其它插入排序

 1  折半插入排序
 当将待排序的记录R[i] 插入到已排好序的记录子表R[1…i-1]中时，由于R1, R2 ,…, Ri-1已排好序，则查找插入位置可以用“折半查找”实现，则直接插入排序就变成为折半插入排序。

 从时间上比较，折半插入排序仅仅减少了关键字的比较次数，却没有减少记录的移动次数，故时间复杂度仍然为O(n2) 。


 */

function binaryInsertSort(sqList) {
    for (var i = 1, len = sqList.length; i < len; ++i) {
        var temp = sqList[i];
        var low = 0;
        var high = i - 1;

        while (low <= high) {
            var mid = Math.floor((low + high) / 2);

            if (temp < sqList[mid]) high = mid - 1;
            else low = mid + 1;
        }

        for (var j = i - 1; j >= high + 1; --j) {
            sqList[j + 1] = sqList[j];
        }

        sqList[high + 1] = temp;
    }
}

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

function path2InsertSort(sqList) {
    var d = [sqList[0]];
    // first、final分别指示d中排好序的记录的第1个和最后1个记录的位置。
    var first = 0;
    var final = 0;

    for (var i = 1, len = sqList.length; i < len; ++i) {
        var item = sqList[i];

        // 待插入记录小于d中最小值，插入到d[first]之前（不需移动d数组的元素）。
        if (item < d[first]) {
            first = (first - 1) % len;
            d[first] = item;
        }
        // 待插入记录大于d中最小值，插入到d[final]之后（不需移动d数组的元素）。
        else if (item > d[final]) {
            d[++final] = item;
        }
        // 待插入记录大于d中最小值，小于d中最大值，插入到d的中间（需要移动d数组的元素）。
        else {
            // 移动d尾部元素以便按序插入记录。
            var j = final++;
            while (item < d[j]) {
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
function staticLinkedListInsertSort(sllist) {
    // 构成循环链表
    sllist[0].cur = 1;
    sllist[1].cur = 0;

    var p, q;
    for (var i = 2, len = sllist.length; i <= len; ++i) {
        p = 0;
        var x = sllist[i].data;

        while (sllist[p].cur && sllist[sllist[p].cur].data < x)
            p = sllist[p].cur;

        // 当遇到大于当前关键字的下标时，插入到其前驱和后继的中间
        q = sllist[p].cur;
        sllist[p].cur = i;
        sllist[i].cur = q;
    }
}

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

function shellInsert(sqList, dk) {
    for (var i = dk, len = sqList.length; i < len; ++i) {
        var temp = sqList[i];
        if (temp < sqList[i - dk]) {
            for (var j = i - dk; j >= 0 && temp < sqList[j]; j -= dk)
                sqList[j + dk] = sqList[j];

            sqList[j + dk] = temp;
        }
    }
}

function shellSort(sqList) {
    var delta = createDelta(sqList.length);
    //console.log(delta);
    for (var k = 0, t = delta.length; k < t; ++k) {
        shellInsert(sqList, delta[k]);
    }
}

function createDelta(n) {
    var arr = [];
    var t = Math.floor(Math.log(n - 1) / Math.log(2));  // Math.log(n - 1) / Math.log(2), Math.log(n + 1) / Math.log(2)
    for(var k = 0; k <= t; ++k)
        arr[k] = Math.pow(2, t - k) + 1;    // Math.pow(2, t - i + 1) - 1, Math.pow(2, t - i) + 1

    arr[arr.length] = 1;

    return arr;
}


console.log('\n\nShell Sort:');
var arr = [49, 38, 65, 97, 76, 13, 27, 49, 55, 04];
shellSort(arr);
console.log(arr + '');



/*
 交换排序

 是一类基于交换的排序，系统地交换反序的记录的偶对，直到不再有这样的偶对为止。其中最基本的是冒泡排序(Bubble Sort)。

 冒泡排序
 1  排序思想
 依次比较相邻的两个记录的关键字，若两个记录是反序的(即前一个记录的关键字大于后前一个记录的关键字)，则进行交换，直到没有反序的记录为止。
     ① 首先将L->R[1]与L->R[2]的关键字进行比较，若为反序(L->R[1]的关键字大于L->R[2]的关键字)，则交换两个记录；然后比较L->R[2]与L->R[3]的关键字，依此类推，直到L->R[n-1]与L->R[n]的关键字比较后为止，称为一趟冒泡排序，L->R[n]为关键字最大的记录。
     ②  然后进行第二趟冒泡排序，对前n-1个记录进行同样的操作。
 一般地，第i趟冒泡排序是对L->R[1 … n-i+1]中的记录进行的，因此，若待排序的记录有n个，则要经过n-1趟冒泡排序才能使所有的记录有序。

 2  排序示例
 设有9个待排序的记录，关键字分别为23, 38, 22, 45, 23, 67, 31, 15, 41

 初始关键字序列:  23    38     22     45     23     67     31     15    41
 第一趟排序后:    23    22     38     23     45     31     15     41    67
 第二趟排序后:    22    23     23     38     31     15     41     45    67
 第三趟排序后:    22    23     23     31     15     38     41     45    67
 第四趟排序后:    22    23     23     15     31     38     41     45    67
 第五趟排序后:    22    23     15     23     31     38     41     45    67
 第六趟排序后:    22    15     23     23     31     38     41     45    67
 第七趟排序后:    15    22     23     23     31     38     41     45    67

3.算法分析
 时间复杂度
 ◆  最好情况(正序)：比较次数：n-1；移动次数：0；
 ◆  最坏情况(逆序)：
 比较次数： n * (n - 1) / 2
 移动次数： 3*n*(n - 1) / 2

 故时间复杂度：T(n)=O(n²)
 空间复杂度：S(n)=O(1)

 */

function bubbleSort(sqList){
    for(var i = 1, len = sqList.length; i < len; ++i){
        var change = 0;

        for(var j = 0; j <= len - i; ++j){
            if(sqList[j + 1] < sqList[j]) {
                change = 1;
                var temp = sqList[j];
                sqList[j] = sqList[j + 1];
                sqList[j + 1] = temp;
            }
        }

        if(!change) break;
    }
}

var arr = [23, 38, 22, 45, 23, 67, 31, 15, 41];
bubbleSort(arr);
console.log('bubbleSort:\n' + arr + '');


// 冒泡改进1
function bubbleSort1(sqList){
    var len = sqList.length;
    var change = len - 1;

    while(change){
        for(var c = 0, i = 0; i < change; ++i){
            if(sqList[i] > sqList[i + 1]) {
                var temp = sqList[i];
                sqList[i] = sqList[i + 1];
                sqList[i + 1] = temp;
                // c指示这一趟冒泡中发生交换的元素
                c = i + 1;
            }
        }

        change = c;
    }
}

var arr = [23, 38, 22, 45, 23, 67, 31, 15, 41];
bubbleSort1(arr);
console.log('bubbleSort1:\n' + arr + '');


// 相邻两趟反方向起泡的冒泡排序算法
function bubbleSort2(sqList){
    var len = sqList.length;
    // 冒泡上下界
    var low = 0, high = len - 1;
    var change = 1;
    var temp;

    while(low < high && change){
        change = 0;

        // 从上向下起泡
        for(var i = low; i < high; ++i){
            if(sqList[i] > sqList[i + 1]) {
                temp = sqList[i];
                sqList[i] = sqList[i + 1];
                sqList[i + 1] = temp;
                change = 1;
            }
        }
        // 修改上界
        --high;

        // 从下向上起泡
        for(i = high; i > low; --i){
            if(sqList[i] < sqList[i - 1]) {
                temp = sqList[i];
                sqList[i] = sqList[i - 1];
                sqList[i - 1] = temp;
                change = 1;
            }
        }
        // 修改下界
        ++low;
    }
}

var arr = [23, 38, 22, 45, 23, 67, 31, 15, 41];
bubbleSort2(arr);
console.log('bubbleSort2:\n' + arr + '');


// 改进3
function bubbleSort3(sqList){
    var b = {};
    var len = sqList.length;
    // d为冒泡方向标识， 1为向上，-1为向下
    var d = 1;
    // b[0]为冒泡上界，b[2]为冒泡上界，b[1]无用
    b[0] = 0;
    b[2] = len - 1;
    var change = 1;

    while(b[0] < b[2] && change){
        change = 0;

        // 统一的冒泡算法
        for(var i = b[1 - d]; i !== b[1 + d]; i += d){
            // 注意这个交换条件
            if((sqList[i] - sqList[i + d]) * d > 0){
                var temp = sqList[i];
                sqList[i] = sqList[i + d];
                sqList[i + d] = temp;
                change = 1;
            }
        }

        // 修改边界
        b[1 + d] -= d;
        // 换个方向
        d *= -1;
    }
}

var arr = [23, 38, 22, 45, 23, 67, 31, 15, 41];
bubbleSort3(arr);
console.log('bubbleSort3:\n' + arr + '');



/*
 快速排序

 1  排序思想
 通过一趟排序，将待排序记录分割成独立的两部分，其中一部分记录的关键字均比另一部分记录的关键字小，再分别对这两部分记录进行下一趟排序，以达到整个序列有序。

 2  排序过程
 设待排序的记录序列是R[s…t] ，在记录序列中任取一个记录(一般取R[s])作为参照(又称为基准或枢轴)，以R[s].key为基准重新排列其余的所有记录，方法是：
     ◆ 所有关键字比基准小的放R[s]之前；
     ◆ 所有关键字比基准大的放R[s]之后。
 以R[s].key最后所在位置i作为分界，将序列R[s…t]分割成两个子序列，称为一趟快速排序。

 3  一趟快速排序方法
 从序列的两端交替扫描各个记录，将关键字小于基准关键字的记录依次放置到序列的前边；而将关键字大于基准关键字的记录从序列的最后端起，依次放置到序列的后边，直到扫描完所有的记录。

 设置指针low，high，初值为第1个和最后一个记录的位置。
 设两个变量i，j，初始时令i=low，j=high，以R[low].key作为基准(将R[low]保存在R[0]中) 。
 ① 从j所指位置向前搜索：将R[0].key与R[j].key进行比较：
    ◆  若R[0].key≤R[j].key ：令j=j-1，然后继续进行比较， 直到i=j或R[0].key>R[j].key为止；
    ◆ 若R[0].key>R[j].key ：R[j]R[i]，腾空R[j]的位置， 且令i=i+1；
 ② 从i所指位置起向后搜索：将R[0].key与R[i].key进行比较：
    ◆ 若R[0].key≥R[i].key ：令i=i+1，然后继续进行比较， 直到i=j或R[0].key<R[i].key为止；
    ◆ 若R[0].key<R[i].key ：R[i]R[j]，腾空R[i]的位置， 且令j=j-1；
 ③ 重复①、②，直至i=j为止，i就是R[0](基准)所应放置的位置。

 算法分析
 快速排序的主要时间是花费在划分上，对长度为k的记录序列进行划分时关键字的比较次数是k-1 。设长度为n的记录序列进行排序的比较次数为C(n)，则C(n)=n-1+C(k)+C(n-k-1) 。
 ◆  最好情况：每次划分得到的子序列大致相等，则
 C(n)<=h×n+2h×C(n/2h) ，当n/2h=1时排序结束。
 即C(n)≤O(n×㏒2n) ；
 ◆  最坏情况：每次划分得到的子序列中有一个为空，另一个子序列的长度为n-1。即每次划分所选择的基准是当前待排序序列中的最小(或最大)关键字。
 比较次数：:  即C(n)=O(n2)
 ◆  一般情况： 对n个记录进行快速排序所需的时间T(n)组成是：
     ① 对n个记录进行一趟划分所需的时间是：n×C ，C是常数；
     ② 对所得到的两个子序列进行快速排序的时间：
        Tavg(n)=C(n)+Tavg(k-1)+Tavg(n-k)          ……

 快速排序的平均时间复杂度是：T(n)=O(n㏒2n)
 从所需要的附加空间来看，快速排序算法是递归调用，系统内用堆栈保存递归参数，当每次划分比较均匀时，栈的最大深度为[㏒2n]+1 。

 快速排序的空间复杂度是：S(n)=O(㏒2n)
 从排序的稳定性来看，快速排序是不稳定的。

 */

function partition(sqList, low, high){
    var temp = sqList[low];

    while(low < high){
        while(low < high && sqList[high] >= temp) --high;
        sqList[low] = sqList[high];
        while(low < high && sqList[low] <= temp) ++low;
        sqList[high] = sqList[low];
    }

    sqList[low] = temp;

    return low;
}

function quickSortRecursive(sqList, low, high){
    low = low || 0;
    high = high || sqList.length - 1;

    if(low < high) {
        var k = partition(sqList, low, high);
        quickSortRecursive(sqList, low, k - 1);
        quickSortRecursive(sqList, k + 1, high);
    }
}

var arr = [23, 38, 22, 45, 23, 67, 31, 15, 41];
quickSortRecursive(arr);
console.log('quickSortRecursive:\n' + arr + '');


function quickSortNonRecursive(sqList, low, high){
    low = low || 0;
    high = high || sqList.length - 1;
    var stack = new Stack();
    var k;

    do {
        while(low < high){
            k = partition(sqList, low, high);
            // 第二个子序列的上,下界分别入栈
            stack.push(high);
            stack.push(k + 1);
            high = k - 1;
        }

        if(stack.length) {
            low = stack.pop();
            high = stack.pop();
        }
    } while(stack.length || low < high);
}

var arr = [23, 38, 22, 45, 23, 67, 31, 15, 41];
quickSortNonRecursive(arr);
console.log('quickSortNonRecursive:\n' + arr + '');

function quickSort(sqList, low, high){
    low = low || 0;
    high = high || sqList.length - 1;
    var stack = new Stack();
    var pivot;

    do {
        if(high - low > 2) {
            pivot = partition(sqList, low, high);

            if(high - pivot > pivot - low) {
                stack.push(high);
                stack.push(pivot + 1);
                high = pivot - 1;
            } else {
                stack.push(pivot - 1);
                stack.push(low);
                low = pivot + 1;
            }
        } else if(low < high && high - low < 3) {
            easySort(sqList, low, high);
            low = high;
        } else {
            low = stack.pop();
            high = stack.pop();
        }
    } while(stack.length || low < high);
}

function easySort(sqList, low, high){
    var temp;

    if(high - low === 1) {
        if(sqList[low] > sqList[high]) {
            temp = sqList[low];
            sqList[low] = sqList[high];
            sqList[high] = temp;
        }
    } else {
        if(sqList[low] > sqList[low + 1]) {
            temp = sqList[low];
            sqList[low] = sqList[low + 1];
            sqList[low + 1] = temp;
        }
        if(sqList[low + 1] > sqList[high]) {
            temp = sqList[low + 1];
            sqList[low + 1] = sqList[high];
            sqList[high] = temp;
        }
        if(sqList[low] > sqList[low + 1]) {
            temp = sqList[low];
            sqList[low] = sqList[low + 1];
            sqList[low + 1] = temp;
        }
    }
}

var arr = [23, 38, 22, 45, 23, 67, 31, 15, 41];
quickSort(arr);
console.log('quickSort:\n' + arr + '');


// for comparison
var arr = [];
var arr2 = [];
var arr3 = [];
var arr4 = [];

var arr5 = [];
var arr6 = [];
var arr7 = [];
var arr8 = [];
var arr9 = [];
var arr10 = [];
var arr11 = [];

for (var i = 0, len = 100000; i < len; ++i) {
    var num = parseInt(Math.random() * 1000, 10);
    //var num = len - i;

    arr.push(num);
    arr2.push(num);
    arr3.push(num);
    arr4.push(num);

    arr5.push(num);
    arr6.push(num);
    arr7.push(num);
    arr8.push(num);
    arr9.push(num);
    arr10.push(num);
    arr11.push(num);
}

console.time('straightInsertSort');
//straightInsertSort(arr);
console.timeEnd('straightInsertSort');   // a: 32306ms


console.time('binaryInsertSort');
//binaryInsertSort(arr2);
console.timeEnd('binaryInsertSort');   // b: 11309ms


console.time('path2InsertSort');
//path2InsertSort(arr3);
console.timeEnd('path2InsertSort');   // c: 55707ms


console.time('shellSort');
shellSort(arr4);
console.timeEnd('shellSort');   // d: 20ms  notice: 因为随机数太小，都聚集了，希尔排序优势巨大。

/*
希尔排序：
随机数在0-999
第一种增量序列： Math.pow(2, t - i + 1) - 1
耗时  28ms

第二种增量序列： Math.pow(2, t - i) + 1
耗时 28ms
 */

console.time('bubbleSort');
//bubbleSort(arr5);
console.timeEnd('bubbleSort');

console.time('bubbleSort1');
//bubbleSort1(arr6);
console.timeEnd('bubbleSort1');

console.time('bubbleSort2');
//bubbleSort2(arr7);
console.timeEnd('bubbleSort2');

console.time('bubbleSort3');
//bubbleSort3(arr8);
console.timeEnd('bubbleSort3');

console.time('quickSortRecursive');
//quickSortRecursive(arr9);
console.timeEnd('quickSortRecursive');

console.time('quickSortNonRecursive');
quickSortNonRecursive(arr10);
console.timeEnd('quickSortNonRecursive');

console.time('quickSort');
quickSort(arr11);
console.timeEnd('quickSort');



/*
 在我家的老爷机上跑
 100000条数据，
 机器配置：
 电脑型号	海尔 HaierComputer 台式电脑
 操作系统	Windows 8 专业版 32位 ( DirectX 11 )

 处理器	英特尔 Pentium(奔腾) 双核 E5200 @ 2.50GHz
 主板	海尔 G31T-M5 ( 英特尔 P35/G33/G31/P31 Express - ICH7 )
 内存	4 GB ( 威刚 DDR2 800MHz )
 主硬盘	希捷 ST3500418AS ( 500 GB / 7200 转/分 )

 随机情况
 straightInsertSort: 13219ms
 binaryInsertSort: 12278ms
 path2InsertSort: 72619ms
 shellSort: 29ms


随机情况
 bubbleSort: 104551ms
 bubbleSort1: 43809ms
 bubbleSort2: 26993ms
 bubbleSort3: 54022ms


 最差情况，reverse
 bubbleSort: 92582ms
 bubbleSort1: 40989ms
 bubbleSort2: 28798ms
 bubbleSort3: 57511ms

 quickSortNonRecursive: 11884ms Stack
 quickSortNonRecursive: 11765ms native Array

 quickSort: 13905ms


 当对比的数据范围比较小时，希尔排序比快速快，
 当数据范围比较大时，快排比希尔快
 */


// http://blog.csdn.net/hguisu/article/details/7776068