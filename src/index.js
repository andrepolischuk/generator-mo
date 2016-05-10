import { Base } from 'yeoman-generator';
import ghUser from 'gh-user';
import toCamelCase from 'to-camel-case';

export default class Module extends Base {
  initializing() {
    const name = this.appname.replace(/\s/g, '-');

    const questions = [
      {
        name: 'name',
        message: 'Your module name',
        default: name
      },
      {
        name: 'description',
        message: 'Your module description',
        default: '...'
      },
      {
        name: 'githubUsername',
        message: 'Your github username',
        store: true
      },
      {
        name: 'cli',
        message: 'Your module needs a CLI?',
        type: 'confirm',
        default: false
      }
    ];

    const composeTemplate = answers => ghUser(answers.githubUsername).then(user => ({
      name: answers.name,
      camelName: toCamelCase(answers.name),
      description: answers.description,
      cli: answers.cli,
      githubUsername: answers.githubUsername,
      githubName: user.name,
      githubEmail: user.email,
      githubWebsite: user.blog
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

    return this.prompt(questions)
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
}
