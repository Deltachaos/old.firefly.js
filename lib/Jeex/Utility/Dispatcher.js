
var JeexRequest = new Class({
	initialize: function(Request) {
		
	}
});


module.exports = function(App, Jeex) {
	App.load('MooTools').apply(this);

	return new Class({
		initialize: function(server) {
			this.Server = server;
			this.App = this.Server.App;
		},
		dispatch: function(Transport, JeexRequest, JeexResponse) {
			var Configure = new Jeex.Configure();
			
			
			/*
			Response.writeHead(200, {'Content-Type': 'text/plain'});
			Response.end('Hello World\n');
			//Here start the real stuff
			/*
			var args = Array.prototype.slice.call(arguments);
			console.log(args);
			*/
		}
	});

}


