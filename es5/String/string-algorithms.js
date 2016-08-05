'use strict';

// 求包含在串s中而t没有的字符构成的新串
function string_Subtract(s, t) {
    var r = '';

    for (var i = 0; i < s.length; i++) {
        var c = s[i];
        // 判断s的当前字符c是否第一次出现
        for (var j = 0; j < i && c !== s[j]; j++) {}
        if (i === j) {
            // 判断当前字符是否包含在t中
            for (var k = 0; k < t.length && c !== t[k]; k++) {}
            if (k >= t.length) r += c;
        }
    }

    return r;
}

string_Subtract('abcde', 'cefgh'); // abd


// 将串s中的子串t替换为v
function replace(s, t, v) {
    var w = '';
    var n = 0;
    var tail = '';

    for (var i = 0; i <= s.length - t.length; i++) {
        if (s.substr(i, t.length) === t) {
            var head = s.substr(n, i - n);
            tail = s.substr(i + t.length, s.length - i - t.length + 1);
            w += head + v;
            i += t.length;
            n = i;
        }
    }

    w += tail;

    return w;
}
console.log(replace('place, ace', 'ace', 'face')); // plface, face


// 后缀转前缀
function niBoLan2BoLan(str) {
    var stack = [];

    for (var i = 0; i < str.length; i += 1) {
        var r = str[i];

        if (/\w/.test(r)) stack.push(r);else {
            if (!stack.length) return false;
            var a = stack.pop();
            if (!stack.length) return false;
            var b = stack.pop();
            var c = r + b + a;
            stack.push(c);
        }
    }

    var ret = stack.pop();

    return stack.length && ret;
}

console.log(niBoLan2BoLan('abc+*d-')); // -*a+bcd

function getLongestRepeatSubStr(str) {
    var maxLen = 0;
    var results = [];

    for (var i = 0; i < str.length; ++i) {
        for (var j = 0, k = 0; j < str.length && j + i + 1 < str.length; ++j) {
            if (str[j] === str[j + i + 1]) ++k;else k = 0;

            if (k > maxLen) {
                maxLen = k;
                results = [str.substring(j - k + 1, j + 1)];
            } else if (maxLen && k === maxLen) {
                results.push(str.substring(j - k + 1, j + 1));
            }
        }
    }

    return results;
}

console.log(getLongestRepeatSubStr('abacddd'));
console.log(getLongestRepeatSubStr('ababcd'));
console.log(getLongestRepeatSubStr('abcdefghi'));
console.log(getLongestRepeatSubStr('abbccddddc'));
console.log(getLongestRepeatSubStr('abcdbcdbcb'));

function getLongestPublicSubstring(s, t) {
    // a为较长的字符串，b为较短的
    var a, b;
    if (s.length >= t.length) {
        a = s;
        b = t;
    } else {
        a = t;
        b = s;
    }

    var jmin, jmax, lps1, lps2;
    for (var maxLen = 0, i = -b.length; i < a.length; ++i) {
        if (i < 0) {
            jmin = 0;
            jmax = i + b.length;
        } else if (i > a.length - b.length - 1) {
            jmin = i;
            jmax = a.length - 1;
        } else {
            jmin = i;
            jmax = i + b.length;
        }

        for (var k = 0, j = jmin; j <= jmax; ++j) {
            if (a[j] === b[j - i]) ++k;else k = 0;

            if (k > maxLen) {
                lps1 = j - k + 1;
                lps2 = lps1 - i;
                maxLen = k;
            }
        }
    }

    if (maxLen) {
        var lpsS, lpsT;
        if (s.length >= t.length) {
            lpsS = lps1;
            lpsT = lps2;
        } else {
            lpsS = lps2;
            lpsT = lps1;
        }

        console.log('Longest Public Substring length: %d', maxLen);
        console.log('Position in S: %d  Position in T: %d', lpsS, lpsT);
        console.log('Longest Public Substring is: %s', s.substr(lpsS, maxLen));
    } else {
        console.log('No Public Substring found!');
    }
}

getLongestPublicSubstring('qwabcdaabcde', 'abcabcdeos');

getLongestPublicSubstring('abbrabcd', 'cdababd');