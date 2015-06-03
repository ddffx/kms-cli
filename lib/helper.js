'use strict';
var _ = require('lodash');
var KMSHelper = function() {
    if (!(this instanceof KMSHelper)) {
        return new KMSHelper();
    }
};
KMSHelper.prototype.checkProfileEnv  = function() {
    var region = process.env.AWS_REGION;
    var profile = process.env.AWS_PROFILE;
    
    if (region && profile){
    	return true;
    }
    return false;
};
KMSHelper.prototype.checkSecretEnv  = function() {
    var region = process.env.AWS_REGION;
    var key_id = process.env.AWS_ACCESS_KEY_ID;
    var secret = process.env.AWS_SECRET_ACCESS_KEY;
    
    if (region && key_id && secret){
    	return true;
    }
    return false;
};
module.exports = exports = KMSHelper;