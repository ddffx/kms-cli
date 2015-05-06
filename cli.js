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
        '  Encrypt:',
        '  kms-cli encrypt --pt "my secret variable" -k my_master_key_refernece_id',
        '  Decrypt:',
        '  kms-cli decrypt --ct "my secret variable"',
        '  Describe Key:',
        '  kms-cli describe -k my_master_key_refernece_id'
    ].join('\n')
});
if (_.isEmpty(cli.input)) {
    cli.showHelp();
}

kmsCli(cli.input, cli.flags);