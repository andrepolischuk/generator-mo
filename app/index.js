'use strict';
var yeoman = require('yeoman-generator');
var to = require('to-case');
var ghUser = require('gh-user');

module.exports = yeoman.generators.Base.extend({
  initializing: function() {
    this.pkg = require('../package');
  },

  prompting: function() {
    var done = this.async();

    var prompts = [{
      name: 'name',
      message: 'Your module name',
      default: this.appname.replace(/\s/g, '-')
    }, {
      name: 'description',
      message: 'Your module description',
      default: '...'
    }, {
      name: 'githubUsername',
      message: 'Your github username',
      store: true
    }, {
      name: 'cli',
      message: 'Your module needs a CLI?',
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

      ghUser(this.githubUsername, function(err, user) {
        self.githubName = user.name;
        self.githubEmail = user.email;
        self.githubWebsite = user.blog;
        done();
      });
    }.bind(this));
  },

  app: function() {
    this.copy('editorconfig', '.editorconfig');
    this.copy('travis.yml', '.travis.yml');
    this.copy('gitignore', '.gitignore');
    this.copy('npmignore', '.npmignore');
    if (this.cli) this.template('cli.js', 'cli.js');
    this.template('index.js', 'index.js');
    this.template('test.js', 'test.js');
    this.template('_package.json', 'package.json');
    this.template('README.md', 'README.md');
  },

  install: function() {
    this.installDependencies({bower: false});
  }
});
