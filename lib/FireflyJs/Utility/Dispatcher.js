module.exports = function(App, Firefly) {

	return new Class({
		initialize: function(server) {
			this.Server = server;
			this.App = this.Server.App;
		},
		dispatch: function(Transport, FireflyRequest, FireflyResponse) {
			
			
			
			var ReqestApp = App.clone();
			
			console.log(ReqestApp == App);
			
			//var Configure = new Firefly.Configure();
			
			FireflyResponse.setHeader('Contet-Type:', 'text/plain');
			FireflyResponse.setHeader('X-Test: text/plain');
			
			
			FireflyResponse.end();
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


