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
        var j = i - 1;
        // 查找插入位置，并将记录后移
        while (temp < sqList[j]) {
            sqList[j + 1] = sqList[j];
            --j;
        }

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
function staticLinkedListInsertSort(sllist){
    // 构成循环链表
    sllist[0].cur = 1;
    sllist[1].cur = 0;

    var p, q;
    for(var i = 2, len = sllist.length; i <= len; ++i){
        p = 0;
        var x = sllist[i].data;

        while(sllist[p].cur && sllist[sllist[p].cur].data < x)
            p = sllist[p].cur;

        // 当遇到大于当前关键字的下标时，插入到其前驱和后继的中间
        q = sllist[p].cur;
        sllist[p].cur = i;
        sllist[i].cur = q;
    }
}

// 重排静态链表，静态链表下标已排好序
function arrange(sllist){
    var p = sllist[0].cur;

    for(var i = 1, len = sllist.length; i < len; ++i){
        // 第i个记录在list中的当前位置应不小于i
        // 找到第i个记录，并用p指示其在list中当前位置
        while(p < i) p = sllist[p].cur;
        // q指向尚未调整的表尾
        var q = sllist[p].cur;

        if(p !== i) {
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


// for comparison
var arr = [];
var arr2 = [];
var arr3 = [];
var arr4 = [];
for (var i = 0; i < 100000; ++i) {
    var num = parseInt(Math.random() * 100, 10);
    arr.push(num);
    arr2.push(num);
    arr3.push(num);
    arr4.push(num);
}

console.time('a');
//straightInsertSort(arr);
console.timeEnd('a');   // a: 32306ms


console.time('b');
//binaryInsertSort(arr2);
console.timeEnd('b');   // b: 11309ms


console.time('c');
//path2InsertSort(arr3);
console.timeEnd('c');   // c: 55707ms


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


 straightInsertSort a: 34722ms
 binaryInsertSort b: 13080ms
 path2InsertSort c: 116103ms  md，我差点睡着！！

 */