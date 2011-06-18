module.exports = function(App, Firefly) {
	
	var fs = require('fs');

	return new Class({
		fs: fs,
		watchers: [],
		addWatcher: function(object) {
			this.watchers.push(object);
			return fs.watchFile(object.path, object.options, object.callback);
		},
		removeWatcher: function(object) {
			var path = object.path;
			var count = 0;
			this.watchers.each(function(value, index) {
				if(value == object) {
					delete this.watchers[index];
					return;
				}
				if(value.path == path) {
					count++;
				}
			});
			if(!count) {
				fs.unwatchFile(path);
				return true;
			}
			return false;
		},
		removeAllWatchers: function(path) {
			this.watchers.each(function(value, index) {
				if(value.path == path) {
					delete this.watchers[index];
				}
			});
			fs.unwatchFile(path);
		}
		
	});

};