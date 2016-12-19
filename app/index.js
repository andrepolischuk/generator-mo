/* eslint-disable strict */

'use strict';

const Generator = require('yeoman-generator');
const toSlugCase = require('to-slug-case');
const toCamelCase = require('to-camel-case');
const githubUser = require('gh-user');
const githubUsername = require('github-username');

module.exports = class Module extends Generator {
  initializing() {
    const prompt = this.prompt.bind(this);
    const gitEmail = this.user.git.email();

    const getUsername = (email) => {
      if (email) {
        return githubUsername(email);
      }

      return Promise.resolve('');
    };

    const composeQuestions = username => [
      {
        name: 'name',
        message: 'Your module name',
        default: toSlugCase(this.appname)
      },
      {
        name: 'description',
        message: 'Your module description',
        default: '...'
      },
      {
        name: 'username',
        message: 'Your github username',
        default: username,
        store: true
      },
      {
        name: 'cli',
        message: 'Your module needs a CLI?',
        type: 'confirm',
        default: false
      }
    ];

    const composeTemplate = answers => githubUser(answers.username).then(user => ({
      name: answers.name,
      camelName: toCamelCase(answers.name),
      description: answers.description,
      cli: answers.cli,
      githubUsername: user.login,
      githubName: user.name,
      githubEmail: user.email,
      githubWebsite: user.blog
    }));

    const mv = (from, to) => this.fs.move(this.destinationPath(from), this.destinationPath(to));

    const createFiles = (tpl) => {
      this.fs.copyTpl([
        `${this.templatePath()}/**`,
        '!**/cli.js'
      ], this.destinationPath(), tpl);

      if (tpl.cli) {
        this.fs.copyTpl(this.templatePath('cli.js'), this.destinationPath('cli.js'), tpl);
      }

      mv('editorconfig', '.editorconfig');
      mv('gitignore', '.gitignore');
      mv('_package.json', 'package.json');
    };

    return getUsername(gitEmail)
      .then(composeQuestions)
      .then(prompt)
      .then(composeTemplate)
      .then(createFiles)
      .catch((err) => {
        throw err;
      });
  }

  writing() {
    const configs = {
      travis: {},
      babel: {
        presets: ['es2015'],
        plugins: ['add-module-exports']
      },
      'eslint-init': {
        parser: 'babel-eslint',
        extends: 'airbnb-base',
        rules: {
          'comma-dangle': ['error', 'never'],
          'array-bracket-spacing': ['error', 'always']
        },
        plugins: ['import']
      }
    };

    Object.keys(configs).forEach((generator) => {
      const config = configs[generator];

      this.composeWith(
        require.resolve(`generator-${generator}`),
        {
          config,
          'skip-install': this.options['skip-install']
        }
      );
    });

    this.spawnCommandSync('git', ['init']);
  }

  install() {
    if (!this.options['skip-install']) {
      this.npmInstall();
    }
  }
};
