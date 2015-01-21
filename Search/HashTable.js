/**
 * HashTable
 * Created by Luke on 2014/12/30.
 */

/**
哈希(散列)查找

基本思想：在记录的存储地址和它的关键字之间建立一个确定的对应关系；这样，不经过比较，一次存取就能得到所查元素的查找方法。

基本概念

哈希函数：在记录的关键字与记录的存储地址之间建立的一种对应关系叫哈希函数。
哈希函数是一种映象，是从关键字空间到存储地址空间的一种映象。可写成：addr(ai)=H(ki) ，其中i是表中一个元素，addr(ai)是ai的地址， ki是ai的关键字。

哈希表：应用哈希函数，由记录的关键字确定记录在表中的地址，并将记录放入此地址，这样构成的表叫哈希表。

哈希查找(又叫散列查找)：利用哈希函数进行查找的过程叫哈希查找。

冲突：对于不同的关键字ki、kj，若kikj，但H(ki)=H(kj)的现象叫冲突(collision) 。

同义词：具有相同函数值的两个不同的关键字，称为该哈希函数的同义词。
哈希函数通常是一种压缩映象，所以冲突不可避免，只能尽量减少；当冲突发生时，应该有处理冲突的方法。设计一个散列表应包括：
①  散列表的空间范围，即确定散列函数的值域；
②  构造合适的散列函数，使得对于所有可能的元素(记录的关键字)，函数值均在散列表的地址空间范围内，且出现冲突的可能尽量小；
③  处理冲突的方法。即当冲突出现时如何解决。


哈希函数的构造

哈希函数是一种映象，其设定很灵活，只要使任何关键字的哈希函数值都落在表长允许的范围之内即可。哈希函数“好坏”的主要评价因素有：
◆ 散列函数的构造简单；
◆ 能“均匀”地将散列表中的关键字映射到地址空间。所谓“均匀”(uniform)是指发生冲突的可能性尽可能最少。

1  直接定址法
取关键字或关键字的某个线性函数作哈希地址，即H(key)=key    或   H(key)=a·key+b(a,b为常数)
特点：直接定址法所得地址集合与关键字集合大小相等，不会发生冲突，但实际中很少使用。

2  数字分析法
对关键字进行分析，取关键字的若干位或组合作为哈希地址。
适用于关键字位数比哈希地址位数大，且可能出现的关键字事先知道的情况。
例： 设有80个记录，关键字为8位十进制数，哈希地址为2位十进制数。
           
8  1  3  4  6  5  3  2
8  1  3  7  2  2  4  2
8  1  3  8  7  4  2  2
8  1  3  0  1  3  6  7
8  1  3  2  2  8  1  7
8  1  3  3  8  9  6  7
8  1  3  6  8  5  3  7
8  1  4  1  9  3  5  5
分析：  只取8
       只取1
       只取3、4
       只取2、7、5
      数字分布近乎随机
所以：取任意两位或两位与另两位的叠加作哈希地址

3  平方取中法
将关键字平方后取中间几位作为哈希地址。
一个数平方后中间几位和数的每一位都有关，则由随机分布的关键字得到的散列地址也是随机的。散列函数所取的位数由散列表的长度决定。这种方法适于不知道全部关键字情况，是一种较为常用的方法。

4  折叠法
将关键字分割成位数相同的几部分(最后一部分可以不同)，然后取这几部分的叠加和作为哈希地址。
数位叠加有移位叠加和间界叠加两种。
◆ 移位叠加：将分割后的几部分低位对齐相加。
◆ 间界叠加：从一端到另一端沿分割界来回折迭，然后对齐相加。
适于关键字位数很多，且每一位上数字分布大致均匀情况。
例： 设关键字为0442205864，哈希地址位数为4 。两种不同的地址计算方法如下：
    5864                        5864
    4220                        0224
      04       移位叠加            04           间界叠加
 ---------                  -------------
   10088                        6091

5  除留余数法
取关键字被某个不大于哈希表表长m的数p除后所得余数作哈希地址，即H(key)=key MOD p     (p<=m)
是一种简单、常用的哈希函数构造方法。
利用这种方法的关键是p的选取，p选的不好，容易产生同义词。p的选取的分析：
◆  选取p=2i(p<=m)：运算便于用移位来实现，但等于将关键字的高位忽略而仅留下低位二进制数。高位不同而低位相同的关键字是同义词。
◆ 选取p=q*f(q、f都是质因数，p<=m)：则所有含有q或f因子的关键字的散列地址均是q或f的倍数。
◆ 选取p为素数或p=q*f(q、f是质数且均大于20，p<=m)：常用的选取方法，能减少冲突出现的可能性。

6  随机数法
取关键字的随机函数值作哈希地址，即H(key)=random(key)
当散列表中关键字长度不等时，该方法比较合适。



选取哈希函数，考虑以下因素
◆ 计算哈希函数所需时间；
◆ 关键字的长度；
◆ 哈希表长度（哈希地址范围）；
◆ 关键字分布情况；
◆ 记录的查找频率。



冲突处理的方法
冲突处理：当出现冲突时，为冲突元素找到另一个存储位置。

1  开放定址法
基本方法：当冲突发生时，形成某个探测序列；按此序列逐个探测散列表中的其他地址，直到找到给定的关键字或一个空地址(开放的地址)为止，将发生冲突的记录放到该地址中。散列地址的计算公式是：
Hi(key)=(H(key)+di)  MOD m，i=1, 2, …, k(k<=m-1)

其中：H(key)：哈希函数；m：散列表长度；
di：第i次探测时的增量序列；
Hi(key) ：经第i次探测后得到的散列地址。

⑴  线性探测法
将散列表T[0 …m-1]看成循环向量。当发生冲突时，从初次发生冲突的位置依次向后探测其他的地址。
增量序列为：di=1, 2, 3, …, m-1
设初次发生冲突的地址是h，则依次探测T[h+1]，T[h+2]…，直到T[m-1]时又循环到表头，再次探测T[0]，T[1]…，直到T[h-1]。探测过程终止的情况是：
◆ 探测到的地址为空：表中没有记录。若是查找则失败；若是插入则将记录写入到该地址；
◆ 探测到的地址有给定的关键字：若是查找则成功；若是插入则失败；
◆ 直到T[h]：仍未探测到空地址或给定的关键字，散列表满。

例1 ：设散列表长为7，记录关键字组为：15, 14, 28, 26, 56, 23，散列函数：H(key)=key   MOD  7，冲突处理采用线性探测法。
H(15)=15  MOD 7=1
H(14)=14  MOD 7=0
H(28)=28  MOD 7=0  冲突   H1(28)=1  又冲突
H2(28)=2           H(26)=26  MOD 7=5
H(56)=56  MOD 7=0     冲突      H1(56)=1     又冲突
H2(56)=2   又冲突    H3(56)=3
H(23)=23  MOD 7=2     冲突      H1(23)=3     又冲突
H3(23)=4

0     1      2      3      4       5     6
14    15     28     56     23      26

线性探测法的特点
◆ 优点：只要散列表未满，总能找到一个不冲突的散列地址；
◆ 缺点：每个产生冲突的记录被散列到离冲突最近的空地址上，从而又增加了更多的冲突机会(这种现象称为冲突的“聚集”)。

⑵  二次探测法
增量序列为：di=1²,-1²,2²,-2²,3²,……±k²  (k<=⌊m/2⌋)

上述例题若采用二次探测法进行冲突处理，则：
H(15)=15  MOD 7=1         H(14)=14  MOD 7=0
H(28)=28  MOD 7=0     冲突      H1(28)=1     又冲突
H2(28)=4
H(26)=26  MOD 7=5
H(56)=56  MOD 7=0     冲突      H1(56)=1     又冲突
H2(56)=0   又冲突    H3(56)=4    又冲突
H4(56)=2
H(23)=23  MOD 7=2      冲突
H1(23)=3

二次探测法的特点
◆ 优点：探测序列跳跃式地散列到整个表中，不易产生冲突的“聚集”现象；
◆ 缺点：不能保证探测到散列表的所有地址。

⑶   伪随机探测法
增量序列使用一个伪随机函数来产生一个落在闭区间[1，m-1]的随机序列。

例2 ： 表长为11的哈希表中已填有关键字为17，60，29的记录，散列函数为H(key)=key  MOD  11 。 现有第4个记录，其关键字为38，按三种处理冲突的方法，将它填入表中。

(1)  H(38)=38 MOD 11=5    冲突
     H1=(5+1) MOD 11=6    冲突
     H2=(5+2) MOD 11=7    冲突
     H3=(5+3) MOD 11=8    不冲突
(2)  H(38)=38 MOD 11=5      冲突
     H1=(5+1²) MOD 11=6    冲突
     H2=(5-1²) MOD 11=4     不冲突
(3)  H(38)=38 MOD 11=5    冲突
     设伪随机数序列为9，则H1=(5+9) MOD 11=3 不冲突


2  再哈希法
构造若干个哈希函数，当发生冲突时，利用不同的哈希函数再计算下一个新哈希地址，直到不发生冲突为止。即：Hi=RHi(key)     i=1, 2, …, k
RHi ：一组不同的哈希函数。第一次发生冲突时，用RH1计算，第二次发生冲突时，用RH2计算…依此类推知道得到某个Hi不再冲突为止。
◆  优点：不易产生冲突的“聚集”现象；
◆  缺点：计算时间增加。


3  链地址法
方法：将所有关键字为同义词(散列地址相同)的记录存储在一个单链表中，并用一维数组存放链表的头指针。
设散列表长为m，定义一个一维指针数组：
RecNode *linkhash[m]，其中RecNode是结点类型，每个分量的初值为空。凡散列地址为k的记录都插入到以linkhash[k]为头指针的链表中，插入位置可以在表头或表尾或按关键字排序插入。

例： 已知一组关键字(19, 14, 23, 1, 68, 20, 84, 27, 55, 11, 10, 79) ，哈希函数为：H(key)=key MOD 13，用链地址法处理冲突:

 0
 1  --> 14 -> 1 -> 27 -> 79
 2
 3  --> 68 -> 55
 4
 5
 6  --> 19 -> 84
 7  --> 20
 8
 9
 10 --> 23 -> 10
 11 --> 11
 12

 优点：不易产生冲突的“聚集”；删除记录也很简单。


 4  建立公共溢出区
 方法：在基本散列表之外，另外设立一个溢出表保存与基本表中记录冲突的所有记录。
 设散列表长为m，设立基本散列表hashtable[m]，每个分量保存一个记录；溢出表overtable[m]，一旦某个记录的散列地址发生冲突，都填入溢出表中。

 例： 已知一组关键字(15, 4, 18, 7, 37, 47) ，散列表长度为7 ，哈希函数为：H(key)=key MOD 7，用建立公共溢出区法处理冲突。得到的基本表和溢出表如下：
                    散列地址    0     1     2     3     4     5     6
 Hashtable表：
                    关键字     7     15    37          4     47

                    溢出地址    0     1     2     3     4     5     6
 overtable表：
                     关键字    18




 哈希查找过程及分析

 1   哈希查找过程
 哈希表的主要目的是用于快速查找，且插入和删除操作都要用到查找。由于散列表的特殊组织形式，其查找有特殊的方法。

 给定K值，根据造表时设定的哈希函数求得哈希地址，若表中此位置上没有记录，则查找不成功；否则比较关键字，若和给定关键字相等，则查找成功；否则根据造表时设定的处理冲突的方法找“下一地址”，直到哈希表中某个位置为空或者表中所填记录的关键字等于给定值时为止。



 哈希查找分析

 从哈希查找过程可见：尽管散列表在关键字与记录的存储地址之间建立了直接映象，但由于“冲突”，查找过程仍是一个给定值与关键字进行比较的过程，评价哈希查找效率仍要用ASL。
 哈希查找时关键字与给定值比较的次数取决于：
 ◆ 哈希函数；
 ◆ 处理冲突的方法；
 ◆ 哈希表的填满因子α 。填满因子α的定义是：

 α = 表中填入的记录数 / 哈希表长度


 各种散列函数所构造的散列表的ASL如下：

 ⑴   线性探测法的平均查找长度是：
 S成功 约等于 1 / 2 * (1 + 1 / (1 - α))
 S失败 约等于 1 / 2 * (1 + 1 / (1 - α) * (1 - α))

 ⑵   二次探测、伪随机探测、再哈希法的平均查找长度是：
 S成功 约等于 -1 / α * ln(1 - α)
 S失败 约等于 1 / (1 - α)

 ⑶   用链地址法解决冲突的平均查找长度是：
 S成功 约等于 1 + α / 2
 S失败 约等于 α + e的-α次幂


 */

var LinkedList = require('../linkedList/LinkedList');

function HNode(data, next){
    this.data = data || null;
    this.next = next || null;
}

function HashTable(){
    this.data = [];
    // 当前数据元素个数;
    this.count = 0;
    // 当前容量
    this.sizeIndex = 0;
}

var hashSize = buildHashSize(977, 20);

HashTable.prototype = {
    constructor: HashTable,

    // 使用线性探测法解决冲突
    search: function(key){
        var max = hashSize[this.sizeIndex];
        var p = hash(key, max);
        var c = 0;

        while(p < max && this.data[p] != null && key !== this.data[p]){
            p = collision(key, ++c, max);
        }

        return {
            success: key === this.data[p],
            collisionTimes: c,
            index: p
        };
    },

    insert: function(key){
        var max = hashSize[this.sizeIndex];
        if(this.count >= max) return {success: false, errormsg: 'table overflowed'};

        var ret = this.search(key);
        var p = ret.index;
        var c = ret.collisionTimes;

        if(ret.success) return false;
        else if(c < hashSize[this.sizeIndex] / 2){
            this.data[p] = key;
            ++this.count;
            return true;
        } else {
            this.recreateHashTable();
            return false;
        }
    },

    remove: function(key){
        if(!this.count) return false;

        var max = hashSize[this.sizeIndex];
        var p = hash(key, max);
        var c = 0;

        while(key !== this.data[p])
            p = collision(key, ++c, max);


        if(key === this.data[p]) {
            var data = this.data[p];
            this.data.splice(p, 1);
            --this.count;

            return data;
        }

        return false;
    },

    recreateHashTable: function(){
        return ++this.sizeIndex < hashSize.length;
    }

};

// 保留余数法
function hash(str, max){
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
        hash = (hash << 5) + hash + str.charCodeAt(i);
        hash = hash & hash; // Convert to 32bit integer
        hash = Math.abs(hash);
    }
    return hash % max;
}

function collision(key, times, max){
    // 线性探测法
    return (hash(key, max) + times) % max;
}

function isPrime(n) {
    if (n <= 3) return n > 1;
    if (n % 2 === 0 || n % 3 === 0) return false;
    for (var  i = 5; i * i <= n; i += 6) {
        if (n % i === 0 || n % (i + 2) === 0) return false;
    }

    return true;
}

function buildHashSize(begin, length){
    var hashSize = [];

    while(1){
        if(hashSize.length >= length) break;
        if(isPrime(begin)) hashSize.push(begin);
        ++begin;
    }

    return hashSize;
}

// 开放定址法
//hashSize = [5, 7]; // for test. will be deleted
var test = new HashTable();
test.insert('17');
test.insert('60');
test.insert('29');
test.insert('38');
test.insert('39');
test.insert('40');

test.remove('17');
test.remove('60');
test.remove('29');
test.remove('38');
test.remove('39');
test.remove('40');


// 使用链地址法解决冲突的哈希表
function LinkedListHashTable(){
    // 当前数据元素个数;
    this.count = 0;
    // 当前容量
    this.sizeIndex = 0;
    this.hNodes = [];
}
LinkedListHashTable.prototype = {
    constructor: LinkedListHashTable,

    search: function(key){
        var max = hashSize[this.sizeIndex];
        var i = hash(key, max);
        var t = this.hNodes;

        if(t[i] == null) return {success: false, index: i};

        var p = t[i];
        var data = null;

        p.each(function(node){
            if(node.data === key) {
                data = node.data;
                return true;
            }
        });

        return {success: data === key, index: i};
    },

    insert: function(key){
        var max = hashSize[this.sizeIndex];
        if(this.count >= max) return {success: false, errormsg: 'table overflowed'};

        var ret = this.search(key);
        var index = ret.index;

        if(ret.success) return false;

        if(!this.hNodes[index]) this.hNodes[index] = new LinkedList();

        if(this.hNodes[index].size() < hashSize[this.sizeIndex] / 2) {
            this.hNodes[index].orderInsert(key);
            ++this.count;
            return true;
        } else {
            this.recreateHashTable();
            return false;
        }
    },

    remove: function(key){
        if(!this.count) return false;

        var ret = this.search(key);

        if(ret.success) {
            var index = ret.index;
            var data = ret.data;
            this.hNodes[index]['delete'](key);
            --this.count;
            return data;
        }

        return false;
    },

    recreateHashTable: function(){
        return ++this.sizeIndex < hashSize.length;
    }
};

var test2 = new LinkedListHashTable();
test2.insert('17');
test2.insert('60');
test2.insert('29');
test2.insert('38');
test2.insert('39');
test2.insert('40');

test2.remove('17');
test2.remove('60');
test2.remove('29');
test2.remove('38');
test2.remove('39');
test2.remove('40');