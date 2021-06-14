const _API = require('./API');

test('inits new _API', () => {
  expect(new _API({ip: '104.236.0.12'})).toBe(new _API({ip: '104.236.0.12'}));
});