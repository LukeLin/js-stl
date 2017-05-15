/**
 * 一致性哈希
 * 
 * http://www.cnblogs.com/gaochundong/p/consistent_hashing.html#top
 */

import crypto from 'crypto';

export default class ConsistentHash {
    replicas = 160;

    algorithm = 'md5';

    ring = {};

    keys = [];

    constructor(nodes, opts = {}){
        if(opts.replicas) {
            this.replicas = opts.replicas;
        }
        if(opts.algorithm){
            this.algorithm = opts.algorithm;
        }

        for(let node of nodes){
            this.addNode(node);
        }
    }

    addNode(node){
        for(let i = 0; i < this.replicas; ++i){
            let id = node;
            if(typeof node === 'object' && node.id) id = node.id;
            let key = this.crypto(`${ id }:${ i }`);
            this.ring[key] = node;
        }

        this.keys = Object.keys(this.ring).sort();
    }

    removeNode(node){
        for(let i = 0; i < this.replicas; ++i){
            let id = node;
            if(typeof node === 'object' && node.id) id = node.id;
            let key = this.crpto(`${ id }:${ i }`);

            if(!this.ring.hasOwnProperty(key)) return null;

            delete this.ring[key];
        }

        this.keys = Object.keys(this.ring).sort();        
    }

    // todo replace this with jump consistent hash
    crypto(str){
        return crypto.createHash(this.algorithm).update(str).digest('hex');
    }

    get length(){
        return Object.keys(this.ring).length;
    }

    getNode(key){
        if(!this.length) return 0;

        let hash = this.crypto(key + '');
        let pos = this._getClockwiseNearestNode(hash);

        return this.ring[this.keys[pos]];
    }

    _getClockwiseNearestNode(hash){
        let high = this.length - 1;
        let low = 0;
        let mid = -1;

        if(high === 0) return 0;

        while(low <= high){
            mid = (low + high) >> 1;
            let compare = this.compare(this.keys[mid], hash);

            if(compare === 0) return mid;
            else if(compare < 0) low = mid + 1;
            else high = mid - 1;
        }

        if(high < 0) high = this.length - 1;

        return high;
    }

    compare(a, b){
        return a > b ? 1 : a < b ? -1 : 0;
    }
}

let servers = [];
for(let i = 0 ; i < 5; ++i){
    servers.push({
        id: i
    });
}

let consistentHash = new ConsistentHash(servers, {
    replicas: 200,
    algorithm: 'md5'
});

let buckets = [];
for(let i = 0; i < 10; ++i){
    let id = consistentHash.getNode(i).id;
    buckets.push(id);
    console.log(`item[${ i }] is in node[${ buckets[i] }]`);
}

var cons = new ConsistentHash(["node1", "node2", "node3"]);

var nodes = {};
var chars = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
  'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
  'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];

chars.forEach(function(c) {
  var node = cons.getNode(c);

  if (nodes[node]) {
    nodes[node].push(c);
  } else {
    nodes[node] = [];
    nodes[node].push(c);
  }
});

console.log(nodes);
