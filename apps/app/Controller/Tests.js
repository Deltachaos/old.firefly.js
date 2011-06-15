
module.exports = function(App, Firefly) {
	App.load('MooTools').apply(this);
	return new Class({
		Extends: App.Controller,
		name: 'Tests',
		components: {
			'Tester': [1, 2, 3]
		}
	});

};