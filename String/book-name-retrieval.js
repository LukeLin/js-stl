var HString = require('HString');
var LinkList = require('../linkedList/complete-LinkedList');
var fs = require('fs');

var MAX_BOOK_NUM = 1000;
var MAX_KEY_NUM = 2500;
var MAX_LINE_LEN = 500;
var MAX_WORD_NUM = 10;

// 词表类型（顺序表）
function WordListType() {
    this.item = [];     // 字符串的数组
    this.last = 0;      // 词表的长度
}

// 索引项类型
function IdxTermType() {
    this.key = new HString();           // 关键词
    this.bookNoList = new LinkList();   // 存放书号索引的链表
}


// 索引表类型（有序表）
function IdxListType() {
    this.item = [];
    this.last = 0;
}

IdxListType.prototype = {
    initIdxList: function () {
        this.item = [''];
        this.last = 0;
    },
    insIdxList: function () {
    },
    // 将生成的索引表idxlist输出到文件file
    putText: function putText(file) {
    }
};

var elemType = 0;
var buf, wdlist = new WordListType();

// 从文件file读入一个书目信息到书目串缓冲区buf
function getLine(file) {
}


(function main() {

}());