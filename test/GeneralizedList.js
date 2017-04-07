import GList from '../src/GeneralizedList/GList.js';
import assert from 'assert';

describe('GList tests', function(){

    var node = new GList();

    it('createGList', function(){
        node.createGList('((), (ea), (sa, (bd, ce, dh)))');
    });

    it('toString', function(){
        assert.equal(node + '', '((), (ea), (sa, (bd, ce, dh)))');
    });

    it('depth', function(){
        assert.equal(node.depth(), 3);
    });

    it('reverse', function(){
        assert.equal(node + '', '((), (ea), (sa, (bd, ce, dh)))');
        node.reverse();
        assert.equal(node + '', '(((dh, ce, bd), sa), (ea), ())');
    });

    it('copyList', function(){
        var node2 = new GList();
        node.copyList(node2);
        assert.equal(GList.equal(node, node2), true)
    });

    it('orderPrint', function(){
        console.log(node + '');
        node.orderPrint();
    });
});