/**
 * Created by luke on 2015/1/25.
 */

/*
 内部排序

 在信息处理过程中，最基本的操作是查找。从查找来说，效率最高的是折半查找，折半查找的前提是所有的数据元素(记录)是按关键字有序的。需要将一个无序的数据文件转变为一个有序的数据文件。
 将任一文件中的记录通过某种方法整理成为按(记录)关键字有序排列的处理过程称为排序。
 排序是数据处理中一种最常用的操作。


 排序的基本概念

 ⑴  排序(Sorting)
 排序是将一批(组)任意次序的记录重新排列成按关键字有序的记录序列的过程，其定义为：
 给定一组记录序列：{R1 , R2 ,…, Rn}，其相应的关键字序列是{K1 , K2 ,…, Kn} 。确定1, 2, … n的一个排列p1 , p2 ,…, pn，使其相应的关键字满足如下非递减(或非递增)关系： Kp1<=Kp2 <=…<=Kpn的序列{Kp1 ,Kp2 , …,Kpn} ，这种操作称为排序。
 关键字Ki可以是记录Ri的主关键字，也可以是次关键字或若干数据项的组合。
 ◆  Ki是主关键字：排序后得到的结果是唯一的；
 ◆  Ki是次关键字：排序后得到的结果是不唯一的。

 ⑵  排序的稳定性
 若记录序列中有两个或两个以上关键字相等的记录： Ki =Kj(i≠j，i, j=1, 2, … n)，且在排序前Ri先于Rj(i<j)，排序后的记录序列仍然是Ri先于Rj，称排序方法是稳定的，否则是不稳定的。

 排序算法有许多，但就全面性能而言，还没有一种公认为最好的。每种算法都有其优点和缺点，分别适合不同的数据量和硬件配置。
 评价排序算法的标准有：执行时间和所需的辅助空间，其次是算法的稳定性。
 若排序算法所需的辅助空间不依赖问题的规模n，即空间复杂度是O(1) ，则称排序方法是就地排序，否则是非就地排序。

 ⑶ 排序的分类
 待排序的记录数量不同，排序过程中涉及的存储器的不同，有不同的排序分类。
 ①  待排序的记录数不太多：所有的记录都能存放在内存中进行排序，称为内部排序；
 ②  待排序的记录数太多：所有的记录不可能存放在内存中， 排序过程中必须在内、外存之间进行数据交换，这样的排序称为外部排序。

 ⑷ 内部排序的基本操作
 对内部排序地而言，其基本操作有两种：
 ◆  比较两个关键字的大小；
 ◆ 存储位置的移动：从一个位置移到另一个位置。

 第一种操作是必不可少的；而第二种操作却不是必须的，取决于记录的存储方式，具体情况是：
 ① 记录存储在一组连续地址的存储空间：记录之间的逻辑顺序关系是通过其物理存储位置的相邻来体现，记录的移动是必不可少的；
 ②  记录采用链式存储方式：记录之间的逻辑顺序关系是通过结点中的指针来体现，排序过程仅需修改结点的指针，而不需要移动记录；
 ③  记录存储在一组连续地址的存储空间：构造另一个辅助表来保存各个记录的存放地址(指针) ：排序过程不需要移动记录，而仅需修改辅助表中的指针，排序后视具体情况决定是否调整记录的存储位置。

 ①比较适合记录数较少的情况；而②、③则适合记录数较多的情况。
 为讨论方便，假设待排序的记录是以①的情况存储，且设排序是按升序排列的；关键字是一些可直接用比较运算符进行比较的类型。
 */


Array.prototype.swap = function(i, j)
{
    var temp = this[i];
    this[i] = this[j];
    this[j] = temp;
}
Array.prototype.bubbleSort = function()
{
    for (var i = this.length - 1; i > 0; --i)
    {
        for (var j = 0; j < i; ++j)
        {
            if (this[j] > this[j + 1]) this.swap(j, j + 1);
        }
    }
}
Array.prototype.selectionSort = function()
{
    for (var i = 0; i < this.length; ++i)
    {
        var index = i;
        for (var j = i + 1; j < this.length; ++j)
        {
            if (this[j] < this[index]) index = j;
        }
        this.swap(i, index);
    }
}
Array.prototype.insertionSort = function()
{
    for (var i = 1; i < this.length; ++i)
    {
        var j = i, value = this[i];
        while (j > 0 && this[j - 1] > value)
        {
            this[j] = this[j - 1];
            --j;
        }
        this[j] = value;
    }
}
Array.prototype.shellSort = function()
{
    for (var step = this.length >> 1; step > 0; step >>= 1)
    {
        for (var i = 0; i < step; ++i)
        {
            for (var j = i + step; j < this.length; j += step)
            {
                var k = j, value = this[j];
                while (k >= step && this[k - step] > value)
                {
                    this[k] = this[k - step];
                    k -= step;
                }
                this[k] = value;
            }
        }
    }
}
Array.prototype.quickSort = function(s, e)
{
    if (s == null) s = 0;
    if (e == null) e = this.length - 1;
    if (s >= e) return;
    this.swap((s + e) >> 1, e);
    var index = s - 1;
    for (var i = s; i <= e; ++i)
    {
        if (this[i] <= this[e]) this.swap(i, ++index);
    }
    this.quickSort(s, index - 1);
    this.quickSort(index + 1, e);
}
Array.prototype.stackQuickSort = function()
{
    var stack = [0, this.length - 1];
    while (stack.length > 0)
    {
        var e = stack.pop(), s = stack.pop();
        if (s >= e) continue;
        this.swap((s + e) >> 1, e);
        var index = s - 1;
        for (var i = s; i <= e; ++i)
        {
            if (this[i] <= this[e]) this.swap(i, ++index);
        }
        stack.push(s, index - 1, index + 1, e);
    }
}
Array.prototype.mergeSort = function(s, e, b)
{
    if (s == null) s = 0;
    if (e == null) e = this.length - 1;
    if (b == null) b = new Array(this.length);
    if (s >= e) return;
    var m = (s + e) >> 1;
    this.mergeSort(s, m, b);
    this.mergeSort(m + 1, e, b);
    for (var i = s, j = s, k = m + 1; i <= e; ++i)
    {
        b[i] = this[(k > e || j <= m && this[j] < this[k]) ? j++ : k++];
    }
    for (var i = s; i <= e; ++i) this[i] = b[i];
}
Array.prototype.heapSort = function()
{
    for (var i = 1; i < this.length; ++i)
    {
        for (var j = i, k = (j - 1) >> 1; k >= 0; j = k, k = (k - 1) >> 1)
        {
            if (this[k] >= this[j]) break;
            this.swap(j, k);
        }
    }
    for (var i = this.length - 1; i > 0; --i)
    {
        this.swap(0, i);
        for (var j = 0, k = (j + 1) << 1; k <= i; j = k, k = (k + 1) << 1)
        {
            if (k == i || this[k] < this[k - 1]) --k;
            if (this[k] <= this[j]) break;
            this.swap(j, k);
        }
    }
}
