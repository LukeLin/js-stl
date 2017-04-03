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

// 栈的链式表示
export default class Stack {
    constructor() {
        this.top = null;
        this.length = 0;
    }

    get size(){
        return this.length;
    }

    isEmpty(){
        return this.length === 0;
    }
    push (data) {
        let node = {
            data: data,
            next: null
        };

        node.next = this.top;
        this.top = node;
        this.length++;
    }
    peek () {
        return this.top === null ?
            null :
            this.top.data;
    }
    pop () {
        if (this.top === null) return null;

        let out = this.top;
        this.top = this.top.next;

        if (this.length > 0) this.length--;
        

        return out.data;
    }
    clear () {
        this.top = null;
        this.length = 0;
    }
    toString () {
        if (this.top === null) return null;

        let arr = [];
        let current = this.top;

        for (let i = 0, len = this.size; i < len; i++) {
            arr[i] = current.data;
            current = current.next;
        }

        return arr;
    }
}
