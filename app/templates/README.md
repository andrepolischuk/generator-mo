# <%= name %> [![Build Status][travis-image]][travis-url]

> <%= description %>

## Install

```sh
npm install --save <%= name %>
```

## Usage

```js
var <%= camelName %> = require('<%= name %>');

<%= camelName %>('world'); // Hello world
```

## API

### <%= camelName %>(input)

#### input

Type: `string`

Input string.

<% if (cli) { %>
## CLI

```sh
npm install --global <%= name %>
```

```sh
<%= name %> --help

  Usage
    <%= name %> <input>

  Example
    <%= name %> world
```
<% } %>

## License

MIT

[travis-url]: https://travis-ci.org/<%= githubUsername %>/<%= name %>
[travis-image]: https://travis-ci.org/<%= githubUsername %>/<%= name %>.svg?branch=master
