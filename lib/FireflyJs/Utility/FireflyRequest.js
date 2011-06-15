

module.exports = function(App, Firefly) {
	App.load('MooTools').apply(this);
	
	return new Class({
		initialize: function(Request) {
			this.Request = Request;
		},
		log: function() {
			App.access(this.Request);
		}
	});
	
};