// 静态单链表
/*
 有时可借用一维数组来描述线性链表，这就是线性表的静态单链表存储结构。
 在静态链表中，数组的一个分量表示一个结点，同时用游标（cur）代替指针指示结点在数组中的相对位置。
 数组的第0分量可看成头结点，其指针域指示链表的第一个结点。
 这种存储结构需要预先分配一个较大的空间，但在线性表的插入和删除操作时不需移动元素，
 仅需要修改指针，故仍具有链式存储结构的主要优点
 */
interface currentObj {
    cur: number;
    data?: any;
};

export default class StaticLinkedList {
    length: number;
    MAXSIZE: number;
    [key:number]: currentObj;

    constructor(maxSize: number = 1000) {
        this[-1] = {cur: 0};
        this.length = 0;
        this.MAXSIZE = maxSize + 1;
    }

    /**
     * 在静态单链线性表L中查找第1个值为e的元素，
     * 若找到，则返回它在L中的位序
     * @param data
     */
    find (data: any): number {
        let i = this[0].cur;
        while (i && this[i].data !== data) {
            i = this[i].cur;
        }
        return i;
    }
    /**
     * 将一维数组中各分量链成一个备用链表
     * this[0].cur为头指针
     */
    init (len?: number) {
        len = len ? len + 1 : this.MAXSIZE;
        for (let i = 0; i < len - 1; ++i) {
            this[i] = this[i] || {data: null, cur: null};
            this[i].cur = i + 1;
        }

        this[len - 1] = this[len - 1] || { cur: 0 };
        this[len - 1].cur = 0;
    }
    /**
     * 若备用链表非空，则返回分配的结点下标，反则返回0
     * @returns {*}
     */
    malloc (): number {
        let i = this[-1].cur;
        if (typeof this[-1].cur !== 'undefined') this[-1].cur = this[i].cur;
        return i;
    }
    /**
     * 将下标为k的空闲结点回收到备用链表
     * @param k
     */
    free (k: number) {
        this[k].cur = this[0].cur;
        this[0].cur = k;
    }

    create (sqList: any[]) {
        // 初始化备用空间
        this.init(sqList.length);
        // 生成s的头结点
        let s = this.malloc();
        // r指向s的当前最后结点
        let r = s;
        let m = sqList.length;

        // 建立集合A的链表
        for (let j = 0; j < m; ++j) {
            //分配结点
            let i = this.malloc();
            // 输入A元素的值
            this[i].data = sqList[j];
            // 插入到表尾
            this[r].cur = i;
            ++this.length;
            r = i;
        }
        // 尾结点的指针为空
        this[r].cur = 0;
    }

    // todo
    add (index: number, elem: any) {
    }

    remove (index: number) {
    }
}

/**
 * 在一维数组中建立表示集合(A-B)U(B-A)
 * 的静态链表，s为其头指针。
 * @returns {*}
 */
function difference(sllist: StaticLinkedList, arr1: any[], arr2: any[]) {
    // 初始化备用空间
    sllist.init();
    // 生成s的头结点
    let s = sllist.malloc();
    // r指向s的当前最后结点
    let r = s;
    // 删除A和B的元素个数
    let m = arr1.length;
    let n = arr2.length;

    // 建立集合A的链表
    for (let j = 0; j < m; ++j) {
        //分配结点
        let i = sllist.malloc();
        // 输入A元素的值
        sllist[i].data = arr1[j];
        // 插入到表尾
        sllist[r].cur = i;
        r = i;
    }
    // 尾结点的指针为空
    sllist[r].cur = 0;

    // 依次输入B的元素，若不在当前表中，则插入，
    // 否则删除
    for (let j = 0; j < n; ++j) {
        let b = arr2[j];
        let p = s;
        // k指向集合中的第一个结点
        let k = sllist[s].cur;
        // 在当前表中查找
        while (k !== sllist[r].cur && sllist[k].data !== b) {
            p = k;
            k = sllist[k].cur;
        }
        // 当前表中不存在该元素，插入在r所指结点之后，且r的位置不变
        if (k === sllist[r].cur) {
            let i = sllist.malloc();
            sllist[i].data = b;
            sllist[i].cur = sllist[r].cur;
            sllist[r].cur = i;

            // 该元素已在表中，删除之
        } else {
            sllist[p].cur = sllist[k].cur;
            sllist.free(k);
            // 若删除的是r所指结点，则需修改尾指针
            if (r === k) r = p;
        }
    }
}

let sl = new StaticLinkedList(10);
let ret = difference(sl, [1, 2, 3], [3, 4, 5]);
console.log(sl);


let test = new StaticLinkedList(10);
test.create([49, 38, 65, 97, 76, 13, 27, 49]);
console.log(test);