module.exports = function(App, Firefly) {
	
	var fs = App.load('Utility', 'Filesystem');
	var async = App.load('Async');
	
	var BaseTest = new Class({
	});
	
	return new Class({
		initialize: function() {
		},
		getTestList: function(callback) {
			var AppPath = App.path();
			var CaseFolder = new fs(AppPath);
			var resultlist = [];
			CaseFolder.cd('Test', 'Cases');
			CaseFolder.find(function(err, results) {
				results.each(function(value, index) {
					var path = value.path(CaseFolder.path());
					resultlist.push(path.substr(0, path.length - 3));
				});
			});
			callback(null, resultlist);
		},
		runTest: function(test, callback) {
			var TestClass = App.load('Test', 'Cases' + test, BaseTest);
			return new TestClass(callback);
		}
	});
	
};