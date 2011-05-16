

module.exports = function(App, Jeex) {

	return new Class({
		_buffers: {
			responseCode: 200,
			headers: {},
			content: ''
		},
		_bufferSize: 0,
		_outputBuffering: true,
		_headersWritten: false,
		_requestEnd: false,
		initialize: function(Response) {
			this.Response = Response;
		},
		setHeader: function(name, value) {
			if(value === undefined) {
				name = value.substr(0, value.indexOf(':'));
				value = value.substr(value.indexOf(':') + 1).ltrim();
			}
			if(this._headersWritten) {
				throw new Jeex.Error('Headers have already been written');
			}
			this._buffers.headers[name] = value;
			return true;
		},
		getHeader: function(name) {
			return this._buffers.headers[name];
		},
		unsetHeader: function(name) {
			if(!this._headersWritten) {
				throw new Jeex.Error('Headers have already been written');
			}
			return delete this._buffers.headers[name];
		},
		writeHeaders: function() {
			this._headersWritten = true;
			return this.Response.writeHead(
				this._buffers.responseCode,
				this._buffers.headers
			);
		},
		echo: function() {
			if(this._requestEnd) {
				throw new Jeex.Error('request has been ended');
			}
			var args = Array.prototype.slice.call(arguments);
			var content = args.join('');
			if(this._outputBuffering) {
				this.buffer(content);
			} else {
				if(Object.getLength(this.buffers.headers) > 0) {
					this.writeHeaders();
				}
				this.Request.write(content);
			}
		},
		buffer: function(content) {
			this._buffers.content = this._buffers.content.concat(content);
			this._bufferSize = this._buffers.content.length;
		},
		obStart: function(callback, chunkSize) {
			//TODO: callback and chuckSize stuff
			this._outputBuffering = true;
		},
		obClean: function() {
			this._buffers.content = '';
		},
		obGetContents: function() {
			return this._buffers.content;
		},
		obGetLength: function() {
			return this.obGetContents().length;
		},
		obEndClean: function() {
			this.obClean();
			this._outputBuffering = false;
		},
		obFlush: function() {
			this.Response.write(this._buffers.content);
			this.obClean();
		},
		obEndFlush: function() {
			this.obFlush();
			this.obEndClean();
		},
		obGetClean: function() {
			if(!this._outputBuffering) {
				return false;
			}
			var content = this.obGetContents();
			this.obEndClean();
			return content;
		}
		
	});
	
};