/**
 * 由于链表在空间的合理利用上和插入，删除时不需要移动等的有点，因此在很多场合下，它是线性表的首选存储结构。然而，它也存在着实现某些基本操作，如求线性表长度时不如顺序存储结构的缺点；另一方面，由于在链表中，结点之间的关系使用指针来表示，则数据元素在线性表中的“位序”的概念已淡化，而被数据元素在线性链表中的“位置”所代替。为此，从实际出发重新定义线性链表及其基本操作
 */

class Node {
    constructor(data = null, next = null){
        this.data = data;
        this.next = next;
    }
}

export default class LinkedList {
    constructor(sqList){
        this.head = null;
        this.tail = null;

        if (sqList) {
            for (let i = 0, len = sqList.length; i < len; ++i)
                this.push(sqList[i]);
        } 
    }
    
    static mergeList (a, b, compare = compFn) {
        let ha = a.head;
        let hb = b.head;
        let pa = ha;
        let pb = hb;
        let c = new LinkedList();
        let q;

        while (pa && pb) {
            let data1 = pa.data;
            let data2 = pb.data;

            if (!compare(data1, data2)) {
                // delete head node
                q = a.shift();
                // append the node to c linkedList
                c.append(q);
                pa = a.head;
            } else {
                q = b.shift();
                c.append(q);
                pb = b.head;
            }
        }
        
        if (pa) {
            c.append(pa);
            c.tail = a.tail;
        }
        else {
            c.append(pb);
            c.tail = b.tail;
        }
        
        return c;
    }

    // delete first element and return it
    shift () {
        let head = this.head;
        this.head = this.head.next;
        head.next = null;

        if (this.head === null) this.tail = null;
        return head;
    }

    pop(){
        let current = this.head;
        let previous = this.head;
        let elem;

        while (current !== null) {
            if (this.tail === current) {
                if (current === this.head) {
                    elem = this.tail.data;
                    this.head = null;
                    break;
                }

                this.tail = previous;

                previous.next = current.next;
                elem = current.data;
                break;
            }

            previous = current;
            current = current.next;
        }

        if (this.head === null) this.tail = null;

        return elem ? elem : false;
    }

    // append node
    append (node) {
        if (this.head !== null) {
            this.tail.next = node;
            this.tail = this.tail.next;
        } else {
            this.head = node;
            this.tail = node;
        }
    }

    // add data
    push (data) {
        if (this.head === null) {
            this.head = new Node(data);
            this.tail = this.head;
        } else {
            this.tail.next = new Node(data);
            this.tail = this.tail.next;
        }

        this.tail.data = data;
    }

    // remove data
    remove (data) {
        let current = this.head;
        let previous = this.head;
        let elem;

        while (current !== null) {
            if (data === current.data) {
                if (current === this.head) {
                    this.head = current.next;
                    elem = current.data;
                    break;
                }

                if (current === this.tail) this.tail = previous;

                previous.next = current.next;
                elem = current.data;
                break;
            }

            previous = current;
            current = current.next;
        }

        if (this.head === null) this.tail = null;

        return elem ? elem : false;
    }

    indexOf(data){
        let current = this.head;
        let index = -1;
        while (current !== null) {
            ++index;
            if (current.data === data) {
                return index;
            }

            current = current.next;
        }

        return index;
    }

    unshift (data) {
        let temp = new Node(data);
        temp.next = this.head;
        this.head = temp;
    }
    insertAfter (target, data) {
        let current = this.head;
        while (current !== null) {
            if (current.data === target) {
                let temp = new Node(data);
                temp.next = current.next;

                if (current === this.tail) this.tail = temp;

                current.next = temp;
                return;
            }

            current = current.next;
        }
    }
    item (index) {
        let current = this.head;

        while (current !== null) {
            if (--index === 0) return current;

            current = current.next;
        }

        return null;
    }
    each (callback) {
        if (typeof callback !== 'function') return;

        for (let current = this.head; current; current = current.next)
            if (callback(current)) break;
    }

    *[Symbol.iterator](){
        for(let current = this.head; current; current = current.next){
            yield current.data;
        }
    }

    size () {
        let current = this.head;
        let size = 0;

        while (current !== null) {
            ++size;
            current = current.next;
        }

        return size;
    }

    toString () {
        let str = '';

        this.each((node) => {
            str += node.data + (node.next ? ',' : '');
        });

        return str;
    }

    orderInsert (data, cmp) {
        cmp = typeof cmp === 'function' ? cmp : (a, b) => {
            if (a > b)
                return 1;
            else if (a === b)
                return 0;
            else
                return -1;
        };
        let previous = this.head;
        let current = this.head;

        if (current === null) {
            this.head = this.tail = new Node(data);
            return;
        }

        let me = this;
        while (current) {
            let ret = cmp(data, current.data);
            // 如果插入元素大于当前元素，准备下次遍历
            if (ret > 0) {
                previous = current;
                current = current.next;

                // 如果等于，直接插入到后面
            } else if (ret === 0) {
                return insertBetween(data, previous, current);

                // 如果小于则插入到前节点和当前节点中
                // 因为已经是排序了，所以不需要多余判断了
            } else {
                if (this.head === previous && previous === current)
                    return this.unshift(data);
                else
                    return insertBetween(data, previous, current);
            }
        }

        // 插入到最后一个结点
        previous.next = new Node(data);
        this.tail = previous.next;

        function insertBetween(data, a, b) {
            if (a == b) {
                if (a == me.head)
                    return me.unshift(data);
            } else {
                let temp = new Node(data);
                temp.next = b;
                a.next = temp;
                return true;
            }
        }
    }

    // 删除元素递增排列的链表中值大于min，且小于max的所有元素
    delete_between (min, max) {
        let p = this.head;

        // p是最后一个不大于min的元素
        while (p.next && p.next.data <= min) p = p.next;

        // 如果还有比min更大的元素
        let q;
        if (p.next) {
            q = p.next;
            // q是第一个不小于max的元素
            while (q && q.data < max) q = q.next;
            p.next = q;
        }

        let last = q || p;
        while (last.next) last = last.next;
        this.tail = last;
    }

    // 删除元素递增排列的链表的重复元素
    delete_equal () {
        let p = this.head;
        let q = p.next;

        while (p.next) {
            // 当相邻两元素不相等时，p,q都向后移
            if (p.data !== q.data) {
                p = p.next;
                q = p.next;
            } else {
                while (q.data === p.data) q = q.next;

                // 删除
                p.next = q;
                p = q;
                q = p.next;
            }
        }
    }

    reverse () {
        let p = this.head;
        let q = p.next;
        let s = q.next;
        p.next = null;

        while (s.next) {
            q.next = p;
            p = q;
            q = s;
            s = s.next;
        }

        q.next = p;
        s.next = q;
        this.head = s;
    }
}

function compFn(a, b) {
    return a - b;
}


// 求元素递增排列的线性表A和B的元素的交集并存入C
function intersect(list, bList) {
    let cList = new LinkedList();

    let p = list.head;
    let q = bList.head;

    while (p && q) {
        if (p.data < q.data) p = p.next;
        else if (q.data > q.data) q = q.next;
        else {
            cList.push(q.data);
            p = p.next;
            q = q.next;
        }
    }

    return cList;
}

// 求元素递增排列的线性表A和B的元素的交集并存入回a
function intersect_true(list, bList) {
    let p = list.head;
    let q = bList.head;
    let pc = list.head;

    while (p && q) {
        if (p.data < q.data) p = p.next;
        else if (p.data > q.data) q = q.next;
        else {
            pc.data = p.data;
            p = p.next;
            q = q.next;

            if (!p || !q) {
                pc.next = null;
                list.tail = pc;
            } else pc = pc.next;
        }
    }

    pc.next = null;
    list.tail = pc;
}

// a，b，c的元素均是非递减排列
// 求a链表中非b链表和c链表的交集的元素。
function intersect_delete(list, b, c) {
    let p = b.head;
    let q = c.head;
    let r = list.head;

    while (p && q && r) {
        if (p.data < q.data) p = p.next;
        else if (p.data > q.data) q = q.next;
        else {
            // 确定待删除元素
            let elem = p.data;

            if (r.data === elem && r === list.head) {
                list.head = list.head.next;
            } else {
                // 确定最后一个小于elem的元素指针
                while (r.next && r.next.data < elem) r = r.next;

                if (r.next.data === elem) {
                    let s = r.next;

                    // 确定第一个大于elem的元素指针
                    while (s && s.data === elem) s = s.next;
                    // 删除r和s之间的元素
                    r.next = s;
                }
            }

            while (p && p.data === elem) p = p.next;
            while (q && q.data === elem) q = q.next;
        }
    }

    list.tail = r;
}

var list = new LinkedList();
list.push('b');
list.unshift('a');
list.insertAfter('b', 'c');
console.log(list.item(2));
console.log(JSON.stringify(list));
list.each(function (node) {
    if (node.data === 'b') {
        console.log('get b in each');
    }
});
list.remove('c');
list.remove('a');
console.log(list);

let list2 = new LinkedList();
list2.push('c');
list2.unshift('d');
list2.insertAfter('d', 'b');
console.log(JSON.stringify(list2));

let list3 = LinkedList.mergeList(list, list2);
console.log(list3);


var list = new LinkedList();

list.orderInsert(5);
list.orderInsert(2);
list.orderInsert(3);
list.orderInsert(1);
list.orderInsert(4);
list.orderInsert(4);
list.orderInsert(6);
list.orderInsert(6);
list.orderInsert(7);

list.delete_between(5, 8);
console.log('delete-between:  ');
console.log(list);

list.orderInsert(2);
list.orderInsert(3);
list.orderInsert(1);

list.delete_equal();
console.log(list);

list.reverse();
console.log(list);

let a = new LinkedList();
a.orderInsert(1);
a.orderInsert(3);
a.orderInsert(5);
a.orderInsert(7);
a.orderInsert(9);

let b = new LinkedList();
b.orderInsert(1);
b.orderInsert(5);
b.orderInsert(9);
b.orderInsert(13);
b.orderInsert(17);
console.log(intersect(a, b));

console.log(intersect_true(a, b));

a = new LinkedList();
a.orderInsert(1);
a.orderInsert(3);
a.orderInsert(5);
a.orderInsert(7);
a.orderInsert(9);

let test = new LinkedList();
test.orderInsert(1);
test.orderInsert(2);
test.orderInsert(3);
test.orderInsert(4);
test.orderInsert(5);
test.orderInsert(6);
test.orderInsert(9);

intersect_delete(test, a, b);
console.log(test);

var popTest = new LinkedList();
popTest.push(1);
popTest.push(2);
popTest.pop();
popTest.pop();
