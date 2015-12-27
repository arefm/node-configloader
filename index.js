'use strict';

//load required modules
var fs = require('fs'),
	_  = require('lodash');

var CFGLoader = function () {
	
	var cls = {
		
		configs: {},
		
		uiduser: process.env.USER,
		
		env: process.env.NODE_ENV || 'production',
		__init: function() {
			//set env
			cls.env = ['production', 'development'].indexOf(cls.env) > -1 ? cls.env : "production";
			//load common config file
			cls.configs = JSON.parse(fs.readFileSync(__dirname + "/common.cfg.json"));
			//set uid user
			cls.configs['app']['user'] = cls.uiduser;
			//set env
			cls.configs['app']['env'] = cls.env;
			//load env config file
			var configFile = JSON.parse(fs.readFileSync(__dirname + "/" + cls.env + ".cfg.json"));
			cls.configs = _.merge(cls.configs, configFile);
		}
	}

	//load init
	cls.__init();
	return cls.configs;
}

module.exports = new CFGLoader();