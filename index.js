'use strict';

var KMSAPI = require('./lib/kms');
var chalk = require('chalk');
var _ = require('lodash');
var util = require('util');
var debuglog = util.debuglog('KMSCLI');
var inputFile = require('./lib/file-input');



var KMSCLI = function(input, flags) {
    var keyId, plainText, kmsapi, b64Text, cipherText, file, input_json;
    debuglog(chalk.yellow('input: %j'), input);
    debuglog(chalk.magenta('flags: %j'), flags);
    keyId = flags.k || flags.keyId;
    plainText = flags.pt || flags.plainText;
    b64Text = flags.ct || flags.cipherText;
    file = flags.file;

    kmsapi = new KMSAPI();

    function encrypt(keyId, plainText) {
        kmsapi = new KMSAPI(); // for new input as file, needed to reset for profile & region info on file;
        kmsapi.encrypt(keyId, plainText)
            .then(function(result) {
                // console.log(chalk.green('Cipher text:\n %s'), result);
                console.log(chalk.green(result));
            })
            .fail(function(err) {
                console.log(chalk.red('Error:\n %j', err));
            });
    }

    if (input[0] === 'encrypt') {
        if (keyId && plainText) {
            encrypt(keyId, plainText);
        } else if (file) {
            inputFile(file, function(err, json) {
                if (err) {
                    console.log(chalk.red('Error:\n %j', err));
                    process.exit(1);
                } else {
                    if (json.awsRegion) {
                        process.env.AWS_REGION = json.awsRegion;
                    }
                    if (json.awsProfile) {
                        process.env.AWS_PROFILE = json.awsProfile;
                    }
                    keyId = json.keyId;
                    plainText = json.plainText;
                    encrypt(keyId, plainText);
                }
            })
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
    } else if (input[0] === 'decrypt') {
        if (b64Text) {
            cipherText = new Buffer(b64Text, 'base64');
            kmsapi.decrypt(cipherText)
                .then(function(result) {
                    // console.log(chalk.green('Decrypted secret:\n %s'), result);
                    console.log(chalk.green(result));
                })
                .fail(function(err) {
                    console.log(chalk.red('Error:\n %j'), err);
                });
        } else {
            console.log(chalk.red('For decryption, cipher text is required'));
            process.exit(1);
        }
    }



};

module.exports = KMSCLI;
