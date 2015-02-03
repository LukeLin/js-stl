/**
 * Created by luke on 2015/2/2.
 */

/*
选择排序

选择排序(Selection Sort)的基本思想是：每次从当前待排序的记录中选取关键字最小的记录表，然后与待排序的记录序列中的第一个记录进行交换，直到整个记录序列有序为止。


简单选择排序

简单选择排序(Simple Selection Sort ，又称为直接选择排序)的基本操作是：通过n-i次关键字间的比较，从n-i+1个记录中选取关键字最小的记录，然后和第i个记录进行交换，i=1, 2, … n-1 。
1  排序示例
例：设有关键字序列为：7, 4, -2, 19, 13, 6，直接选择排序的过程：
初始记录的关键字：  7     4    -2     19    13    6
    第一趟排序：  -2     4     7     19    13    6
    第二趟排序：  -2     4     7     19    13    6
    第三趟排序：  -2     4     6     19    13    7
    第四趟排序：  -2     4     6     7     13    19
    第五趟排序：  -2     4     6     7     13    19
    第六趟排序：  -2     4     6     7     13    19

2.算法分析
整个算法是二重循环：外循环控制排序的趟数，对n个记录进行排序的趟数为n-1趟；内循环控制每一趟的排序。
进行第i趟排序时，关键字的比较次数为n-i，则：
比较次数： n*(n - 1) / 2
时间复杂度是：T(n)=O(n2)
空间复杂度是：S(n)=O(1)
从排序的稳定性来看，直接选择排序是不稳定的。

 */


function simpleSelectionSort(sqList){
    for(var i = 0, len = sqList.length; i < len; ++i){
        for(var k = i, j = k + 1; j < len; ++j)
            if(sqList[j] < sqList[k]) k = j;

        if(k !== i) {
            var temp = sqList[k];
            sqList[k] = sqList[i];
            sqList[i] = temp;
        }
    }
}
exports.simpleSelectionSort = simpleSelectionSort;

var arr = [7, 4, -2, 19, 13, 6];
simpleSelectionSort(arr);
console.log(arr + '');