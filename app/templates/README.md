# <%= name %> [![Build Status](https://travis-ci.org/<%= githubUsername %>/<%= name %>.svg?branch=master)](https://travis-ci.org/<%= githubUsername %>/<%= name %>)

  > <%= description %>

## Install

```sh
npm install --save <%= name %>
```

## Usage

```js
var <%= camelName %> = require('<%= name %>');

<%= camelName %>(); // 'Hello world'
<%= camelName %>('module'); // 'Hello module'
```

## API

### <%= camelName %>(input)

  ...

<% if (cli) { %>
## CLI

```sh
npm install --global <%= name %>
```

```sh
<%= name %> --help

  Usage: <%= name %> [input]

  Options:

    -h, --help     output usage information
    -V, --version  output the version number

  Examples:

    # Hello world
    <%= name %>

    # Hello module
    <%= name %> module
```
<% } %>

## License

  MIT
