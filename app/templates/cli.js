#!/usr/bin/env node

import <%= camelName %> from './index';
import program from 'commander';
import pkg from './package';

program
  .version(pkg.version)
  .usage('[input]');

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

program.parse(process.argv);
console.log(<%= camelName %>(program.args[0]));
