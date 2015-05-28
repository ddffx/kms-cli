#!/usr/bin/env node

'use strict';
var meow = require('meow');
var kmsCli = require('./');
var _ = require('lodash');

var _checkEnvironment = function() {
    return process.env.AWS_REGION && process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY;
};

var cli = meow({
    help: [
        'Required',
        'Make sure required AWS parameters (AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY) are set in your environment',
        '',
        'Check availability',
        '  env',
        '',
        ' Set them',
        '  export AWS_REGION=< aws region where the key was created, ex: us-east-1 > ',
        '  export AWS_ACCESS_KEY_ID=< your access key id >',
        '  export AWS_SECRET_ACCESS_KEY=< your secret access key id >',
        '',
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
if (!_checkEnvironment()) {
    var errMsg = 'AWS parameters are missing \n Please set AWS_REGION, AWS_SECRET_ACCESS_KEY & AWS_ACCESS_KEY_ID in your environment \n';
    console.log(errMsg);
    process.exit(1);
}

kmsCli(cli.input, cli.flags);