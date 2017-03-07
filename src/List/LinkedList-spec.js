import LinkedList from './LinkedList';

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
