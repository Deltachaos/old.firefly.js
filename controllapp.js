var Firefly = require('./lib/FireflyJs/index.js');

var Core = new Firefly.App();
var TestCase = Core.load('TestCase');
var TestCaseInstance = new TestCase();
TestCaseInstance.getTestList(function(err, results) {
	if(err === null) {
		results.each(function(value) {
			TestCaseInstance.runTest(value, function(err) {
				console.log('abc');
			});
		});
	}
});

var FireflyInstance = new Firefly.Firefly();

/*

FireflyInstance.registerExchange({
	debug: 2,
	transports: {
		Http: ['8080', '0.0.0.0', {}]
	}
});


FireflyInstance.registerApp({
	exchangeServer: 'localhost:8080',
	name: 'app1',
	debug: 2,
	exchangeServer: '',
	transports: {
		Http: ['8086', '0.0.0.0', {}]
	}
});

*/
/*

JeexInstance.registerApp({
	exchangeServer: 'localhost:8080',
	name: 'app1',
	debug: 2,
	transports: {
		Http: ['8086', '0.0.0.0', {}]
	}
});

*/
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



