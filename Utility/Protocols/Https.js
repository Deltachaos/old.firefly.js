module.exports = function(App, Firefly) {
	App.load('MooTools').apply(this);
	return new Class({
		Extends: App.load('Utility', 'BaseProtocol'),
		initialize: function(port, ip, options) {
			var http = require('https');
			var self = this;
			App.print('Create Https server');
			var server = http.createServer(function(Request, Response) {
				self.callCallbacks.call(self, this, Request, Response);
			});
			App.print('Https server listen to: '+ip+':'+port);
			server.listen(port, ip);
		}
	});
};