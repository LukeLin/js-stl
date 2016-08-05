'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _xxhashjs = require('xxhashjs');

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 Bloom Filter是一种空间效率很高的随机数据结构，它利用位数组很简洁地表示一个集合，并能判断一个元素是否属于这个集合。Bloom Filter的这种高效是有一定代价的：在判断一个元素是否属于某个集合时，有可能会把不属于这个集合的元素误认为属于这个集合（false positive）。因此，Bloom Filter不适合那些“零错误”的应用场合。而在能容忍低错误率的应用场合下，Bloom Filter通过极少的错误换取了存储空间的极大节省。

 为了降低冲突的概念，Bloom Filter使用了多个哈希函数，而不是一个。

 Bloom Filter算法如下：
 创建一个m位BitSet，先将所有位初始化为0，然后选择k个不同的哈希函数。第i个哈希函数对字符串str哈希的结果记为h（i，str），且h（i，str）的范围是0到m-1 。

 (1) 加入字符串过程
 下面是每个字符串处理的过程，首先是将字符串str“记录”到BitSet中的过程：
 对于字符串str，分别计算h（1，str），h（2，str）…… h（k，str）。然后将BitSet的第h（1，str）、h（2，str）…… h（k，str）位设为1。

 (2) 检查字符串是否存在的过程
 下面是检查字符串str是否被BitSet记录过的过程：
 对于字符串str，分别计算h（1，str），h（2，str）…… h（k，str）。然后检查BitSet的第h（1，str）、h（2，str）…… h（k，str）位是否为1，若其中任何一位不为1则可以判定str一定没有被记录过。若全部位都是1，则“认为”字符串str存在。
 若一个字符串对应的Bit不全为1，则可以肯定该字符串一定没有被Bloom Filter记录过。（这是显然的，因为字符串被记录过，其对应的二进制位肯定全部被设为1了）
 　但是若一个字符串对应的Bit全为1，实际上是不能100%的肯定该字符串被Bloom Filter记录过的。（因为有可能该字符串的所有位都刚好是被其他字符串所对应）这种将该字符串划分错的情况，称为false positive。

 (3) 删除字符串过程
 字符串加入了就被不能删除了，因为删除会影响到其他字符串。实在需要删除字符串的可以使用Counting bloomfilter(CBF)，这是一种基本Bloom Filter的变体，CBF将基本Bloom Filter每一个Bit改为一个计数器，这样就可以实现删除字符串的功能了。

 Bloom Filter跟单哈希函数Bit-Map不同之处在于：Bloom Filter使用了k个哈希函数，每个字符串跟k个bit对应。从而降低了冲突的概率。

 Bloom Filter参数选择
 (1)哈希函数选择
 　　哈希函数的选择对性能的影响应该是很大的，一个好的哈希函数要能近似等概率的将字符串映射到各个Bit。选择k个不同的哈希函数比较麻烦，一种简单的方法是选择一个哈希函数，然后送入k个不同的参数。

 (2) m,n,k值，我们如何取值
 我们定义：
 可能把不属于这个集合的元素误认为属于这个集合（False Positive）
 不会把属于这个集合的元素误认为不属于这个集合（False Negative）。

 哈希函数的个数k、位数组大小m、加入的字符串数量n的关系。哈希函数个数k取10，位数组大小m设为字符串个数n的20倍时，false positive发生的概率是0.0000889 ，即10万次的判断中，会存在9次误判，对于一天1亿次的查询，误判的次数为9000次。

 Bloomfilter 的应用场景
 1.黑名单
 最典型的一个应用就是黑名单功能，对用户名称或者IP或者Email进行过滤，每次检查时用key进行hash后，如果不在黑名单内的，肯定可以通行，如果在的则不允许通过，误判情况增加一个排除名单来进行排除。
 误判情况：将正常用户判定为黑名单用户

 2.爬虫重复URL检测
 在爬取网站URL时，要检测这条URL是否已经访问过。
 误判情况：没有访问过的误判为访问过

 3.字典纠错
 检查单词拼写是否正确
 误判情况：错误的单词误判为正确。

 4.磁盘文件检测
 将磁盘中或者数据库中数据key存入该结构中，检测要访问的数据是否在磁盘或数据库中，然后再发起访问，避免空查询造成磁盘或数据库压力。
 误判情况：不存在该数据却误判为有该数据。

 5.CDN（squid）代理缓存技术
 先查找本地有无cache，如果没有则到其他兄弟 cache服务器上去查找。为了避免无谓的查询，在每个cache服务器上保存其兄弟服务器的缓存关键字，以bloomfilter方式存储，再去其他cache服务器查找之前，先检查该结构是否有url，如果有存在url，再去对应服务器查找。
 误判情况： 对应服务器不存在该URL的缓存。

 Thanks to:
 http://allenkim67.github.io/2016/05/17/nodejs-buffer-tutorial.html
 https://github.com/ceejbot/xx-bloom
 https://github.com/pierrec/js-xxhash
 */

var LN2_SQUARED = Math.LN2 * Math.LN2;

var BloomFilter = function () {
    function BloomFilter() {
        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
        (0, _classCallCheck3.default)(this, BloomFilter);

        this.init(options);
    }

    (0, _createClass3.default)(BloomFilter, [{
        key: 'init',
        value: function init(options) {
            if (options.seeds) {
                this.seeds = options.seeds;
                this.hashes = options.seeds.length;
            } else {
                this.seeds = [];
                this.hashes = options.hashes || 0;

                this._generateSeeds();
            }

            this.bits = options.bits || 1024;
            this.buffer = Buffer.alloc(Math.ceil(this.bits / 8));

            this.clear();
        }
    }, {
        key: 'clear',
        value: function clear() {
            //  buf.fill(0) to initialize a Buffer to zeroes
            this.buffer.fill(0);
        }
    }, {
        key: '_generateSeeds',
        value: function _generateSeeds() {
            if (!this.seeds) this.seeds = [];

            for (var i = 0; i < this.hashes; ++i) {
                // Generates cryptographically strong pseudo-random data. Generate 4 bytes.
                var buf = _crypto2.default.randomBytes(4);
                // Reads an unsigned 32-bit integer from the Buffer from index 0
                this.seeds[i] = buf.readUInt32LE(0);

                // Make sure we don't end up with two identical seeds,
                // which is unlikely but possible.
                for (var j = 0; j < i; ++j) {
                    if (this.seeds[i] === this.seeds[j]) {
                        --i;
                        break;
                    }
                }
            }
        }
    }, {
        key: 'add',
        value: function add(buf) {
            if (Array.isArray(buf)) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = (0, _getIterator3.default)(buf), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var item = _step.value;

                        this.add(item);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            } else {
                buf = Buffer.from(buf);

                for (var i = 0; i < this.hashes; ++i) {
                    var hash = (0, _xxhashjs.h32)(buf, this.seeds[i]).toString();
                    var bit = hash % this.bits;
                    this._setBit(bit);
                }
            }
        }
    }, {
        key: 'has',
        value: function has(item) {
            item = Buffer.from(item);

            for (var i = 0; i < this.hashes; ++i) {
                var hash = (0, _xxhashjs.h32)(item, this.seeds[i]).toString();
                var bit = hash % this.bits;

                var isInSet = this._getBit(bit);
                if (!isInSet) return false;
            }

            return true;
        }
    }, {
        key: '_setBit',
        value: function _setBit(bit) {
            var pos = Math.floor(bit / 8);
            var shift = bit % 8;

            var bitField = this.buffer[pos];
            bitField |= 0x1 << shift;
            this.buffer[pos] = bitField;
        }
    }, {
        key: '_getBit',
        value: function _getBit(bit) {
            var pos = Math.floor(bit / 8);
            var shift = bit % 8;

            var bitField = this.buffer[pos];

            return (bitField & 0x1 << shift) !== 0;
        }
    }], [{
        key: 'optimize',
        value: function optimize(itemCount) {
            var errorRate = arguments.length <= 1 || arguments[1] === undefined ? 0.005 : arguments[1];

            var bits = Math.round(-1 * itemCount * Math.log(errorRate) / LN2_SQUARED);
            var hashes = Math.round(bits / itemCount * Math.LN2);

            return {
                bits: bits,
                hashes: hashes
            };
        }
    }, {
        key: 'createOptimal',
        value: function createOptimal(itemCount, errorRate) {
            var opts = this.optimize(itemCount, errorRate);

            return new this(opts);
        }
    }]);
    return BloomFilter;
}();

exports.default = BloomFilter;


var filter = new BloomFilter({ hashes: 8, bits: 1024 });
filter.add(['cat', 'dog', 'coati', 'red panda']);
console.log(filter.has('cat'));
console.log(filter.has('coat'));
console.log(filter.has('null'));

var CountingBloomFilter = function (_BloomFilter) {
    (0, _inherits3.default)(CountingBloomFilter, _BloomFilter);

    function CountingBloomFilter() {
        var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
        (0, _classCallCheck3.default)(this, CountingBloomFilter);
        return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(CountingBloomFilter).call(this, opts));
    }

    (0, _createClass3.default)(CountingBloomFilter, [{
        key: 'init',
        value: function init(opts) {
            if (opts.seeds) {
                this.seeds = opts.seeds;
                this.hashes = opts.seeds.length;
            } else {
                this.hashes = opts.hashes || 8;
                this._generateSeeds();
            }

            this.bits = opts.bits || 1024;
            this.buffer = Buffer.alloc(this.bits);

            this.clear();
        }
    }, {
        key: 'clear',
        value: function clear() {
            (0, _get3.default)((0, _getPrototypeOf2.default)(CountingBloomFilter.prototype), 'clear', this).call(this);

            this.overflow = 0;
        }
    }, {
        key: '_setBit',
        value: function _setBit(bit) {
            // no-op at overflow
            if (this.buffer[bit] === 255) {
                ++this.overflow;
                return;
            }

            ++this.buffer[bit];
        }
    }, {
        key: '_unSetBit',
        value: function _unSetBit(bit) {
            if (this.buffer[bit] === 255 || this.buffer[bit] === 0) return;

            --this.buffer[bit];
        }
    }, {
        key: '_getBit',
        value: function _getBit(bit) {
            return this.buffer[bit] !== 0;
        }
    }, {
        key: 'remove',
        value: function remove(item) {
            if (!Buffer.isBuffer(item)) item = Buffer.from(item);

            for (var i = 0; i < this.seeds.length; ++i) {
                var hash = (0, _xxhashjs.h32)(item, this.seeds[i]).toString();
                var bit = hash % this.bits;

                this._unSetBit(bit);
            }
        }
    }, {
        key: 'hasOverflowed',
        get: function get() {
            return this.overflow > 0;
        }
    }], [{
        key: 'createOptimal',
        value: function createOptimal(itemCount, errorRate) {
            var opts = BloomFilter.optimize(itemCount, errorRate);
            return new this(opts);
        }
    }]);
    return CountingBloomFilter;
}(BloomFilter);

console.log('CountingBloomFilter');
var filter = new CountingBloomFilter({ hashes: 8, bits: 1024 });
filter.add(['cat', 'dog', 'coati', 'red panda']);
console.log(filter.has('cat'));
filter.remove('cat');
console.log(filter.has('cat'));
console.log(filter.has('coat'));