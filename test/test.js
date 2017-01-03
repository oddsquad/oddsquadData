var fs = require('fs');
var YAML = require('yamljs');
var async = require('async');

describe('Card', function() {
	describe('data', function() {
		var dir = __dirname+"/../cards";
		it('should be valid YAML', function(done) {
			fs.readdir(dir, function(err, files) {
				if(err) {
					throw err;
				}
				var calls = [];
				for(var i = 0; i < files.length; i++) {
					if(files[i].indexOf(".yml") > -1) {
						calls.push(function(file, callback) {
							fs.readFile(dir+"/"+file, function(err, content) {
								if(err) {
									callback(err);
									return;
								}
								try {
									callback(null, YAML.parse(content.toString()));
								} catch(e) {
									console.log("!!Failed to parse \""+file+"\"!!");
									callback(e);
								}
							})
						}.bind(this, files[i]));
					}
				}
				async.parallel(calls, done);
			});
		});
	});
});
