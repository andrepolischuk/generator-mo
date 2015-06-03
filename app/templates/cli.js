#!/usr/bin/env node

/**
 * Module dependencies
 */

var program = require('commander');
var <%= camelName %> = require('./');

/**
 * Program
 */

program
  .version(require('./package').version)
  .usage('[input]');

/**
 * Examples
 */

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

/**
 * Parse argv
 */

program.parse(process.argv);

/**
 * Out
 */

console.log(<%= camelName %>(program.args[0]));
