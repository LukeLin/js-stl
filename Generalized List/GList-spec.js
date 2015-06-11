var GLNode = require('../dist/Generalized List/GList');

describe('GList specs', function(){

    var node = new GLNode();

    it('createGList', function(){
        node.createGList('((), (ea), (sa, (bd, ce, dh)))');
    });

    it('toString', function(){
        expect(node + '').toBe('((), (ea), (sa, (bd, ce, dh)))');
    });

    it('depth', function(){
        expect(node.depth()).toBe(3);
    });

    it('reverse', function(){
        expect(node + '').toBe('((), (ea), (sa, (bd, ce, dh)))');
        node.reverse();
        expect(node + '').toBe('(((dh, ce, bd), sa), (ea), ())');
    });

    it('copyList', function(){
        var node2 = new GLNode();
        node.copyList(node2);
        expect(GLNode.equal(node, node2)).toBe(true)
    });

    it('orderPrint', function(){
        console.log(node + '');
        node.orderPrint();
    });

    it('orderPrint2', function(){
        node.orderPrint2();
    });
});