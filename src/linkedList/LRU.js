/**
 * LRU( Least recently used )
 */

import DoubleLinkedList from './doubleLinkedList';

const LIMIT = 20;

export default class LRUCache {
    constructor(sqList, limit = LIMIT){
        this.limit = limit;
        this.size = 0;
        this.__cache = new DoubleLinkedList();
    }
    
    put(key, value){
        
    }
    
    find(value){}
    
    set(key, value){
        
    }

    toJS(){}

    toObject(){}
}