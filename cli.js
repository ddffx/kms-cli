#!/usr/bin/env node

'use strict';
var meow = require('meow');
var kmsCli = require('./');
var _ = require('lodash');
var KMSHelper = require('./lib/helper');



var cli = meow({
    help: [
        '!Required!',
        '  Make sure',
        '    AWS_REGION & AWS_PROFILE are set in your environment (preferred)',
        '    Or AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY are set in your environment',
        '',
        'Check availability of env variables',
        '  env',
        '',
        ' Set them',
        '  export AWS_PROFILE=< your aws profile from .aws/credentials, ex: work-stuff > ',
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
        '  kms-cli describe -k my_kms_encryption_key_id',
        '  Using file input',
        '  kms-cli encrypt --file my-input-file-path'
    ].join('\n')
});
var kmsHelper = new KMSHelper();

if (_.isEmpty(cli.input)) {
    cli.showHelp();
}
if (!cli.flags.file) {
    if (!kmsHelper.checkProfileEnv() && !kmsHelper.checkSecretEnv()) {
        var errMsg = ['AWS parameters are missing',
            '  Please set AWS_REGION, AWS_PROFILE in your environment',
            '  Or',
            '  Please set AWS_REGION, AWS_SECRET_ACCESS_KEY & AWS_ACCESS_KEY_ID in your environment'
        ];
        // errMsg.unshift('\n');
        console.log(errMsg.join('\n'));
        process.exit(1);
    }
}


kmsCli(cli.input, cli.flags);
