#!/usr/bin/env node
import <%= camelName %> from './index';
import meow from 'meow';

const cli = meow({
  help: [
    'Usage',
    '  <%= name %> [input]',
    '',
    'Examples',
    '  <%= name %>',
    '  <%= name %> module'
  ]
});

console.log(<%= camelName %>(cli.input[0]));
