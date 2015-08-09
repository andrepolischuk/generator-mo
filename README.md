# generator-mo [![Build Status][travis-image]][travis-url]

  > Yeoman generator for es6 node and browser modules

  With CLI support

```sh
yo mo
? Your module name: awesome-module
? Your module description: My awesome module
? Your github username: andrepolischuk
? Your module needs a CLI? Yes
   create package.json
   create .editorconfig
   create .travis.yml
   create .gitignore
   create .npmignore
   create cli.js
   create index.js
   create test.js
   create README.md
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
git init
git commit -am "Initial commit"
```

## License

  MIT

[travis-url]: https://travis-ci.org/andrepolischuk/generator-mo
[travis-image]: https://travis-ci.org/andrepolischuk/generator-mo.svg?branch=master
