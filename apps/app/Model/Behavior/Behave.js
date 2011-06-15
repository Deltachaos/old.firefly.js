
module.exports = function(App, Firefly) {
	App.load('MooTools').apply(this);
	return new Class({
		Extends: Firefly.ModelBehavior
	});
	
};