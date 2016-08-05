'use strict';

describe('polyn tests', function () {
  var test = new Polynomial();
  test.createPolyn([-1, 2, 4], [1, 2, 3]);
  var test2 = new Polynomial();
  test2.createPolyn([1, 2, 3], [1, 2, 3]);

  it('should add a new polyn', function () {
    test.addPolyn(test2);
    expect(test.head.data).toEqual({ coef: 7, expn: 3 });
    expect(test.head.next.data).toEqual({ coef: 4, expn: 2 });
    expect(test.head.next.next).toEqual(null);
  });

  var test3 = new Polynomial();
  test3.createPolyn([1, 5, 2], [1, 5, 2]);
  it('should add another new polyn', function () {
    test.addPolyn(test2);
    expect(test.head.data).toEqual({ coef: 1, expn: 1 });
    expect(test.head.next.data).toEqual({ coef: 5, expn: 5 });
    expect(test.head.next.next.data).toEqual({ coef: 6, expn: 2 });
    expect(test.head.next.next.next.data).toEqual({ coef: 7, expn: 3 });
  });
});