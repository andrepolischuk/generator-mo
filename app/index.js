
'use strict';

var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var to = require('to-case');
var user = require('gh-user');

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
      name: 'githubUsername',
      message: 'Your github username',
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
      this.githubUsername = props.githubUsername;
      this.cli = props.cli;
      var self = this;

      user(this.githubUsername, function(err, user) {
        self.githubName = user.name;
        self.githubEmail = user.email;
        done();
      });
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
  }
});
