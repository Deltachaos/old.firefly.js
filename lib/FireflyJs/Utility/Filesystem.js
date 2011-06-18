module.exports = function(App, Firefly) {
	
	
	return new Class({
		_fs: require('fs'),
		initialize: function(path, watcher) {
			this._path = path;
			if(watcher !== undefined) {
				this._watcher = watcher;
			}
		},
		_isSync: function(callbackName) {
			if(callbackName === undefined) {
				callbackName = 'callback';
			}
			if(typeof this[callbackName] === 'undefined') {
				return true;
			}
			if(typeof this[callbackName] !== 'function') {
				this[callbackName] = function() {};
			}
			return false;
		},
		rename: function(newPath, callback) {
			if(this._isSync.call(this, callback)) {
				return this._fs.renameSync(this._path, newPath);
			}
			return this._fs.rename(this._path, newPath, callback);
		},
		truncate: function(len, callback) {
			if(typeof len !== 'number') {
				len = 0;
			}
			if(this._isSync.call(this, callback)) {
				return this._fs.truncateSync(this._path, len, callback);
			}
			return this._fs.truncate(this._path, len, callback);
		},
		chmod: function(mode, callback) {
			if(this._isSync.call(this, callback)) {
				return this._fs.chmodSync(this._path, mode);
			}
			return this._fs.chmod(this._path, mode, callback);
		},
		stat: function(callback) {
			if(this._isSync.call(this, callback)) {
				return this._fs.statSync(this._path);
			}
			return this._fs.stat(this._path, callback);
		}
		
		
	});
	
};