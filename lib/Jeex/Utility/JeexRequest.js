

module.exports = function(App, Jeex) {
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