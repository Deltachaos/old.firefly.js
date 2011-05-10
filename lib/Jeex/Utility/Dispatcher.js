module.exports = function(App, Jeex) {
	App.load('MooTools').apply(this);
	var RequestEnvironment = new Class({

		initialize: function() {
			this.Configure = new Jeex.Configure();
		}


	});

	return new Class({
		initialize: function(server) {
			this.Server = server;
			this.App = this.Server.App;
		},
		dispatch: function(Transport, Request, Response) {
			this.App.access(Request);
			var Environment = new RequestEnvironment();
			//Here start the real stuff
			/*
			var args = Array.prototype.slice.call(arguments);
			console.log(args);
			*/
		}
	});

}


