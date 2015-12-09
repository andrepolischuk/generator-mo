import test from 'ava';
import <%= camelName %> from './index';

test('should return `Hello world`', t => {
  t.true(<%= camelName %>('world') === 'Hello world');
});
