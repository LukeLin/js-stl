/**
 * 由于链表在空间的合理利用上和插入，删除时不需要移动等的有点，因此在很多场合下，它是线性表的首选存储结构。然而，它也存在着实现某些基本操作，如求线性表长度时不如顺序存储结构的缺点；另一方面，由于在链表中，结点之间的关系使用指针来表示，则数据元素在线性表中的“位序”的概念已淡化，而被数据元素在线性链表中的“位置”所代替。为此，从实际出发重新定义线性链表及其基本操作
 */

(function (module) {
    function List() {
        this.head = null;
        this.tail = null;
    }

    module.exports = List;

    List.mergeList = function (a, b, compare) {
        var ha = a.head;
        var hb = b.head;
        var pa = ha;
        var pb = hb;
        var c = new List();
        var q;
        compare = compare || function (data1, data2) {
            return data1 <= data2;
        };

        while (pa && pb) {
            var data1 = pa.data;
            var data2 = pb.data;

            if (!compare(data1, data2)) {
                // delete head node
                q = a.delFirst();
                // append the node to c linkedList
                c.append(q);
                pa = a.head;
            } else {
                q = b.delFirst();
                c.append(q);
                pb = b.head;
            }
        }

        if (pa) {
            c.append(pa);
        } else {
            c.append(pb);
        }

        return c;
    };

    List.prototype = {
        constructor: List,
        makeNode: function (data, next) {
            return {
                data: data != null ? data : null,
                next: next || null
            };
        },
        delFirst: function () {
            var head = this.head;
            this.head = this.head.next;
            head.next = null;

            if (this.head === null) this.tail = null;
            return head;
        },
        append: function (node) {
            if (this.head !== null) {
                this.tail.next = node;
                this.tail = this.tail.next;
            } else {
                this.head = node;
                this.tail = node;
            }
        },
        add: function (data) {
            if (this.head === null) {
                this.head = this.makeNode(data);
                this.tail = this.head;
            } else {
                this.tail.next = this.makeNode(data);
                this.tail = this.tail.next;
            }

            this.tail.data = data;
        },
        'delete': function (data) {
            var current = this.head;
            var previous = this.head;
            var elem;

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
        },
        insertAsFirst: function (data) {
            var temp = this.makeNode(data);
            temp.next = this.head;
            this.head = temp;
        },
        insertAfter: function (target, data) {
            var current = this.head;
            while (current !== null) {
                if (current.data === target) {
                    var temp = this.makeNode(data);
                    temp.next = current.next;

                    if (current === this.tail) this.tail = temp;

                    current.next = temp;
                    return;
                }

                current = current.next;
            }
        },
        item: function (index) {
            var current = this.head;

            while (current !== null) {
                if (--index === 0) return current;

                current = current.next;
            }

            return null;
        },
        each: function (callback) {
            var current = this.head;

            while (current !== null) {
                callback(current);
                current = current.next;
            }
        },
        orderInsert: function (data, cmp) {
            cmp = typeof cmp === 'function' ? cmp : function (a, b) {
                if (a > b)
                    return 1;
                else if (a === b)
                    return 0;
                else
                    return -1;
            };
            var previous = this.head;
            var current = this.head;

            if (current === null) {
                this.head = this.tail = this.makeNode(data);
                return;
            }

            var me = this;
            while (current) {
                var ret = cmp(data, current.data);
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
                    if (this.head === previous && previous === current) {
                        return this.insertAsFirst(data);
                    } else {
                        return insertBetween(data, previous, current);
                    }
                }
            }

            // 插入到最后一个结点
            previous.next = this.makeNode(data);
            this.tail = previous.next;

            function insertBetween(data, a, b) {
                if (a == b) {
                    if (a == me.head)
                        return me.insertAsFirst(data);
                } else {
                    var temp = me.makeNode(data);
                    temp.next = b;
                    a.next = temp;
                    return true;
                }
            }
        },

        // 删除元素递增排列的链表中值大于min，且小于max的所有元素
        delete_between: function (min, max) {
            var p = this.head;

            // p是最后一个不大于min的元素
            while (p.next && p.next.data <= min) p = p.next;

            // 如果还有比min更大的元素
            var q;
            if (p.next) {
                q = p.next;
                // q是第一个不小于max的元素
                while (q && q.data < max) q = q.next;
                p.next = q;
            }

            var last = q || p;
            while (last.next) last = last.next;
            this.tail = last;
        },

        // 删除元素递增排列的链表的重复元素
        delete_equal: function () {
            var p = this.head;
            var q = p.next;

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
        },

        reverse: function () {
            var p = this.head;
            var q = p.next;
            var s = q.next;
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
        },

        // 求元素递增排列的线性表A和B的元素的交集并存入C
        intersect: function (bList) {
            var cList = new List();

            var p = this.head;
            var q = bList.head;

            while (p && q) {
                if (p.data < q.data) p = p.next;
                else if (q.data > q.data) q = q.next;
                else {
                    cList.add(q.data);
                    p = p.next;
                    q = q.next;
                }
            }

            return cList;
        },

        // 求元素递增排列的线性表A和B的元素的交集并存入回a
        intersect_true: function (bList) {
            var p = this.head;
            var q = bList.head;
            var pc = this.head;

            while (p && q) {
                if (p.data < q.data) p = p.next;
                else if (p.data > q.data) q = q.next;
                else {
                    pc.data = p.data;
                    p = p.next;
                    q = q.next;

                    if (!p || !q) {
                        pc.next = null;
                        this.tail = pc;
                    } else pc = pc.next;
                }
            }

            pc.next = null;
            this.tail = pc;
        },

        // a，b，c的元素均是非递减排列
        // 求a链表中非b链表和c链表的交集的元素。
        intersect_delete: function (b, c) {
            var p = b.head;
            var q = c.head;
            var r = this.head;

            while (p && q && r) {
                if (p.data < q.data) p = p.next;
                else if (p.data > q.data) q = q.next;
                else {
                    // 确定待删除元素
                    var elem = p.data;

                    if(r.data === elem && r === this.head) {
                        this.head = this.head.next;
                    } else {
                        // 确定最后一个小于elem的元素指针
                        while (r.next && r.next.data < elem) r = r.next;

                        if (r.next.data === elem) {
                            var s = r.next;

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

            this.tail = r;
        }
    };

    var list = new List();
    list.add('b');
    list.insertAsFirst('a');
    list.insertAfter('b', 'c');
    console.log(list.item(2));
    console.log(JSON.stringify(list));
    list.each(function (node) {
        if (node.data === 'b') {
            console.log('get b in each');
        }
    });
    list['delete']('c');
    list['delete']('a');
    console.log(list);

    var list2 = new List();
    list2.add('c');
    list2.insertAsFirst('d');
    list2.insertAfter('d', 'b');
    console.log(JSON.stringify(list2));

    var list3 = List.mergeList(list, list2);
    console.log(list3);


    var list = new List();

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

    var a = new List();
    a.orderInsert(1);
    a.orderInsert(3);
    a.orderInsert(5);
    a.orderInsert(7);
    a.orderInsert(9);

    var b = new List();
    b.orderInsert(1);
    b.orderInsert(5);
    b.orderInsert(9);
    b.orderInsert(13);
    b.orderInsert(17);
    console.log(a.intersect(b));

    console.log(a.intersect_true(b));

    a = new List();
    a.orderInsert(1);
    a.orderInsert(3);
    a.orderInsert(5);
    a.orderInsert(7);
    a.orderInsert(9);

    var test = new List();
    test.orderInsert(1);
    test.orderInsert(2);
    test.orderInsert(3);
    test.orderInsert(4);
    test.orderInsert(5);
    test.orderInsert(6);
    test.orderInsert(9);

    test.intersect_delete(a, b);
    console.log(test);

}(this.module || this));