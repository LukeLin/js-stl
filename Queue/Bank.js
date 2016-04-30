var List = require('./complete-LinkedList');
var Queue = require('./Queue').Queue;


// 事件类型，有序链表LinkList的数据元素类型
function Event(occurTime, eventType) {
    // 事件发生时刻
    this.occurTime = occurTime || 0;
    // 事件类型，0表示到达事件，1至4表示四个窗口的离开事件
    this.eventType = eventType || 0;
}

// 队列的数据元素类型
function QueueElemType(arrivalTime, duration) {
    // 到达时刻
    this.arrivalTime = arrivalTime || 0;
    // 办理事务所需时间
    this.duration = duration || 0;
}

function Bank() {
    // 事件表
    this.eventList = null;
    this.event = null;
    // 4个客户队列
    this.queues = new Array(4);
    this.totalTime = 0;
    this.customerNum = 0;
    this.closeTime = 0;
}
Bank.prototype = {
    cmp: function (event1, event2) {
        if (event1.occurTime < event2.occurTime)
            return -1;
        else if (event1.occurTime === event2.occurTime)
            return 0;
        else
            return 1;
    },
    // 初始化操作
    openForDay: function () {
        // 初始化累计时间和客户数为0
        this.totalTime = 0;
        this.customerNum = 0;
        // 初始化事件链表
        this.eventList = new List();
        // 设定第一个用户到达事件
        this.event = new Event(0, 0);
        // 插入到事件表
        this.eventList.orderInsert(this.event, this.cmp);

        // 置空队列
        for (var i = 0, len = this.queues.length; i < len; i++)
            this.queues[i] = new Queue();
    },
    // 处理客户到达事件
    customerArrived: function (durtime, intertime) {
        ++this.customerNum;

        // 生成随机数
        durtime = durtime || Math.floor(Math.random() * 20) + 1;   // 办理业务所需时间
        intertime = intertime || Math.floor(Math.random() * 5) + 1;  // 两个相邻客户时间间隔
        // 下一客户到达时刻
        var t = this.event.occurTime + intertime;
        // 银行尚未关门，插入事件表，这里还包括客户的离开时间
        if (t < this.closeTime && t + durtime < this.closeTime) {
            this.eventList.orderInsert(new Event(t, 0), this.cmp);
        }

        // 求长度最短队列
        var minQueueIndex = 0;
        var allEqualed = false;
        for (var i = 0, len = this.queues.length; i < len && this.queues[i + 1]; i++) {
            if (this.queues[i].size === 0) {
                minQueueIndex = i;
                break;
            }
            if (this.queues[i].size < this.queues[i + 1].size) {
                minQueueIndex = i;
                allEqualed = false;
            } else if (this.queues[i].size < this.queues[i + 1].size) {
                minQueueIndex = i;
                allEqualed = true;
            } else {
                minQueueIndex = i + 1;
                allEqualed = false;
            }
        }
        // 如果所有队列长度都相等，取第一个
        if (allEqualed) minQueueIndex = 0;

        this.queues[minQueueIndex]
            .enQueue(new QueueElemType(this.event.occurTime, durtime));

        // 设定第i队列的一个离开事件并插入事件表
        if (this.queues[minQueueIndex].size === 1) {
            this.eventList.orderInsert(new Event(this.event.occurTime + durtime, minQueueIndex + 1), this.cmp);
        }
        // 保存最新客户的到达时间
        this.event.occurTime = t;
    },
    // 处理客户离开事件
    customerDeparture: function (type) {
        // 删除第i队列的排头客户
        var i = type - 1 || 0;
        var customer = this.queues[i].deQueue();
        // 累计客户逗留时间
        this.totalTime += this.event.occurTime - customer.arrivalTime;

        // 设定第i队列的一个离开事件并插入事件表
        if (this.queues[i].size) {
            customer = this.queues[i].getHead();
            this.eventList.orderInsert(new Event(this.event.occurTime + customer.duration, i), this.cmp);
        }
    },
    simulation: function (closeTime) {
        this.closeTime = closeTime || 0;
        this.openForDay();
        while (this.eventList.head) {
            var elem = this.eventList.delFirst().data;
            if (elem.eventType === 0)
                this.customerArrived();
            else
                this.customerDeparture(elem.eventType);
        }
        console.log('The average time is ' + this.totalTime / this.customerNum);
    }
};

new Bank().simulation(20);