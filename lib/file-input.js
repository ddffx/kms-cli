'use strict';
var util = require('util');
var fs = require('fs');


var getInputsFromFile = function(file, cb){
	var input_json;
	if(file){
		fs.readFile(file, function(err, data){
			if(err){
				cb(err, null);
			} else {
				input_json = JSON.parse(data);
				// console.log(input_json);
				cb(null, input_json);
			}
		})
	} else{
		cb(new Error('mising file input'), null);
	}
};
module.exports = exports = getInputsFromFile;