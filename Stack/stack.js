/**
 * 栈
 *
 * 是限定仅在表尾进行插入或删除操作的线性表。表尾为栈顶（top），表头为栈底（bottom），不含元素的空表为空栈。
 * 栈又称为后进先出（last in first out）的线性表。
 */

/**
 * 顺序栈
 * 栈的顺序存储结构是利用一组地址连续的存储单元依次存放至栈底到栈顶的元素，同时附设指针top指示栈顶元素在顺序栈中的位置。
 *
 */

    // 找的链式表示
function Stack() {
    this.top = null;
    this.size = 0;
}
module.exports = Stack;
Stack.prototype = {
    constructor: Stack,
    push: function (data) {
        var node = {
            data: data,
            next: null
        };

        node.next = this.top;
        this.top = node;
        this.size++;
    },
    peek: function () {
        return this.top === null ?
            null :
            this.top.data;
    },
    pop: function () {
        if (this.top === null) return null;

        var out = this.top;
        this.top = this.top.next;

        if (this.size > 0) this.size--;

        return out.data;
    },
    clear: function () {
        this.top = null;
        this.size = 0;
    },
    toString: function () {
        if (this.top === null) return null;

        var arr = [];
        var current = this.top;

        for (var i = 0, len = this.size; i < len; i++) {
            arr[i] = current.data;
            current = current.next;
        }

        return arr;
    }
};

var stack = new Stack();

stack.push(1);
stack.push('asd');

stack.pop();
stack.push({a: 1});
console.log(stack);


// 数值进制转换
// 公式： N = (N / d) * d + N % d
// N：十进制数值， d：需要转换的进制数
function numTransform(number, rad) {
    var s = new Stack();

    while (number) {
        s.push(number % rad);
        number = parseInt(number / 8, 10);
    }

    var arr = [];
    while (s.top) {
        arr.push(s.pop());
    }
    console.log(arr.join(''));
}

numTransform(1348, 8);
numTransform(1348, 2);


// 括号匹配检查
function bracketsMatch(str) {
    var stack = new Stack();
    var text = '';

    for (var i = 0, len = str.length; i < len; i++) {
        var c = str[i];
        if (c === '[') {
            stack.push(c);
        } else if (c === ']') {
            if (!stack.top || stack.pop() !== '[') throw new Error('unexpected brackets:' + c);
        } else {
            text += c;
        }
    }
    console.log(text);
}

console.log(bracketsMatch('[asd]'));

function Matcher(left, right) {
    this.left = left;
    this.right = right;
    this.stack = new Stack();
}
Matcher.prototype = {
    match: function (str) {
        var text = '';

        for (var i = 0, len = str.length; i < len; i++) {
            var c = str[i];
            if (c === this.left) {
                this.stack.push(c);
            } else if (c === this.right) {
                if (!this.stack.top || this.stack.pop() !== this.left) {
                    throw new Error('unexpected brackets:' + c);
                } else {
                    text += ',';
                }
            } else {
                text += c;
            }
        }
        console.log(text);
        return text;
    }
};
var m = new Matcher('{', '}');
m.match('[{123}123');

function LineEditor(str) {
    this.stack = new Stack();
    this.str = str || ''
}
LineEditor.prototype = {
    getResult: function () {
        var stack = this.stack;
        var str = this.str;
        for (var i = 0, len = str.length; i < len; i++) {
            var c = str[i];
            switch (c) {
                case '#':
                    stack.pop();
                    break;
                case '@':
                    stack.clear();
                    break;
                default:
                    stack.push(c);
                    break;
            }
        }

        var result = '';
        var current = stack.top;
        while (current) {
            result = current.data + result;
            current = current.next;
        }

        return result;
    }
};

var le = new LineEditor('whli##ilr#e(s#*s)\
    \noutcha@putchar(*s=#++)');
console.log(le.getResult());


var prioty = {
    "+": 1,
    "-": 1,
    "%": 2,
    "*": 2,
    "/": 2,
    "^": 3,
    "(": 0,
    ")": 0,
    "`": -1
};

function doop(op, opn1, opn2) {
    switch (op) {
        case "+":
            return opn1 + opn2;
        case "-":
            return opn1 - opn2;
        case "*":
            return opn1 * opn2;
        case "/":
            return opn1 / opn2;
        case "%":
            return opn1 % opn2;
        case "^":
            return Math.pow(opn1, opn2);
        default:
            return 0;
    }
}

function opcomp(a, b) {
    return prioty[a] - prioty[b];
}

function calInfixExpression(exp) {
    var cs = [];
    var ns = [];
    exp = exp.replace(/\s/g, "");
    exp += '`';
    if (exp[0] === '-') {
        exp = "0" + exp;
    }
    var c;
    var op;
    var opn1;
    var opn2;
    for (var i = 0; i < exp.length; ++i) {
        c = exp[i];
        // 如果是操作符
        if (c in prioty) {
            // 如果右边不是左括号且操作符栈的栈顶元素优先权比右边大
            // 循环遍历进行连续运算
            while (c != '(' && cs.length && opcomp(cs[cs.length - 1], c) >= 0) {
                // 出栈的操作符
                op = cs.pop();
                // 如果不是左括号或者右括号，说明是运算符
                if (op != '(' && op != ')') {
                    // 出栈保存数字的栈的两个元素
                    opn2 = ns.pop();
                    opn1 = ns.pop();
                    // 将与操作符运算后的结果保存到栈顶
                    ns.push(doop(op, opn1, opn2));
                }
            }
            // 如果右边不是右括号，保存到操作符栈中
            if (c != ')') cs.push(c);
        } else {
            // 多位数的数字的情况
            while (!(exp[i] in prioty)) {
                i++;
                c += exp[i];
            }
            ns.push(parseFloat(c));
            i--;
        }
    }
    return ns.length ? ns[0] : NaN;
}

var exp1 = calInfixExpression('5+3*4/2-2^3+5%2');
console.log(exp1);
