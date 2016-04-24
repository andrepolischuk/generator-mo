import { Base } from 'yeoman-generator';
import ghUser from 'gh-user';
import Promise from 'pinkie-promise';
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

    const prompting = q => new Promise(resolve => {
      this.prompt(q, props => {
        resolve(props);
      });
    });

    const getTemplateProps = props => ghUser(props.githubUsername).then(user => ({
      name: props.name,
      camelName: toCamelCase(props.name),
      description: props.description,
      githubUsername: props.githubUsername,
      githubName: user.name,
      githubEmail: user.email,
      githubWebsite: user.blog,
      cli: props.cli
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

    return prompting(questions)
      .then(getTemplateProps)
      .then(createFiles)
      .catch(err => {
        throw err;
      });
  }

  writing() {
    const deps = {
      travis: {},
      babel: {
        options: {
          'skip-install': this.options['skip-install'],
          config: {
            presets: [ 'es2015' ],
            plugins: [ 'add-module-exports' ]
          }
        }
      },
      'eslint-init': {
        options: {
          'skip-install': this.options['skip-install'],
          config: {
            parser: 'babel-eslint',
            extends: 'airbnb-base',
            rules: {
              'comma-dangle': [ 'error', 'never' ],
              'array-bracket-spacing': [ 'error', 'always' ]
            },
            plugins: [ 'import', 'require-path-exists' ]
          }
        }
      }
    };

    Object.keys(deps).forEach(name => {
      this.composeWith(name, deps[name], {
        local: require.resolve(`generator-${name}`)
      });
    });

    this.spawnCommandSync('git', [ 'init' ]);
  }

  install() {
    if (!this.options['skip-install']) {
      this.npmInstall();
    }
  }
}
