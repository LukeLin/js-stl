/**
 * Created by ldp on 2015/2/18.
 */

/*
 计数排序

 计数排序（Counting sort）是一种稳定的线性时间排序算法。计数排序使用一个额外的数组C，其中第i个元素是待排序数组A中值等于i的元素的个数。然后根据数组C来将A中的元素排到正确的位置。

 计数排序的特征

 当输入的元素是n个0到k之间的整数时，它的运行时间是Θ(n + k)。计数排序不是比较排序，排序的速度快于任何比较排序算法。
 由于用来计数的数组C的长度取决于待排序数组中数据的范围（等于待排序数组的最大值与最小值的差加上1），这使得计数排序对于数据范围很大的数组，需要大量时间和内存。例如：计数排序是用来排序0到100之间的数字的最好的算法，但是它不适合按字母顺序排序人名。但是，计数排序可以用在基数排序中的算法来排序数据范围很大的数组。
 通俗地理解，例如有10个年龄不同的人，统计出有8个人的年龄比A小，那A的年龄就排在第9位，用这个方法可以得到其他每个人的位置，也就排好了序。当然，年龄有重复时需要特殊处理（保证稳定性），这就是为什么最后要反向填充目标数组，以及将每个数字的统计减去1的原因。算法的步骤如下：
 1.找出待排序的数组中最大和最小的元素
 2.统计数组中每个值为i的元素出现的次数，存入数组C的第i项
 3.对所有的计数累加（从C中的第一个元素开始，每一项和前一项相加）
 4.反向填充目标数组：将每个元素i放在新数组的第C(i)项，每放一个元素就将C(i)减去1
 
 简要分析：
 1.计数排序仅适合于小范围的数据进行排序
 2.不能对浮点数进行排序
 3.时间复杂度为 O(n)
 4.计数排序是稳定的（排序后值相同的元素相对于原先的位置是不会发生变化的）
 */

function countingSort(sqList){
    var c = [];
    var b = [];

    // 对每个元素统计关键字比它小的元素个数
    for(var i = 0, len = sqList.length; i < len; ++i){
        for(var j = 0, count = 0; j < len; ++j)
            if(sqList[j] < sqList[i]) ++count;
        c[i] = count;
    }

    // 依次求出关键字最小，第二小。。。最大的记录
    for(i = 0; i < len; ++i){
        var min = 0;
        // 求出最小记录的下标
        for(j = 0; j < len; ++j)
            if(c[j] < c[min]) min = j;

        b[i] = sqList[min];
        // 修改该记录的c值为无穷大以便下次选取
        c[min] = Infinity;
    }

    return b;
}
exports.countingSort = countingSort;

var arr = [100, 93, 97, 92, 96, 99, 92, 89, 93, 97, 90, 94, 92, 95];
arr = countingSort(arr);
console.log(arr + '');


/**
 *
 * @param {Array} sqList 要排序的数组
 * @param {Number} k 数组中最大的元素值
 * @returns {Array}
 */
function countingSort2(sqList, k){
    var len = sqList.length;
    var c = [];
    var b = [];

    // 初始化辅助数组
    for(var i = 0; i <= k; ++i) c[i] = 0;
    // 计数数组A中值等于C数组下标的个数
    for(i = 0; i < len; ++i) c[sqList[i]]++;
    // 计数数组A中值小于等于C数组下标的个数
    for(i = 1; i <= k; ++i) c[i] += c[i - 1];
    for(i = len - 1; i >= 0; --i) {
        b[c[sqList[i]] - 1] = sqList[i];
        --c[sqList[i]];
    }

    return b;
}
exports.countingSort2 = countingSort2;

var arr = [100, 93, 97, 92, 96, 99, 92, 89, 93, 97, 90, 94, 92, 95];
arr = countingSort2(arr, 100);
console.log(arr + '');