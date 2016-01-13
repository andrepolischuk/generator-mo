import {Base} from 'yeoman-generator';
import {camel} from 'to-case';
import ghUser from 'gh-user';
import Promise from 'pinkie-promise';

export default class Module extends Base {
  init() {
    const prompts = [{
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

    const prompt = prompts => new Promise(resolve => {
      this.prompt(prompts, props => {
        resolve(props);
      });
    });

    const getTemplateProps = props => {
      return ghUser(props.githubUsername)
        .then(user => ({
          name: props.name,
          camelName: camel(props.name),
          description: props.description,
          githubUsername: props.githubUsername,
          githubName: user.name,
          githubEmail: user.email,
          githubWebsite: user.blog,
          cli: props.cli
        }));
    };

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
      mv('npmignore', '.npmignore');
      mv('travis.yml', '.travis.yml');
      mv('_package.json', 'package.json');
    };

    return prompt(prompts)
      .then(getTemplateProps)
      .then(createFiles);
  }

  git() {
    this.spawnCommandSync('git', ['init']);
  }

  install() {
    this.installDependencies({bower: false});
  }
};
