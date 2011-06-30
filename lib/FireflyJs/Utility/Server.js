module.exports = function(App, Firefly) {
	App.load('MooTools').apply(this);
	var path = require('path');
	var Dispatcher = App.load('Utility', 'Dispatcher');
	var FireflyRequest = App.load('Utility', 'FireflyRequest');
	var FireflyResponse = App.load('Utility', 'FireflyResponse');
	var Router = App.load('Utility', 'Router');
	
	var TAL = new Class({
		Transports: {},
		/* Set available Transports for the Transport Abstraction Layer */
		getTransport: function(App, type, port, ip, options) {
			if(typeof this.Transports[type] === 'undefined') {
				try {
					this.Transports[type] = App.load('Utility', 'Protocols' + Firefly.DS + type);
					App.print(type + ' Transport loaded');
				} catch(e) {
					throw new Firefly.Error("Cannot load Transport ["+type+"]", {
						type: type
					});
				}
			};
			return new this.Transports[type](
				port,
				ip,
				options
			);
		}
	});

	return new Class({
		Transports: {},
		Dispatcher: {},
		transports: {
			Http: ['8080', '0.0.0.0', {}]
		},
		name: 'app',
		app: path.resolve('.' + Firefly.DS + 'apps' + Firefly.DS + 'app' + Firefly.DS),
		root: path.resolve('.' + Firefly.DS),
		debug: 2,
		showerrors: [
			Firefly.DEPRECATED,
			Firefly.NOTICE,
			Firefly.WARNING,
			Firefly.ERROR,
			Firefly.FATAL
		],
		routes: [],
		initialize: function() {
			//console.log(this.app);
			this.App = new Firefly.App(this.app, this.root, this.name);
			if(!this.App.exists()) {
				throw new Firefly.Error("cannot find app. [" + this.app + "]");
			}

			var Transport = new TAL();
			var self = this;
			Object.each(this.transports, function(value, index) {
				if(typeof value[3] === undefined) {
					value[3] = {};
				}
				if(typeof value[2] === undefined) {
					value[2] = '0.0.0.0';
				}
				value.unshift(index);
				value.unshift(self.App);
				self.Transports[index] = Transport.getTransport.apply(
					Transport,
					value
				);
				self.App.print('Register dispatcher callback');
				self.Transports[index].registerCallback(function() {
					var args = Object.values(arguments);
					self.dispatch.apply(self, args);
				});
			});

			this.Dispather = new Dispatcher(this);
			this.Router = new Router();
		},
		dispatch: function(Transport, Request, Response) {
			Request = new FireflyRequest(Request);
			Response = new FireflyResponse(Response);
			Request.log();
			return this.Dispather.dispatch.call(this.Dispather, Transport, Request, Response);
		}

	});

}
