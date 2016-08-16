/* eslint-disable strict */
'use strict';
const Base = require('yeoman-generator').Base;
const toSlugCase = require('to-slug-case');
const toCamelCase = require('to-camel-case');
const getUser = require('gh-user');
const getUsername = require('github-username');

module.exports = class Module extends Base {
  initializing() {
    const email = this.user.git.email();
    const prompt = this.prompt.bind(this);

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

    const composeTemplate = answers => getUser(answers.username).then(githubUser => ({
      name: answers.name,
      camelName: toCamelCase(answers.name),
      description: answers.description,
      cli: answers.cli,
      githubUsername: githubUser.login,
      githubName: githubUser.name,
      githubEmail: githubUser.email,
      githubWebsite: githubUser.blog
    }));

    const mv = (from, to) => this.fs.move(this.destinationPath(from), this.destinationPath(to));

    const createFiles = tpl => {
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

    return getUsername(email)
      .then(composeQuestions)
      .then(prompt)
      .then(composeTemplate)
      .then(createFiles)
      .catch(err => {
        throw err;
      });
  }

  writing() {
    const configs = {
      travis: {},
      babel: {
        presets: [ 'es2015' ],
        plugins: [ 'add-module-exports' ]
      },
      'eslint-init': {
        parser: 'babel-eslint',
        extends: 'airbnb-base',
        rules: {
          'comma-dangle': [ 'error', 'never' ],
          'array-bracket-spacing': [ 'error', 'always' ]
        },
        plugins: [ 'import' ]
      }
    };

    Object.keys(configs).forEach(generator => {
      const config = configs[generator];

      this.composeWith(
        generator,
        { options: {
          config,
          'skip-install': this.options['skip-install']
        } },
        { local: require.resolve(`generator-${generator}`) }
      );
    });

    this.spawnCommandSync('git', [ 'init' ]);
  }

  install() {
    if (!this.options['skip-install']) {
      this.npmInstall();
    }
  }
};
