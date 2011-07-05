var Firefly = (function() {
	var path = require('path');
	var ds = path.normalize('/');
	var filename = '.' + ds + path.join('Utility', 'Firefly.js');
	return require(filename);
})();

for(var i in Firefly) {
	exports[i] = Firefly[i];
}



