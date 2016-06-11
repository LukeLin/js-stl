/**
 * Created by Luke on 2015/2/2.
 */

import defaultCompare from '../defaultComparision';

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

export function bubbleSort(sqList, comp = defaultCompare) {
    for (let i = 1, len = sqList.length; i < len; ++i) {
        let change = 0;

        for (let j = 0; j <= len - i; ++j) {
            if (comp(sqList[j + 1], sqList[j]) < 0) {
                change = 1;
                let temp = sqList[j];
                sqList[j] = sqList[j + 1];
                sqList[j + 1] = temp;
            }
        }

        if (!change) break;
    }
}


var arr = [23, 38, 22, 45, 23, 67, 31, 15, 41];
bubbleSort(arr);
console.log('bubbleSort:\n' + arr + '');


// 冒泡改进1
export function bubbleSort2(sqList, comp = defaultCompare) {
    let len = sqList.length;
    let change = len - 1;

    while (change) {
        let c = 0;
        for (let i = 0; i < change; ++i) {
            if (comp(sqList[i], sqList[i + 1]) > 0) {
                let temp = sqList[i];
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
bubbleSort2(arr);
console.log('bubbleSort2:\n' + arr + '');


// 相邻两趟反方向起泡的冒泡排序算法
export function cockTailSort(sqList, comp = defaultCompare) {
    let len = sqList.length;
    // 冒泡上下界
    let low = 0, high = len - 1;
    let change = 1;
    let temp;

    while (low < high && change) {
        change = 0;

        // 从上向下起泡
        for (let i = low; i < high; ++i) {
            if (comp(sqList[i], sqList[i + 1]) > 0) {
                temp = sqList[i];
                sqList[i] = sqList[i + 1];
                sqList[i + 1] = temp;
                change = 1;
            }
        }
        // 修改上界
        --high;

        // 从下向上起泡
        for (let i = high; i > low; --i) {
            if (comp(sqList[i], sqList[i - 1]) < 0) {
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
cockTailSort(arr);
console.log('cockTailSort:\n' + arr + '');


// 改进3
export function cockTailSort2(sqList, comp = defaultCompare) {
    let b = {};
    let len = sqList.length;
    // d为冒泡方向标识， 1为向上，-1为向下
    let d = 1;
    // b[0]为冒泡上界，b[2]为冒泡上界，b[1]无用
    b[0] = 0;
    b[2] = len - 1;
    let change = 1;

    while (b[0] < b[2] && change) {
        change = 0;

        // 统一的冒泡算法
        for (let i = b[1 - d]; i !== b[1 + d]; i += d) {
            // 注意这个交换条件
            if (comp(sqList[i], sqList[i + d]) * d > 0) {
                let temp = sqList[i];
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
cockTailSort2(arr);
console.log('cockTailSort2:\n' + arr + '');



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
 设两个变量i，j，初始时令i=low，j=high，以R[low].key作为基准(将R[low]保存在temp中) 。
 ① 从j所指位置向前搜索：将temp与R[j].key进行比较：
    ◆ 若temp≤R[j].key ：令j=j-1，然后继续进行比较， 直到i=j或temp>R[j].key为止；
    ◆ 若temp>R[j].key ：R[j]R[i]，腾空R[j]的位置， 且令i=i+1；
 ② 从i所指位置起向后搜索：将temp与R[i].key进行比较：
    ◆ 若temp≥R[i].key ：令i=i+1，然后继续进行比较， 直到i=j或temp<R[i].key为止；
    ◆ 若temp<R[i].key ：R[i]R[j]，腾空R[i]的位置， 且令j=j-1；
 ③ 重复①、②，直至i=j为止，i就是temp(基准)所应放置的位置。

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

function partition1(sqList, low, high) {
    let temp = sqList[low];

    while (low < high) {
        while (low < high && sqList[high] >= temp)--high;
        sqList[low] = sqList[high];
        while (low < high && sqList[low] <= temp)++low;
        sqList[high] = sqList[low];
    }

    sqList[low] = temp;

    return low;
}

// 优化一趟快速排序方法： 随机化partition
// 最坏情况效率大幅提升，时间复杂度T(n)=O(n㏒2n)
function partition2(sqList, low, high) {
    let temp;
    let n = high - low + 1;
    let rand = Math.floor(Math.random() * n) + low;

    //let rand = (low + high) >> 1;
    temp = sqList[high];
    sqList[high] = sqList[rand];
    sqList[rand] = temp;

    let i = low - 1;
    let pivot = sqList[high];

    for (let j = low; j < high; ++j) {
        if (sqList[j] <= pivot) {
            ++i;
            temp = sqList[i];
            sqList[i] = sqList[j];
            sqList[j] = temp;
        }
    }

    ++i;
    sqList[high] = sqList[i];
    sqList[i] = pivot;

    return i;
}

function partition(sqList, low, high, comp) {
    let temp;
    let i = low;
    let j = high + 1;
    let rand = Math.floor(Math.random() * (high - low)) + low + 1;
    //let rand = (low + high) >> 1;

    temp = sqList[low];
    sqList[low] = sqList[rand];
    sqList[rand] = temp;

    let x = sqList[low];

    while (1) {
        while (comp(sqList[++i], x) < 0 && i < high);
        while (comp(sqList[--j], x) > 0);
        if (i >= j) break;
        temp = sqList[i];
        sqList[i] = sqList[j];
        sqList[j] = temp;
    }

    sqList[low] = sqList[j];
    sqList[j] = x;

    return j;
}

export function quickSortRecursive(
    sqList = [],
    low = 0,
    high = sqList.length - 1,
    comp = defaultCompare
) {
    if (low >= high) return;

    let k = partition(sqList, low, high, comp);
    quickSortRecursive(sqList, low, k - 1, comp);
    quickSortRecursive(sqList, k + 1, high, comp);
}


var arr = [23, 38, 22, 45, 23, 67, 31, 15, 41];
quickSortRecursive(arr);
console.log('quickSortRecursive:\n' + arr + '');


/*
快排递归算法优化，在最坏情况下堆栈深度为O(logn)
 */
export function quickSortRecursive2(
    sqList = [],
    low = 0,
    high = sqList.length - 1,
    comp = defaultCompare
) {
    while (low < high) {
        let k = partition(sqList, low, high, comp);

        // 对两个子数组中较小的一个子数组进行递归调用。
        // 较小子数组的大小最多为原数组大小一半，
        // 由于每次递归调用的数组大小至少减少一半，所以递归调用的次数
        // 最多为O(logn)
        if (k - low + 1 < high - k) {
            quickSortRecursive2(sqList, low, k - 1, comp);
            low = k + 1;
        } else {
            quickSortRecursive2(sqList, k + 1, high, comp);
            high = k - 1;
        }
    }
}
var arr = [23, 38, 22, 45, 23, 67, 31, 15, 41];
quickSortRecursive2(arr);
console.log('quickSortRecursive2:\n' + arr + '');


export function quickSortNonRecursive(
    sqList = [],
    low = 0,
    high = sqList.length - 1,
    comp = defaultCompare
) {
    let stack = [];
    let k;

    do {
        while (low < high) {
            k = partition(sqList, low, high, comp);
            // 第二个子序列的上,下界分别入栈
            stack.push(high, k + 1);
            //stack.push(k + 1);
            high = k - 1;
        }

        if (!stack.length) return;

        low = stack.pop();
        high = stack.pop();
    } while (1);
}

var arr = [23, 38, 22, 45, 23, 67, 31, 15, 41];
quickSortNonRecursive(arr);
console.log('quickSortNonRecursive:\n' + arr + '');

// 优化版本
export function quickSort(
    sqList = [],
    low = 0,
    high = sqList.length - 1,
    comp = defaultCompare
) {
    let stack = [];
    let pivot;

    do {
        // 如果当前子序列长度大于3且尚未排好序
        if (high - low > 2) {
            // 进行一趟划分
            pivot = partition(sqList, low, high, comp);

            // 吧长的子序列边界入栈，
            // 短的子序列留待下次排序
            if (high - pivot > pivot - low) {
                stack.push(high, pivot + 1);
                //stack.push();
                high = pivot - 1;
            } else {
                stack.push(pivot - 1, low);
                //stack.push();
                low = pivot + 1;
            }
        }
        // 如果当前子序列长度小于3，且尚未排好序，
        // 直接进行比较排序买当前子序列标志为已排好序
        else if (low < high && high - low < 3) {
            easySort(sqList, low, high, comp);
            low = high;
        }
        // 如果当前子序列已排好序但栈中还有未排序的子序列
        // 从栈中取出一个子序列
        else {
            if (!stack.length) return;

            low = stack.pop();
            high = stack.pop();
        }
    } while (1);
}

function easySort(sqList, low, high, comp) {
    let temp;

    if (high - low === 1) {
        if (comp(sqList[low], sqList[high]) > 0) {
            temp = sqList[low];
            sqList[low] = sqList[high];
            sqList[high] = temp;
        }
    } else {
        if (comp(sqList[low], sqList[low + 1]) > 0) {
            temp = sqList[low];
            sqList[low] = sqList[low + 1];
            sqList[low + 1] = temp;
        }
        if (comp(sqList[low + 1], sqList[high]) > 0) {
            temp = sqList[low + 1];
            sqList[low + 1] = sqList[high];
            sqList[high] = temp;
        }
        if (comp(sqList[low], sqList[low + 1]) > 0) {
            temp = sqList[low];
            sqList[low] = sqList[low + 1];
            sqList[low + 1] = temp;
        }
    }
}

var arr = [23, 38, 22, 45, 23, 67, 31, 15, 41];
quickSort(arr);
console.log('quickSort:\n' + arr + '');


// 奇偶交换排序
export function oddEvenSort(sqList = [], comp = defaultCompare) {
    let change = 1;
    let temp;
    let len = sqList.length;

    while (change) {
        change = 0;
        // 对所有奇数进行一趟比较
        for (let i = 1; i < len - 1; i += 2) {
            if (comp(sqList[i], sqList[i + 1]) > 0) {
                temp = sqList[i];
                sqList[i] = sqList[i + 1];
                sqList[i + 1] = temp;

                change = 1;
            }
        }

        // 对所有偶数进行一趟比较
        for (let i = 0; i < len - 1; i += 2) {
            if (comp(sqList[i], sqList[i + 1]) > 0) {
                temp = sqList[i];
                sqList[i] = sqList[i + 1];
                sqList[i + 1] = temp;

                change = 1;
            }
        }
    }
}

var arr = [23, 38, 22, 45, 23, 67, 31, 15, 41];
oddEvenSort(arr);
console.log('oddEvenSort:\n' + arr + '');


/*
把由三种颜色组成的序列重排为按照红白蓝的顺序排列，
思路：
设立三个指针，其中j表示当前元素；i以前的元素全部为红色；k以后的颜色全为蓝色。这样就可以根据j的颜色把其交换到序列的前面或者后面。
 */
const RED = 0;
const WHITE = 1;
const BLUE = 2;

function flagArrange(colors) {
    let i = 0;
    let j = 0;
    let k = colors.length - 1;
    let temp;

    while (j <= k) {
        switch (colors[j]) {
            case RED:
                temp = colors[i];
                colors[i] = colors[j];
                colors[j] = temp;
                ++i;
                ++j;
                break;
            case WHITE:
                ++j;
                break;
            case BLUE:
                temp = colors[j];
                colors[j] = colors[k];
                colors[k] = temp;
                --k;
                break;
            default:
                break;
        }
    }
}

var arr = [2, 1, 0, 2, 1, 1, 0, 2, 0, 2, 1];
flagArrange(arr);
console.log(arr + '');