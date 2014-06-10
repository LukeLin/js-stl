// 静态单链表
/*
 有时可借用一维数组来描述线性链表，这就是线性表的静态单链表存储结构。

 在静态链表中，数组的一个分量表示一个结点，同时用游标（cur）代替指针指示结点在数组中的相对位置。
 数组的第0分量可看成头结点，其指针域指示链表的第一个结点。
 这种存储结构需要预先分配一个较大的空间，但在线性表的插入和删除操作时不需移动元素，
 仅需要修改指针，故仍具有李安是存储结构的主要优点
 */

(function (module) {
    function SLinkList(data, cur, MAXSIZE) {
        this[0] = {};
        this[0].data = data;
        this[0].cur = cur;
        this.MAXSIZE = MAXSIZE || 1000;
    }

    module.exports = SLinkList;
    SLinkList.prototype = {
        constructor: SLinkList,
        /**
         * 在静态单链线性表L中查找第1个值为e的元素，
         * 若找到，则返回它在L中的位序
         * @param data
         */
        locateElem: function (data) {
            var i = this[0].cur;
            while (i && this[i].data !== data) {
                i = this[i].cur;
            }
            return i;
        },
        /**
         * 将一维数组中各分量链成一个备用链表
         * this[0].cur为头指针
         */
        initSpace: function () {
            for (var i = 0; i < this.MAXSIZE - 1; ++i) {
                this[i] = this[i] || {};
                this[i].cur = i + 1;
            }

            this[this.MAXSIZE - 1] = this[this.MAXSIZE - 1] || {};
            this[this.MAXSIZE - 1].cur = 0;
        },
        /**
         * 若备用链表非空，则返回分配的结点下标，反则返回0
         * @returns {*}
         */
        malloc: function () {
            var i = this[0].cur;
            if (this[0].cur) this[0].cur = this[i].cur;
            return i;
        },
        /**
         * 将下标为k的空闲结点回收到备用链表
         * @param k
         */
        free: function (k) {
            this[k].cur = this[0].cur;
            this[0].cur = k;
        },
        /**
         * 在一维数组中建立表示集合(A-B)U(B-A)
         * 的静态链表，s为其头指针。
         * @returns {*}
         */
        difference: function (arr1, arr2) {
            // 初始化备用空间
            this.initSpace();
            // 生成s的头结点
            var s = this.malloc();
            // r指向s的当前最后结点
            var r = s;
            // 删除A和B的元素个数
            var m = arr1.length;
            var n = arr2.length;

            // 建立集合A的链表
            for (var j = 0; j < m; ++j) {
                //分配结点
                var i = this.malloc();
                // 输入A元素的值
                this[i].data = arr1[j];
                // 插入到表尾
                this[r].cur = i;
                r = i;
            }
            // 尾结点的指针为空
            this[r].cur = 0;

            // 依次输入B的元素，若不在当前表中，则插入，
            // 否则删除
            for (j = 0; j < n; ++j) {
                var b = arr2[j];
                var p = s;
                // k指向集合中的第一个结点
                var k = this[s].cur;
                // 在当前表中查找
                while (k !== this[r].cur && this[k].data !== b) {
                    p = k;
                    k = this[k].cur;
                }
                // 当前表中不存在该元素，插入在r所指结点之后，且r的位置不变
                if (k === this[r].cur) {
                    i = this.malloc();
                    this[i].data = b;
                    this[i].cur = this[r].cur;
                    this[r].cur = i;

                    // 该元素已在表中，删除之
                } else {
                    this[p].cur = this[k].cur;
                    this.free(k);
                    // 若删除的是r所指结点，则需修改尾指针
                    if (r === k) r = p;
                }
            }
        }
    };

    var sl = new SLinkList(1, 0, 10);
    var ret = sl.difference([1, 2, 3], [3, 4, 5]);
    console.log(sl);
})(this.module || this);

