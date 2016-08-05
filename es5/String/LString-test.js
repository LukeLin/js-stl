'use strict';

describe('LString tests', function () {
    var a = new LString(5);
    var b = new LString(4);
    var c = new LString(5);
    var t;

    it('should assign string', function () {
        a.strAssign('abcdefg');
        expect(a + '').toBe('abcdefg');

        b.strAssign('hijklmno');
        expect(b + '').toBe('hijklmno');

        c.strAssign('abcdefg');
        expect(c + '').toBe('abcdefg');
    });

    it('should compare', function () {
        expect(a.strCompare(b)).toBe(false);
        expect(a.strCompare(c)).toBe(true);
    });

    it('should concat', function () {
        t = a.concat(b);
        expect(t + '').toBe('abcdefghijklmno');
    });

    it('should substring', function () {
        t = t.substring(2, 5);
        expect(t + '').toBe('cdefg');
    });
});