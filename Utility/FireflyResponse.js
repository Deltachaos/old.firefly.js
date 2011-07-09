

module.exports = function(App, Firefly) {
	App.load('MooTools').apply(this);
	return new Class({
		_buffers: {
			responseCode: 200,
			headers: {},
			content: []
		},
		_bufferSize: 0,
		_headersWritten: false,
		_outputBuffering: 0,
		_requestEnd: false,
		initialize: function(Response) {
			this.Response = Response;
		},
		setResponseCode: function(code) {
			return this._buffers.responseCode = code;
		},
		getResponseCode: function() {
			return this._buffers.responseCode;
		},
		setHeader: function(name, value) {
			if(value === undefined) {
				value = name.substr(name.indexOf(':') + 1).ltrim();
				name = name.substr(0, name.indexOf(':'));
			}
			if(this._headersWritten) {
				throw new Firefly.Error('Headers have already been written');
			}
			this._buffers.headers[name] = value;
			return true;
		},
		getHeader: function(name) {
			return this._buffers.headers[name];
		},
		unsetHeader: function(name) {
			if(!this._headersWritten) {
				throw new Firefly.Error('Headers have already been written');
			}
			return delete this._buffers.headers[name];
		},
		writeHeaders: function() {
			if(this._headersWritten) {
				return false;
			}
			this._headersWritten = true;
			var ret = this.Response.writeHead(
				this._buffers.responseCode,
				this._buffers.headers
			);
			return ret;
		},
		echo: function() {
			if(this._requestEnd) {
				throw new Firefly.Error('request has been ended');
			}
			var args = Object.values(arguments);
			var content = args.join('');
			if(this._outputBuffering) {
				this.buffer(content);
			} else {
				this.writeHeaders();
				this.Response.write(content);
			}
		},
		end: function() {
			return this.Response.end();
		},
		buffer: function(content, header) {
			if(typeof this._buffers.content[this._outputBuffering - 1] == undefined) {
				throw new Firefly.Error('Cannot buffer to not existing buffer');
			}
			this._buffers.content[this._outputBuffering - 1][1] = 
				this._buffers.content[this._outputBuffering - 1][1].concat(content);
			this._bufferSize = this._buffers.content.length;
		},
		obStart: function(callback, chunkSize) {
			//TODO: chuckSize stuff
			if(callback === undefined) {
				callback = function(content) {
					return content;
				};
			}
			this._buffers.content.push([callback, '', chunkSize]);
			this._outputBuffering = this.obGetLevel();
		},
		obGetLevel: function() {
			return this._buffers.content.length;
		},
		obClean: function() {
			this._buffers.content[this.obGetLevel() - 1][1] = '';
		},
		obGetContents: function() {
			return this._buffers.content[this.obGetLevel() - 1][1];
		},
		obGetLength: function() {
			return this.obGetContents().length;
		},
		obEndClean: function() {
			this.obClean();
			if((this.obGetLevel() - 1) < 0) {
				throw new Firefly.Error('Cannot end not started output buffering');
			}
			this._buffers.content.pop();
			this._outputBuffering = this.obGetLevel();
			return true;
		},
		obFlush: function() {
			var level = this.obGetLevel();
			this._outputBuffering = level - 1;
			this.echo(
				this._buffers.content[this.obGetLevel() - 1][0](
					this.obGetContents()
				)
			);
			this._outputBuffering = level;
		},
		obEndFlush: function() {
			this.obFlush();
			this.obEndClean();
		},
		obGetClean: function() {
			if(!this.obGetLevel()) {
				return false;
			}
			var content = this.obGetContents();
			this.obEndClean();
			return content;
		}
		
	});
	
};