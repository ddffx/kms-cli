#! /usr/bin/env node

var program = require('commander'),
    chalk = require('chalk'),
    util = require('util');

/**
 * Define prrgrams
 */
program
    .version('0.0.1')
    .option('-t, --test', 'Run tests')
    .option('-r, --run', 'Run program')
    .parse(process.argv);

if (program.test) {
    util.log(chalk.green('Run tests'));
} else if (program.run) {
    util.log(chalk.cyan('Run program'));
} else {
    util.log(chalk.red('Please provide options'));
}