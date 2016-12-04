'use strict';

var AWS = require('aws-sdk'),
    chalk = require('chalk'),
    util = require('util'),
    debuglog = util.debuglog('KMSAPI'),
    Q = require('q'),
    _ = require('lodash');


var KMSAPI = function() {
    var config;
    if (!(this instanceof KMSAPI)) {
        return new KMSAPI();
    }
    // console.log(chalk.green('env %j'),process.env);
    AWS.config.update({
        region: process.env.AWS_REGION
    });

    if (process.env.AWS_PROFILE) { // set from file
        var credentials = new AWS.SharedIniFileCredentials({ profile: process.env.AWS_PROFILE });
        AWS.config.credentials = credentials;
    }

    config = {
        region: process.env.AWS_REGION,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        apiVersion: '2014-11-01'
    };

    // console.log(chalk.cyan('config %j'), config);

    if (this.isValidConfig(config)) {

        this.awskms = new AWS.KMS(config); // support for backward compatibility 
    } else {
        this.awskms = new AWS.KMS();
    }
};
KMSAPI.prototype.encrypt = function(keyId, plainText, region, profile) {
    var deferred = Q.defer(),
        params = {
            KeyId: keyId,
            Plaintext: plainText
        };
    // console.log(process.env);
    // console.log(this.awskms);

    this.awskms.encrypt(params, function(err, data) {

        if (err) {
            console.log(chalk.red(err.stack));
            deferred.reject(err);
        } else {
            debuglog('Encrypted Text: %j', data.CiphertextBlob.toString('base64'));
            deferred.resolve(data.CiphertextBlob.toString('base64'));
        }
    });

    return deferred.promise;
};
KMSAPI.prototype.decrypt = function(cipherText) {
    var deferred = Q.defer(),
        out,
        params = {
            CiphertextBlob: cipherText
        };
    this.awskms.decrypt(params, function(err, data) {

        if (err) {
            console.log(chalk.red(err.stack));
            deferred.reject(err);
        } else {
            out = String.fromCharCode.apply(null, new Uint16Array(data.Plaintext));
            // console.log('Decrypted plain text: %j', data.Plaintext);
            // console.log(out);
            deferred.resolve(out);
        }
    });
    return deferred.promise;
};
KMSAPI.prototype.describeKey = function(keyId) {
    var deferred = Q.defer(),
        out,
        params = {
            KeyId: keyId
        };
    this.awskms.describeKey(params, function(err, data) {
        if (err) {
            console.log(chalk.red(err.stack));
            deferred.reject(err);
        } else {
            console.log(data);
            deferred.resolve(data);
        }
    });
    return deferred.promise;
};
KMSAPI.prototype.getAliasList = function() {
    var deferred = Q.defer(),
        params = {
            Limit: 0
        };
    this.awskms.listAliases(params, function(err, data) {
        if (err) {
            debuglog(chalk.red(err.stack));
            deferred.reject(err);
        } else {
            debuglog(data);
            deferred.resolve(data);
        }
    });
    return deferred.promise;
};

KMSAPI.prototype.isValidConfig = function(config) {

    if (config) {
        return !_.isEmpty(config.region) && !_.isEmpty(config.accessKeyId) && !_.isEmpty(config.secretAccessKey);
    }
    return false;

};

module.exports = exports = KMSAPI;
