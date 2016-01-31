# generator-mo [![Build Status][travis-image]][travis-url]

> Yeoman generator for ES2015 node and browser modules

* ES2015
* Testing with [AVA][ava]
* Ready to use with [Travis CI][travis]
* With CLI support

```sh
yo mo
? Your module name: awesome-module
? Your module description: My awesome module
? Your github username: andrepolischuk
? Your module needs a CLI? Yes
   create package.json
   create index.js
   create README.md
   create test.js
   create cli.js
   create .babelrc
   create .editorconfig
   create .gitignore
   create .npmignore
   create .travis.yml
```

## Install

```sh
npm install --global generator-mo
```

## Usage

```sh
mkdir awesome-module
cd awesome-module
yo mo
git commit -am 'Initial commit'
```

## License

MIT

[travis-url]: https://travis-ci.org/andrepolischuk/generator-mo
[travis-image]: https://travis-ci.org/andrepolischuk/generator-mo.svg?branch=master

[ava]: https://github.com/sindresorhus/ava
[travis]: https://travis-ci.org/
