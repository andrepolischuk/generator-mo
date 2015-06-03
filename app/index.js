
'use strict';

var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var to = require('to-case');

module.exports = yeoman.generators.Base.extend({
  initializing: function() {
    this.pkg = require('../package');
  },

  prompting: function() {
    var done = this.async();
    this.log(yosay('Welcome to node module generator'));

    var prompts = [{
      name: 'name',
      message: 'Your module name',
      default: this.appname
    }, {
      name: 'description',
      message: 'Yout module description',
      default: '...'
    }, {
      name: 'github',
      message: 'Your github username',
      store: true
    }, {
      name: 'author',
      message: 'Your name',
      store: true
    }, {
      name: 'email',
      message: 'Your email address',
      store: true
    }, {
      name: 'cli',
      message: 'Your module needs a CLI',
      type: 'confirm',
			default: false
    }];

    this.prompt(prompts, function(props) {
      this.name = props.name;
      this.camelName = to.camel(this.name);
      this.description = props.description;
      this.github = props.github;
      this.author = props.author;
      this.email = props.email;
      this.cli = props.cli;
      done();
    }.bind(this));
  },

  app: function() {
    this.copy('gitignore', '.gitignore');
    this.copy('travis.yml', '.travis.yml');
    this.template('index.js', 'index.js');
    this.template('test.js', 'test.js');
    this.template('_package.json', 'package.json');
    this.template('README.md', 'README.md');
    if (this.cli) this.template('cli.js', 'cli.js');
  },

  install: function() {
    this.installDependencies({bower: false});
    // this.installDependencies({
    //   bower: false,
    //   skipInstall: this.options['skip-install']
    // });
  }
});
