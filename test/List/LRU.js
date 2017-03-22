import assert from 'assert';
import LRUCache from '../../src/List/LRU';

describe('LRU tests', function(){
    let a = new LRUCache([], 3);
    
    it('add', function(){
        a.add('adam', 29);
        assert.deepEqual(a.toJSON(), [
            {
                key: 'adam',
                value: 29
            }
        ]);

        a.add('john', 26);
        assert.deepEqual(a.toJSON(), [
            {
                key: 'john',
                value: 26
            },
            {
                key: 'adam',
                value: 29
            }
        ]);

        a.add('angela', 24);

        assert.deepEqual(a.toJSON(), [
            {
                key: 'angela',
                value: 24
            },
            {
                key: 'john',
                value: 26
            },
            {
                key: 'adam',
                value: 29
            }
        ]);
    });

    it('get', function(){
        a.get('john');

        assert.deepEqual(a.toJSON(), [
            {
                key: 'john',
                value: 26
            },
            {
                key: 'angela',
                value: 24
            },
            {
                key: 'adam',
                value: 29
            }
        ]);

        a.add('zorro', 141);
        assert.deepEqual(a.toJSON(), [
            {
                key: 'zorro',
                value: 141
            },
            {
                key: 'john',
                value: 26
            },
            {
                key: 'angela',
                value: 24
            }
        ]);
    });

    it('iterator', function(){
        let iterator = a[Symbol.iterator]();
        assert.deepEqual(iterator.next().value, {
            key: 'zorro',
            value: 141
        });
        assert.deepEqual(iterator.next().value, {
            key: 'john',
            value: 26
        });
        assert.deepEqual(iterator.next().value, {
            key: 'angela',
            value: 24
        });
    });

    it('remove', function(){
        assert.equal(a.remove('test'), null);

        assert.deepEqual(a.remove('zorro'), {
            key: 'zorro',
            value: 141
        });
        assert.deepEqual(a.toJSON(), [
            {
                key: 'john',
                value: 26
            },
            {
                key: 'angela',
                value: 24
            }
        ]);

        a.remove('john');
        assert.deepEqual(a.toJSON(), [
            {
                key: 'angela',
                value: 24
            }
        ]);

        a.remove('angela');

        assert.deepEqual(a.toJSON(), [
        ]);
    });
});
