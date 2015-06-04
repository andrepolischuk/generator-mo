
'use strict';

var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var join = require('path').join;

describe('mo:app', function() {
  before(function(done) {
    helpers.run(join(__dirname, './app'))
      .inDir(join(__dirname, './temp'))
      .withOptions({'skip-install': true})
      .withPrompts({
        name: 'test',
        description: 'Test',
        githubUsername: 'test',
        cli: true
      })
      .on('end', done);
  });

  it('should generate files', function() {
    assert.file([
      '.gitignore',
      '.travis.yml',
      'cli.js',
      'index.js',
      'test.js',
      'package.json',
      'README.md'
    ]);

    assert.fileContent('package.json', /"name": "test"/);
    assert.fileContent('package.json', /"main": "index\.js"/);
    assert.fileContent('package.json', /"bin": "cli\.js"/);
  });
});
