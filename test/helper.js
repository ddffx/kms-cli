'use strict';
var expect = require('chai').expect;
var Helper = require('../lib/helper');

describe('kmshelper', function() {

	before(function(done) {
		
		done();
	});
	after(function() {
		
	});

	beforeEach('checkProfileEnv', function(){
		process.env.AWS_REGION = 'us-east-1';
		process.env.AWS_PROFILE = 'dev';
	});

	afterEach('checkProfileEnv', function(){
		delete process.env.AWS_REGION;
		delete process.env.AWS_PROFILE;
	});

    it('checkProfileEnv', function(done) {

        var helper = new Helper();
        
        expect(helper.checkProfileEnv()).to.be.true;
        done();
    });

    beforeEach('checkSecretEnv', function(){
		process.env.AWS_REGION = 'us-east-1';
		process.env.AWS_ACCESS_KEY_ID= 'ABC';
		process.env.AWS_SECRET_ACCESS_KEY= 'a12345Ythx';
	});

	afterEach('checkSecretEnv', function(){
		delete process.env.AWS_REGION;
		delete process.env.AWS_ACCESS_KEY_ID;
		delete process.env.AWS_SECRET_ACCESS_KEY;
	});

    it('checkSecretEnv', function(done) {

        var helper = new Helper();
       
        expect(helper.checkSecretEnv()).to.be.true;
        done();
    });

    

});