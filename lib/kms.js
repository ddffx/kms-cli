'use strict';

var AWS = require('aws-sdk');
var chalk = require('chalk');
var util = require('util');


var KMSAPI = function() {
    var config;
    if (!(this instanceof KMSAPI)) {
        return new KMSAPI();
    }
    // console.log(chalk.green('env %j'),process.env);
    config = {
        region: 'us-east-1',
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    };
    // console.log(chalk.cyan('config %j'), config);
    this.awskms = new AWS.KMS(config);
};
KMSAPI.prototype.encrypt = function(keyId, plainText) {
    var params = {
        KeyId: keyId,
        Plaintext: plainText
    };
    this.awskms.encrypt(params, function(err, data) {

        if (err) {
            console.log(chalk.red(err.stack));
        } else {
            console.log('Encrypted Text: %j', data.CiphertextBlob.toString('base64'));
        }
    });
};
KMSAPI.prototype.decrypt = function(cipherText) {
    var params = {
        CiphertextBlob: cipherText
    };
    this.awskms.decrypt(params, function(err, data) {

        if (err) {
            console.log(chalk.red(err.stack));
        } else {
            console.log('Decrypted plain text: %j', data.Plaintext);
            console.log(String.fromCharCode.apply(null, new Uint16Array(data.Plaintext)));
        }
    });
};
KMSAPI.prototype.describeKey = function(keyId) {
    var params = {
        KeyId: keyId,
    };
    this.awskms.describeKey(params, function(err, data) {
        if (err) {
            console.log(chalk.red(err.stack));
        } else {
            console.log(data);
        }
    });

}
module.exports = exports = KMSAPI;