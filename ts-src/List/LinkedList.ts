/**
 * 由于链表在空间的合理利用上和插入，删除时不需要移动等的有点，因此在很多场合下，它是线性表的首选存储结构。然而，它也存在着实现某些基本操作，如求线性表长度时不如顺序存储结构的缺点；另一方面，由于在链表中，结点之间的关系使用指针来表示，则数据元素在线性表中的“位序”的概念已淡化，而被数据元素在线性链表中的“位置”所代替。为此，从实际出发重新定义线性链表及其基本操作
 */

class Node {
    data: any;
    next: Node;

    constructor(data: any = null, next: Node = null){
        this.data = data;
        this.next = next;
    }
}

export default class LinkedList {
    head: Node;
    tail: Node;

    constructor(sqList: Array<any> = []){
        this.head = null;
        this.tail = null;

        if (sqList) {
            for (let i = 0, len = sqList.length; i < len; ++i)
                this.push(sqList[i]);
        } 
    }
    
    /**
     * merge list, note: this operation will delete a and b nodes.
     * @param {LinkedList} a 
     * @param {LinkedList} b
     * @param {*} compare 
     */
    static mergeList (a: LinkedList, b: LinkedList, compare: Function = compFn): LinkedList {
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

    /**
     * remove the first element and return it
     */
    shift (): Node {
        let head = this.head;
        this.head = this.head.next;
        head.next = null;

        if (this.head === null) this.tail = null;
        return head;
    }

    /**
     * remove the last element and return it
     */
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

    /**
     * append node
     * @param {Node} node 
     */
    append (node: Node) {
        if (this.head !== null) {
            this.tail.next = node;
            this.tail = this.tail.next;
        } else {
            this.head = node;
            this.tail = node;
        }
    }

    /**
     * add data
     * @param {*} data 
     */
    push (data: any) {
        if (this.head === null) {
            this.head = new Node(data);
            this.tail = this.head;
        } else {
            this.tail.next = new Node(data);
            this.tail = this.tail.next;
        }

        this.tail.data = data;
    }

    /**
     * remove data
     * @param {*} data 
     */
    remove (data: any) {
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

    /**
     * find the index of matched data 
     * @param {*} data 
     */
    indexOf(data: any){
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

    /**
     * add data to the front
     * @param {*} data 
     */
    unshift (data: any) {
        let temp = new Node(data);
        temp.next = this.head;
        this.head = temp;
    }

    /**
     * 
     * @param {*} target 
     * @param {*} data 
     */
    insertAfter (target: any, data: any) {
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

    item (index: number): Node | null {
        let current = this.head;

        while (current !== null) {
            if (--index === 0) return current;

            current = current.next;
        }

        return null;
    }

    forEach (callback: Function) {
        if (typeof callback !== 'function') return;

        for (let current = this.head, index = 0; current; current = current.next) {
            if (callback(current.data, index++)) break;
        }
    }

    *[Symbol.iterator](){
        for(let current = this.head; current; current = current.next){
            yield current.data;
        }
    }

    get size (): number {
        let current = this.head;
        let size = 0;

        while (current !== null) {
            ++size;
            current = current.next;
        }

        return size;
    }

    toString (): string {
        let str = '';

        this.forEach((node: Node) => {
            str += node.data + (node.next ? ',' : '');
        });

        return str;
    }

    /**
     * insert element by order
     * @param {*} data 
     * @param {Function} cmp 
     */
    orderInsert (data: any, cmp?: Function) {
        cmp = typeof cmp === 'function' ? cmp : (a: any, b: any) => {
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

        function insertBetween(data: any, a: Node, b: Node) {
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
    deleteBetween (min: number | string, max: number | string) {
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
    deleteEqual () {
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
        this.tail = p;
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

function compFn(a: any, b: any): number {
    return a - b;
}
