/**
 * 常用查找哈希算法
 */
console.log('rotatingHash');
function rotatingHash(key = '', prime) {
    let hash = 0;
    for (let i = 0; i < key.length; ++i) {
        hash = (hash << 4) ^ (hash >> 28) ^ key.charCodeAt(i);
    }
    return (hash % prime);
}
console.log(rotatingHash('test', 31)); // 13
console.log(rotatingHash('abc', 31)); // 23
console.log(rotatingHash('abb', 31)); // 22

console.log('rsHash');
function rsHash(key = '') {
    let b = 378551;
    let a = 63689;
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
        hash = hash * a + key.charCodeAt(i);
        a = a * b;
    }
    return hash
    // return (hash & 0x7FFFFFFF);
}
console.log(rsHash('test', 31)); // 13
console.log(rsHash('abc', 31)); // 23
console.log(rsHash('abb', 31)); // 22

console.log('adler32');
function adler32(str) {
    var a = 1, b = 0, L = str.length, M = 0, c = 0, d = 0;

    for (var i = 0; i < L;) {
        M = Math.min(L - i, 3850);
        while (M > 0) {
            c = str.charCodeAt(i++);
            if (c < 0x80) { a += c; }
            else if (c < 0x800) {
                a += 192 | ((c >> 6) & 31); b += a; --M;
                a += 128 | (c & 63);
            } else if (c >= 0xD800 && c < 0xE000) {
                c = (c & 1023) + 64; d = str.charCodeAt(i++) & 1023;
                a += 240 | ((c >> 8) & 7); b += a; --M;
                a += 128 | ((c >> 2) & 63); b += a; --M;
                a += 128 | ((d >> 6) & 15) | ((c & 3) << 4); b += a; --M;
                a += 128 | (d & 63);
            } else {
                a += 224 | ((c >> 12) & 15); b += a; --M;
                a += 128 | ((c >> 6) & 63); b += a; --M;
                a += 128 | (c & 63);
            }
            b += a; --M;
        }
        a = (15 * (a >>> 16) + (a & 65535));
        b = (15 * (b >>> 16) + (b & 65535));
    }
    return ((b % 65521) << 16) | (a % 65521);
}
console.log(adler32('test', 31)); // 73204161
console.log(adler32('abc', 31)); // 38600999
console.log(adler32('abb', 31)); // 38535462

console.log('crc32');
function signed_crc_table() {
	var c = 0, table = new Array(256);

	for(var n =0; n != 256; ++n){
		c = n;
		c = ((c&1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));
		c = ((c&1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));
		c = ((c&1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));
		c = ((c&1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));
		c = ((c&1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));
		c = ((c&1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));
		c = ((c&1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));
		c = ((c&1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));
		table[n] = c;
	}

	return typeof Int32Array !== 'undefined' ? new Int32Array(table) : table;
}

var T = signed_crc_table();
function crc32(str, seed) {
	var C = seed ^ -1;
	for(var i = 0, L=str.length, c, d; i < L;) {
		c = str.charCodeAt(i++);
		if(c < 0x80) {
			C = (C>>>8) ^ T[(C ^ c)&0xFF];
		} else if(c < 0x800) {
			C = (C>>>8) ^ T[(C ^ (192|((c>>6)&31)))&0xFF];
			C = (C>>>8) ^ T[(C ^ (128|(c&63)))&0xFF];
		} else if(c >= 0xD800 && c < 0xE000) {
			c = (c&1023)+64; d = str.charCodeAt(i++)&1023;
			C = (C>>>8) ^ T[(C ^ (240|((c>>8)&7)))&0xFF];
			C = (C>>>8) ^ T[(C ^ (128|((c>>2)&63)))&0xFF];
			C = (C>>>8) ^ T[(C ^ (128|((d>>6)&15)|((c&3)<<4)))&0xFF];
			C = (C>>>8) ^ T[(C ^ (128|(d&63)))&0xFF];
		} else {
			C = (C>>>8) ^ T[(C ^ (224|((c>>12)&15)))&0xFF];
			C = (C>>>8) ^ T[(C ^ (128|((c>>6)&63)))&0xFF];
			C = (C>>>8) ^ T[(C ^ (128|(c&63)))&0xFF];
		}
	}
	return C ^ -1;
}
console.log(crc32('test', 31)); // -804963899
console.log(crc32('abc', 31)); // 576628111
console.log(crc32('abb', 31)); // 1431934233
