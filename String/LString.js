/**
 * 串的块链存储表示
 *
 * 和线性表的链式存储结构相类似，也可采用链式方式存储串值。由于串结构的特殊性--结构中的每个数据元素是一个字符，则用链表存储串值时，存在一个“结点大小”的问题，即每个结点可以存放一个字符，也可以存放多个字符。
 * 下面是结点大小为4（即每个结点存放4个字符）的链表
 * head --> (a,b,c,d) --> (e,f,g,h) --> (i###)
 * 下面是结点大小为1的链表
 * head --> (a) --> (b) --> (c) --> ... --> (i)
 *
 * 当结点大小大于1时，由于串长不一定是结点大小的整倍数，则链表中的最后一个结点不一定全被串值占满，此时通常补上“#”或其它非串值字符。
 * 为了便于进行串的操作，当以链表存储串值时，除头指针外还可附设一个尾指针指示链表中的最后一个结点，并给出当前串的长度，称如此定义的串存储结构为块链结构。
 *
 * 由于一般情况下，对串进行操作时，只需要从头向尾顺序扫描即可，则对串值不必建立双向链表。设尾指针的目的是为了便于进行连接操作，但应注意连接时需处理第一个串尾的无效字符。
 * 在链式存储方式中，结点大小的选择和顺序存储方式的格式选择一样都很重要，它直接影响到串处理的效率。如果串很长，这要求我们考虑串值的存储密度：
 * 存储密度 = 串值所占的存储位 / 实际分配的存储位
 *
 * 串值的链式存储结构对某些串操作，如连接操作等有一定方便之处，但总的来说不如另外两种存储结构灵活，它占用存储量大且操作复杂。
 */

(function (exports) {

  function Chunk(chunkSize) {
    chunkSize = chunkSize || 4;
    this.ch = new Array(chunkSize);
    // type: Chunk
    this.next = null;
  }

  function LString() {
    // type Chunk
    this.head = null;
    // type: chunk
    this.tail = null;
    // 串的当前长度
    this.curLen = 0;
  }
  LString.prototype = {
    strInsert: function(){},
    strAssign: function(){},
    strCompare: function(){},
    clearString: function(){},
    concat: function(){},
    substring: function(){},
    toString: function(){}
  };

})(this.exports || this);
