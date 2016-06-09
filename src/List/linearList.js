/**
 * 线性表
 */

// 线性表的类型定义
// 将所有在数组b中但不在数组a的数据元素插入到a中

var a = [1, 2, 3, 4, 5];
var b = [1, 3, 5, 7, 9];

export function union(a, b) {
    var elem, equal;

    for (var i = 0, bLen = b.length; i < bLen; i++) {
        elem = b[i];
        equal = false;

        for (var j = 0, aLen = a.length; j < aLen; j++) {
            if (elem === a[j]) {
                equal = true;
                break;
            }
        }

        if (!equal) a.push(elem);
    }
}

union(a, b);
console.log(a);
// [1, 2, 3, 4, 5, 7, 9]

// 时间复杂度：O(aLen * bLen)

// 已知数组a和数组b中的数据元素按值非递减排列
// 归并a和b得到新的数组c，c的数据元素也按值非递减排列
var a = [3, 5, 8, 11];
var b = [2, 6, 8, 9, 11, 15, 20];

export function mergeList(a, b) {
    var c = [], aElem, bElem;
    var i = 0, j = 0, k = 0;
    var aLen = a.length;
    var bLen = b.length;

    while (i < aLen && j < bLen) {
        aElem = a[i];
        bElem = b[j];

        if (aElem < bElem) {
            c[k++] = aElem;
            i++;
        } else {
            c[k++] = bElem;
            j++;
        }
    }

    while (i < aLen) {
        c[k++] = a[i++];
    }

    while (j < bLen) {
        c[k++] = b[j++];
    }

    return c;
}

var c = mergeList(a, b);
console.log(c);
// [2, 3, 5, 6, 8, 8, 9, 11, 11, 15, 20]

// 时间复杂度： O(aLen + bLen)

// 线性表的顺序表示和实现
// 使用伪数组模拟线性表插入操作的前后数据元素在存储空间中的位置变化
var a = {0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5};
a.length = 6;

export function insert(a, i, elem) {
    if (!elem) return;

    var len = a.length;
    if (i >= len) {
        while (len < i) {
            a[len++] = undefined;
            a.length++;
        }
        a[i] = elem;
    } else {
        while (len > i) {
            a[len--] = a[len];
        }
        a[i] = elem;
    }
    a.length++;
}

insert(a, 3, 8);
insert(a, 10, 10);
console.log(a);

// 使用伪数组模拟线性表删除操作的前后数据元素在存储空间中的位置变化

export function del(a, i) {
    var temp = a[i];
    var j = i + 1;
    var len = a.length;

    while (j < len) {
        a[j - 1] = a[j++];
    }
    a.length--;
    delete a[len - 1];

    return temp;
}

del(a, 3);
console.log(a);
del(a, 10);
console.log(a);

// 时间复杂度： O(a.length)

// 比较字符表A和B，并用返回值表示结果，值为1，表示A>B，值为-1，表示A<B，值为0，表示A=B
export function listComp(aList, bList) {
    for (var i = 0; i < aList.length && i < bList.length; i++) {
        if (aList[i] !== bList[i]) return aList[i] > bList[i] ? 1 : -1;
    }

    if (aList.length == bList.length) return 0;

    return aList.length > bList.length ? 1 : -1;
}

export function reverse(list) {
    for (var i = 0, j = list.length - 1; i <= j; i++, j--) {
        var temp = list[i];
        list[i] = list[j];
        list[j] = temp;
    }
}

// 求元素递增排列的线性表A和B的元素的交集并存入C
export function intersect(aList, bList) {
    var cList = [];
    var i = 0, j = 0, k = 0;

    while (aList[i] && bList[j]) {
        if (aList[i] < bList[j]) i++;
        else if (aList[i] > bList[j]) j++;
        else {
            cList[k++] = aList[i];
            i++;
            j++;
        }
    }

    return cList;
}

console.log(intersect([1, 3, 5, 7, 9], [1, 5, 9, 13, 17]) + '');

// 求元素递增排列的线性表A和B的元素的交集并存入回a
export function intersect_true(a, b) {
    var i = 0, j = 0, k = 0;

    while (a[i] && b[j]) {
        if (a[i] < b[j]) i++;
        else if (a[i] > b[j]) j++;
        else {
            a[k++] = a[i];
            i++;
            j++;
        }
    }

    while (a[k]) a.splice(k, 1);

    return a;
}

console.log(intersect_true([1, 3, 5, 7, 9], [1, 5, 9, 13, 17]) + '');

// a，b，c的元素均是非递减排列
// 求a数组中非b数组和c数组的交集的元素。
export function intersect_delete(a, b, c) {
    var i = 0, j = 0, k = 0, m = 0;

    while (i < a.length && j < b.length && k < c.length) {
        if (b[j] < c[k]) j++;
        else if (b[j] > c[k]) k++;
        else {
            // 找到了相同元素same
            var same = b[j];

            // j，k后移到新的元素
            while (b[j] === same) j++;
            while (c[k] === same) k++;
            // 需保留的元素移动到新位置
            while (i < a.length && a[i] < same) a[m++] = a[i++];
            // 跳过相同的元素
            while (i < a.length && a[i] === same) i++;
        }
    }

    // a的剩余元素重新存储
    while (i < a.length) a[m++] = a[i++];
    a.length = m;

    return a;
}

console.log(intersect_delete([1, 2, 3, 4, 5, 6, 9], [1, 3, 5, 7, 9], [1, 5, 9, 13, 17]) + '');
