'use strict';
var test = require('ava');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var join = require('path').join;

test.before(function (t) {
  helpers.run(join(__dirname, './app'))
    .inDir(join(__dirname, './temp'))
    .withOptions({'skip-install': true})
    .withPrompts({
      name: 'test',
      description: 'Test',
      githubUsername: 'andrepolischuk',
      cli: true
    })
    .on('end', function () {
      t.end();
    });
});

test('should generate files', function (t) {
  assert.file([
    '.editorconfig',
    '.gitignore',
    '.npmignore',
    '.travis.yml',
    'cli.js',
    'index.js',
    'test.js',
    'package.json',
    'README.md'
  ]);

  assert.fileContent('package.json', /"name": "test"/);
  assert.fileContent('package.json', /"main": "index\.es5\.js"/);
  assert.fileContent('package.json', /"bin": "cli\.es5\.js"/);
  assert.fileContent('package.json', /"author": "Andrey Polischuk <andre\.polischuk@gmail\.com> \(https:\/\/twitter\.com\/andrepolischuk\)"/);
  t.end();
});
