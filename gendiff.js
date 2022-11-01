#!/usr/bin/env node

import { program } from 'commander';
 
program
    .name('gendiff')
    .version('0.0.1')
    .description('Compares two configuration files and shows a difference.')
    .help('-h, --help', 'display help for command')
    .version('-V, --version', 'output the current version')
