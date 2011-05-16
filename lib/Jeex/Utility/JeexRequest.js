

module.exports = function(App, Jeex) {

	return new Class({
		initialize: function(Request) {
			this.Request = Request;
		},
		log: function() {
			App.access(this.Request);
		}
	});
	
};