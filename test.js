import test from 'ava';
import {assert, test as helpers} from 'yeoman-generator';
import {join} from 'path';
import pify from 'pify';
import Promise from 'pinkie-promise';
let generator;

test.beforeEach(async () => {
  pify(helpers.testDirectory, Promise)(join(__dirname, 'temp'));
  generator = helpers.createGenerator('mo:app', [join(__dirname, 'app')], null, {skipInstall: true});
});

test.serial('should generate files', async () => {
  helpers.mockPrompt(generator, {
    name: 'test',
    description: 'Test',
    githubUsername: 'andrepolischuk',
    cli: false
  });

  await pify(generator.run.bind(generator), Promise)();

  assert.file([
    '.editorconfig',
    '.gitignore',
    '.npmignore',
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

test.serial('should generate files with CLI', async () => {
  helpers.mockPrompt(generator, {
    name: 'test',
    description: 'Test',
    githubUsername: 'andrepolischuk',
    cli: true
  });

  await pify(generator.run.bind(generator), Promise)();

  assert.file([
    '.editorconfig',
    '.gitignore',
    '.npmignore',
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
