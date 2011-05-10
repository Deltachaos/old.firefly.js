
var	fs = require('fs'); //needed for paths
/* Set some constants */
GLOBAL.WINDOWS = false; //TODO: Replace with a dynamic detection soon
GLOBAL.PATHS = {};
GLOBAL.PATHS.ds = '/'; //TODO: Replace with a dynamic detection soon
GLOBAL.PATHS.root = fs.realpathSync('.') + PATHS.ds;
GLOBAL.PATHS.apps = PATHS.root + 'apps' + PATHS.ds;
GLOBAL.PATHS.lib = PATHS.root + 'lib' + PATHS.ds;
GLOBAL.PATHS.mootools = PATHS.lib + 'MooTools' + PATHS.ds;
GLOBAL.PATHS.appjs = PATHS.lib + 'AppJs' + PATHS.ds;

/* Load MooTools */
require(PATHS.mootools + 'MooTools.js').apply(GLOBAL);

GLOBAL.Jex = require(PATHS.appjs + 'Utility' + PATHS.ds + 'Jex.js').Jex;


/* Some MooTools improvements */
require(PATHS.mootools + 'ArrayCompare.js');
require(PATHS.mootools + 'Inflection.js');
