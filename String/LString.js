/**
 * 串的块链存储表示
 *
 * 和线性表的链式存储结构相类似，也可采用链式方式存储串值。由于串结构的特殊性--结构中的每个数据元素是一个字符，则用链表存储串值时，存在一个“结点大小”的问题，即每个结点可以存放一个字符，也可以存放多个字符。
 * 下面是结点大小为4（即每个结点存放4个字符）的链表
 * head --> (a,b,c,d) --> (e,f,g,h) --> (i###)
 * 下面是结点大小为1的链表
 * head --> (a) --> (b) --> (c) --> ... --> (i)
 *
 * 当结点大小大于1时，由于串长不一定是结点大小的整倍数，则链表中的最后一个结点不一定全被串值占满，此时通常补上“#”或其它非串值字符。
 * 为了便于进行串的操作，当以链表存储串值时，除头指针外还可附设一个尾指针指示链表中的最后一个结点，并给出当前串的长度，称如此定义的串存储结构为块链结构。
 *
 * 由于一般情况下，对串进行操作时，只需要从头向尾顺序扫描即可，则对串值不必建立双向链表。设尾指针的目的是为了便于进行连接操作，但应注意连接时需处理第一个串尾的无效字符。
 * 在链式存储方式中，结点大小的选择和顺序存储方式的格式选择一样都很重要，它直接影响到串处理的效率。如果串很长，这要求我们考虑串值的存储密度：
 * 存储密度 = 串值所占的存储位 / 实际分配的存储位
 *
 * 串值的链式存储结构对某些串操作，如连接操作等有一定方便之处，但总的来说不如另外两种存储结构灵活，它占用存储量大且操作复杂。
 */
import Stack from '../Stack/index';

class Chunk {
    constructor(chunkSize = 4) {
        this.chunkSize = chunkSize;
        this.ch = [];
        for (let i = 0; i < this.chunkSize; i++) {
            this.ch[i] = '#';
        }
        // type: Chunk
        this.next = null;
    }
}

export default class LString {
    constructor(chunkSize = 4) {
        // type Chunk
        this.head = null;
        // type: chunk
        this.tail = null;
        // 串的当前长度
        this.length = 0;
        this.chunkSize = chunkSize;
    }

    // 将字符串转换成LString类型
    strAssign (chars) {
        this.head = this.tail = new Chunk(this.chunkSize);
        this.length = chars.length;

        let current = this.head;
        for (let i = 0, len = chars.length; i < len; i++) {
            current.ch[i % this.chunkSize] = chars[i];
            if (i + 1 < len && (i + 1) % this.chunkSize === 0) {
                current.next = new Chunk();
                current = current.next;
            }
        }

        this.tail = current;
    }
    // 字符串对比
    // TODO 是否去掉chunkSize的对比
    strCompare (tLString) {
        let current = this.head;
        let curT = tLString.head;

        if (this.length !== tLString.length) return false;

        while (current) {
            for (let i = 0; i < this.chunkSize; i++) {
                if (current.ch[i] !== curT.ch[i]) return false;
            }

            current = current.next;
            curT = curT.next;
        }

        return true;
    }
    clearString () {
        this.head = this.tail = null;
        this.length = 0;
    }
    concat (tLSting) {
        if (!tLSting.length) return;

        let ret = new LString(this.chunkSize);

        if (this.head === null) {
            copyString(ret, tLSting);
        } else {
            ret.head = ret.tail = new Chunk(this.chunkSize);
            copyString(ret, this);

            let index = ret.tail.ch.indexOf('#');
            if (index === -1) {
                copyString(ret, tLSting);
            } else {
                copyString(ret, tLSting, ret.tail, tLSting.head, index);
            }
        }

        return ret;
    }
    substring (pos, len) {
        pos = ~~pos || 0;
        len = ~~len || this.length;
        if (pos < 0 || pos > this.length - 1 || len < 0 || len > this.length - pos)
            throw new Error('unexpected parameter');

        let sub = new LString(this.chunkSize);
        let current = findPosChunk(this, pos);
        let curS = sub.head = new Chunk(this.chunkSize);
        let i = 0;
        sub.length = len;

        outerloop: while (current) {
            for (let j = 0, size = this.chunkSize; j < size; j++) {
                if (i === len) {
                    break outerloop;
                } else {
                    curS.ch[j] = current.ch[(i + pos) % this.chunkSize];
                    i++;
                    if ((i + pos) % this.chunkSize === 0) {
                        current = current.next;
                    }
                    if (i % this.chunkSize === 0 && (current.ch[i] || current.next)) {
                        curS.next = new Chunk(this.chunkSize);
                        curS = curS.next;
                    }
                }
            }
        }

        return sub;
    }
    toString () {
        let current = this.head;

        if (current === null) return '';

        let str = '';
        while (current) {
            for (let i = 0, len = this.chunkSize; i < len; i++) {
                let ch = current.ch[i];
                if (ch === '#') {
                    return str;
                } else {
                    str += current.ch[i];
                }
            }
            current = current.next;
        }

        return str;
    }
}

function findPosChunk(lString, pos) {
    let current = lString.head;
    while (current) {
        for (let i = 0, len = lString.chunkSize; i < len; i++) {
            if (pos-- === 0) return current;
        }
        current = current.next;
    }
}

function copyString(destination, target, curD, currT, offset) {
    offset = offset || 0;
    currT = currT || target.head;
    curD = curD || destination.head;
    let k = 0;

    while (currT) {
        for (let i = 0, len = target.chunkSize; i < len; i++, k++) {
            let j = k % curD.chunkSize + offset;
            curD.ch[j % curD.chunkSize] = currT.ch[i];

            if ((j + 1) % curD.chunkSize === 0 && (currT.ch[i + 1] || currT.next)) {
                curD.next = new Chunk(destination.chunkSize);
                curD = curD.next;
            }
        }

        currT = currT.next;
    }

    destination.tail = curD;
    destination.length += target.length;
}

let a = new LString();
let b = new LString();
let c = new LString();

a.strAssign('abcdefg');
console.log(a + '');
b.strAssign('hijklmno');
console.log(b + '');
c.strAssign('abcdefg');
console.log(a.strCompare(b));
console.log(a.strCompare(c));
let t = a.concat(b);
console.log(t + '');
t = t.substring(2, 5);
console.log(t + '');


// 判断是否为回文字符串
function palindrome(lStr) {
    let stack = new Stack();
    let p = lStr.head;
    let i = 0;

    for (let k = 1; k <= lStr.length; ++k) {
        if (k <= lStr.length / 2) stack.push(p.ch[i]);
        else if (k > (lStr.length + 1) / 2) {
            let c = stack.pop();
            if (p.ch[i] !== c) return false;
        }

        if (++i === lStr.chunkSize) {
            p = p.next;
            i = 0;
        }
    }

    return true;
}