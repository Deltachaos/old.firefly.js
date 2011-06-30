module.exports = function(App, Firefly) {
	
	var fs = require('fs');
	var path = require('path');

	var Watcher = new Class({
		fs: fs,
		initialize: function(path, options, callback) {
			this.path = path;
			this.options = options;
			this.callback = callback;
			Firefly.WatcherRegistry.addWatcher(this);
		},
		unwatch: function() {
			Firefly.WatcherRegistry.removeWatcher(this);
		}
	});

	var Filesystem = new Class({
		fs: fs,
		initialize: function(path, watcher) {
			this._path = path;
			if(watcher !== undefined) {
				this._watcher = watcher;
			}
		},
		_isSync: function(callbackName) {
			/*
			if(callbackName === undefined) {
				callbackName = 'callback';
			}
			if(typeof this[callbackName] === 'undefined') {
				return true;
			}
			*/
			if(typeof callbackName !== 'function') {
				return true;
			}
			return false;
		},
		getInstance: function(first) {
			//PREFORMANCE: do we realy nead to do Object.values?
			var args = Object.values(arguments);
			if(typeof first == 'object') {
				first = Object.values(first);
				var stack = [];
				var self = this;
				Object.each(first, function(value) {
					stack.push(new Filesystem(self.join(value)))
				});
				return stack;
			}
			return new Filesystem(this.join(args))
		},
		join: function(first) {
			var args = Object.values(arguments);
			if(typeof first == 'object') {
				args = Object.values(first);
			}
			args.each(function(value, index) {
				switch(typeof value) {
					case 'number':
						args[index] = value.toString();
						break;
				}
			});
			args.unshift(this._path);
			return path.join.apply(this, args);
		},
		rename: function(newPath, callback) {
			if(this._isSync.call(this, callback)) {
				return this.fs.renameSync(this._path, newPath);
			}
			return this.fs.rename(this._path, newPath, callback);
		},
		truncate: function(len, callback) {
			if(typeof len !== 'number') {
				len = 0;
			}
			if(this._isSync.call(this, callback)) {
				return this.fs.truncateSync(this._path, len, callback);
			}
			return this.fs.truncate(this._path, len, callback);
		},
		chmod: function(mode, callback) {
			if(this._isSync.call(this, callback)) {
				return this.fs.chmodSync(this._path, mode);
			}
			return this.fs.chmod(this._path, mode, callback);
		},
		stat: function(callback) {
			if(this._isSync.call(this, callback)) {
				return this.fs.statSync(this._path);
			}
			return this.fs.stat(this._path, callback);
		},
		lstat: function(callback) {
			if(this._isSync.call(this, callback)) {
				return this.fs.lstatSync(this._path);
			}
			return this.fs.lstat(this._path, callback);
		},
		fstat: function(callback) {
			if(this._isSync.call(this, callback)) {
				return this.fs.fstatSync(this._path);
			}
			return this.fs.fstat(this._path, callback);
		},
		link: function(dstpath, callback) {
			if(this._isSync.call(this, callback)) {
				return this.fs.linkSync(this._path, dstpath);
			}
			return this.fs.link(this._path, dstpath, callback);
		},
		symlink: function(path, callback) {
			if(this._isSync.call(this, callback)) {
				return this.fs.symlinkSync(this._path, path);
			}
			return this.fs.symlink(this._path, path, callback);
		},
		readlink: function(path, callback) {
			if(this._isSync.call(this, callback)) {
				return this.fs.readlinkSync(this._path, path);
			}
			return this.fs.readlink(this._path, path, callback);
		},
		realpath: function(path, callback) {
			if(this._isSync.call(this, callback)) {
				return this.fs.realpathSync(this._path, path);
			}
			return this.fs.realpath(this._path, path, callback);
		},
		unlink: function(path, callback) {
			if(this._isSync.call(this, callback)) {
				return this.fs.unlinkSync(this._path, path);
			}
			return this.fs.unlink(this._path, path, callback);
		},
		rmdir: function(path, callback) {
			if(this._isSync.call(this, callback)) {
				return this.fs.rmdirSync(this._path, path);
			}
			return this.fs.rmdir(this._path, path, callback);
		},
		mkdir: function(path, callback) {
			if(this._isSync.call(this, callback)) {
				return this.fs.mkdirSync(this._path, path);
			}
			return this.fs.mkdir(this._path, path, callback);
		},
		readdir: function(callback) {
			if(this._isSync.call(this, callback)) {
				return this.getInstance(this.fs.readdirSync(this._path));
			}
			var self = this;
			return this.fs.readdir(this._path, function(err, results) {
				callback(err, self.getInstance(results));
			});
		},
		readFile: function(filename, encoding, callback) {
			if(this._isSync.call(this, callback)) {
				return this.fs.readFileSync(this._path, filename, encoding);
			}
			return this.fs.readFile(this._path, filename, encoding, callback);
		},
		writeFile: function(filename, data, encoding, callback) {
			if(this._isSync.call(this, callback)) {
				return this.fs.writeFileSync(this._path, filename, data, encoding);
			}
			return this.fs.writeFile(this._path, filename, data, encoding, callback);
		},
		watchFile: function(filename, options, callback) {
			return new Watcher(this._path, filename, options, callback);
		},
		unwatchFiles: function() {
			return Firefly.WatcherRegistry.removeAllWatchers(this._path);
		},
		isFile: function(callback) {
			if(this._isSync.call(this, callback)) {
				return this.stat().isFile();
			}
			return this.stat(function(stat) {
				callback(stat.isFile());
			});
		},
		isDirectory: function(callback) {
			if(this._isSync.call(this, callback)) {
				return this.stat().isDirectory();
			}
			return this.stat(function(stat) {
				callback(stat.isDirectory());
			});
		},
		isBlockDevice: function(callback) {
			if(this._isSync.call(this, callback)) {
				return this.stat().isBlockDevice();
			}
			return this.stat(function(stat) {
				callback(stat.isBlockDevice());
			});
		},
		isCharacterDevice: function(callback) {
			if(this._isSync.call(this, callback)) {
				return this.stat().isCharacterDevice();
			}
			return this.stat(function(stat) {
				callback(stat.isCharacterDevice());
			});
		},
		isSymbolicLink: function(callback) {
			if(this._isSync.call(this, callback)) {
				return this.lstat().isSymbolicLink();
			}
			return this.lstat(function(lstat) {
				callback(lstat.isSymbolicLink());
			});
		},
		isFIFO: function(callback) {
			if(this._isSync.call(this, callback)) {
				return this.stat().isFIFO();
			}
			return this.stat(function(stat) {
				callback(stat.isFIFO());
			});
		},
		isSocket: function(callback) {
			if(this._isSync.call(this, callback)) {
				return this.stat().isSocket();
			}
			return this.stat(function(stat) {
				callback(stat.isSocket());
			});
		}
		
		
		
	});
	
	return Filesystem;
	
};