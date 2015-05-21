#!/usr/bin/env node

'use strict';
var meow = require('meow');
var kmsCli = require('./');
var _ = require('lodash');

var cli = meow({
    help: [
        'Usage',
        '  kms-cli <input command> [arguments]',
        ' Or if you are using this as docker conatiner and didn\'t create alias kms-cli',
        '  ./kms-cli.sh <input command> [arguments]',
        '',
        'Example',
        '  Encrypt:',
        '  kms-cli encrypt --pt "my secret" -k my_kms_encryption_key_id',
        '  Decrypt:',
        '  kms-cli decrypt --ct "my encrypted secret"',
        '  Describe Encryption Key:',
        '  kms-cli describe -k my_kms_encryption_key_id'
    ].join('\n')
});
if (_.isEmpty(cli.input)) {
    cli.showHelp();
}

kmsCli(cli.input, cli.flags);