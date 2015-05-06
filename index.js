'use strict';

var KMSAPI = require('./lib/kms');
var chalk = require('chalk');
var _ = require('lodash');
var util = require('util');

var KMSCLI = function(input, flags) {
    var keyId, plainText, kmsapi, b64Text, cipherText;
    util.log(chalk.yellow('input: %j'), input);
    util.log(chalk.magenta('flags: %j'), flags);
    keyId = flags.k || flags.keyId;
    plainText = flags.pt || flags.plainText;
    b64Text = flags.ct || flags.cipherText;

    kmsapi = new KMSAPI();

    if (input[0] === 'encrypt') {
        if (keyId && plainText) {
            kmsapi.encrypt(keyId, plainText);
        } else {
            console.log('For encryption, a key id and a plain text required');
            process.exit(1);
        }
    } else if (input[0] === 'describe') {
        if (keyId) {
            kmsapi.describeKey(keyId);
        } else {
            console.log('For key description a key id is required');
            process.exit(1);
        }
    } else if(input[0] === 'decrypt') {
        if (b64Text) {
        	cipherText = new Buffer(b64Text, 'base64');
            kmsapi.decrypt(cipherText);
        } else {
            console.log('For decryption, cipher text is required');
            process.exit(1);
        }
    }



};

module.exports = KMSCLI;