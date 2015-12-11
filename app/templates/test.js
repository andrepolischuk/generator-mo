import test from 'ava';
import <%= camelName %> from './index.es5';

test('should return `Hello world`', t => {
  t.true(<%= camelName %>('world') === 'Hello world');
});
