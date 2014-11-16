/*
查找

数据的组织和查找是大多数应用程序的核心，而查找是所有数据处理中最基本、最常用的操作。特别当查找的对象是一个庞大数量的数据集合中的元素时，查找的方法和效率就显得格外重要。

本章主要讨论顺序表、有序表、树表和哈希表查找的各种实现方法，以及相应查找方法在等概率情况下的平均查找长度。

查找的概念

查找表(Search Table)：相同类型的数据元素(对象)组成的集合，每个元素通常由若干数据项构成。

关键字(Key，码)：数据元素中某个(或几个)数据项的值，它可以标识一个数据元素。若关键字能唯一标识一个数据元素，则关键字称为主关键字；将能标识若干个数据元素的关键字称为次关键字。

查找/检索(Searching)：根据给定的K值，在查找表中确定一个关键字等于给定值的记录或数据元素。
◆  查找表中存在满足条件的记录：查找成功；结果：所查到的记录信息或记录在查找表中的位置。
◆ 查找表中不存在满足条件的记录：查找失败。

查找有两种基本形式：静态查找和动态查找。
静态查找(Static Search)：在查找时只对数据元素进行查询或检索，查找表称为静态查找表。
动态查找(Dynamic Search)：在实施查找的同时，插入查找表中不存在的记录，或从查找表中删除已存在的某个记录，查找表称为动态查找表。

查找的对象是查找表，采用何种查找方法，首先取决于查找表的组织。查找表是记录的集合，而集合中的元素之间是一种完全松散的关系，因此，查找表是一种非常灵活的数据结构，可以用多种方式来存储。

根据存储结构的不同，查找方法可分为三大类：
①  顺序表和链表的查找：将给定的K值与查找表中记录的关键字逐个进行比较， 找到要查找的记录；
②  散列表的查找：根据给定的K值直接访问查找表， 从而找到要查找的记录；
③  索引查找表的查找：首先根据索引确定待查找记录所在的块 ，然后再从块中找到要查找的记录。

查找方法评价指标
查找过程中主要操作是关键字的比较，查找过程中关键字的平均比较次数(平均查找长度ASL：Average Search Length)作为衡量一个查找算法效率高低的标准。

 */

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
    // 设置监视哨兵,失败返回-1
    sTable[-1] = key;
    for (var i = sTable.length - 1; sTable[i] !== key; --i);
    return i;
}

console.log('sequentialSearch: ');
console.log(sequentialSearch([1, 2, 3, 4, 5], 6));  // -1


/*
折半查找(Binary Search)

折半查找又称为二分查找，是一种效率较高的查找方法。
前提条件：查找表中的所有记录是按关键字有序(升序或降序) 。
查找过程中，先确定待查找记录在表中的范围，然后逐步缩小范围(每次将待查记录所在区间缩小一半)，直到找到或找不到记录为止。

1  查找思想
用Low、High和Mid表示待查找区间的下界、上界和中间位置指针，初值为Low=1，High=n。
⑴   取中间位置Mid：Mid=Math.floor((Low+High)/2)；
⑵   比较中间位置记录的关键字与给定的K值：
    ①  相等： 查找成功；
    ②  大于：待查记录在区间的前半段，修改上界指针： High=Mid-1，转⑴ ；
    ③  小于：待查记录在区间的后半段，修改下界指针：Low=Mid+1，转⑴ ；
直到越界(Low>High)，查找失败。

2  算法分析
①  查找时每经过一次比较，查找范围就缩小一半，该过程可用一棵二叉树表示：
    ◆  根结点就是第一次进行比较的中间位置的记录；
    ◆ 排在中间位置前面的作为左子树的结点；
    ◆ 排在中间位置后面的作为右子树的结点；
    对各子树来说都是相同的。这样所得到的二叉树称为判定树(Decision Tree)。
②  将二叉判定树的第Math.floor(㏒2n)+1层上的结点补齐就成为一棵满二叉树，深度不变，h= Math.floor(㏒2(n+1)) 。
③  由满二叉树性质知，第i 层上的结点数为2i-1(i≤h) ，设表中每个记录的查找概率相等，即Pi=1/n，查找成功时的平均查找长度ASL：
    (n+1)/n*㏒2(n+1)-1
    当n很大 (n>50)时， ASL≈ ㏒2(n+1)-1。

 */

function binarySearch(sTable, key) {
    var low = 0;
    var high = sTable.length - 1;

    while (low <= high) {
        var mid = Math.floor((low + high) / 2);
        var elem = sTable[mid];

        if (key === elem) return mid;
        else if (key < elem) high = mid - 1;
        else low = mid + 1;
    }

    return -1;
}

console.log('binarySearch: ');
console.log(binarySearch([1, 2, 3, 4, 5], 1));  // 0

function binarySearchRecursive(sTable, key, low, high) {
    low = low || 0;
    high = high || sTable.length - 1;

    if (low > high) return -1;

    var mid = Math.floor((low + high) / 2);

    if (sTable[mid] === key) return mid;
    else if (sTable[mid] > key) return binarySearchRecursive(sTable, key, low, mid - 1);
    else return binarySearchRecursive(sTable, mid + 1, high);
}

console.log('binarySearchRecursive: ');
console.log(binarySearchRecursive([1, 2, 3, 4, 5], 1)); // 0
console.log(binarySearchRecursive([1, 2, 3, 4, 5], 6)); // -1


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

由算法知，Fibonacci查找在最坏情况下性能比折半查找差，但折半查找要求记录按关键字有序；Fibonacci查找的优点是分割时只需进行加、减运算。

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


/*
静态次优查找树

适合各记录的查找概率不等的情况
 */
var BinaryTree = require('../Binary tree/BinaryTree').BinaryTree;

/**
 * 由有序表sTable[low..high]及其累计权值表weights递归构造次优查找树
 * @param {BinaryTree} tree
 * @param {Array} sTable
 * @param {Array} sWeights
 * @param {Number} low
 * @param {Number} high
 */
function secondOptimal(tree, sTable, sWeights, low, high) {
    var i = low;
    var min = Math.abs(sWeights[high] - sWeights[low]);
    var dw = sWeights[high] + (sWeights[low - 1] || 0);

    // 选择最小的△Pi值
    for (var j = low + 1; j <= high; ++j) {
        var t = Math.abs(dw - sWeights[j] - sWeights[j - 1]);
        if (t < min) {
            i = j;
            min = t;
        }
    }

    // 调整树根权，选择邻近权值较大的关键字 todo 代码应该更简
    var a = 0, b, c = 0;
    if(i - 1 >= low)  b = sWeights[i] - sWeights[i - 1];
    if(i - 2 >= low) a = sWeights[i - 1] - sWeights[i - 2];
    if(i + 1 < high) c = sWeights[i + 1] - sWeights[i];
    if(typeof b === 'number') {
        if(a > c && a > b) {
            --i;
        } else if(a < c && c > b) {
            ++i;
        }
    }

    tree.data = sTable[i];
    //左子树
    if (i === low) tree.leftChild = null;
    else {
        tree.leftChild = new BinaryTree();
        secondOptimal(tree.leftChild, sTable, sWeights, low, i - 1);
    }
    // 右子树
    if (i === high) tree.rightChild = null;
    else {
        tree.rightChild = new BinaryTree();
        secondOptimal(tree.rightChild, sTable, sWeights, i + 1, high);
    }
}

var tree = new BinaryTree();
secondOptimal(tree, ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'], [1, 2, 4, 9, 12, 16, 20, 23, 28], 0, 8);
console.log(tree);


/**
 * 由有序表构造一棵次优查找树
 * @param {Object} obj 有序表，数据元素含有权域weight
 */
function createSOSTree(obj){
    var tree;
    if(obj.elems.length === 0) tree = null;
    else {
        // 求累计权值表
        var sw = findSW(obj.weights);
        tree = new BinaryTree();
        secondOptimal(tree, obj.elems, sw, 0, obj.elems.length - 1);
    }

    return tree;
}

function findSW(sTable){
    var sw = [sTable[0]];

    for(var i = 1; i < sTable.length; ++i){
        sw[i] = sw[i - 1] + sTable[i];
    }

    return sw;
}

createSOSTree({
    elems: ['A', 'B', 'C', 'D', 'E'],
    weights: [1, 30, 2, 29, 3]
})
.preOrderTraverse(function (value) {
        console.log('inOrder: ' + value);
    });