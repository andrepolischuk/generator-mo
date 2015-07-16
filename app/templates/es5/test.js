'use strict';

var <%= camelName %> = require('./');
var assert = require('assert');

describe('<%= camelName %>', function() {
  it('should return `Hello world`', function() {
    assert(<%= camelName %>() === 'Hello world');
  });

  it('should return `Hello module`', function() {
    assert(<%= camelName %>('module') === 'Hello module');
  });
});
