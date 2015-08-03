import assert from 'assert';
import <%= camelName %> from './index';

it('should <%= name %>', () => {
  assert(<%= camelName %>('world') === 'Hello world');
});
