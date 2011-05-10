module.exports = function(App, Jeex) {
	App.load('MooTools').apply(this);
	return new Class({
		Extends: App.load('Utility', 'BaseProtocol'),
		initialize: function(port, ip, options) {
			var http = require('http');
			var self = this;
			App.print('Create Http server');
			var server = http.createServer(function(Request, Response) {
				self.callCallbacks.call(self, this, Request, Response);
			})
			App.print('Http server listen to: '+ip+':'+port);
			server.listen(port, ip);
		}
	});
};
