#!/usr/bin/env node
import meow from 'meow';
import <%= camelName %> from './index';

const cli = meow(`
    Usage
      <%= name %> <input>

    Example
      <%= name %> world
`);

console.log(<%= camelName %>(cli.input[0]));
