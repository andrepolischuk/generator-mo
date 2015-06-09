
import <%= camelName %> from './';
import assert from 'assert';

describe('<%= camelName %>', () => {
  it('should return `Hello world`', () => {
    assert(<%= camelName %>() === 'Hello world');
  });

  it('should return `Hello module`', () => {
    assert(<%= camelName %>('module') === 'Hello module');
  });
});
