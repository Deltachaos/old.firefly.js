module.exports = function(App, Firefly, TestCase) {
	
	var Test2 = new Class({
		Extends: TestCase,
		initialize: function(callback) {
			//this.setup();
			//console.log(Test2.prototype);
			callback.call(this, null, this);
		},
		groups: {
			Abc: ['Test', 'Test2']
		},
		setup: function() {
			console.log('setup')
		},
		startAbc: function() {
			console.log('start abc')
		},
		stopAbc: function() {
			console.log('stop abc')
		},
		
		testTest: function() {
			console.log('test test')
		},
		testTest2: function() {
			console.log('test test2')
		},
		testTest3: function() {
			console.log('test test3')
		}
	});
	return Test2;
	
};