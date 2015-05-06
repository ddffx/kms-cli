#!/usr/bin/env node

'use strict';
var meow = require('meow');
var kmsCli = require('./');
var _ = require('lodash');

var cli = meow({
    help: [
        'Usage',
        '  kms-cli <input command> [arguments]',
        '',
        'Example',
        '  kms-cli encrypt --pt "my secret variable" -k "my master key refernece"'
    ].join('\n')
});
if (_.isEmpty(cli.input)) {
    cli.showHelp();
}

kmsCli(cli.input, cli.flags);