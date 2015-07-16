#!/usr/bin/env node

'use strict';

var <%= camelName %> = require('./');
var program = require('commander');

program
  .version(require('./package').version)
  .usage('[input]');

program.on('--help', function() {
  console.log('  Examples:');
  console.log();
  console.log('    # Hello world');
  console.log('    <%= name %>');
  console.log();
  console.log('    # Hello module');
  console.log('    <%= name %> module');
  console.log();
});

program.parse(process.argv);
console.log(<%= camelName %>(program.args[0]));
