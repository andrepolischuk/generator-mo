#!/usr/bin/env node
import meow from 'meow';
import <%= camelName %> from './index';

const cli = meow({
  help: [
    'Usage',
    '  <%= name %> <input>',
    '',
    'Example',
    '  <%= name %> world'
  ]
});

console.log(<%= camelName %>(cli.input[0]));
