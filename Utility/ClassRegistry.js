/*
 *
 * Port of CakePHP ClassRegistry to JavaScript
 * https://raw.github.com/cakephp/cakephp/a32506593c948fe56f6d7b524f1178fb37800533/lib/Cake/Utility/ClassRegistry.php
 *
 */

module.exports = function(App, Firefly) {

	return new Class({
		__objects: {},
		__map: {},
		__config: {},
	/**
	 * Add $object to the registry, associating it with the name $key.
	 *
	 * @param string $key	Key for the object in registry
	 * @param mixed $object	Object to store
	 * @return boolean True if the object was written, false if $key already exists
	 */
		addObject: function(key, object) {
			var self = this;
			key = key.underscore();
			if (typeof self.__objects[key] === 'undefined') {
				self.__objects[key] = object;
				return true;
			}
			return false;
		},

	/**
	 * Remove object which corresponds to given key.
	 *
	 * @param string $key	Key of object to remove from registry
	 * @return void
	 */
		removeObject: function(key) {
			var self = this;
			key = key.underscore();
			if (typeof self.__objects[key] !== 'undefined') {
				delete self.__objects[key];
			}
		},

	/**
	 * Returns true if given key is present in the ClassRegistry.
	 *
	 * @param string $key Key to look for
	 * @return boolean true if key exists in registry, false otherwise
	 */
		isKeySet: function(key) {
			var self = this;
			key = key.underscore();
			if (typeof self.__objects[key] !== 'undefined') {
				return true;
			} else if (typeof self.__map[key] !== 'undefined') {
				return true;
			}
			return false;
		},

	/**
	 * Get all keys from the registry.
	 *
	 * @return array Set of keys stored in registry
	 */
		keys: function() {
			var self = this;
			return Object.keys(self.__objects);
		},

	/**
	 * Return object which corresponds to given key.
	 *
	 * @param string $key Key of object to look for
	 * @return mixed Object stored in registry or boolean false if the object does not exist.
	 */
		getObject: function(key) {
			var self = this;
			key = key.underscore();
			var _return = false;
			if (typeof self.__objects[key] !== 'undefined') {
				_return = self.__objects[key];
			} else {
				key = self.__getMap(key);
				if (typeof self.__objects[key] !== 'undefined') {
					_return = self.__objects[key];
				}
			}
			return _return;
		},

	/**
	 * Sets the default constructor parameter for an object type
	 *
	 * @param string $type Type of object.  If this parameter is omitted, defaults to "Model"
	 * @param array $param The parameter that will be passed to object constructors when objects
	 *                      of $type are created
	 * @return mixed Void if $param is being set.  Otherwise, if only $type is passed, returns
	 *               the previously-set value of $param, or null if not set.
	 */
		config: function(type, param) {
			var self = this;

			if (empty(param) && is_array(type)) {
				param = type;
				type = 'Model';
			} else if (is_null(param)) {
				unset(self.__config[type]);
			} else if (empty(param) && is_string(type)) {
				return typeof self.__config[type] !== 'undefined' ? self.__config[type] : null;
			}
			self.__config[type] = param;
		},

	/**
	 * Checks to see if $alias is a duplicate $class Object
	 *
	 * @param string $alias
	 * @param string $class
	 * @return boolean
	 */
		__duplicate: function(alias, className) {
			var duplicate = false;
			if (this.isKeySet(alias)) {
				var model = this.getObject(alias);
				if (typeof model == 'object'
					&& model.alias === className) {
					duplicate = model;
				}
				delete model;
			}
			return duplicate;
		},

	/**
	 * Add a key name pair to the registry to map name to class in the registry.
	 *
	 * @param string $key Key to include in map
	 * @param string $name Key that is being mapped
	 */
		map: function(key, name) {
			var self = this;
			key = key.underscore();
			name = name.underscore();
			if (typeof self.__map[key] === 'undefined') {
				self.__map[key] = name;
			}
		},

	/**
	 * Get all keys from the map in the registry.
	 *
	 * @return array Keys of registry's map
	 */
		mapKeys: function() {
			var self = this;
			return Object.keys(self.__map);
		},

	/**
	 * Return the name of a class in the registry.
	 *
	 * @param string $key Key to find in map
	 * @return string Mapped value
	 */
		__getMap: function(key) {
			if (typeof this.__map[key] !== 'undefined') {
				return this.__map[key];
			}
		},

	/**
	 * Flushes all objects from the ClassRegistry.
	 *
	 * @return void
	 */
		flush: function() {
			var self = this;
			self.__objects = {};
			self.__map = {};
		}

	});

	
};
