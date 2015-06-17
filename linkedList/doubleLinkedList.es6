/**
 * 循环链表（circular linked list）
 * 是另一种形式的链式存储结构。它的特点是表中最后一个结点的指针域指向头结点，整个表形成一个环。
 * 循环链表的操作和线性链表基本一致，仅有细微差别。
 */

/**
 * 双向链表
 *
 * 双向链表是为了克服单链表这种单向性的缺点。
 * 双向链表的结点中有两个指针域，其一指向直接后继，另一指向直接前趋。
 *
 * 双向链表也可以有循环表。
 */

export default class DoubleLinkedList {
    constructor(data = null, prior = this, next = this) {
        this.data = data;
        this.prior = prior;
        this.next = next;
    }

    find (i) {
        // 初始化，p指向第一个节点，j为计数器
        let p = this.next;
        let j = 1;
        // 顺指针向后查找，知道p指向第i个元素或p为空
        while (p && j < i) {
            p = p.next;
            ++j;
        }
        // 第i个元素不存在
        // 或者取第i个元素
        return (!p || j > i) ? null : p;
    }
    add (i, elem) {
        let p;

        if (!(p = this.find(i))) return false;

        let s = new DoubleLinkedList(elem, p.prior, p);
        p.prior.next = s;
        p.prior = s;

        return true;
    }
    remove (i) {
        let p;
        if (!(p = this.find(i))) return false;

        let e = p.data;
        p.prior.next = p.next;
        p.next.prior = p.prior;

        p = null;

        return e;
    }
}


let a = new DoubleLinkedList(1);

a.add(0, 1);
a.add(1, 2);
a.add(2, 3);
a.remove(1);
console.log(a);
