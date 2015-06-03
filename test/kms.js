'use strict';

var expect = require('chai').expect;
var KMSAPI = require('../lib/kms');

describe('kms', function() {

    it('should check valid config', function(done) {

        var config = {
            region: 'us-east-1',
            accessKeyId: 'ABCDEFGHIJKL',
            secretAccessKey: 'A123pQrsTyuvWxY456890Z',
            apiVersion: '2014-11-01'
        };
        var kmsapi = new KMSAPI();
        expect(kmsapi.isValidConfig(config)).to.be.true;
        done();
    });

    it('should fail if  invalid config', function(done) {

        var config = {
            region: '',
            accessKeyId: 'ABCDEFGHIJKL',
            secretAccessKey: '',
            apiVersion: '2014-11-01'
        };
        var kmsapi = new KMSAPI();
        expect(kmsapi.isValidConfig(config)).to.be.false;
        done();
    });

});