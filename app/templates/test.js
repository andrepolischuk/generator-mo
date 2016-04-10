import test from 'ava';
import <%= camelName %> from './index';

test('return `Hello world`', t => {
  t.is(<%= camelName %>('world'), 'Hello world');
});
