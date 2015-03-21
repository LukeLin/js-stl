/**
 * 把数组的元素循环右移k位，只用一个辅助存储空间
 * @param {Array} array
 * @param {Number} k
 */
function rightShiftArray(array, k) {
    var n = array.length;
    var p;
    // 求n和k的最大公约数
    for (var i = 1; i <= k; ++i)
        if (n % i === 0 && k % i === 0) p = i;

    for (i = 0; i < p; ++i) {
        var j = i;
        var l = (i + n - k) % n;
        var temp = array[i];

        while (l !== i) {
            array[j] = array[l];
            // 循环右移一步
            j = l;
            l = (j + n - k) % n;
        }

        array[j] = temp;
    }

    return array;
}

var arr = [];
for(var i = 0; i < 15; ++i) arr[i] = i + 1;
console.log(rightShiftArray(arr, 6) + '');
