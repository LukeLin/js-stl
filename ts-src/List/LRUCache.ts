/**
 * LRU( Least recently used )
 */

import DoubleLinkedList from './DoubleLinkedList';

const LIMIT = 20;

interface keyValuePair {
    key: string | number,
    value: any
}

export default class LRUCache {
    limit: number;
    protected __cache: DoubleLinkedList;

    constructor(sqList: Array<any>, limit: number = LIMIT) {
        this.limit = limit;
        sqList = (sqList && sqList.length) ? sqList && sqList.slice(0, this.limit) : [];
        this.__cache = new DoubleLinkedList(sqList, function (a, b) {
            return a.key === b.key;
        });
    }

    [Symbol.iterator]() {
        return this.__cache[Symbol.iterator]();
    }

    get size() {
        return this.__cache.size;
    }

    remove(key: string | number) {
        return this.__cache.remove({ key });
    }

    clear() {
        return this.__cache.clear();
    }

    get(key: string | number) {
        let index = this.__cache.indexOf({ key });

        if (index >= 0) {
            let data = this.__cache.findByIndex(index);
            this.__cache.remove(data);
            this.__cache.unshift(data);

            return data;
        }

        return false;
    }

    add(key: string | number, value: any) {
        let data = this.get(key);
        if (data) {
            data.value = value;
        } else {
            if (this.size === this.limit) {
                this.__cache.pop();
            }

            this.__cache.unshift({
                key,
                value
            });
        }
    }

    toString(): string {
        let arr: string[] = [];
        this.__cache.forEach(function (data: keyValuePair) {
            arr.push(`${data.key}:${data.value}`);
        });

        return arr.join(' > ');
    }

    toJSON() {
        return this.__cache.toJSON();
    }
}
