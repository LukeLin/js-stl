/**
 * LRU( Least recently used )
 */

import DoubleLinkedList from './DoubleLinkedList';

const LIMIT = 20;

export default class LRUCache {
    constructor(sqList, limit = LIMIT){
        this.limit = limit;
        sqList = (sqList && sqList.length) ? sqList && sqList.length.slice(0, this.limit) : [];
        this.__cache = new DoubleLinkedList(sqList, function(a, b){
            return a.key === b.key;
        });
    }

    [Symbol.iterator](){
        return this.__cache[Symbol.iterator]();
    }

    get size(){
        return this.__cache.size;
    }
    
    remove(key){
        return this.__cache.remove({ key });
    }

    clear(){
        return this.___cache.clear();
    }
    
    get(key){
        let index = this.__cache.indexOf({ key });

        if(index >= 0) {
            let data = this.__cache.findByIndex(index);
            this.__cache.remove(data);
            this.__cache.unshift(data);

            return data;
        }

        return false;
    }
    
    add(key, value){
        let data = this.get(key);
        if(data) {
            data.value = value;
        } else {
            if(this.size === this.limit) {
                this.__cache.pop();
            }

            this.__cache.unshift({
                key,
                value
            });
        }
    }

    toString(){
        let arr = [];
        this.__cache.forEach(function(data){
            arr.push(`${ data.key }:${ data.value }`);
        });

        return arr.join(' > ');
    }

    toJSON(){
        return this.__cache.toJSON();
    }
}

console.log('LRUCache');

let a = new LRUCache([], 3);
a.add('adam', 29);
a.add('john', 26);
a.add('angela', 24);
console.log(a + '');
a.get('john');
console.log(a + '');
a.add('zorro', 141);
console.log(a + '');
console.log(a.toJSON());

for(let item of a){
    console.log(item);
}

a.remove('zorro');
a.remove('john');
a.remove('angela');
console.log(a + '');

// test case:
// Input:
// 2,[add(2,1),add(1,1),add(2,3),add(4,1),get(1),get(2)]
// Expected:
// [ false, { key: 2, value: 3 } ]
console.log('add');

let b = new LRUCache([], 2);
b.add(2,1);
b.add(1,1);
b.add(2,3);
b.add(4,1);
console.log([b.get(1), b.get(2)]);

console.log('~add');

console.log('LRUCacheEnd');
