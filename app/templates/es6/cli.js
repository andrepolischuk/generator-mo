#!/usr/bin/env node

/**
 * Module dependencies
 */

import <%= camelName %> from './';
import program from 'commander';
import pkg from './package';

/**
 * Program
 */

program
  .version(pkg.version)
  .usage('[input]');

/**
 * Examples
 */

program.on('--help', () => {
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
