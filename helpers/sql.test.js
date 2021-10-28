const { sqlForPartialUpdate } = require('./sql');

describe('tests sqlForPartialUpdate function', function () {
  test('should return two items correctly', function () {
    const result = sqlForPartialUpdate(
      { f1: 'v1', jsF2: 'v2' },
      { jsF2: 'f2' }
    );
    expect(result).toEqual({
      setCols: '"f1"=$1, "f2"=$2',
      values: ['v1', 'v2'],
    });
  });
});
