import {Base} from 'yeoman-generator';
import {camel} from 'to-case';
import ghUser from 'gh-user';

export default class Module extends Base {
  init() {
    const done = this.async();

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

    this.prompt(prompts, props => {
      this.name = props.name;
      this.camelName = camel(this.name);
      this.description = props.description;
      this.githubUsername = props.githubUsername;
      this.cli = props.cli;

      ghUser(this.githubUsername, (err, user) => {
        this.githubName = user.name;
        this.githubEmail = user.email;
        this.githubWebsite = user.blog;
        this.copy('editorconfig', '.editorconfig');
        this.copy('travis.yml', '.travis.yml');
        this.copy('gitignore', '.gitignore');
        this.copy('npmignore', '.npmignore');
        if (this.cli) this.template('cli.js', 'cli.js');
        this.template('index.js', 'index.js');
        this.template('test.js', 'test.js');
        this.template('_package.json', 'package.json');
        this.template('README.md', 'README.md');
        done();
      });
    });
  }

  install() {
    this.installDependencies({bower: false});
  }
};
