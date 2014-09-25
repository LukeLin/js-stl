/**
 * 串（string）（或字符串）是由零个或多个字符组成的有限序列。串中字符的数目称为串的长度。零个字符的串称为空串（null string），它的长度为零。
 * 串中任意个连续的字符组成的子序列称为该串的子串。包含子串的串相应地称为主串。通常称字符在序列中的序号为该字符在串中的位置。子串在主串中的位置则以子串的第一个字符在主串中的位置来表示。
 * 只有当两个串的长度相等，并且各个对应位置的字符都相等时才相等。
 *
 * 串有3种机内表示方法：
 * 1.定长顺序存储表示
 * 2.堆分配存储表示
 * 3.串的块链存储表示
 */

/**
 * 定长顺序存储表示
 * 类似于线性表的顺序存储结构，用一组地址连续的存储单元存储串值得字符序列。在串的定长顺序存储结构中，按照预定义的大小，为每个定义的串变量分配一个固定长度的存储区，则可用定长数组来描述。
 * 以下标为0的数组分量存放串的实际长度。
 */

(function (exports) {
    function SString() {
        this.MAXSTRLEN = 10;
    }

    exports.SString = SString;
    SString.prototype = {
        constructor: SString,
        // 返回由s1和s2连接而成的新串
        concat: function (s2) {
            var t = new SString();
            // 未截断
            if (this[0] + s2[0] <= this.MAXSTRLEN) {
                copyStr2T(this);
                copyStr2T(s2, this[0]);
                t[0] = this[0] + s2[0];

                // 截断
            } else if (this[0] < this.MAXSTRLEN) {
                copyStr2T(this);
                copyStr2T(s2, this[0], this.MAXSTRLEN - this[0]);
                t[0] = this.MAXSTRLEN;

                // 截断（仅取s1）
            } else {
                copyStr2T(this, 0, this.MAXSTRLEN);
                t[0] = this[0] = this.MAXSTRLEN;
            }

            return t;

            function copyStr2T(str, start, end) {
                start = start || 0;
                for (var i = 1, len = end || str[0]; i <= len; i++) {
                    t[start + i] = str[i];
                }
            }
        },
        substring: function (position, len) {
            position = ~~position || 0;
            len = ~~len || this[0];
            if (position < 0 || position > this[0] - 1 || len < 0 || len > this[0] - position)
                throw new Error('unexpected parameter');

            var sub = new SString();
            for (var i = 1; i <= len; i++) {
                sub[i] = this[position + i - 1];
            }
            sub[0] = len;

            return sub;
        },

        /**
         * todo
         * @param t
         * @param v
         * @returns {number}
         */
        replace: function(t, v){
            for(var n = 0, i = 1; i <= this[0] - t[0] + 1; i++){
                for(var j = i, k = 1; t[k] && this[j] === t[k]; ++j, ++k);

                if(k > t[0]) {
                    var l;
                    if(t[0] === v[0]){
                        for(l = 1; l <= t[0]; ++l) this[i + l - 1] = v[l];
                    } else if(t[0] < v[0]){
                        for(l = this[0]; l >= i + t[0]; --l)
                            this[l + v[0] - t[0]] = this[l];

                        for(l = 1; l <= v[0]; ++l)
                            this[i + l - 1] = v[l];

                    } else {
                        for(l = i + v[0]; l <= this[0] + v[0] - t[0]; ++l)
                            this[l] = this[l - v[0] + t[0]];

                        for(l = 1; l <= v[0]; ++l)
                            this[i + l - 1] = v[l];

                    }

                    this[0] = this[0] - t[0] + v[0];
                    i += v[0];
                    ++n;
                }
            }

            return n;
        },

        toString: function () {
            var str = '';
            for (var i = 1; this[i]; i++) {
                str += this[i];
            }
            return str;
        },
        // 返回子串sstring在主串中的第position个字符之后的位置
        index: function (sstring, position) {
            var i = position || 0;
            var j = 1;

            while (i <= this[0] && j <= sstring[0]) {
                if (this[i] === sstring[j]) {
                    i++;
                    j++;
                } else {
                    i = i - j + 2;
                    j = 1;
                }
            }

            return j > sstring[0] ? i - sstring[0] : -1;
        },
        kmpIndex: function (sstring, position) {
            var i = position || 1;
            var j = 1;
            var next = getNext(sstring);

            while (i <= this[0] && j <= sstring[0]) {
                if (j === 0 || this[i] === sstring[j]) {
                    ++i;
                    ++j;
                } else {
                    j = next[j];
                }
            }

            return j > sstring[0] ? i - sstring[0] : -1;
        }
    };

    function getNext(sstring) {
        var i = 1;
        var next = {1: 0};
        var j = 0;

        while (i < sstring[0]) {
            if (j === 0 || sstring[i] === sstring[j]) {
                if(sstring[++i] !== sstring[++j]){
                    next[i] = j;
                } else {
                    next[i] = next[j];
                }
//                next[++i] = ++j;
            } else {
                j = next[j];
            }
        }

        return next;
    }

    var a = new SString();
    var b = new SString();
    for (var i = 0; i < 4; i++) {
        a[i + 1] = i + '';
        b[i + 1] = i + '';
    }
    a[0] = b[0] = 4;
    var t = a.concat(b);
    console.log(t + '');       // 01230123

    var d = new SString();
    var str = 'acabaabaabcacaabc';
    for(i = 0; i < str.length; i++){
        d[i + 1] = str[i];
    }
    d[0] = str.length;

    var c = new SString();
    str = 'abaabc';
    for(i = 0; i < str.length; i++){
        c[i + 1] = str[i];
    }
    c[0] = str.length;

    console.log(d.index(c));
    console.log(d.kmpIndex(c));

    /*
    在顺序存储结构中，实现串操作的原操作为“字符串序列的复制”，操作时间复杂度基于复制的字符串序列的长度。
    另一操作特点是，如果在操作中出现串值序列的长度超过MAXSTRLEN时，约定用截尾法处理，这种情况不仅在求连接串时可能发生，在串的其他操作中，如插入，置换等也可能发生，克服这个弊病唯有不限定串长的最大长度，即动态分配串值的存储空间。
     */

})(this.exports || this);

