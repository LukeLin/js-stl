/**
 * 线性表
 */

    // 线性表的类型定义
(function () {
    // 将所有在数组b中但不在数组a的数据元素插入到a中

    var a = [1, 2, 3, 4, 5];
    var b = [1, 3, 5, 7, 9];

    function union(a, b) {
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

    function mergeList(a, b) {
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
}());

// 线性表的顺序表示和实现
(function () {
    // 使用伪数组模拟线性表插入操作的前后数据元素在存储空间中的位置变化
    var a = {0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5};
    a.length = 6;

    function insert(a, i, elem) {
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

    function del(a, i) {
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
    function listComp(aList, bList){
        for(var i = 0; i < aList.length && i < bList.length; i++){
            if(aList[i] !== bList[i]) return aList[i] > bList[i] ? 1 : -1;
        }

        if(aList.length == bList.length) return 0;

        return aList.length > bList.length ? 1 : -1;
    }



}());