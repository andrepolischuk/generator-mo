import test from 'ava';
import <%= camelName %> from './index';

test('should return `Hello world`', t => {
  t.plan(1);
  t.true(<%= camelName %>('world') === 'Hello world');
});
