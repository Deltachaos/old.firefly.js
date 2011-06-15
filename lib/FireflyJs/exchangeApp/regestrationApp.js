var Firefly = require('./lib/FireflyJs/Firefly.js');


var FireflyInstance = new Firefly.Firefly();

FireflyInstance.registerApp({
	name: 'app1',
	debug: 2,
	transports: {
		Tcp: ['9000', '0.0.0.0', {}]
	}
});


/*
GLOBAL.APP = new AppJs.AppJs({
	servers: [
		new Class({
			Extends: AppJs.BaseApp,
			debug: 2,
			app: 'app',
			transports: {
				Http: ['8086', '0.0.0.0', {}]
			},
			initialize: function() {
				this.parent();
			}
		}),
		new Class({
			Extends: AppJs.BaseApp,
			app: 'app2',
			transports: {
				Http: ['8087', '0.0.0.0', {}]
			},
			initialize: function() {
				this.parent();
			}
		})
		
	]
});


*/



