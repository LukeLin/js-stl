"use strict";
/**
 * LRU( Least recently used )
 */
Object.defineProperty(exports, "__esModule", { value: true });
const DoubleLinkedList_1 = require("./DoubleLinkedList");
const LIMIT = 20;
class LRUCache {
    constructor(sqList, limit = LIMIT) {
        this.limit = limit;
        sqList = (sqList && sqList.length) ? sqList && sqList.slice(0, this.limit) : [];
        this.__cache = new DoubleLinkedList_1.default(sqList, function (a, b) {
            return a.key === b.key;
        });
    }
    [Symbol.iterator]() {
        return this.__cache[Symbol.iterator]();
    }
    get size() {
        return this.__cache.size;
    }
    remove(key) {
        return this.__cache.remove({ key });
    }
    clear() {
        return this.__cache.clear();
    }
    get(key) {
        let index = this.__cache.indexOf({ key });
        if (index >= 0) {
            let data = this.__cache.findByIndex(index);
            this.__cache.remove(data);
            this.__cache.unshift(data);
            return data;
        }
        return false;
    }
    add(key, value) {
        let data = this.get(key);
        if (data) {
            data.value = value;
        }
        else {
            if (this.size === this.limit) {
                this.__cache.pop();
            }
            this.__cache.unshift({
                key,
                value
            });
        }
    }
    toString() {
        let arr = [];
        this.__cache.forEach(function (data) {
            arr.push(`${data.key}:${data.value}`);
        });
        return arr.join(' > ');
    }
    toJSON() {
        return this.__cache.toJSON();
    }
}
exports.default = LRUCache;
//# sourceMappingURL=LRUCache.js.map