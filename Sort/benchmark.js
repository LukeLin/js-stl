/*
不同条件下，排序方法的选择

(1)若n较小(如n≤50)，可采用直接插入或直接选择排序。
当记录规模较小时，直接插入排序较好；否则因为直接选择移动的记录数少于直接插人，应选直接选择排序为宜。

(2)若文件初始状态基本有序(指正序)，则应选用直接插人、冒泡或随机的快速排序为宜；

(3)若n较大，则应采用时间复杂度为O(nlgn)的排序方法：快速排序、堆排序或归并排序。
快速排序是目前基于比较的内部排序中被认为是最好的方法，当待排序的关键字是随机分布时，快速排序的平均时间最短；
堆排序所需的辅助空间少于快速排序，并且不会出现快速排序可能出现的最坏情况。这两种排序都是不稳定的。
若要求排序稳定，则可选用归并排序。但本章介绍的从单个记录起进行两两归并的  排序算法并不值得提倡，通常可以将它和直接插入排序结合在一起使用。先利用直接插入排序求得较长的有序子文件，然后再两两归并之。因为直接插入排序是稳定的，所以改进后的归并排序仍是稳定的。

(4)在基于比较的排序方法中，每次比较两个关键字的大小之后，仅仅出现两种可能的转移，因此可以用一棵二叉树来描述比较判定过程。
当文件的n个关键字随机分布时，任何借助于"比较"的排序算法，至少需要O(nlgn)的时间。
箱排序和基数排序只需一步就会引起m种可能的转移，即把一个记录装入m个箱子之一，因此在一般情况下，箱排序和基数排序可能在O(n)时间内完成对n个记录的排序。但是，箱排序和基数排序只适用于像字符串和整数这类有明显结构特征的关键字，而当关键字的取值范围属于某个无穷集合(例如实数型关键字)时，无法使用箱排序和基数排序，这时只有借助于"比较"的方法来排序。
若n很大，记录的关键字位数较少且可以分解时，采用基数排序较好。虽然桶排序对关键字的结构无要求，但它也只有在关键字是随机分布时才能使平均时间达到线性阶，否则为平方阶。同时要注意，箱、桶、基数这三种分配排序均假定了关键字若为数字时，则其值均是非负的，否则将其映射到箱(桶)号时，又要增加相应的时间。

(5)有的语言(如Fortran，Cobol或Basic等)没有提供指针及递归，导致实现归并、快速(它们用递归实现较简单)和基数(使用了指针)等排序算法变得复杂。此时可考虑用其它排序。

(6)本章给出的排序算法，输人数据均是存储在一个向量中。当记录的规模较大时，为避免耗费大量的时间去移动记录，可以用链表作为存储结构。譬如插入排序、归并排序、基数排序都易于在链表上实现，使之减少记录的移动次数。但有的排序方法，如快速排序和堆排序，在链表上却难于实现，在这种情况下，可以提取关键字建立索引表，然后对索引表进行排序。然而更为简单的方法是：引人一个整型向量t作为辅助表，排序前令t[i]=i(0≤i<n)，若排序算法中要求交换R[i]和R[j]，则只需交换t[i]和t[j]即可；排序结束后，向量t就指示了记录之间的顺序关系：
        R[t[0]].key≤R[t[1]].key≤…≤R[t[n-1]].key
  若要求最终结果是：
       R[0].key≤R[1].key≤…≤R[n-1].key
则可以在排序结束后，再按辅助表所规定的次序重排各记录，完成这种重排的时间是O(n)。
 */

var insertionSort = require('./insertion/insertion-sort');
var exchangeSort = require('./exchange/exchange-sort');
var selectionSort = require('./selection/selection-sort');
var mergingSort = require('./merging/merging-sort');

var straightInsertSort = insertionSort.straightInsertSort;
var binaryInsertSort = insertionSort.binaryInsertSort;
var path2InsertSort = insertionSort.path2InsertSort;
var staticLinkedListInsertSort = insertionSort.staticLinkedListInsertSort;
var shellSort = insertionSort.shellSort;

var bubbleSort = exchangeSort.bubbleSort;
var bubbleSort1 = exchangeSort.bubbleSort1;
var cockTailSort = exchangeSort.cockTailSort;
var bubbleSort3 = exchangeSort.bubbleSort3;
var quickSortRecursive = exchangeSort.quickSortRecursive;
var quickSortNonRecursive = exchangeSort.quickSortNonRecursive;
var quickSort = exchangeSort.quickSort;
var oddEvenSort = exchangeSort.oddEvenSort;

var simpleSelectionSort = selectionSort.simpleSelectionSort;
var heapSort = selectionSort.heapSort;

var mergeSortRecursive = mergingSort.mergeSortRecursive;
var mergeSortNonRecursive = mergingSort.mergeSortNonRecursive;

// for comparison

// insertionSort
var arr = [];
var arr1 = [];
var arr2 = [];
var arr3 = [];
var arr4 = [];
var arr5 = [];

// exchangeSort
var arr6 = [];
var arr7 = [];
var arr8 = [];
var arr9 = [];
var arr10 = [];
var arr11 = [];
var arr12 = [];
var arr13 = [];

// selectionSort
var arr14 = [];
var arr15 = [];

// mergingSort
var arr16 = [];
var arr17 = [];

for (var i = 0, len = 100000; i < len; ++i) {
    var num = parseInt(Math.random() * 1000, 10);
    //var num = len - i;

    arr.push(num);
    arr1.push(num);
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
    arr12.push(num);
    arr13.push(num);

    arr14.push(num);
    arr15.push(num);

    arr16.push(num);
    arr17.push(num);
}
console.log('\n');

console.time('nativeSort');
arr.sort();
console.timeEnd('nativeSort');   // a: 32306ms


//console.time('straightInsertSort');
//straightInsertSort(arr1);
//console.timeEnd('straightInsertSort');   // a: 32306ms


//console.time('binaryInsertSort');
//binaryInsertSort(arr2);
//console.timeEnd('binaryInsertSort');   // b: 11309ms


//console.time('path2InsertSort');
//path2InsertSort(arr3);
//console.timeEnd('path2InsertSort');   // c: 55707ms

//var StaticLinkedList = require('../linkedList/StaticLinkedList');
//var sl = new StaticLinkedList();
//sl.create(arr4);
//console.time('staticLinkedListInsertSort');
//staticLinkedListInsertSort(sl);       // staticLinkedListInsertSort: 105518ms random
//console.timeEnd('staticLinkedListInsertSort');

console.time('shellSort');
shellSort(arr5);
console.timeEnd('shellSort');   // d: 20ms  notice: 因为随机数太小，都聚集了，希尔排序优势巨大。

console.log('\n');
/*
希尔排序：
随机数在0-999
第一种增量序列： Math.pow(2, t - i + 1) - 1
耗时  28ms

第二种增量序列： Math.pow(2, t - i) + 1
耗时 28ms
 */


//console.time('bubbleSort');
//bubbleSort(arr6);
//console.timeEnd('bubbleSort');

//console.time('bubbleSort1');
//bubbleSort1(arr7);
//console.timeEnd('bubbleSort1');

//console.time('cockTailSort');
//cockTailSort(arr8);
//console.timeEnd('cockTailSort');

//console.time('bubbleSort3');
//bubbleSort3(arr9);
//console.timeEnd('bubbleSort3');

//console.time('quickSortRecursive');
//quickSortRecursive(arr10);
//console.timeEnd('quickSortRecursive');

console.time('quickSortNonRecursive');
quickSortNonRecursive(arr11);
console.timeEnd('quickSortNonRecursive');

console.time('quickSort');
quickSort(arr12);
console.timeEnd('quickSort');

//console.time('oddEvenSort');
//oddEvenSort(arr13);
//console.timeEnd('oddEvenSort');

console.log('\n');


//console.time('simpleSelectionSort');
//simpleSelectionSort(arr14);
//console.timeEnd('simpleSelectionSort');

console.time('heapSort');
heapSort(arr15);
console.timeEnd('heapSort');

console.log('\n');


console.time('mergeSortRecursive');
mergeSortRecursive(arr16);
console.timeEnd('mergeSortRecursive');

console.time('mergeSortNonRecursive');
mergeSortNonRecursive(arr17);
console.timeEnd('mergeSortNonRecursive');

console.log('\n');
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
 cockTailSort: 26993ms
 bubbleSort3: 54022ms

 quickSortNonRecursive: 29ms
 quickSort: 28ms


 最差情况，reverse
 bubbleSort: 92582ms
 bubbleSort1: 40989ms
 cockTailSort: 28798ms
 bubbleSort3: 57511ms

 quickSortNonRecursive: 11884ms Stack
 quickSortNonRecursive: 11765ms native Array

 quickSort: 13905ms


 当对比的数据范围比较小时，希尔排序比快速快，
 当数据范围比较大时，快排比希尔快
 */


// http://blog.csdn.net/hguisu/article/details/7776068
