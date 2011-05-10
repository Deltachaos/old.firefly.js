var Jeex = (function() {
	var path = require('path');
	var ds = path.normalize('/');
	var filename = '.' + ds + path.join('Utility', 'Jeex.js');
	return require(filename);
})();

for(var i in Jeex) {
	exports[i] = Jeex[i];
}



