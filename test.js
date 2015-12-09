import test from 'ava';
import {assert, test as helpers} from 'yeoman-generator';
import {join} from 'path';

let generator;

test.before.cb(t => {
  helpers.testDirectory(join(__dirname, './temp'), () => {
    generator = helpers.createGenerator('mo:app', ['../app'], null, {skipInstall: true});
    t.end();
  })
});

test.cb('should generate files', t => {
  helpers.mockPrompt(generator, {
    name: 'test',
    description: 'Test',
    githubUsername: 'andrepolischuk',
    cli: true
  });

  generator.run(() => {
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
});
