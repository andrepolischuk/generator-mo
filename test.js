/* eslint-disable max-len */
import test from 'ava';
import pify from 'pify';
import helpers from 'yeoman-test';
import assert from 'yeoman-assert';

let generator;

test.beforeEach(async () => {
  await pify(helpers.testDirectory)(`${__dirname}/temp`);
  generator = helpers.createGenerator('mo:app', [ `${__dirname}/app` ], null, { 'skip-install': true });
});

test.serial('generate files', async () => {
  helpers.mockPrompt(generator, {
    name: 'test',
    description: 'Test',
    username: 'andrepolischuk',
    cli: false
  });

  await pify(generator.run.bind(generator))();

  assert.file([
    '.babelrc',
    '.editorconfig',
    '.eslintrc.json',
    '.git',
    '.gitignore',
    '.travis.yml',
    'index.js',
    'test.js',
    'package.json',
    'README.md'
  ]);

  assert.noFile('cli.js');
  assert.fileContent('package.json', /"name": "test"/);
  assert.fileContent('package.json', /"main": "index\.es5\.js"/);
  assert.fileContent('package.json', /"author": "Andrey Polischuk <andre\.polischuk@gmail\.com> \(https:\/\/twitter\.com\/andrepolischuk\)"/);
});

test.serial('generate files with CLI', async () => {
  helpers.mockPrompt(generator, {
    name: 'test',
    description: 'Test',
    username: 'andrepolischuk',
    cli: true
  });

  await pify(generator.run.bind(generator))();

  assert.file([
    '.babelrc',
    '.editorconfig',
    '.eslintrc.json',
    '.git',
    '.gitignore',
    '.travis.yml',
    'index.js',
    'cli.js',
    'test.js',
    'package.json',
    'README.md'
  ]);

  assert.fileContent('package.json', /"name": "test"/);
  assert.fileContent('package.json', /"main": "index\.es5\.js"/);
  assert.fileContent('package.json', /"bin": "cli\.es5\.js"/);
  assert.fileContent('package.json', /"meow"/);
  assert.fileContent('package.json', /"author": "Andrey Polischuk <andre\.polischuk@gmail\.com> \(https:\/\/twitter\.com\/andrepolischuk\)"/);
});
