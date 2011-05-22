
module.exports = function(App, Jeex) {
	App.load('MooTools').apply(this);
	return new Class({
		Extends: App.Model,
		actsAs: {
			'Behave': [1, 2, 3]
		}
	});
	
};