/**
 * 堆分配存储表示
 *
 * 这种存储表示的特点是，仍以一组地址连续的存储单元存放串值字符序列，但它们的存储空间是在程序执行过程中动态分配而得。在c语言中，存在一个称之为“堆”的自由存储区，并由c语言的动态分配函数malloc()和free()来管理。利用函数malloc()为每个新产生的串分配一块实际串长所需的存储空间。
 */

export default class HString {
    constructor(){
        this.ch = {};
        this.length = 0;
    }

    // 1 <= position <= this.length.在串的第position个字符之前插入串tHString
    strInsert (position, tHString) {
        if (position < 1 || position > this.length + 1)
            throw new Error('unexpected position');

        if (tHString.length) {
            // 为插入t而腾出位置
            let i = this.length - 1;
            for (let len = position - 1; i >= len; --i)
                this.ch[i + tHString.length] = this.ch[i];

            stringCopy(this.ch, tHString.ch, position - 1, tHString.length - 1, 0);

            this.length += tHString.length;
        }
    }
    strAssign (chars) {
        stringCopy(this.ch, chars, 0, chars.length - 1, 0);
        this.length = chars.length;
    }
    strLength () {
        return this.length;
    }
    strCompare (tHString) {
        for (let i = 0, len = this.length; i < len && i < tHString.length; i++)
            if (this.ch[i] !== tHString.ch[i]) return this.ch[i] - tHString.ch[i];

        return this.length - tHString.length;
    }
    clearString () {
        this.ch = {};
        this.length = 0;
    }
    concat (s) {
        let t = new HString();

        // t.ch[0..this.length - 1] = this.ch[0..this.length - 1]
        stringCopy(t.ch, this.ch, 0, this.length - 1, 0);
        t.length = this.length + s.length;
        // t.ch[this.length..t.length - 1] = s.ch[0..s.length - 1]
        stringCopy(t.ch, s.ch, this.length, s.length - 1, 0);

        return t;
    }
    substring (position, len) {
        position = ~~position || 0;
        len = ~~len || this.length;
        if (position < 0 || position > this.length - 1 || len < 0 || len > this.length - position)
            throw new Error('unexpected parameter');

        let sub = new HString();
        stringCopy(sub.ch, this.ch, 0, len - 1, position);
        sub.length = len;

        return sub;
    }
    toString () {
        let s = '';
        for (let i = 0, len = this.length; i < len; i++) {
            s += this.ch[i];
        }
        return s;
    }
}

function stringCopy(destination, target, destStart, length, targetStart) {
    destStart = destStart || 0;
    length = length || target.length;
    targetStart = targetStart || 0;

    for (let i = 0; i <= length; i++) {
        destination[destStart + i] = target[targetStart + i];
    }
}