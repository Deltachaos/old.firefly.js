module.exports = function(App, Firefly) {
	App.load('MooTools').apply(this);
	return new Class({
		callbacks: [],
		callCallbacks: function(server, Request, Response) {
			var args = Array.prototype.slice.call(arguments);
			this.callbacks.some(function(methode) {
				return !methode.apply(server, args);
			});
		},
		registerCallback: function(callback) {
			return this.callbacks.push(callback);
		},
		unregisterCallback: function(callback) {
			return this.callbacks.erase(callback);
		}
	});
};