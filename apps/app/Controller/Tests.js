
module.exports = function(App, Jeex) {
	App.load('MooTools').apply(this);
	return new Class({
		Extends: App.Controller,
		name: 'Tests',
		components: {
			'Tester': [1, 2, 3]
		}
	});

};